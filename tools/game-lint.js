#!/usr/bin/env node
/**
 * game-lint.js — Validación del contrato GAME.md (perfil tierraviva del Protocolo GAME).
 * Uso: node tools/game-lint.js [GAME.md]
 * Sin dependencias. Exporta lintGame(data) para reutilizar en tests.
 */
const SCREENS = new Set(['shop', 'breed', 'craft', 'expd', 'box']);
const EFFECTS = new Set(['heal']);

function lintGame(d) {
  d = d || {};
  const F = [];
  const add = (level, rule, msg) => F.push({ level, rule, msg });

  // required-fields
  for (const f of ['version', 'name', 'types', 'effectiveness', 'status', 'moves', 'species', 'trainers', 'shop', 'tiles', 'biomes', 'materials', 'recipes', 'expeditions', 'buildings', 'storage', 'balance', 'breeding', 'player', 'zones'])
    if (!(f in d)) add('error', 'required-fields', 'Falta el campo obligatorio: ' + f);

  const types = d.types || {}, eff = d.effectiveness || {}, status = d.status || {};
  const moves = d.moves || {}, species = d.species || {}, trainers = d.trainers || {};
  const shop = d.shop || {}, tiles = d.tiles || {}, biomes = d.biomes || {}, zones = d.zones || {};
  const materials = d.materials || {}, recipes = d.recipes || {};

  // type-presentation / eff-ref / type-symmetry
  for (const [t, def] of Object.entries(types))
    if (!def.c || !def.bg || !def.icon) add('error', 'type-presentation', 'tipo ' + t + ' sin c/bg/icon completos');
  for (const [a, row] of Object.entries(eff)) {
    if (!(a in types)) add('error', 'eff-ref', 'effectiveness declara tipo inexistente: ' + a);
    for (const [b, mult] of Object.entries(row)) {
      if (!(b in types)) add('error', 'eff-ref', 'effectiveness.' + a + ' referencia tipo inexistente: ' + b);
      if (a === b) continue;
      const rev = (eff[b] || {})[a];
      if (mult === 2 && rev !== 0.5) add('warn', 'type-symmetry', a + '>' + b + ' es x2 pero ' + b + '>' + a + ' no es x0.5');
      if (mult === 0.5 && rev !== 2) add('warn', 'type-symmetry', a + '>' + b + ' es x0.5 pero ' + b + '>' + a + ' no es x2');
    }
  }

  // status-valid
  for (const [k, s] of Object.entries(status)) {
    if (!s.tag || !s.c || !s.bg) add('error', 'status-valid', 'status ' + k + ' sin tag/c/bg completos');
    if (typeof s.hit !== 'string' || !s.hit.includes('{n}')) add('error', 'status-valid', 'status ' + k + ': hit debe ser plantilla con {n}');
  }

  // move-valid
  for (const [k, m] of Object.entries(moves)) {
    if (!(m.t in types)) add('error', 'move-valid', 'movimiento ' + k + ' usa tipo desconocido: ' + m.t);
    if (!(m.p > 0)) add('error', 'move-valid', 'movimiento ' + k + ' con potencia inválida: ' + m.p);
    if (m.st && !(m.st in status)) add('error', 'move-valid', 'movimiento ' + k + ' inflige estado desconocido: ' + m.st);
    if (m.st && !(m.sc > 0 && m.sc <= 1)) add('error', 'move-valid', 'movimiento ' + k + ': sc debe estar en (0,1]: ' + m.sc);
    if (!m.st && m.sc != null) add('warn', 'move-valid', 'movimiento ' + k + ' declara sc sin st');
  }

  // species-valid
  let starters = 0;
  for (const [n, sp] of Object.entries(species)) {
    if (!(sp.t in types)) add('error', 'species-valid', n + ' usa tipo desconocido: ' + sp.t);
    if (!(sp.hp > 0) || !(sp.atk > 0)) add('error', 'species-valid', n + ' con hp/atk inválidos');
    if (!Array.isArray(sp.mv) || sp.mv.length < 1) add('error', 'species-valid', n + ' sin movimientos');
    for (const mv of (sp.mv || [])) if (!(mv in moves)) add('error', 'species-valid', n + ' referencia movimiento inexistente: ' + mv);
    if (sp.evo && !(sp.evo in species)) add('error', 'species-valid', n + '.evo referencia especie inexistente: ' + sp.evo);
    if (sp.evo && !(sp.evoLvl > 0)) add('error', 'species-valid', n + ' tiene evo sin evoLvl válido');
    for (const h of (sp.habitats || [])) if (!(h in biomes)) add('error', 'species-valid', n + ' declara hábitat sin bioma: ' + h);
    if (sp.starter) starters++;
  }
  if (starters < 1) add('error', 'starters-exist', 'No hay ninguna especie con starter: true');

  // biome-valid (todo bioma con nombre, pool, en tiles, con rate/niveles sanos)
  for (const [ch, b] of Object.entries(biomes)) {
    if (!b.n) add('error', 'biome-valid', 'bioma ' + ch + ' sin nombre (n)');
    if (!(ch in tiles)) add('error', 'biome-valid', 'bioma ' + ch + ' no está en el registro tiles');
    if (!(b.rate > 0 && b.rate <= 1)) add('error', 'biome-valid', 'bioma ' + ch + ': rate fuera de (0,1]: ' + b.rate);
    if (!(b.base > 0) || !(b.cap >= b.base)) add('error', 'biome-valid', 'bioma ' + ch + ': base/cap inválidos');
    const pool = Object.entries(species).filter(([, sp]) => (sp.habitats || []).includes(ch));
    if (pool.length === 0) add('error', 'biome-valid', 'bioma ' + ch + ' sin ninguna especie salvaje (habitats)');
  }

  // trainer-valid
  for (const [id, t] of Object.entries(trainers)) {
    if (!t.name) add('error', 'trainer-valid', 'entrenador ' + id + ' sin name');
    if (!Array.isArray(t.team) || t.team.length < 1) add('error', 'trainer-valid', 'entrenador ' + id + ' sin equipo');
    for (const m of (t.team || [])) {
      if (!Array.isArray(m) || !(m[0] in species)) add('error', 'trainer-valid', 'entrenador ' + id + ': miembro inválido ' + JSON.stringify(m));
      else if (!(m[1] > 0)) add('error', 'trainer-valid', 'entrenador ' + id + ': nivel inválido para ' + m[0]);
    }
    for (const k of ['balls', 'p', 's', 'c']) if (!t.reward || !(t.reward[k] >= 0)) add('error', 'trainer-valid', 'entrenador ' + id + ': reward.' + k + ' faltante o negativo');
    for (const req of (t.requires || [])) if (!(String(req) in trainers)) add('error', 'trainer-valid', 'entrenador ' + id + ' requiere id inexistente: ' + req);
  }

  // shop-valid / mount-purchasable
  const tileMounts = new Set(Object.values(tiles).map(t => t.mount).filter(Boolean));
  const shopMounts = new Set();
  for (const [k, it] of Object.entries(shop)) {
    if (!it.n || !(it.pr > 0)) add('error', 'shop-valid', 'ítem ' + k + ' sin nombre o precio inválido');
    if (it.mount) shopMounts.add(it.mount);
  }
  for (const m of tileMounts) if (!shopMounts.has(m)) add('error', 'mount-purchasable', 'la montura "' + m + '" la exige un tile pero ninguna tienda la vende');
  for (const m of shopMounts) if (!tileMounts.has(m)) add('warn', 'mount-purchasable', 'la montura "' + m + '" se vende pero ningún tile la usa');

  // material-valid / recipe-valid / material-used
  for (const [k, m] of Object.entries(materials)) {
    if (!m.n || !m.ic) add('error', 'material-valid', 'material ' + k + ' sin n/ic');
    if (!(m.from in types)) add('error', 'material-valid', 'material ' + k + ': from referencia tipo inexistente: ' + m.from);
    if (!(m.rate > 0 && m.rate <= 1)) add('error', 'material-valid', 'material ' + k + ': rate fuera de (0,1]: ' + m.rate);
  }
  const usedMats = new Set();
  for (const [k, cost] of Object.entries(recipes)) {
    if (!(k in shop)) add('error', 'recipe-valid', 'receta ' + k + ' no corresponde a ningún ítem de la tienda');
    else if (shop[k].mount) add('error', 'recipe-valid', 'receta ' + k + ': las monturas no se craftean');
    const entries = Object.entries(cost || {});
    if (entries.length === 0) add('error', 'recipe-valid', 'receta ' + k + ' sin costo');
    for (const [m, q] of entries) {
      if (!(m in materials)) add('error', 'recipe-valid', 'receta ' + k + ' usa material inexistente: ' + m);
      else usedMats.add(m);
      if (!(q > 0)) add('error', 'recipe-valid', 'receta ' + k + ': cantidad inválida de ' + m + ': ' + q);
    }
  }
  for (const [k, b] of Object.entries(d.buildings || {})) {
    if (!b.n || !b.ic) add('error', 'building-valid', 'edificio ' + k + ' sin n/ic');
    if (!(b.pr > 0)) add('error', 'building-valid', 'edificio ' + k + ': precio inválido: ' + b.pr);
    if (!(b.mat in materials)) add('error', 'building-valid', 'edificio ' + k + ' produce material inexistente: ' + b.mat);
    else usedMats.add(b.mat);
    if (!(b.every > 0)) add('error', 'building-valid', 'edificio ' + k + ': every inválido: ' + b.every);
  }
  const exp = d.expeditions || {};
  if (!(exp.duration > 0)) add('error', 'expedition-valid', 'expeditions.duration inválida: ' + exp.duration);
  if (!(exp.rolls > 0)) add('error', 'expedition-valid', 'expeditions.rolls inválido: ' + exp.rolls);
  if (!(exp.matChance > 0 && exp.matChance <= 1)) add('error', 'expedition-valid', 'expeditions.matChance fuera de (0,1]: ' + exp.matChance);
  if (!(exp.coinsPerLvl >= 0)) add('error', 'expedition-valid', 'expeditions.coinsPerLvl faltante o negativo');
  for (const m of Object.keys(materials))
    if (!usedMats.has(m)) add('warn', 'material-used', 'material ' + m + ' no lo usa ninguna receta');

  // tile-valid
  for (const [ch, t] of Object.entries(tiles)) {
    if (!t.bg) add('error', 'tile-valid', 'tile ' + ch + ' sin bg');
    if (t.screen && !SCREENS.has(t.screen)) add('error', 'tile-valid', 'tile ' + ch + ': screen desconocida: ' + t.screen);
    if (t.effect && !EFFECTS.has(t.effect)) add('error', 'tile-valid', 'tile ' + ch + ': effect desconocido: ' + t.effect);
  }

  // zone-valid: rectangular, caracteres conocidos, warps coherentes, E↔warp
  const trainerPlacement = {};
  const isWalkable = (z, x, y) => {
    const ch = (zones[z] && zones[z].map[y] || '')[x];
    if (!ch) return false;
    const t = tiles[ch];
    return !!(trainers[ch] || (t && !t.solid));
  };
  for (const [zid, z] of Object.entries(zones)) {
    const rows = z.map || [];
    if (!z.name) add('error', 'zone-valid', 'zona ' + zid + ' sin name');
    if (rows.length < 1) { add('error', 'zone-valid', 'zona ' + zid + ' sin mapa'); continue; }
    const w = String(rows[0]).length;
    rows.forEach((r, y) => {
      if (String(r).length !== w) add('error', 'zone-valid', 'zona ' + zid + ' fila ' + y + ' con ancho distinto (' + String(r).length + ' vs ' + w + ')');
      for (const ch of String(r)) if (!(ch in tiles) && !(ch in trainers)) add('error', 'zone-valid', 'zona ' + zid + ': carácter sin declarar: "' + ch + '"');
    });
    rows.forEach((r, y) => [...String(r)].forEach((ch, x) => {
      if (ch in trainers) (trainerPlacement[ch] = trainerPlacement[ch] || []).push(zid + '(' + x + ',' + y + ')');
      if (ch === 'E' && !(z.warps || {})[x + ',' + y]) add('error', 'warp-valid', 'zona ' + zid + ': casilla E en (' + x + ',' + y + ') sin warp definido');
    }));
    for (const [coord, target] of Object.entries(z.warps || {})) {
      const [x, y] = coord.split(',').map(Number);
      const ch = (rows[y] || '')[x];
      if (ch !== 'E') add('error', 'warp-valid', 'zona ' + zid + ': warp en (' + coord + ') no cae sobre una casilla E (es "' + ch + '")');
      if (!Array.isArray(target) || target.length !== 3) { add('error', 'warp-valid', 'zona ' + zid + ': warp ' + coord + ' malformado'); continue; }
      const [tz, tx, ty] = target;
      if (!(tz in zones)) add('error', 'warp-valid', 'zona ' + zid + ': warp ' + coord + ' apunta a zona inexistente: ' + tz);
      else if (!isWalkable(tz, tx, ty)) add('error', 'warp-valid', 'zona ' + zid + ': warp ' + coord + ' aterriza en casilla no caminable de ' + tz + ' (' + tx + ',' + ty + ')');
    }
  }

  // trainer-placement: cada entrenador exactamente una vez en el mundo
  for (const id of Object.keys(trainers)) {
    const places = trainerPlacement[id] || [];
    if (places.length === 0) add('error', 'trainer-placement', 'entrenador ' + id + ' (' + trainers[id].name + ') no está en ningún mapa');
    if (places.length > 1) add('warn', 'trainer-placement', 'entrenador ' + id + ' aparece más de una vez: ' + places.join(' '));
  }

  // zone-connectivity: todas las zonas alcanzables desde player.start
  const player = d.player || {};
  const startZone = Array.isArray(player.start) ? player.start[0] : null;
  if (startZone && zones[startZone]) {
    const seen = new Set([startZone]);
    const queue = [startZone];
    while (queue.length) {
      const z = queue.shift();
      for (const t of Object.values(zones[z].warps || {}))
        if (Array.isArray(t) && zones[t[0]] && !seen.has(t[0])) { seen.add(t[0]); queue.push(t[0]); }
    }
    for (const zid of Object.keys(zones)) if (!seen.has(zid)) add('error', 'zone-connectivity', 'zona inalcanzable desde ' + startZone + ': ' + zid);
  }

  // player-valid
  for (const key of ['start', 'respawn']) {
    const p = player[key];
    if (!Array.isArray(p) || p.length !== 3) { add('error', 'player-valid', 'player.' + key + ' debe ser [zona, x, y]'); continue; }
    if (!(p[0] in zones)) add('error', 'player-valid', 'player.' + key + ': zona inexistente: ' + p[0]);
    else if (!isWalkable(p[0], p[1], p[2])) add('error', 'player-valid', 'player.' + key + ' cae en casilla no caminable');
  }
  for (const k of ['balls', 'potions', 'supers']) if (!(player[k] >= 0)) add('error', 'player-valid', 'player.' + k + ' faltante o negativo');

  // storage-valid
  if (!((d.storage || {}).cap > 0)) add('error', 'storage-valid', 'storage.cap faltante o inválido');

  // balance-valid: límites anti contenido roto (criaturas inmortales, movimientos desmedidos, jefes imposibles)
  const bal = d.balance || {};
  for (const k of ['hpMin', 'hpMax', 'atkMin', 'atkMax', 'budgetMax', 'powerMin', 'powerMax', 'scMax', 'lvlMax', 'maxMoves'])
    if (!(bal[k] > 0)) add('error', 'balance-valid', 'balance.' + k + ' faltante o inválido');
  if (bal.hpMax > 0) {
    for (const [n, sp] of Object.entries(species)) {
      if (sp.hp < bal.hpMin || sp.hp > bal.hpMax)
        add('error', 'balance-species', n + ': hp ' + sp.hp + ' fuera de [' + bal.hpMin + ',' + bal.hpMax + ']');
      if (sp.atk < bal.atkMin || sp.atk > bal.atkMax)
        add('error', 'balance-species', n + ': atk ' + sp.atk + ' fuera de [' + bal.atkMin + ',' + bal.atkMax + ']');
      if (sp.hp + 3 * sp.atk > bal.budgetMax)
        add('error', 'balance-species', n + ': presupuesto hp+3×atk = ' + (sp.hp + 3 * sp.atk) + ' supera budgetMax ' + bal.budgetMax);
      if ((sp.mv || []).length > bal.maxMoves)
        add('error', 'balance-species', n + ': más de ' + bal.maxMoves + ' movimientos');
      if (sp.evo && species[sp.evo] && !(species[sp.evo].hp > sp.hp && species[sp.evo].atk >= sp.atk))
        add('warn', 'balance-species', n + ': la evolución ' + sp.evo + ' no mejora los stats');
    }
    for (const [k, m] of Object.entries(moves)) {
      if (m.p < bal.powerMin || m.p > bal.powerMax)
        add('error', 'balance-moves', k + ': potencia ' + m.p + ' fuera de [' + bal.powerMin + ',' + bal.powerMax + ']');
      if (m.sc != null && m.sc > bal.scMax)
        add('error', 'balance-moves', k + ': sc ' + m.sc + ' supera scMax ' + bal.scMax);
    }
    for (const [id, t] of Object.entries(trainers))
      for (const mem of (t.team || []))
        if (Array.isArray(mem) && mem[1] > bal.lvlMax)
          add('error', 'balance-trainers', 'entrenador ' + id + ': ' + mem[0] + ' nv. ' + mem[1] + ' supera lvlMax ' + bal.lvlMax);
  }

  // breeding-valid
  const br = d.breeding || {};
  for (const k of ['eggSteps', 'hatchLvl', 'hpDiv', 'atkDiv'])
    if (!(br[k] > 0)) add('error', 'breeding-valid', 'breeding.' + k + ' faltante o inválido');

  return F;
}

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const { splitFrontMatter, parseYamlSubset } = require('./yaml-min');
  const file = process.argv[2] || path.join(__dirname, '..', 'GAME.md');
  const { fm } = splitFrontMatter(fs.readFileSync(file, 'utf8'));
  if (!fm) { console.error('GAME.md sin front-matter YAML.'); process.exit(2); }
  const findings = lintGame(parseYamlSubset(fm));
  for (const f of findings) console.log(`[${f.level}] ${f.rule}: ${f.msg}`);
  const errors = findings.filter(f => f.level === 'error').length;
  console.log(findings.length === 0 ? 'OK: contrato válido, sin observaciones.' :
    `${errors} error(es), ${findings.length - errors} warning(s).`);
  process.exit(errors > 0 ? 1 : 0);
}

module.exports = { lintGame };
