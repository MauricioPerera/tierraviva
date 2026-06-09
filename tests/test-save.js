// Guardado: roundtrip completo, compatibilidad con códigos viejos, base (depósito/retiro).
const { boot, ok, done, setRand, restoreRand, encodeSave, decodeSave } = require("./helpers");

const A = boot();
const w = A.g, S = A.S;
const inp = { value: "", textContent: "", select() {} };
w.document.getElementById = () => inp;
w.pick("Flarito");

// Roundtrip: todos los campos viajan
S.zone = "bosque"; S.px = 2; S.py = 2;
S.coins = 77; S.mats = { savia: 3 }; S.bld = { draga: true }; S.steps = 41;
S.exp = { c: A.mk("Ratopo", 4), biome: "G", steps: 9 };
S.egg = { sp: "Aquino", mv: ["chorro"], hp: 2, atk: 1, steps: 5 };
S.box = [A.mk("Sombrux", 6)];
S.mounts = { agua: true, montes: false };
S.beaten = { "3": true };
w.saveGame();
const d = decodeSave(inp.value);
for (const [k, v] of Object.entries({ zone: "bosque", coins: 77, steps: 41 }))
  ok(d[k] === v, `save incluye ${k}`);
ok(d.mats.savia === 3 && d.bld.draga === true && d.exp.biome === "G" && d.egg.sp === "Aquino", "save incluye mats/bld/exp/egg");
ok(d.box.length === 1 && d.mounts.agua === true && d.beaten["3"] === true && d.dex.Flarito === true, "save incluye box/mounts/beaten/dex");

// Cargar el mismo código restaura el estado
inp.value = encodeSave(d);
w.loadGame();
ok(S.zone === "bosque" && S.coins === 77 && S.box.length === 1 && S.exp.steps === 9, "load restaura el roundtrip");

// Código viejo (formato pre-zonas): reposiciona y aplica defaults
const oldTeam = [A.mk("Brotin", 6)];
delete oldTeam[0].g;
inp.value = encodeSave({ px: 9, py: 13, team: oldTeam, balls: 5, items: { p: 1, s: 0 }, beaten: {} });
w.loadGame();
ok(S.zone === A.PLAYER.start[0] && S.px === A.PLAYER.start[1], "save viejo reposiciona en el inicio");
ok(["M", "F"].includes(S.team[0].g), "save viejo recibe géneros");
ok(S.coins === 0 && S.box.length === 0 && S.egg === null && S.exp === null, "defaults: coins/box/egg/exp");
ok(S.mounts.agua === false && Object.keys(S.mats).length === 0 && Object.keys(S.bld).length === 0, "defaults: mounts/mats/bld");
ok(S.dex.Brotin === true, "dex reconstruido desde el equipo");

// Sanitización: códigos manipulados no inyectan HTML ni corrompen el estado
const evil = "<img src=x onerror=alert(1)>";
inp.value = encodeSave({
  zone: evil, px: 999, py: -5,
  team: [{ name: evil, lvl: "99", mv: [evil], st: evil, g: evil },
         { name: "Flarito", lvl: 8, hp: 1e9, maxhp: -3, atk: "abc", mv: ["ascuas", evil], st: "burn", g: "F" }],
  box: [{ name: evil }, { name: "Sombrux", lvl: 6 }],
  balls: -10, coins: "1e99", items: { p: evil, s: 9999 },
  mats: { [evil]: 5, savia: 2.7 }, bld: { [evil]: true, draga: true, brasero: "yes" },
  beaten: { [evil]: true, "3": true }, dex: { [evil]: true, Ondino: true },
  mounts: { [evil]: true, agua: true, montes: "si" },
  egg: { sp: evil }, exp: { c: { name: evil }, biome: evil },
});
w.loadGame();
const all = JSON.stringify([S.team, S.box, S.mats, S.bld, S.beaten, S.dex, S.mounts, S.egg, S.exp, S.zone]);
ok(!all.includes("<img"), "ninguna cadena inyectada sobrevive a la carga");
ok(S.team.length === 1 && S.team[0].name === "Flarito", "criatura con especie inexistente se descarta");
ok(S.team[0].hp <= S.team[0].maxhp && S.team[0].maxhp >= 1 && Number.isFinite(S.team[0].atk), "stats acotados y numéricos");
ok(S.team[0].mv.join() === "ascuas" && S.team[0].st === "burn" && S.team[0].g === "F", "moves/estado/género filtrados por contrato");
ok(S.box.length === 1 && S.box[0].name === "Sombrux", "base filtrada");
ok(S.balls === 0 && S.items.p === 0 && S.items.s === 999, "números inválidos a default, válidos acotados");
ok(S.mats.savia === 3 && Object.keys(S.mats).length === 1, "materiales: solo claves del contrato, redondeados");
ok(S.bld.draga === true && Object.keys(S.bld).length === 1, "edificios: solo claves del contrato con true estricto");
ok(S.beaten["3"] === true && Object.keys(S.beaten).length === 1, "beaten filtrado a entrenadores reales");
ok(S.dex.Ondino === true && S.dex.Flarito === true && S.dex.Sombrux === true && !S.dex[evil], "dex filtrado + equipo/base registrados");
ok(S.mounts.agua === true && S.mounts.montes === false && Object.keys(S.mounts).length === 2, "monturas: solo las del contrato, true estricto");
ok(S.egg === null && S.exp === null, "huevo/expedición inválidos se descartan");
ok(S.zone === A.PLAYER.start[0], "zona/posición inválidas vuelven al inicio");

// Código sin ninguna criatura válida → rechazado
inp.value = encodeSave({ team: [{ name: evil }] });
w.loadGame();
ok(inp.value === "Código inválido", "código sin equipo válido se rechaza");

// Base: depositar/retirar con regla de última sana
S.box = [A.mk("Espinor", 7)];
S.team = [A.mk("Flarito", 10), A.mk("Ratopo", 5)];
S.team[1].hp = 0;
w.deposit(0);
ok(S.team.length === 2, "no deposita a la única sana");
w.deposit(1);
ok(S.team.length === 1 && S.box.length === 2, "deposita a la debilitada");
w.withdraw(0);
ok(S.team.length === 2 && S.team[1].name === "Espinor", "retira de la base");
S.team = [A.mk("Flarito", 5), A.mk("Ratopo", 5), A.mk("Gotalia", 5), A.mk("Hojarin", 5)];
const bl = S.box.length;
w.withdraw(0);
ok(S.box.length === bl, "no retira con equipo lleno");

restoreRand();
done();
