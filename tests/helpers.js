/**
 * helpers.js — Arnés headless compartido por la suite de tests.
 * boot(withGenerated) carga el motor en un sandbox (con o sin game-data.generated.js)
 * y devuelve las constantes del contrato, el estado S y el "window" con las acciones.
 */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const code = fs.readFileSync(path.join(root, "game.js"), "utf8");
const genSrc = fs.readFileSync(path.join(root, "game-data.generated.js"), "utf8");

const EXPORTS = "TYPES,EFF,STATUS,MOVES,SPECIES,DESCS,TRAINERS,SHOP,TILES,BIOMES,MATERIALS,RECIPES," +
  "EXPEDITIONS,BUILDINGS,STORAGE,SFX,MUSIC,BREED,PLAYER,ZONES,WILD,EVO,BASE,STARTERS,MOUNT_KEYS," +
  "S,mk,startWild,startTrainer,gainXp";

function boot(withGenerated = true) {
  const fakeEl = () => ({ innerHTML: "", value: "", textContent: "", appendChild() {}, select() {} });
  const g = {
    document: { getElementById: () => fakeEl(), createElement: () => fakeEl(), addEventListener() {} },
    navigator: {},
    btoa: s => Buffer.from(s, "binary").toString("base64"),
    atob: s => Buffer.from(s, "base64").toString("binary"),
  };
  g.window = g;
  if (withGenerated) new Function("window", genSrc)(g);
  let out;
  new Function("window", "document", "navigator", "btoa", "atob", "__out",
    code + `\n;__out({${EXPORTS}});`)(g, g.document, g.navigator, g.btoa, g.atob, o => out = o);
  return { ...out, g };
}

/** JSON canónico (claves ordenadas) para comparar estructuras sin depender del orden. */
function sortedJson(v) {
  return JSON.stringify(v, (k, val) =>
    val && typeof val === "object" && !Array.isArray(val)
      ? Object.fromEntries(Object.keys(val).sort().map(key => [key, val[key]]))
      : val);
}

/* Mini-arnés de aserciones */
let fails = 0, count = 0;
function ok(cond, name) {
  count++;
  if (!cond) { fails++; console.log("  FAIL:", name); }
  else console.log("  ok:", name);
}
function done() {
  console.log(fails ? `${fails}/${count} FALLOS` : `${count}/${count} OK`);
  process.exit(fails ? 1 : 0);
}

/* RNG determinista: setRand(0.01) fuerza probabilidades; restoreRand() devuelve el real. */
const realRandom = Math.random;
function setRand(v) { Math.random = () => v; }
function restoreRand() { Math.random = realRandom; }

/* Codificación de códigos de guardado (igual que el motor) */
function encodeSave(obj) { return Buffer.from(unescape(encodeURIComponent(JSON.stringify(obj))), "binary").toString("base64"); }
function decodeSave(code) { return JSON.parse(decodeURIComponent(escape(Buffer.from(code, "base64").toString("binary")))); }

module.exports = { boot, sortedJson, ok, done, setRand, restoreRand, encodeSave, decodeSave };
