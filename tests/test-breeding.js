// Crianza: géneros, reglas, herencia, eclosión y desborde a la base.
const { boot, ok, done, setRand, restoreRand } = require("./helpers");

const A = boot();
const w = A.g, S = A.S;
w.pick("Flarito");

ok(["M", "F"].includes(S.team[0].g), "criatura nace con género");

// Mismo género no cría
S.team = [A.mk("Flaranto", 14), A.mk("Sombrux", 8)];
S.team[0].g = "M"; S.team[1].g = "M";
S.bsel = [0, 1];
w.doBreed();
ok(!S.egg, "mismo género no genera huevo");

// Distinto género: huevo válido, especie base, herencia
setRand(0.01); // parent = pa (Flaranto)
S.team[0].g = "F";
S.bsel = [0, 1];
w.doBreed();
ok(!!S.egg && S.egg.steps === A.BREED.eggSteps, "huevo con pasos del contrato");
ok(S.egg.sp === "Flarito", "padre evolucionado da cría de especie base");
ok(S.egg.mv.length >= 1 && S.egg.mv.every(m => A.MOVES[m]), "movimientos heredados válidos");
const pa = S.team[0], pb = S.team[1];
ok(S.egg.hp === Math.round((pa.maxhp + pb.maxhp) / A.BREED.hpDiv), "bonus de PS según divisor del contrato");
ok(S.egg.atk === Math.round((pa.atk + pb.atk) / A.BREED.atkDiv), "bonus de ataque según divisor del contrato");

// Un huevo a la vez
const eggRef = S.egg;
S.bsel = [0, 1];
w.doBreed();
ok(S.egg === eggRef, "no permite segundo huevo");
w.closeBreed();

// Eclosión al equipo
setRand(0.99);
S.egg.steps = 1;
S.zone = "pueblo"; S.px = 5; S.py = 4;
w.mv(1, 0);
ok(S.egg === null && S.team.length === 3, "eclosiona al equipo con lugar");
const cria = S.team[2];
ok(cria.name === "Flarito" && cria.lvl === A.BREED.hatchLvl, "cría nv. hatchLvl de especie base");
ok(cria.maxhp > A.mk("Flarito", A.BREED.hatchLvl).maxhp, "cría con bonus de PS aplicado");
ok(S.dex.Flarito === true, "cría registrada en el dex");

// Eclosión desborda a la base con equipo lleno
S.team = [A.mk("Flarito", 5), A.mk("Ratopo", 5), A.mk("Gotalia", 5), A.mk("Hojarin", 5)];
S.box = [];
S.egg = { sp: "Aquino", mv: ["chorro"], hp: 2, atk: 1, steps: 1 };
w.mv(-1, 0);
ok(S.egg === null && S.box.length === 1 && S.box[0].name === "Aquino", "eclosión desborda a la base");
ok(S.msg.includes("base"), "mensaje indica destino base");

restoreRand();
done();
