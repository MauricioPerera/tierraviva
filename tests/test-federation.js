// Federación: token FED, lint isomorfo (camino del navegador), compatibilidad de equipo y pantalla.
const fs = require("fs");
const path = require("path");
const { boot, sortedJson, ok, done } = require("./helpers");
const { lintGame } = require("../tools/game-lint");
const { splitFrontMatter, parseYamlSubset } = require("../tools/yaml-min");

const root = path.join(__dirname, "..");
const gameMd = fs.readFileSync(path.join(root, "GAME.md"), "utf8");

// 1. Lint isomorfo: cargado como script de navegador expone window.GameLint y valida el contrato real
const g = { window: null };
g.window = g;
new Function("window", "module", fs.readFileSync(path.join(root, "tools", "yaml-min.js"), "utf8"))(g, undefined);
new Function("window", "module", "require", fs.readFileSync(path.join(root, "tools", "game-lint.js"), "utf8"))(g, undefined, undefined);
ok(typeof g.YamlMin?.parseYamlSubset === "function", "yaml-min expone window.YamlMin");
ok(typeof g.GameLint?.lintGame === "function", "game-lint expone window.GameLint (isomorfo)");
const { fm } = g.YamlMin.splitFrontMatter(gameMd);
const parsed = g.YamlMin.parseYamlSubset(fm);
ok(g.GameLint.lintGame(parsed).filter(f => f.level === "error").length === 0, "el contrato real valida en el camino del navegador");

// 2. Reglas de federación
const base = parseYamlSubset(splitFrontMatter(gameMd).fm);
const clone = () => JSON.parse(JSON.stringify(base));
const hasError = d => lintGame(d).some(f => f.level === "error" && f.rule === "federation-valid");
ok(!hasError(base), "federación del contrato actual válida");
let d = clone();
d.federation.worldId = "Mundo Con Espacios!";
ok(hasError(d), "worldId no-slug rechazado");
d = clone();
d.federation.peers = { otro: { n: "Otro mundo", url: "http://inseguro.com/" } };
ok(hasError(d), "peer sin https rechazado");
d = clone();
d.federation.peers = { otro: { url: "https://ok.github.io/x/" } };
ok(hasError(d), "peer sin nombre rechazado");

// 3. Motor: paridad FED y compatibilidad de equipo
const A = boot(true), B = boot(false);
ok(sortedJson(A.FED) === sortedJson(B.FED), "paridad generado/embebido: FED");
const w = A.g, S = A.S;
w.pick("Flarito");
S.box = [A.mk("Sombrux", 6)];
const remote = { Flarito: { t: "fuego" } }; // mundo remoto que solo conoce a Flarito
const c = A.fedCompat(remote);
ok(c.have.join() === "Flarito" && c.missing.join() === "Sombrux", "fedCompat separa criaturas existentes y faltantes");

// 4. Pantalla: abre, renderiza sin red y rechaza URLs inválidas
w.openFed();
ok(S.screen === "fed", "openFed abre la pantalla");
w.document.getElementById = () => ({ value: "no-es-una-url", innerHTML: "", appendChild() {}, select() {} });
w.fedExplore();
ok(!!S.fedErr && !S.fedInfo, "URL inválida produce error sin consultar");
w.fedExplore("https://ejemplo.github.io/fork/");
ok(!!S.fedErr, "sin fetch disponible avisa en vez de romper");
w.closeFed();
ok(S.screen === "map", "closeFed vuelve al mapa");

done();
