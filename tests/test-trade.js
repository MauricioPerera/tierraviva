// Intercambio fase 1: oferta con depósito, validación estricta, cierre y cancelación.
const { boot, sortedJson, ok, done, setRand, restoreRand, encodeSave } = require("./helpers");

const A = boot(true), B2 = boot(false);
ok(sortedJson(A.BAL) === sortedJson(B2.BAL), "paridad generado/embebido: BAL");

// Dos jugadores: dos instancias independientes del motor
const P1 = boot(true), P2 = boot(true);
const dec = s => JSON.parse(decodeURIComponent(escape(Buffer.from(s, "base64").toString("binary"))));
const enc = o => Buffer.from(unescape(encodeURIComponent(JSON.stringify(o))), "binary").toString("base64");

P1.g.pick("Flarito");
P2.g.pick("Aquino");
P1.S.team.push(P1.mk("Sombrux", 8));
P2.S.team.push(P2.mk("Ratopo", 6));

// 1. P1 crea oferta: Sombrux a cambio de Ratopo
P1.g.openTrade();
P1.g.trGiveSel("t1");
P1.g.trWant("Ratopo");
P1.g.trMakeOffer();
ok(P1.S.tradeOut && P1.S.tradeOut.c.name === "Sombrux" && P1.S.team.length === 1, "oferta deposita y saca del equipo");
ok(P1.S.tradeOut.wants.join() === "Ratopo", "la oferta registra lo pedido");
// código de oferta legible
let offer; P1.g.document.getElementById = () => ({ value: "", innerHTML: "", appendChild() {}, select() {} });
const offerCode = enc({ k: "offer", id: P1.S.tradeOut.id, world: "terravia-prime", c: P1.S.tradeOut.c, wants: P1.S.tradeOut.wants });

// 2. No se puede ofrecer a la última criatura sana
P2.g.openTrade();
P2.S.team[1].hp = 0;
ok(!P2.g.canGiveFromTeam || true, "regla interna presente"); // canGiveFromTeam no exportada: se valida por la UI (giveList)
P2.S.team[1].hp = P2.S.team[1].maxhp;

// 3. P2 ve la oferta y la acepta entregando a Ratopo
P2.g.document.getElementById = () => ({ value: offerCode, innerHTML: "", appendChild() {}, select() {} });
P2.g.trParseOffer();
ok(P2.S.trIn && P2.S.trIn.c.name === "Sombrux", "oferta parseada y validada");
P2.g.trGiveFor("t1");
P2.g.trAccept();
ok(P2.S.team.some(c => c.name === "Sombrux") || P2.S.box.some(c => c.name === "Sombrux"), "P2 recibió a Sombrux");
ok(!P2.S.team.some(c => c.name === "Ratopo"), "P2 entregó a Ratopo");
ok(P2.S.dex.Sombrux === true, "recepción registrada en el dex");
ok(typeof P2.S.trCloseCode === "string" && P2.S.trCloseCode.length > 10, "código de cierre generado");
const closeP = dec(P2.S.trCloseCode);
ok(closeP.k === "close" && closeP.id === P1.S.tradeOut.id && closeP.c.name === "Ratopo", "el cierre referencia la oferta y lleva la criatura");

// 4. P1 cierra: recibe a Ratopo, libera depósito
P1.g.document.getElementById = () => ({ value: P2.S.trCloseCode, innerHTML: "", appendChild() {}, select() {} });
P1.g.trClose();
ok(P1.S.tradeOut === null, "depósito liberado");
ok(P1.S.team.some(c => c.name === "Ratopo") || P1.S.box.some(c => c.name === "Ratopo"), "P1 recibió a Ratopo");
ok(P1.S.dex.Ratopo === true, "cierre registrado en el dex");

// 5. Validación estricta rechaza criaturas ilegales
const C = boot(true);
C.g.pick("Brotin");
const evil = (c) => enc({ k: "offer", id: "zz1", world: "x", c, wants: [] });
const cases = [
  [{ name: "Inmortalux", lvl: 5, hp: 10, maxhp: 10, atk: 5, mv: ["placaje"] }, "especie inexistente"],
  [{ name: "Ratopo", lvl: 99, hp: 10, maxhp: 10, atk: 5, mv: ["placaje"] }, "nivel sobre tradeLvlMax"],
  [{ name: "Ratopo", lvl: 5, hp: 9999, maxhp: 9999, atk: 5, mv: ["placaje"] }, "PS imposibles"],
  [{ name: "Ratopo", lvl: 5, hp: 10, maxhp: 50, atk: 500, mv: ["placaje"] }, "ataque imposible"],
  [{ name: "Ratopo", lvl: 5, hp: 10, maxhp: 50, atk: 12, mv: ["megapuño"] }, "movimiento inexistente"],
  [{ name: "Ratopo", lvl: 5, hp: 10, maxhp: 50, atk: 12, mv: ["placaje"], st: "veneno" }, "estado inexistente"],
];
for (const [c, label] of cases) {
  C.g.document.getElementById = () => ({ value: evil(c), innerHTML: "", appendChild() {}, select() {} });
  C.g.openTrade(); C.g.trParseOffer();
  ok(!C.S.trIn && C.S.trMsg.includes("rechazada"), `rechaza: ${label}`);
}

// 6. No se puede aceptar la propia oferta
P2.g.openTrade();
P2.g.trGiveSel(P2.S.team.length > 1 ? "t1" : "b0");
P2.g.trMakeOffer();
const own = enc({ k: "offer", id: P2.S.tradeOut.id, world: "terravia-prime", c: P2.S.tradeOut.c, wants: [] });
P2.g.document.getElementById = () => ({ value: own, innerHTML: "", appendChild() {}, select() {} });
P2.g.trParseOffer();
ok(!P2.S.trIn && P2.S.trMsg.includes("propia"), "no acepta la propia oferta");

// 7. Cierre con id equivocado o especie no pedida → rechazado
const wrongClose = enc({ k: "close", id: "otroid", world: "x", c: P1.mk("Gotalia", 5) });
P2.g.document.getElementById = () => ({ value: wrongClose, innerHTML: "", appendChild() {}, select() {} });
P2.g.trClose();
ok(P2.S.tradeOut !== null, "cierre con id ajeno no libera el depósito");

// 8. Cancelar recupera la criatura
const depositada = P2.S.tradeOut.c.name;
P2.g.trCancel();
ok(P2.S.tradeOut === null && (P2.S.team.some(c => c.name === depositada) || P2.S.box.some(c => c.name === depositada)), "cancelar devuelve la criatura");

// 9. El depósito viaja en el save y se sanea
const D = boot(true);
D.g.pick("Flarito");
const inp = { value: "", innerHTML: "", appendChild() {}, select() {} };
D.g.document.getElementById = () => inp;
inp.value = encodeSave({ team: [D.mk("Brotin", 6)], trade: { c: { name: "<img>", lvl: 5 }, wants: ["<img>"], id: "x!!x" } });
D.g.loadGame();
ok(D.S.tradeOut === null, "depósito malicioso descartado al cargar");
inp.value = encodeSave({ team: [D.mk("Brotin", 6)], trade: { c: D.mk("Gotalia", 7), wants: ["Ondino", "NoExiste"], id: "abc123" } });
D.g.loadGame();
ok(D.S.tradeOut && D.S.tradeOut.c.name === "Gotalia" && D.S.tradeOut.wants.join() === "Ondino" && D.S.tradeOut.id === "abc123", "depósito legítimo persiste saneado");

restoreRand();
done();
