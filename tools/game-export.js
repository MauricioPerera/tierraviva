#!/usr/bin/env node
/**
 * game-export.js — Genera game-data.generated.js desde GAME.md (perfil tierraviva).
 * Uso:  node tools/game-export.js [GAME.md] [salida.js]
 *       node tools/game-export.js --check     (verifica drift: falla si el generado no coincide)
 * GAME.md es la FUENTE DE VERDAD; el generado se regenera, nunca se edita a mano.
 * El motor deriva EVO/BASE/WILD/STARTERS de SPECIES: acá solo se mapean tokens 1:1.
 */
const fs = require('fs');
const path = require('path');
const { splitFrontMatter, parseYamlSubset } = require('./yaml-min');

function buildGame(d) {
  return {
    TYPES: d.types, EFF: d.effectiveness, STATUS: d.status, MOVES: d.moves,
    SPECIES: d.species, DESCS: d.descriptions, TRAINERS: d.trainers, SHOP: d.shop, TILES: d.tiles,
    BIOMES: d.biomes, MATERIALS: d.materials, RECIPES: d.recipes,
    EXPEDITIONS: d.expeditions, BUILDINGS: d.buildings, STORAGE: d.storage,
    BREED: d.breeding, PLAYER: d.player, ZONES: d.zones
  };
}

if (require.main === module) {
  const args = process.argv.slice(2).filter(a => a !== '--check');
  const check = process.argv.includes('--check');
  const file = args[0] || path.join(__dirname, '..', 'GAME.md');
  const outFile = args[1] || path.join(__dirname, '..', 'game-data.generated.js');

  const { fm } = splitFrontMatter(fs.readFileSync(file, 'utf8'));
  if (!fm) { console.error('GAME.md sin front-matter YAML.'); process.exit(2); }
  const GAME = buildGame(parseYamlSubset(fm));

  const header = '// AUTO-GENERADO por tools/game-export.js desde GAME.md — NO EDITAR A MANO.\n' +
    '// Regenerar con:  node tools/game-export.js\n';
  const out = header + 'window.GAME = ' + JSON.stringify(GAME, null, 2) + ';\n';

  if (check) {
    const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : null;
    if (current === out) { console.log('OK: game-data.generated.js está sincronizado con GAME.md.'); process.exit(0); }
    console.error('DRIFT: game-data.generated.js no coincide con GAME.md. Regenerá con: node tools/game-export.js');
    process.exit(1);
  }

  fs.writeFileSync(outFile, out);
  console.log('Generado ' + path.relative(process.cwd(), outFile) +
    ' (especies:' + Object.keys(GAME.SPECIES).length +
    ' movimientos:' + Object.keys(GAME.MOVES).length +
    ' zonas:' + Object.keys(GAME.ZONES).length +
    ' entrenadores:' + Object.keys(GAME.TRAINERS).length + ')');
}

module.exports = { buildGame };
