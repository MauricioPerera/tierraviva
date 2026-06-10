// Contrato: paridad generado vs fallback embebido + derivados correctos.
const { boot, sortedJson, ok, done } = require("./helpers");

const A = boot(true), B = boot(false);

// Paridad: cada constante de datos idéntica con y sin game-data.generated.js
const DATA_KEYS = ["VERSION", "TYPES", "EFF", "STATUS", "MOVES", "SPECIES", "DESCS", "ART", "TRAINERS", "SHOP", "TILES",
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

// Dex: lista compacta con detalle al abrir
A.g.openDex();
A.g.dexOpen("Sombrux"); // no capturada: no abre
ok(A.S.dexSel == null, "dex no abre ficha de especie no capturada");
A.g.dexOpen("Flarito");
ok(A.S.dexSel === "Flarito", "dex abre ficha de capturada");
A.g.dexBack();
ok(A.S.dexSel == null && A.S.screen === "dex", "volver a la lista");
A.g.closeDex();
ok(A.S.screen === "map", "cerrar dex vuelve al mapa");
B.g.pick("Aquino");
ok(B.S.team[0].name === "Aquino" && B.S.screen === "map", "arranque en modo fallback");

done();
