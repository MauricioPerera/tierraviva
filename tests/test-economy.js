// Economía: tienda, crafteo, edificios y expediciones.
const { boot, ok, done, setRand, restoreRand } = require("./helpers");

const A = boot();
const w = A.g, S = A.S;
w.pick("Flarito");

// Tienda: ítems y monturas (compra única)
S.coins = 200;
const balls0 = S.balls;
w.buy("ball");
ok(S.balls === balls0 + 1 && S.coins === 200 - A.SHOP.ball.pr, "compra de esfera descuenta monedas");
w.buy("ma");
ok(S.mounts.agua === true, "compra de montura");
const c1 = S.coins;
w.buy("ma");
ok(S.coins === c1, "montura no se cobra dos veces");
S.coins = 0;
const p0 = S.items.p;
w.buy("p");
ok(S.items.p === p0, "sin monedas no compra");

// Crafteo: consume receta del contrato y entrega
S.mats = { savia: 2, pelaje: 1 };
w.craft("p");
ok(S.items.p === p0 + 1 && S.mats.savia === 0 && S.mats.pelaje === 0, "craft consume materiales y entrega");
const balls1 = S.balls;
w.craft("ball");
ok(S.balls === balls1, "sin materiales no craftea");

// Edificios: compra única + producción cada N pasos
setRand(0.99);
S.coins = A.BUILDINGS.invernadero.pr; S.bld = {}; S.mats = {}; S.steps = 0;
w.buyBld("invernadero");
ok(S.bld.invernadero === true && S.coins === 0, "compra de edificio");
w.buyBld("invernadero");
ok(S.coins === 0, "edificio no se cobra dos veces");
w.buyBld("draga");
ok(!S.bld.draga, "sin monedas no compra edificio");
S.zone = "pueblo"; S.px = 5; S.py = 4;
const every = A.BUILDINGS.invernadero.every;
let dir = 1;
for (let i = 0; i < every * 2; i++) { w.mv(dir, 0); dir = -dir; }
ok((S.mats.savia || 0) === 2, "produce 1 material cada `every` pasos");

// Expediciones: reglas de partida y retorno con recompensas
ok(S.team.length === 1, "precondición: equipo de 1");
S.esel = 0; S.ebio = "G";
w.goExp();
ok(!S.exp, "no parte la última criatura sana");
S.team.push(A.mk("Sombrux", 8));
const explorer = S.team[1];
S.esel = 1; S.ebio = "M";
w.goExp();
ok(S.exp && S.team.length === 1 && S.exp.steps === A.EXPEDITIONS.duration, "expedición parte y deja el equipo");
const coins2 = S.coins, xp0 = explorer.xp, lvl0 = explorer.lvl;
setRand(0.05); // materiales caen; pueblo sin encuentros
dir = 1;
for (let i = 0; i < A.EXPEDITIONS.duration; i++) { w.mv(dir, 0); dir = -dir; }
ok(S.exp === null && S.team.length === 2, "expedicionaria vuelve tras los pasos");
ok(S.coins === coins2 + 8 * A.EXPEDITIONS.coinsPerLvl, "monedas = nivel × coinsPerLvl");
ok(Object.values(S.mats).reduce((a, b) => a + b, 0) >= 2 + A.EXPEDITIONS.rolls, "trajo materiales del bioma");
ok(explorer.xp > xp0 || explorer.lvl > lvl0, "ganó XP de expedición");

// Retorno desborda a la base con equipo lleno
S.team = [A.mk("Flarito", 5), A.mk("Ratopo", 5), A.mk("Gotalia", 5), A.mk("Hojarin", 5)];
S.box = [];
S.exp = { c: A.mk("Espinor", 7), biome: "G", steps: 1 };
setRand(0.99);
w.mv(1, 0);
ok(S.exp === null && S.box.length === 1 && S.box[0].name === "Espinor", "retorno desborda a la base");

restoreRand();
done();
