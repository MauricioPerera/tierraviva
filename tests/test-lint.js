// Lint: el contrato actual es válido y las reglas rechazan contenido roto
// (criaturas inmortales, movimientos desmedidos, referencias colgantes, jefes imposibles).
const fs = require("fs");
const path = require("path");
const { ok, done } = require("./helpers");
const { lintGame } = require("../tools/game-lint");
const { splitFrontMatter, parseYamlSubset } = require("../tools/yaml-min");

const { fm } = splitFrontMatter(fs.readFileSync(path.join(__dirname, "..", "GAME.md"), "utf8"));
const base = parseYamlSubset(fm);
const clone = () => JSON.parse(JSON.stringify(base));
const errors = d => lintGame(d).filter(f => f.level === "error");
const hasError = (d, rule) => errors(d).some(f => f.rule === rule);

// El contrato real está limpio
ok(errors(base).length === 0, "el contrato actual no tiene errores");

// Criatura inmortal / desmedida
let d = clone();
d.species.Inmortalux = { t: "fuego", hp: 99999, atk: 12, mv: ["ascuas"], habitats: ["G"] };
ok(hasError(d, "balance-species"), "criatura inmortal (hp absurdo) rechazada");

d = clone();
d.species.Golpetux = { t: "normal", hp: 40, atk: 99, mv: ["placaje"], habitats: ["G"] };
ok(hasError(d, "balance-species"), "ataque absurdo rechazado");

// Presupuesto: stats individuales legales pero maximizados a la vez
d = clone();
d.species.Maximux = { t: "agua", hp: 70, atk: 18, mv: ["chorro"], habitats: ["A"] };
ok(hasError(d, "balance-species"), "presupuesto hp+3×atk excedido rechazado");

// Demasiados movimientos
d = clone();
d.species.Pulpux = { t: "agua", hp: 40, atk: 10, mv: ["chorro", "placaje", "mordisco", "aturdir", "esporas"], habitats: ["A"] };
ok(hasError(d, "balance-species"), "más de maxMoves movimientos rechazado");

// Movimiento desmedido / estado garantizado
d = clone();
d.moves.nuclear = { n: "Nuclear", t: "fuego", p: 999 };
ok(hasError(d, "balance-moves"), "potencia fuera de rango rechazada");

d = clone();
d.moves.ascuas.sc = 0.95;
ok(hasError(d, "balance-moves"), "probabilidad de estado casi garantizada rechazada");

// Jefe imposible
d = clone();
d.trainers["4"].team[0][1] = 99;
ok(hasError(d, "balance-trainers"), "entrenador con nivel imposible rechazado");

// Referencias colgantes (lo de siempre, pero verificado)
d = clone();
d.species.Fantasmux = { t: "espectro", hp: 40, atk: 10, mv: ["ascuas"], habitats: ["G"] };
ok(hasError(d, "species-valid"), "tipo inexistente rechazado");

d = clone();
d.species.Brotin.mv = ["golpefantasma"];
ok(hasError(d, "species-valid"), "movimiento inexistente rechazado");

d = clone();
d.species.Llamiza.habitats = ["Z"];
ok(hasError(d, "species-valid"), "hábitat sin bioma rechazado");

d = clone();
d.zones.pueblo.warps["13,4"] = ["narnia", 1, 1];
ok(hasError(d, "warp-valid"), "warp a zona inexistente rechazado");

d = clone();
delete d.zones.monte.warps["0,4"];
ok(hasError(d, "warp-valid") || hasError(d, "zone-connectivity"), "zona desconectada o E sin warp rechazada");

// La evolución que no mejora stats es warning (no bloquea, avisa)
d = clone();
d.species.Flaranto.hp = 30;
ok(lintGame(d).some(f => f.rule === "balance-species" && f.level === "warn"), "evolución que no mejora avisa con warning");

done();
