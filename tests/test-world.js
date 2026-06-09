// Mundo: warps, monturas, biomas, candado de la campeona, respawn, pantallas por tile.
const { boot, ok, done, setRand, restoreRand } = require("./helpers");

const A = boot();
const w = A.g, S = A.S;
w.pick("Flarito");

// Warp pueblo → ruta1
setRand(0.99); // sin encuentros
S.zone = "pueblo"; S.px = 12; S.py = 4;
w.mv(1, 0);
ok(S.zone === "ruta1" && S.px === 1 && S.py === 4 && S.msg.includes("Ruta 1"), "warp cambia de zona y posiciona");

// Agua: bloqueada sin montura, pasa con ella
S.zone = "lago"; S.px = 2; S.py = 2;
w.mv(1, 0);
ok(S.px === 2 && S.msg.toLowerCase().includes("montura acuática"), "agua bloqueada sin montura");
S.mounts.agua = true;
w.mv(1, 0);
ok(S.px === 3, "montura acuática habilita el agua");

// Rocas: bloqueadas sin montés
S.zone = "monte"; S.px = 7; S.py = 3;
w.mv(1, 0);
ok(S.px === 7 && S.msg.toLowerCase().includes("montés"), "rocas bloqueadas sin montura montés");
S.mounts.montes = true;
w.mv(1, 0);
ok(S.px === 8, "montura montés habilita las rocas");

// Campeona: requires del contrato
S.beaten = {};
w.mv(1, 0); // (9,3) = '4'
ok(S.px === 8 && S.msg.includes("Magna"), "requires bloquea a la campeona");
S.beaten = { "1": true, "2": true, "3": true };
w.mv(1, 0);
ok(S.screen === "battle" && S.battle.trainer.id === "4", "campeona acepta con requires cumplidos");
S.battle = null; S.screen = "map";

// Encuentro por bioma usa el pool derivado
setRand(0.01);
S.zone = "lago"; S.px = 3; S.py = 2;
w.mv(1, 0);
ok(S.screen === "battle" && A.WILD.A.includes(S.battle.enemy.name), "encuentro acuático del pool del bioma");
const lvl = S.battle.enemy.lvl, bio = A.BIOMES.A;
ok(lvl >= bio.base && lvl <= Math.max(bio.cap, S.team[0].lvl + bio.boost), "nivel del encuentro dentro del rango del bioma");
S.battle = null; S.screen = "map";

// Derrota total → respawn del contrato
S.battle = { faint: true, log: [] };
w.endB();
ok(S.zone === A.PLAYER.respawn[0] && S.px === A.PLAYER.respawn[1] && S.py === A.PLAYER.respawn[2], "faint respawnea según player.respawn");

// Tiles con screen abren su pantalla
setRand(0.99);
const screens = { S: "shop", H: "breed", W: "craft", X: "expd", P: "box" };
for (const [ch, scr] of Object.entries(screens)) {
  let found = null;
  for (const [zid, z] of Object.entries(A.ZONES))
    z.map.forEach((r, y) => r.forEach((c, x) => { if (c === ch && !found) found = [zid, x, y]; }));
  ok(!!found, `tile ${ch} existe en el mundo`);
  S.screen = "map"; S.zone = found[0]; S.px = found[1]; S.py = found[2] + 1;
  // buscar vecino caminable para entrar desde ahí
  S.px = found[1]; S.py = found[2] - 1;
  const above = (A.ZONES[found[0]].map[S.py] || [])[S.px];
  if (!above || A.TILES[above]?.solid) { S.py = found[2] + 1; }
  const dy = found[2] - S.py;
  w.mv(0, dy);
  ok(S.screen === scr, `tile ${ch} abre pantalla ${scr}`);
}

restoreRand();
done();
