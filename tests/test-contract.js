// Contrato: paridad generado vs fallback embebido + derivados correctos.
const { boot, sortedJson, ok, done } = require("./helpers");

const A = boot(true), B = boot(false);

// Paridad: cada constante de datos idéntica con y sin game-data.generated.js
const DATA_KEYS = ["TYPES", "EFF", "STATUS", "MOVES", "SPECIES", "DESCS", "ART", "TRAINERS", "SHOP", "TILES",
  "BIOMES", "MATERIALS", "RECIPES", "EXPEDITIONS", "BUILDINGS", "STORAGE", "SFX", "MUSIC",
  "BREED", "PLAYER", "FED", "BAL", "ZONES", "WILD", "EVO", "BASE", "STARTERS", "MOUNT_KEYS"];
for (const key of DATA_KEYS)
  ok(sortedJson(A[key]) === sortedJson(B[key]), `paridad generado/embebido: ${key}`);

// Derivados (no se declaran a mano)
ok(A.STARTERS.length === 3 && A.STARTERS.every(n => A.SPECIES[n].starter), "STARTERS derivado de species");
ok(A.EVO.Flarito[0] === "Flaranto" && A.EVO.Flarito[1] === 12, "EVO derivado de evo/evoLvl");
ok(A.BASE.Flaranto === "Flarito" && A.BASE.Aquantor === "Aquino", "BASE derivado (inversa de EVO)");
ok(Object.keys(A.WILD).sort().join() === Object.keys(A.BIOMES).sort().join(), "WILD cubre exactamente los biomas");
ok(A.WILD.A.includes("Ondino") && A.WILD.G.includes("Gotalia") && A.WILD.A.includes("Gotalia"), "habitats múltiples derivan a varios pools");
ok(A.MOUNT_KEYS.sort().join() === ["agua", "montes"].join(), "MOUNT_KEYS derivado de tiles");
ok(Object.keys(A.SPECIES).every(n => typeof A.DESCS[n] === "string" && A.DESCS[n].length > 0), "toda especie tiene descripción");

// Ambos modos arrancan
A.g.pick("Flarito");
ok(A.S.team.length === 1 && A.S.zone === A.PLAYER.start[0], "arranque en modo generado");
B.g.pick("Aquino");
ok(B.S.team[0].name === "Aquino" && B.S.screen === "map", "arranque en modo fallback");

done();
