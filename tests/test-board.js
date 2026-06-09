// Tablón de la federación: validador del tablón, paridad con el motor y entrada al puesto.
const fs = require("fs");
const path = require("path");
const { boot, ok, done } = require("./helpers");
const { lintTrades, creatureCheck } = require("../tools/trades-lint");
const { splitFrontMatter, parseYamlSubset } = require("../tools/yaml-min");

const root = path.join(__dirname, "..");
const contract = parseYamlSubset(splitFrontMatter(fs.readFileSync(path.join(root, "GAME.md"), "utf8")).fm);
const board = JSON.parse(fs.readFileSync(path.join(root, "trades.json"), "utf8"));
const enc = o => Buffer.from(unescape(encodeURIComponent(JSON.stringify(o))), "binary").toString("base64");
const errs = t => lintTrades(t, contract).filter(f => f.level === "error");

// 1. El tablón real del repo es válido
ok(errs(board).length === 0, "trades.json del repo válido");

// 2. Validador del tablón: rechazos
const A = boot(true);
A.g.pick("Flarito");
const legit = A.mk("Ratopo", 6);
const mkBoard = (offers, world = "terravia-prime") => ({ world, offers });
const offerOf = (c, extra) => ({ code: enc({ k: "offer", id: "abc123", world: "terravia-prime", c, wants: [], ...extra }) });

ok(errs(mkBoard([offerOf(legit)])).length === 0, "oferta legítima publicable");
ok(errs(mkBoard([offerOf(legit)], "otro-mundo")).length > 0, "world del tablón debe coincidir con el contrato");
ok(errs(mkBoard([{ code: "no-base64!!" }])).length > 0, "code corrupto rechazado");
ok(errs(mkBoard([offerOf({ ...legit, maxhp: 99999, hp: 99999 })])).length > 0, "criatura ilegal rechazada en el tablón");
ok(errs(mkBoard([offerOf(legit, { wants: ["NoExiste"] })])).length > 0, "wants con especie inexistente rechazado");
ok(errs(mkBoard([offerOf(legit, { world: "ajeno" })])).length > 0, "oferta de otro mundo no publicable en este tablón");
ok(errs(mkBoard([offerOf(legit), offerOf(legit)])).length > 0, "ids duplicados rechazados");
ok(errs(mkBoard([{ code: offerOf(legit).code, contact: "x".repeat(300) }])).length > 0, "contact desmedido rechazado");

// 3. Paridad de veredictos: creatureCheck (herramienta) vs tradeCheck (motor)
const cases = [
  legit,
  { name: "Inmortalux", lvl: 5, hp: 1, maxhp: 1, atk: 1, mv: ["placaje"] },
  { name: "Ratopo", lvl: 99, hp: 1, maxhp: 50, atk: 10, mv: ["placaje"] },
  { name: "Ratopo", lvl: 5, hp: 1, maxhp: 9999, atk: 10, mv: ["placaje"] },
  { name: "Ratopo", lvl: 5, hp: 1, maxhp: 50, atk: 999, mv: ["placaje"] },
  { name: "Ratopo", lvl: 5, hp: 1, maxhp: 50, atk: 10, mv: ["megapuño"] },
  { name: "Ratopo", lvl: 5, hp: 1, maxhp: 50, atk: 10, mv: ["placaje"], st: "veneno" },
];
let parity = true;
for (const c of cases) {
  const tool = creatureCheck(c, contract.species, contract.moves, contract.status, contract.balance) === null;
  const engine = A.tradeCheck(c) === null;
  if (tool !== engine) { parity = false; console.log("  divergencia:", JSON.stringify(c.name), tool, engine); }
}
ok(parity, "veredictos idénticos entre trades-lint y tradeCheck del motor");

// 4. boardEntry del motor: decodifica/valida contra MI contrato y boardTake lleva al puesto
const goodEntry = { code: enc({ k: "offer", id: "qq9z8x", world: "lejano", c: legit, wants: ["Ondino"] }), contact: "issues de mi fork" };
const badEntry = { code: enc({ k: "offer", id: "qq9z8y", world: "lejano", c: { ...legit, name: "Alienux" }, wants: [] }) };
const e1 = A.boardEntry(goodEntry), e2 = A.boardEntry(badEntry), e3 = A.boardEntry({ code: "%%%" });
ok(e1.d && e1.d.c.name === "Ratopo" && e1.contact === "issues de mi fork", "entrada válida decodificada con contacto");
ok(e2.err && e2.err.includes("Alienux"), "especie desconocida en mi mundo marcada como no disponible");
ok(e3.err === "entrada malformada", "entrada corrupta marcada");
A.S.fedInfo = { name: "Mundo Lejano", url: "https://x/", board: [e1, e2] };
A.g.boardTake(1);
ok(A.S.screen !== "trade" || A.S.trIn !== e2.d, "boardTake ignora entradas con error");
A.g.boardTake(0);
ok(A.S.screen === "trade" && A.S.trIn && A.S.trIn.c.name === "Ratopo", "boardTake abre el puesto con la oferta cargada");
ok(A.S.trMsg.includes("issues de mi fork"), "el contacto para el cierre se muestra");

done();
