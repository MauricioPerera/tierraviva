/**
 * trades-lint.js — Validación del tablón de intercambios (trades.json) contra GAME.md.
 * Uso CLI: node tools/trades-lint.js [trades.json] [GAME.md]
 * Cada oferta publicada debe ser legal según el contrato del mundo: el CI rechaza
 * tablones con criaturas ilegales. Mantener los chequeos en sintonía con tradeCheck
 * del motor (tests/test-board.js verifica la paridad de veredictos).
 */
function decodeB64(s) {
  return JSON.parse(decodeURIComponent(escape(Buffer.from(String(s).trim(), 'base64').toString('binary'))));
}

function lintTrades(trades, contract) {
  const F = [];
  const add = (level, rule, msg) => F.push({ level, rule, msg });
  const species = contract.species || {}, moves = contract.moves || {}, status = contract.status || {};
  const bal = contract.balance || {};
  const worldId = (contract.federation || {}).worldId;

  if (!trades || typeof trades !== 'object') { add('error', 'board-shape', 'trades.json no es un objeto'); return F; }
  if (trades.world !== worldId) add('error', 'board-world', `world "${trades.world}" no coincide con federation.worldId "${worldId}"`);
  if (!Array.isArray(trades.offers)) { add('error', 'board-shape', 'offers debe ser una lista'); return F; }
  if (trades.offers.length > 50) add('error', 'board-shape', 'máximo 50 ofertas publicadas');

  const seen = new Set();
  trades.offers.forEach((entry, i) => {
    const at = `oferta #${i}`;
    if (!entry || typeof entry.code !== 'string') { add('error', 'board-offer', at + ': falta el campo code'); return; }
    if (entry.contact != null && (typeof entry.contact !== 'string' || entry.contact.length > 200))
      add('error', 'board-offer', at + ': contact debe ser string de hasta 200 caracteres');
    let d;
    try { d = decodeB64(entry.code); } catch (e) { add('error', 'board-offer', at + ': code no decodifica'); return; }
    if (!d || d.k !== 'offer') { add('error', 'board-offer', at + ': no es un código de oferta'); return; }
    if (typeof d.id !== 'string' || !/^[a-z0-9]{4,12}$/i.test(d.id)) add('error', 'board-offer', at + ': id inválido');
    else if (seen.has(d.id)) add('error', 'board-offer', at + ': id duplicado ' + d.id);
    else seen.add(d.id);
    if (d.world !== worldId) add('error', 'board-offer', at + `: la oferta declara mundo "${d.world}" y el tablón es de "${worldId}"`);
    for (const w of (Array.isArray(d.wants) ? d.wants : [])) {
      if (!(w in species)) add('error', 'board-offer', at + ': pide especie inexistente: ' + w);
    }
    if ((d.wants || []).length > 3) add('error', 'board-offer', at + ': pide más de 3 especies');
    const err = creatureCheck(d.c, species, moves, status, bal);
    if (err) add('error', 'board-creature', at + ': ' + err);
  });
  return F;
}

/* Mismos criterios que tradeCheck del motor (estricto: rechaza, no recorta). */
function creatureCheck(c, species, moves, status, bal) {
  if (!c || typeof c !== 'object') return 'sin criatura';
  if (!species[c.name]) return `la especie "${c.name}" no existe en el contrato`;
  if (!Number.isInteger(c.lvl) || c.lvl < 1 || c.lvl > bal.tradeLvlMax) return `nivel inválido o mayor a ${bal.tradeLvlMax}`;
  if (!Number.isInteger(c.maxhp) || c.maxhp < 1 || c.maxhp > bal.hpMax + 15 + c.lvl * 6) return 'PS máximos imposibles para su nivel';
  if (!Number.isInteger(c.atk) || c.atk < 1 || c.atk > bal.atkMax + 10 + c.lvl * 2) return 'ataque imposible para su nivel';
  if (!Number.isInteger(c.hp) || c.hp < 0 || c.hp > c.maxhp) return 'PS actuales inválidos';
  if (!Array.isArray(c.mv) || c.mv.length < 1 || c.mv.length > bal.maxMoves || c.mv.some(m => !moves[m])) return 'movimientos inválidos';
  if (c.st != null && !status[c.st]) return 'estado alterado inválido';
  return null;
}

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const { splitFrontMatter, parseYamlSubset } = require('./yaml-min');
  const tradesFile = process.argv[2] || path.join(__dirname, '..', 'trades.json');
  const gameFile = process.argv[3] || path.join(__dirname, '..', 'GAME.md');
  const trades = JSON.parse(fs.readFileSync(tradesFile, 'utf8'));
  const { fm } = splitFrontMatter(fs.readFileSync(gameFile, 'utf8'));
  const contract = parseYamlSubset(fm);
  const findings = lintTrades(trades, contract);
  for (const f of findings) console.log(`[${f.level}] ${f.rule}: ${f.msg}`);
  const errors = findings.filter(f => f.level === 'error').length;
  console.log(errors === 0 ? `OK: tablón válido (${trades.offers.length} oferta(s)).` : `${errors} error(es).`);
  process.exit(errors > 0 ? 1 : 0);
}

module.exports = { lintTrades, creatureCheck };
