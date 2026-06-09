// Combate: efectividad, estados (plantilla, parálisis, quemadura), XP/evolución, captura, drops.
const { boot, ok, done, setRand, restoreRand } = require("./helpers");

const A = boot();
const w = A.g, S = A.S;
w.pick("Flarito");

// Estado por plantilla {n} al atacar (ascuas, sc 0.1 → rand 0.01 inflige)
setRand(0.01);
A.startWild(["Hojarin"], 5); // planta: ascuas es súper eficaz y quema
const en = S.battle.enemy;
en.hp = en.maxhp; S.team[0].st = null;
w.atk(0);
ok(en.st === "burn" || en.hp <= 0, "movimiento de fuego inflige quemadura (sc forzada)");
ok(S.battle.log.some(l => l.includes("súper eficaz")), "efectividad x2 anotada en el log");
if (en.hp > 0) ok(S.battle.log.some(l => l.includes(en.name) && l.includes("quemaduras")), "plantilla {n} renderiza el nombre");

// Quemadura descuenta PS por ronda (endRound vía turno enemigo)
if (!S.battle.over) {
  const hpB = en.hp;
  S.team[0].hp = S.team[0].maxhp = 500; // que no muera el jugador
  w.useB("p"); // gasta turno → turno enemigo → tick de quemadura
  ok(en.hp < hpB, "quemadura descuenta PS al final de la ronda");
}
S.battle = null; S.screen = "map";

// Parálisis: con rand bajo pierde el turno
setRand(0.01);
A.startWild(["Ratopo"], 4);
S.team[0].st = "par";
const log0 = S.battle.log.length;
w.atk(0);
ok(S.battle.log.slice(log0).some(l => l.includes("paralizado")), "criatura paralizada pierde el turno (25% forzado)");
S.team[0].st = null; S.battle = null; S.screen = "map";

// Victoria salvaje: monedas por nivel + material por tipo
setRand(0.01);
A.startWild(["Llamiza"], 6); // fuego → ceniza
S.battle.enemy.hp = 1;
const coins0 = S.coins;
w.atk(0);
ok(S.battle.over, "victoria al dejar en 0");
ok(S.coins === coins0 + 6 * 2, "monedas = nivel × 2");
ok((S.mats.ceniza || 0) >= 1, "material según el tipo del rival");
w.endB();

// XP y evolución registran en el dex
const me = A.mk("Flarito", 11);
const fake = { log: [] };
me.xp = 0; me.next = 1;
A.gainXp(me, { lvl: 1 }, fake);
ok(me.lvl >= 12 && me.name === "Flaranto", "evolución al alcanzar evoLvl");
ok(S.dex.Flaranto === true, "evolución registrada en el dex");
ok(fake.log.some(l => l.includes("evolucionó")), "log de evolución");

// Captura: desborda a la base; bloqueada solo con todo lleno
setRand(0.01);
S.team = [A.mk("Flarito", 10), A.mk("Ratopo", 5), A.mk("Gotalia", 5), A.mk("Hojarin", 5)];
S.box = []; S.balls = 5;
A.startWild(["Sombrux"], 6);
S.battle.enemy.hp = 1;
w.capture();
ok(S.box.length === 1 && S.box[0].name === "Sombrux", "captura con equipo lleno va a la base");
ok(S.dex.Sombrux === true, "captura registrada en el dex");
w.endB();
S.box = Array.from({ length: A.STORAGE.cap }, () => A.mk("Ratopo", 2));
A.startWild(["Llamiza"], 4);
const balls0 = S.balls;
w.capture();
ok(S.balls === balls0, "equipo y base llenos: no gasta esfera");
S.battle.over = true; w.endB();

// Duelo: victoria entrega recompensa del contrato (incl. monedas) y marca beaten
setRand(0.5);
S.team = [A.mk("Flaranto", 30)]; S.box = []; S.beaten = {};
A.startTrainer("3"); // Lía: 1 criatura
S.battle.enemy.hp = 1;
const c0 = S.coins, r = A.TRAINERS["3"].reward;
setRand(0.99); // sin drops/estados
w.atk(0);
ok(S.battle.won === true, "duelo ganado");
w.endB();
ok(S.beaten["3"] === true && S.coins === c0 + r.c, "recompensa y beaten persistente");

restoreRand();
done();
