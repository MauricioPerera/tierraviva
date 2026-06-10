/* ============================================================
   Contrato GAME (Protocolo GAME, perfil tierraviva)
   GAME.md es la fuente de verdad del contenido. game-data.generated.js
   (regenerado con `node tools/game-export.js`) publica window.GAME y el
   motor lo consume acá con fallback embebido: si falta el generado, el
   juego degrada con gracia a este snapshot. La lógica vive en el motor.
   ============================================================ */
const GD=(typeof window!=="undefined"&&window.GAME)||{};
const VERSION=GD.VERSION||1;
const TYPES=GD.TYPES||{fuego:{c:"#D85A30",bg:"#FAECE7",icon:"ti-flame"},agua:{c:"#185FA5",bg:"#E6F1FB",icon:"ti-droplet"},planta:{c:"#3B6D11",bg:"#EAF3DE",icon:"ti-leaf"},normal:{c:"#5F5E5A",bg:"#F1EFE8",icon:"ti-paw"}};
const EFF=GD.EFF||{fuego:{planta:2,agua:.5,fuego:.5},agua:{fuego:2,planta:.5,agua:.5},planta:{agua:2,fuego:.5,planta:.5},normal:{}};
const STATUS=GD.STATUS||{burn:{tag:"QUE",c:"#D85A30",bg:"#FAECE7",hit:"¡{n} sufre quemaduras!"},par:{tag:"PAR",c:"#8A6A1F",bg:"#FBF3D0",hit:"¡{n} quedó paralizado!"}};
const MOVES=GD.MOVES||{ascuas:{n:"Ascuas",t:"fuego",p:40,st:"burn",sc:.1},llamarada:{n:"Llamarada",t:"fuego",p:55,st:"burn",sc:.2},chorro:{n:"Chorro",t:"agua",p:40},maremoto:{n:"Maremoto",t:"agua",p:55},latigo:{n:"Látigo verde",t:"planta",p:40},hojafilo:{n:"Hoja filo",t:"planta",p:55},placaje:{n:"Placaje",t:"normal",p:35},mordisco:{n:"Mordisco",t:"normal",p:45},colmillo:{n:"Colmillo ígneo",t:"fuego",p:50,st:"burn",sc:.3},esporas:{n:"Esporas",t:"planta",p:35,st:"par",sc:.35},aturdir:{n:"Aturdir",t:"normal",p:40,st:"par",sc:.3}};
const SPECIES=GD.SPECIES||{
Flarito:{t:"fuego",hp:44,atk:12,mv:["ascuas","placaje"],evo:"Flaranto",evoLvl:12,starter:true},Aquino:{t:"agua",hp:48,atk:11,mv:["chorro","placaje"],evo:"Aquantor",evoLvl:12,starter:true},Brotin:{t:"planta",hp:50,atk:10,mv:["latigo","placaje"],evo:"Brotalon",evoLvl:12,starter:true},
Flaranto:{t:"fuego",hp:60,atk:16,mv:["llamarada","mordisco"]},Aquantor:{t:"agua",hp:64,atk:15,mv:["maremoto","mordisco"]},Brotalon:{t:"planta",hp:66,atk:14,mv:["hojafilo","mordisco"]},
Ratopo:{t:"normal",hp:36,atk:9,mv:["placaje","mordisco"],habitats:["G"]},Llamiza:{t:"fuego",hp:40,atk:11,mv:["ascuas","placaje"],habitats:["G"]},Gotalia:{t:"agua",hp:42,atk:10,mv:["chorro","mordisco"],habitats:["G","A"]},Hojarin:{t:"planta",hp:44,atk:9,mv:["latigo","placaje"],habitats:["G"]},
Fumarol:{t:"fuego",hp:46,atk:13,mv:["ascuas","mordisco"],habitats:["B"]},Torrentin:{t:"agua",hp:50,atk:13,mv:["chorro","mordisco"],habitats:["B","A"]},Espinor:{t:"planta",hp:52,atk:12,mv:["latigo","mordisco"],habitats:["B"]},Sombrux:{t:"normal",hp:48,atk:14,mv:["mordisco","placaje"],habitats:["B"]},
Magmoz:{t:"fuego",hp:54,atk:15,mv:["colmillo","mordisco"],habitats:["M"]},Cascadon:{t:"agua",hp:58,atk:14,mv:["maremoto","aturdir"],habitats:["M"]},Zarzudo:{t:"planta",hp:60,atk:13,mv:["esporas","hojafilo"],habitats:["M"]},Rocaroz:{t:"normal",hp:62,atk:15,mv:["aturdir","mordisco"],habitats:["M"]},
Ondino:{t:"agua",hp:46,atk:12,mv:["chorro","aturdir"],habitats:["A"]},Coralix:{t:"planta",hp:52,atk:11,mv:["esporas","latigo"],habitats:["A"]}};
const DESCS=GD.DESCS||{
Flarito:"Una chispa con patas. Enciende la punta de su cola cuando se emociona, y la apaga de un soplido para dormir.",
Aquino:"Escupe chorros precisos para cazar insectos. Dicen que nunca falla dos veces seguidas.",
Brotin:"Le brota una hoja nueva cada vez que aprende algo. Los más viejos parecen arbustos caminantes.",
Flaranto:"La evolución templó su llama, y ya no chispea, ruge. Su mordida deja brasas.",
Aquantor:"Genera mareas en miniatura con un giro del cuerpo. Los pescadores lo siguen para encontrar cardúmenes.",
Brotalon:"Sus hojas cortan como navajas y se afilan solas con el rocío del amanecer.",
Ratopo:"Cava túneles cortos por toda la pradera. Si lo perdés de vista, ya está atrás tuyo.",
Llamiza:"Una brasa errante que chamusca el pasto seco donde pisa. Por suerte, pisa poco.",
Gotalia:"Vive entre el pasto húmedo y la orilla del lago. Carga una gota en la frente que nunca se cae.",
Hojarin:"Se disfraza de planta común. La diferencia es que las plantas no estornudan.",
Fumarol:"Exhala humo espeso para esconderse en el bosque oscuro. Se le ve la nariz brillar entre la niebla.",
Torrentin:"Un torrente con mal humor. Embiste a todo lo que se mueva más rápido que él.",
Espinor:"Cada espina de su lomo es un trofeo de combate. A los más viejos casi no les queda lugar libre.",
Sombrux:"Aparece donde la sombra del bosque es más densa. Nadie lo vio llegar, ni irse.",
Magmoz:"Sus colmillos guardan calor de magma. Duerme enterrado en ceniza volcánica.",
Cascadon:"Trepa cascadas a contracorriente para demostrar fuerza. El que llega arriba lidera el cardumen.",
Zarzudo:"Una zarza andante que paraliza con esporas a quien intente podarla.",
Rocaroz:"Un peñasco con carácter. Aturde a sus rivales a cabezazos y jamás retrocede.",
Ondino:"Surfea las olas del lago sin esfuerzo. Su silbido anuncia tormenta.",
Coralix:"Un jardín de coral en miniatura. Sus esporas adormecen hasta al pescador más paciente."};
const ART=GD.ART||{
Flarito:[[0,0,0,0,3,0,0,3,0,0,0,0],[0,0,0,3,3,0,0,3,3,0,0,0],[0,0,0,1,3,1,1,3,1,0,0,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,1,1,5,4,1,1,4,5,1,1,0],[0,1,1,1,1,1,1,1,1,1,1,0],[1,1,2,1,1,4,4,1,1,2,1,1],[1,2,1,1,1,1,1,1,1,1,2,1],[0,1,1,1,2,2,2,2,1,1,1,0],[0,0,1,1,1,1,1,1,1,1,0,0],[0,0,2,1,0,1,1,0,1,2,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]]};
const TRAINERS=GD.TRAINERS||{"1":{name:"Bruno",team:[["Llamiza",7],["Fumarol",9]],reward:{balls:3,p:2,s:0,c:60}},"2":{name:"Sora",team:[["Torrentin",11],["Sombrux",12]],reward:{balls:4,p:0,s:2,c:90}},"3":{name:"Lia",team:[["Hojarin",6]],reward:{balls:2,p:1,s:0,c:35}},"4":{name:"Magna",team:[["Magmoz",14],["Zarzudo",15],["Rocaroz",16]],reward:{balls:5,p:2,s:2,c:250},requires:[1,2,3],champion:true}};
const SHOP=GD.SHOP||{ball:{n:"Esfera",pr:8,ic:"ti-circle-dot"},p:{n:"Poción (+25 PS)",pr:10,ic:"ti-flask"},s:{n:"Superpoción (+60 PS)",pr:25,ic:"ti-flask-2"},ma:{n:"Montura acuática",pr:120,ic:"ti-droplet",mount:"agua",d:"permite cruzar el agua"},mm:{n:"Montura montés",pr:160,ic:"ti-mountain",mount:"montes",d:"permite escalar rocas"}};
const TILES=GD.TILES||{
T:{bg:"#27500A",icon:"ti-tree",ic:"#C0DD97",solid:true},G:{bg:"#C0DD97"},B:{bg:"#639922",icon:"ti-trees",ic:"#EAF3DE"},A:{bg:"#85B7EB",mount:"agua"},
C:{bg:"#F4C0D1",icon:"ti-heart",ic:"#993556",effect:"heal"},M:{bg:"#CBB089",icon:"ti-mountain",ic:"#7A5B3A"},R:{bg:"#9A8F80",icon:"ti-mountain",ic:"#4F463A",mount:"montes"},
S:{bg:"#F2D89B",icon:"ti-building-store",ic:"#8A6A1F",screen:"shop"},H:{bg:"#F7E3C0",icon:"ti-egg",ic:"#A8743B",screen:"breed"},h:{bg:"#D9CBB5",icon:"ti-home",ic:"#6B5337",solid:true},
W:{bg:"#D8C8E8",icon:"ti-tools",ic:"#5E4585",screen:"craft"},X:{bg:"#C8E0D8",icon:"ti-compass",ic:"#2E6E5A",screen:"expd"},P:{bg:"#CFE0F2",icon:"ti-box",ic:"#2C5E8F",screen:"box"},E:{bg:"#EFE3C8",icon:"ti-map-pin",ic:"#7C4A9E"},".":{bg:"#D3D1C7"}};
const BIOMES=GD.BIOMES||{G:{n:"Pastizales",rate:.26,base:3,cap:4,boost:1},B:{n:"Bosque profundo",rate:.3,base:7,cap:9,boost:3},M:{n:"Montaña",rate:.28,base:10,cap:12,boost:3},A:{n:"Aguas del lago",rate:.25,base:8,cap:10,boost:2}};
const MATERIALS=GD.MATERIALS||{ceniza:{n:"Ceniza ígnea",ic:"ti-flame",from:"fuego",rate:.4},perla:{n:"Perla de agua",ic:"ti-droplet",from:"agua",rate:.4},savia:{n:"Savia",ic:"ti-leaf",from:"planta",rate:.4},pelaje:{n:"Pelaje suave",ic:"ti-paw",from:"normal",rate:.4}};
const RECIPES=GD.RECIPES||{p:{savia:2,pelaje:1},s:{perla:2,ceniza:2},ball:{pelaje:2,perla:1}};
const EXPEDITIONS=GD.EXPEDITIONS||{duration:30,coinsPerLvl:1,rolls:3,matChance:.5};
const BUILDINGS=GD.BUILDINGS||{brasero:{n:"Brasero ígneo",ic:"ti-flame",pr:150,mat:"ceniza",every:12},draga:{n:"Draga de perlas",ic:"ti-droplet",pr:150,mat:"perla",every:12},invernadero:{n:"Invernadero",ic:"ti-leaf",pr:150,mat:"savia",every:12},esquiladora:{n:"Esquiladora",ic:"ti-paw",pr:150,mat:"pelaje",every:12}};
const STORAGE=GD.STORAGE||{cap:24};
const SFX=GD.SFX||{encounter:{freq:392,dur:.12},hit:{freq:220,dur:.08,type:"sawtooth"},super:{freq:660,dur:.1},faint:{freq:110,dur:.4,type:"triangle"},capture:{freq:523,dur:.12,freq2:784},escape:{freq:330,dur:.15,type:"sawtooth"},levelup:{freq:587,dur:.1,freq2:880},evolve:{freq:523,dur:.15,freq2:1047},heal:{freq:698,dur:.15,type:"sine"},buy:{freq:784,dur:.07},hatch:{freq:659,dur:.12,freq2:988},win:{freq:523,dur:.12,freq2:1047},warp:{freq:494,dur:.1,type:"sine"}};
const MUSIC=GD.MUSIC||{map:{tempo:104,wave:"triangle",vol:.025,loop:true,notes:[60,0,64,0,67,0,64,0,69,0,67,0,64,62,60,0,62,0,65,0,69,0,65,0,67,0,64,0,62,0,60,0]},battle:{tempo:148,wave:"square",vol:.02,loop:true,notes:[57,57,0,60,57,0,62,63,62,60,57,0,55,0,57,0]}};
const BREED=GD.BREED||{eggSteps:24,hatchLvl:5,hpDiv:40,atkDiv:20};
const PLAYER=GD.PLAYER||{start:["pueblo",6,4],respawn:["pueblo",3,3],balls:8,potions:3,supers:1};
const FED=GD.FED||{worldId:"terravia-prime",directory:"https://mauricioperera.github.io/tierraviva/worlds.json",peers:{}};
const BAL=GD.BAL||{hpMin:30,hpMax:70,atkMin:8,atkMax:18,budgetMax:110,powerMin:30,powerMax:60,scMax:0.4,lvlMax:20,maxMoves:4,tradeLvlMax:20};
const ZONES=GD.ZONES||{
pueblo:{name:"Pueblo Brote",map:["TTTTTTTTTTTTTT","T....h..h....T","T..P.........T","T..C......H..T","T............E","T.h.......h..T","T.....X......T","TTTTTTTTTTTTTT"],warps:{"13,4":["ruta1",1,4]}},
ruta1:{name:"Ruta 1",map:["TTTTTTTTTTTTTT","TGGGG....GGGGT","TGGGG.3..GGGGT","T....GG......T","E..GGGGGG....E","TGGG....GGGGGT","TGGGGG..GGGGGT","TTTTTTTTTTTTTT"],warps:{"0,4":["pueblo",12,4],"13,4":["ciudad",1,4]}},
ciudad:{name:"Ciudad Terral",map:["TTTTTTETTTTTTT","T............T","T..h..C..h.W.T","T............T","E.....S......T","T....1...h...T","T............E","TTTTTTTTTTTTTT"],warps:{"6,0":["bosque",6,5],"0,4":["ruta1",12,4],"13,6":["lago",1,2]}},
bosque:{name:"Bosque Umbrío",map:["TTTTTTTTTTTTTT","TBBBB..BBBBBBT","TBBBB....2BBBT","TB..BB..BB..BT","TBBB......BBBT","TBB..BBBB..BBT","TTTTTTETTTTTTT"],warps:{"6,6":["ciudad",6,1]}},
lago:{name:"Lago Azur",map:["TTTTTTTTTTTTTT","T....AAAAA...T","E..AAAAAAAA..T","T.AAAA..AAAA.T","T.AAAA..AAAA.T","T..AAAAAAAA..T","T....AAAA....E","TTTTTTTTTTTTTT"],warps:{"0,2":["ciudad",12,6],"13,6":["monte",1,4]}},
monte:{name:"Monte Magna",map:["TTTTTTTTTTTTTT","TMMMM.MMMMMMMT","TM.MMMM.RRR.MT","TM.MM.M.R4R.MT","EMM.MMM.RRR.MT","TMMMM.MMMM..MT","TM..MMMM..MMMT","TTTTTTTTTTTTTT"],warps:{"0,4":["lago",12,6]}}};
Object.values(ZONES).forEach(z=>{if(typeof z.map[0]==="string")z.map=z.map.map(r=>r.split(""))});

/* ============================================================
   Derivados del contrato (no se declaran a mano)
   ============================================================ */
const STARTERS=Object.keys(SPECIES).filter(n=>SPECIES[n].starter);
const EVO={};Object.entries(SPECIES).forEach(([n,sp])=>{if(sp.evo)EVO[n]=[sp.evo,sp.evoLvl]});
const BASE=Object.fromEntries(Object.entries(EVO).map(([a,v])=>[v[0],a]));
const WILD={};Object.entries(SPECIES).forEach(([n,sp])=>(sp.habitats||[]).forEach(h=>(WILD[h]=WILD[h]||[]).push(n)));
const MOUNT_KEYS=[...new Set(Object.values(TILES).map(t=>t.mount).filter(Boolean))];

/* ============================================================
   Estado global
   ============================================================ */
let S={screen:"start",zone:PLAYER.start[0],px:PLAYER.start[1],py:PLAYER.start[2],team:[],box:[],balls:PLAYER.balls,items:{p:PLAYER.potions,s:PLAYER.supers},coins:0,mats:{},bld:{},steps:0,exp:null,beaten:{},dex:{},egg:null,mounts:Object.fromEntries(MOUNT_KEYS.map(k=>[k,false])),snd:true,tradeOut:null,msg:"",battle:null};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
function reg(name){S.dex[name]=true}
function mk(name,lvl){const sp=SPECIES[name];const hp=Math.round(sp.hp+lvl*3.5);return{name,lvl,t:sp.t,maxhp:hp,hp,atk:sp.atk+lvl*2,xp:0,next:lvl*20,mv:[...sp.mv],st:null,g:Math.random()<.5?"M":"F"}}

/* ============================================================
   Audio (Web Audio API, sintetizado: sin assets externos)
   ============================================================ */
let AC=null,musTimer=null,musKey=null,musStep=0;
const NOTE=n=>440*Math.pow(2,(n-69)/12);
function audioOk(){return!!(typeof window!=="undefined"&&(window.AudioContext||window.webkitAudioContext))}
function beep(freq,dur,type,vol,delay){if(!S.snd||!audioOk())return;
try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();
const t=AC.currentTime+(delay||0);
const o=AC.createOscillator(),g=AC.createGain();
o.type=type||"square";o.frequency.value=freq;
g.gain.setValueAtTime(vol||.04,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+dur)}catch(e){}}
function sfx(k){const s=SFX[k];if(!s)return;beep(s.freq,s.dur,s.type);if(s.freq2)beep(s.freq2,s.dur,s.type,.04,s.dur)}
function stopMusic(){if(musTimer){clearInterval(musTimer);musTimer=null}musKey=null}
function updateMusic(){const want=S.screen==="battle"?"battle":S.screen==="start"?null:"map";
if(!S.snd||!want||!audioOk()){stopMusic();return}
if(musKey===want)return;
stopMusic();const m=MUSIC[want];if(!m)return;
musKey=want;musStep=0;const stepMs=60000/m.tempo/2;
musTimer=setInterval(()=>{const n=m.notes[musStep];
if(n>0)beep(NOTE(n),stepMs/1000*.85,m.wave,m.vol);
musStep++;
if(musStep>=m.notes.length){if(m.loop)musStep=0;else stopMusic()}},stepMs)}
window.toggleSnd=()=>{S.snd=!S.snd;if(!S.snd)stopMusic();render()};

/* ============================================================
   Helpers de UI
   ============================================================ */
function el(h){const d=document.createElement("div");d.innerHTML=h;return d}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
const G=document.getElementById("game");
function badge(t){const T=TYPES[t];return `<span style="font-size:12px;padding:2px 10px;border-radius:10px;background:${T.bg};color:${T.c}"><i class="ti ${T.icon}" aria-hidden="true" style="font-size:12px"></i> ${t}</span>`}
function stTag(c){if(!c.st)return"";const s=STATUS[c.st];return ` <span style="font-size:11px;font-weight:600;padding:1px 7px;border-radius:8px;background:${s.bg};color:${s.c}">${s.tag}</span>`}
function gSym(c){if(!c.g)return"";return ` <span style="color:${c.g==="M"?"#185FA5":"#C2417A"};font-weight:600" aria-label="${c.g==="M"?"macho":"hembra"}">${c.g==="M"?"♂":"♀"}</span>`}
function hpbar(c){const pct=Math.max(0,Math.round(c.hp/c.maxhp*100));const col=pct>50?"#639922":pct>20?"#EF9F27":"#E24B4A";
return `<div style="display:flex;align-items:center;gap:8px"><div class="hpbar"><div class="hpfill${pct<=20?" crit":""}" style="width:${pct}%;background:${col}"></div></div><span style="font-size:12px;color:var(--color-text-secondary);min-width:64px;text-align:right">${Math.max(0,c.hp)}/${c.maxhp} PS</span></div>`}
/* Pixel art procedural: silueta determinista por especie (hash del nombre),
   simetría especular, paleta del tipo. Sin archivos de imagen. */
const PIX={};
function pixURL(name,t){const key=name+"|"+t;if(key in PIX)return PIX[key];
let url=null;
try{const cv=document.createElement("canvas");
if(cv&&typeof cv.getContext==="function"){
const N=12,H=6;cv.width=N;cv.height=N;const ctx=cv.getContext("2d");
if(ctx){
let h=5381;for(const ch of key)h=(h*33+ch.charCodeAt(0))>>>0;
let s=h||1;const rnd=()=>{s|=0;s=(s+0x6D2B79F5)|0;let x=Math.imul(s^s>>>15,1|s);x=(x+Math.imul(x^x>>>7,61|x))^x;return((x^x>>>14)>>>0)/4294967296};
const T=TYPES[t]||TYPES.normal;
const rgb=hex=>[parseInt(hex.slice(1,3),16),parseInt(hex.slice(3,5),16),parseInt(hex.slice(5,7),16)];
const css=a=>`rgb(${a.map(Math.round).join(",")})`;
const base=rgb(T.c);
const body=css(base),shade=css(base.map(v=>v*.62)),lite=css(base.map(v=>v+(255-v)*.45));
const art=ART[name];
if(art){
// retrato dibujado en el contrato: paleta semántica 0..5 según el tipo
const pal={1:body,2:shade,3:lite,4:"#1a1a18",5:"#ffffff"};
for(let y=0;y<N;y++)for(let x=0;x<N;x++){const v=(art[y]||[])[x];if(!v)continue;
ctx.fillStyle=pal[v]||body;ctx.fillRect(x,y,1,1)}}
else{
// silueta procedural: mitad izquierda con probabilidad según distancia al centro + columna espinal
const grid=[];
for(let y=0;y<N;y++){grid[y]=[];
for(let x=0;x<H;x++){
const dx=(H-1-x)/H,dy=(y-N/2+.5)/(N/2);
const p=Math.max(0,.95-Math.sqrt(dx*dx+dy*dy*1.15));
grid[y][x]=rnd()<p*1.25?(rnd()<.3?2:1):0}}
for(let y=2;y<N-2;y++)grid[y][H-1]=grid[y][H-1]||1;
const ey=4;grid[ey][H-2]=1;
for(let y=0;y<N;y++)for(let x=0;x<H;x++){const v=grid[y][x];if(!v)continue;
ctx.fillStyle=v===2?shade:(y<3?lite:body);
ctx.fillRect(x,y,1,1);ctx.fillRect(N-1-x,y,1,1)}
ctx.fillStyle="#1a1a18";ctx.fillRect(H-2,ey,1,1);ctx.fillRect(N-H+1,ey,1,1)}
url=cv.toDataURL()}}}catch(e){url=null}
PIX[key]=url;return url}
function sprite(c,size){const T=TYPES[c.t];
const url=c.name?pixURL(c.name,c.t):null;
if(url)return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${T.bg};display:flex;align-items:center;justify-content:center;flex:none"><img src="${url}" alt="" width="${size}" height="${size}" style="image-rendering:pixelated;width:86%;height:86%;display:block"></div>`;
return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${T.bg};border:2px solid ${T.c};display:flex;align-items:center;justify-content:center;flex:none"><i class="ti ${T.icon}" aria-hidden="true" style="font-size:${Math.round(size*.5)}px;color:${T.c}"></i></div>`}
function render(){G.innerHTML="";if(S.screen==="start")rStart();else if(S.screen==="map")rMap();else if(S.screen==="shop")rShop();else if(S.screen==="dex")rDex();else if(S.screen==="breed")rBreed();else if(S.screen==="craft")rCraft();else if(S.screen==="expd")rExp();else if(S.screen==="box")rBox();else if(S.screen==="fed")rFed();else if(S.screen==="trade")rTrade();else rBattle();
if(render.last!==S.screen&&G.firstChild&&G.firstChild.classList)G.firstChild.classList.add("fade");
render.last=S.screen;updateMusic()}

/* ============================================================
   Pantalla: inicio
   ============================================================ */
function rStart(){G.appendChild(el(`<p style="font-size:14px;color:var(--color-text-secondary);margin:0 0 1rem">Bienvenido a Terravia. Elegí tu criatura inicial:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px">${STARTERS.map(n=>{const sp=SPECIES[n];
return `<div class="card" style="text-align:center;cursor:pointer" onclick="pick('${n}')">
<div style="display:flex;justify-content:center;margin-bottom:10px">${sprite({name:n,t:sp.t},56)}</div>
<p style="font-weight:500;margin:0 0 6px">${n}${EVO[n]?` → ${EVO[n][0]} (nv. ${EVO[n][1]})`:""}</p>${badge(sp.t)}
<p style="font-size:12px;color:var(--color-text-secondary);margin:8px 0 0">PS ${sp.hp} · Ataque ${sp.atk}</p>
<p style="font-size:12px;color:var(--color-text-tertiary);margin:6px 0 0;line-height:1.5">${DESCS[n]||""}</p>
<button style="margin-top:10px;width:100%">Elegir</button></div>`}).join("")}</div>
<div style="margin-top:1.5rem"><p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">${hashSave()?"Llegaste desde otro mundo de la federación con tu equipo. Tocá Cargar:":"¿Tenés una partida guardada? Pegá el código acá:"}</p>
<div class="row"><input id="loadcode" placeholder="Código de guardado" value="${esc(hashSave())}" style="flex:1"/><button onclick="loadGame()">Cargar</button></div></div>`))}
function hashSave(){if(typeof location==="undefined"||!location.hash.startsWith("#save="))return"";
try{return decodeURIComponent(location.hash.slice(6))}catch(e){return""}}
window.pick=n=>{S.team=[mk(n,5)];reg(n);S.screen="map";S.msg=`¡${n} se unió! Salí de ${ZONES[S.zone].name} por el este hacia la Ruta 1. Cuidado con los entrenadores.`;render()};

/* ============================================================
   Pantalla: mapa
   ============================================================ */
function tileInfo(ch){
if(TRAINERS[ch]){if(S.beaten[ch])return{bg:"#D3D1C7"};
return TRAINERS[ch].champion?{bg:"#E8DFC8",icon:"ti-crown",ic:"#B0892B"}:{bg:"#D3D1C7",icon:"ti-user-exclamation",ic:"#534AB7"}}
return TILES[ch]||{bg:"#D3D1C7"}}
function rMap(){const Z=ZONES[S.zone];
let grid=`<p style="margin:0 0 6px;font-size:14px;font-weight:500"><i class="ti ti-map-pin" aria-hidden="true"></i> ${Z.name}</p>
<div style="display:grid;grid-template-columns:repeat(${Z.map[0].length},1fr);gap:2px;background:var(--color-background-secondary);padding:6px;border-radius:var(--border-radius-md)">`;
Z.map.forEach((row,y)=>row.forEach((ch,x)=>{const t=tileInfo(ch);const here=x===S.px&&y===S.py;
const inner=here?`<span class="pc"><i class="ti ti-user" aria-hidden="true" style="font-size:13px;color:#26215C"></i></span>`:t.icon?`<i class="ti ${t.icon}" aria-hidden="true" style="font-size:11px;color:${t.ic}"></i>`:"";
const v="GBMT".includes(ch)&&!here?`;filter:brightness(${(.975+((x*7+y*13)%3)*.025).toFixed(3)})`:"";
grid+=`<div class="tile" data-t="${ch}" style="background-color:${here?"#CECBF6":t.bg}${v}">${inner}</div>`}));grid+="</div>";
G.appendChild(el(`${grid}
<div style="display:flex;gap:1.5rem;align-items:flex-start;margin-top:1rem;flex-wrap:wrap">
<div style="display:grid;grid-template-columns:repeat(3,44px);gap:4px">
<span></span><button class="btn-mv" aria-label="Arriba" onclick="mv(0,-1)"><i class="ti ti-arrow-up"></i></button><span></span>
<button class="btn-mv" aria-label="Izquierda" onclick="mv(-1,0)"><i class="ti ti-arrow-left"></i></button>
<button class="btn-mv" aria-label="Abajo" onclick="mv(0,1)"><i class="ti ti-arrow-down"></i></button>
<button class="btn-mv" aria-label="Derecha" onclick="mv(1,0)"><i class="ti ti-arrow-right"></i></button></div>
<div style="flex:1;min-width:240px">
${S.team.map((c,i)=>`<div class="row" style="margin-bottom:8px">${sprite(c,32)}<div style="flex:1"><p style="margin:0;font-size:13px;font-weight:500">${c.name}${gSym(c)}${stTag(c)} <span style="color:var(--color-text-secondary);font-weight:400">nv. ${c.lvl} · XP ${c.xp}/${c.next}</span></p>${hpbar(c)}</div>
${i>0?`<button style="padding:4px 8px;font-size:12px" onclick="lead(${i})" aria-label="Poner primero">↑ líder</button>`:""}
<button style="padding:4px 8px;font-size:12px" onclick="potion(${i},'p')" ${S.items.p<1||c.hp>=c.maxhp?"disabled":""}>+25</button></div>`).join("")}
<p style="font-size:13px;color:var(--color-text-secondary);margin:6px 0 0"><i class="ti ti-circle-dot" aria-hidden="true"></i> Esferas ${S.balls} · <i class="ti ti-flask" aria-hidden="true"></i> Pociones ${S.items.p} · Superpociones ${S.items.s} · <i class="ti ti-coin" aria-hidden="true"></i> Monedas ${S.coins}${Object.values(S.mats).some(v=>v>0)?` · <i class="ti ti-tools" aria-hidden="true"></i> Materiales ${Object.values(S.mats).reduce((a,b)=>a+b,0)}`:""}${S.mounts.agua?` · <i class="ti ti-droplet" aria-hidden="true"></i> Mont. acuática`:""}${S.mounts.montes?` · <i class="ti ti-mountain" aria-hidden="true"></i> Mont. montés`:""}${S.egg?` · <i class="ti ti-egg" aria-hidden="true"></i> Huevo de ${S.egg.sp}: ${S.egg.steps} pasos`:""}${S.exp?` · <i class="ti ti-compass" aria-hidden="true"></i> ${S.exp.c.name} en ${BIOMES[S.exp.biome].n}: ${S.exp.steps} pasos`:""}${S.box.length?` · <i class="ti ti-box" aria-hidden="true"></i> Base ${S.box.length}/${STORAGE.cap}`:""}</p>
</div></div>
<p style="font-size:14px;margin-top:.75rem;min-height:20px" id="msg">${S.msg||""}</p>
<p style="font-size:12px;color:var(--color-text-tertiary);margin:0 0 8px">Flechas o botones para moverte. Las casillas violetas con pin son salidas hacia otras zonas. Corazón: curación. Huevo: criadero. Herramientas: taller. Brújula: expediciones. Caja: base de criaturas. El agua y las rocas requieren montura (se venden en la tienda de Ciudad Terral).</p>
<div class="row" style="flex-wrap:wrap"><button onclick="toggleSnd()" aria-label="${S.snd?"Silenciar":"Activar sonido"}"><i class="ti ${S.snd?"ti-volume":"ti-volume-off"}" aria-hidden="true"></i></button><button onclick="openDex()"><i class="ti ti-list-details" aria-hidden="true"></i> Criaturas ${Object.keys(S.dex).length}/${Object.keys(SPECIES).length}</button><button onclick="openFed()"><i class="ti ti-world" aria-hidden="true"></i> Federación</button><button onclick="saveGame()"><i class="ti ti-download" aria-hidden="true"></i> Guardar partida</button><input id="savecode" readonly placeholder="El código aparece acá" style="flex:1;min-width:180px;font-size:12px"/></div>`))}
window.lead=i=>{const c=S.team.splice(i,1)[0];S.team.unshift(c);S.msg=`${c.name} ahora lidera el equipo.`;render()};
window.potion=(i,k)=>{if(S.items[k]<1)return;S.items[k]--;const c=S.team[i];c.hp=Math.min(c.maxhp,c.hp+(k==="p"?25:60));S.msg=`${c.name} recuperó PS.`;sfx("heal");render()};
window.mv=(dx,dy)=>{if(S.screen!=="map")return;const Z=ZONES[S.zone];const nx=S.px+dx,ny=S.py+dy;const ch=(Z.map[ny]||[])[nx];if(!ch)return;
const ti=TILES[ch]||{};const tr=TRAINERS[ch];
if(!tr&&ti.solid)return;
if(ti.mount&&!S.mounts[ti.mount]){const it=Object.values(SHOP).find(s=>s.mount===ti.mount);
S.msg=`No podés pasar: necesitás la ${it?it.n.toLowerCase():"montura adecuada"} (se vende en la tienda de Ciudad Terral).`;render();return}
if(tr&&!S.beaten[ch]&&(tr.requires||[]).some(id=>!S.beaten[id])){S.msg=`${tr.name} solo acepta retadores que hayan vencido a los demás entrenadores.`;render();return}
S.px=nx;S.py=ny;S.msg="";
S.steps++;
Object.keys(S.bld).forEach(k=>{const bd=BUILDINGS[k];if(S.bld[k]&&bd&&S.steps%bd.every===0)S.mats[bd.mat]=(S.mats[bd.mat]||0)+1});
const room=()=>S.team.length<4||S.box.length<STORAGE.cap;
if(S.egg&&S.egg.steps>0){S.egg.steps--;
if(S.egg.steps<=0){if(room())hatchEgg();else S.msg="El huevo está por eclosionar, pero el equipo y la base están llenos."}}
else if(S.egg&&S.egg.steps<=0&&room())hatchEgg();
if(S.exp){if(S.exp.steps>0)S.exp.steps--;
if(S.exp.steps<=0){if(room())endExpedition();else S.msg=`${S.exp.c.name} volvió de su expedición, pero el equipo y la base están llenos.`}}
const w=Z.warps[nx+","+ny];
if(w){S.zone=w[0];S.px=w[1];S.py=w[2];S.msg=`Llegaste a ${ZONES[w[0]].name}.`;sfx("warp");render();return}
if(ti.effect==="heal"){S.team.forEach(c=>{c.hp=c.maxhp;c.st=null});S.msg="El centro de curación restauró a tu equipo.";sfx("heal")}
else if(ti.screen==="shop"){S.screen="shop";render();return}
else if(ti.screen==="breed"){S.bsel=[];S.screen="breed";render();return}
else if(ti.screen==="craft"){S.screen="craft";render();return}
else if(ti.screen==="expd"){S.esel=null;S.ebio=null;S.screen="expd";render();return}
else if(ti.screen==="box"){S.screen="box";render();return}
else if(tr&&!S.beaten[ch]){startTrainer(ch);return}
else{const bio=BIOMES[ch];
if(bio&&Math.random()<bio.rate)startWild(WILD[ch],R(bio.base,Math.max(bio.cap,S.team[0].lvl+bio.boost)))}
render()};
document.addEventListener("keydown",e=>{const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(m&&S.screen==="map"){e.preventDefault();mv(m[0],m[1])}});

/* ============================================================
   Pantalla: criadero (crianza y huevos)
   ============================================================ */
function rBreed(){const sel=S.bsel||[];
const can=sel.length===2&&S.team[sel[0]].g!==S.team[sel[1]].g&&!S.egg;
let why="";
if(S.egg)why=`Ya hay un huevo de ${S.egg.sp} incubándose (${S.egg.steps} pasos). Solo puede haber uno a la vez.`;
else if(S.team.length<2)why="Necesitás al menos 2 criaturas en el equipo.";
else if(sel.length<2)why="Elegí dos criaturas progenitoras.";
else if(S.team[sel[0]].g===S.team[sel[1]].g)why="Deben ser de distinto género.";
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-egg" aria-hidden="true"></i> Criadero de Terravia</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px">Elegí dos criaturas de distinto género. Dejarán un huevo que eclosiona tras ${BREED.eggSteps} pasos: la cría hereda la especie (base) de uno de los padres, un movimiento de cada uno y un bonus de stats según los suyos.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px">
${S.team.map((c,i)=>`<button class="mvbtn" onclick="breedSel(${i})" style="${sel.includes(i)?"outline:2px solid var(--color-text-primary);":""}">
<span style="font-weight:500">${c.name}${gSym(c)}</span><br>
<span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · PS ${c.maxhp} · Ataque ${c.atk}<br>${c.mv.map(m=>MOVES[m].n).join(" · ")}</span></button>`).join("")}
</div>
<p style="font-size:13px;margin:10px 0;min-height:18px;color:var(--color-text-secondary)">${why}</p>
<div class="row"><button onclick="doBreed()" ${can?"":"disabled"}><i class="ti ti-heart" aria-hidden="true"></i> Criar</button>
<button onclick="closeBreed()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver al mapa</button></div></div>`))}
window.breedSel=i=>{const sel=S.bsel||(S.bsel=[]);const k=sel.indexOf(i);
if(k>=0)sel.splice(k,1);else{sel.push(i);if(sel.length>2)sel.shift()}render()};
window.doBreed=()=>{const sel=S.bsel;if(!sel||sel.length!==2||S.egg)return;
const pa=S.team[sel[0]],pb=S.team[sel[1]];if(pa.g===pb.g)return;
const parent=Math.random()<.5?pa:pb;const sp=BASE[parent.name]||parent.name;
let m1=pa.mv[R(0,pa.mv.length-1)],m2=pb.mv[R(0,pb.mv.length-1)];
if(m2===m1){const alt=[...new Set([...pa.mv,...pb.mv,...SPECIES[sp].mv])].filter(m=>m!==m1);if(alt.length)m2=alt[R(0,alt.length-1)]}
S.egg={sp,mv:m2===m1?[m1]:[m1,m2],hp:Math.round((pa.maxhp+pb.maxhp)/BREED.hpDiv),atk:Math.round((pa.atk+pb.atk)/BREED.atkDiv),steps:BREED.eggSteps};
S.bsel=[];render()};
window.closeBreed=()=>{S.bsel=[];S.screen="map";render()};
function stash(c){if(S.team.length<4){S.team.push(c);return"equipo"}S.box.push(c);return"base"}
function hatchEgg(){const e=S.egg;const c=mk(e.sp,BREED.hatchLvl);c.maxhp+=e.hp;c.hp=c.maxhp;c.atk+=e.atk;c.mv=[...e.mv];
const dest=stash(c);reg(e.sp);S.egg=null;sfx("hatch");
S.msg=`¡El huevo eclosionó! Nació ${e.sp}${c.g==="M"?" ♂":" ♀"} (nv. ${BREED.hatchLvl}) con la herencia de sus padres: ${c.mv.map(m=>MOVES[m].n).join(" y ")}, +${e.hp} PS y +${e.atk} de ataque.${dest==="base"?" Fue a la base de criaturas.":""}`}

/* ============================================================
   Pantalla: lista de criaturas (registro de capturas)
   ============================================================ */
function rDex(){const names=Object.keys(SPECIES);const caught=names.filter(n=>S.dex[n]).length;
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-list-details" aria-hidden="true"></i> Criaturas de Terravia</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px">Capturadas: ${caught}/${names.length}. Las desconocidas se revelan al capturarlas (o al evolucionar a ellas).</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px">
${names.map((n,i)=>{const sp=SPECIES[n];const num=String(i+1).padStart(2,"0");
if(!S.dex[n])return `<div class="card" style="padding:10px;text-align:center;opacity:.6">
<div style="display:flex;justify-content:center;margin-bottom:6px"><div style="width:40px;height:40px;border-radius:50%;background:var(--color-background-secondary);border:2px solid var(--color-border-secondary);display:flex;align-items:center;justify-content:center"><i class="ti ti-question-mark" aria-hidden="true" style="font-size:20px;color:var(--color-text-tertiary)"></i></div></div>
<p style="margin:0;font-size:13px;font-weight:500;color:var(--color-text-tertiary)">#${num} ???</p></div>`;
return `<div class="card" style="padding:10px;text-align:center">
<div style="display:flex;justify-content:center;margin-bottom:6px">${sprite({name:n,t:sp.t},40)}</div>
<p style="margin:0 0 4px;font-size:13px;font-weight:500">#${num} ${n}</p>${badge(sp.t)}
<p style="font-size:11px;color:var(--color-text-secondary);margin:6px 0 0">PS ${sp.hp} · Ataque ${sp.atk}<br>${sp.mv.map(m=>MOVES[m].n).join(" · ")}</p>
<p style="font-size:11px;color:var(--color-text-tertiary);margin:6px 0 0;line-height:1.5;text-align:left">${DESCS[n]||""}</p></div>`}).join("")}
</div>
<button style="margin-top:12px" onclick="closeDex()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver al mapa</button></div>`))}
window.openDex=()=>{S.screen="dex";render()};
window.closeDex=()=>{S.screen="map";render()};

/* ============================================================
   Pantalla: tienda
   ============================================================ */
function rShop(){G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-building-store" aria-hidden="true"></i> Tienda de Terravia</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px"><i class="ti ti-coin" aria-hidden="true"></i> Tenés ${S.coins} monedas. Se ganan venciendo criaturas salvajes y entrenadores.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px">
${Object.entries(SHOP).map(([k,it])=>{const owned=it.mount&&S.mounts[it.mount];
const info=it.mount?(owned?"ya la tenés":it.d):`tenés ${k==="ball"?S.balls:S.items[k]}`;
return `<button class="mvbtn" onclick="buy('${k}')" ${S.coins<it.pr||owned?"disabled":""}><span style="font-weight:500"><i class="ti ${it.ic}" aria-hidden="true"></i> ${it.n}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${it.pr} monedas · ${info}</span></button>`}).join("")}
</div>
<button style="margin-top:12px" onclick="exitShop()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Salir de la tienda</button></div>`))}
window.buy=k=>{const it=SHOP[k];if(S.coins<it.pr)return;
if(it.mount){if(S.mounts[it.mount])return;S.coins-=it.pr;S.mounts[it.mount]=true}
else{S.coins-=it.pr;if(k==="ball")S.balls++;else S.items[k]++}sfx("buy");render()};
window.exitShop=()=>{S.screen="map";S.msg="";render()};

/* ============================================================
   Puesto de intercambio (códigos de oferta y cierre, depósito local)
   ============================================================ */
function enc(o){return btoa(unescape(encodeURIComponent(JSON.stringify(o))))}
function dec(s){return JSON.parse(decodeURIComponent(escape(atob(String(s).trim()))))}
/* Validación ESTRICTA de criaturas recibidas: rechaza (no recorta) lo que no
   sea legal según el contrato y plausible para su nivel. */
function tradeCheck(c){
if(!c||typeof c!=="object")return"el código no contiene una criatura";
if(!SPECIES[c.name])return`la especie "${esc(String(c.name??"?"))}" no existe en este mundo`;
if(!Number.isInteger(c.lvl)||c.lvl<1||c.lvl>BAL.tradeLvlMax)return`nivel inválido o mayor a ${BAL.tradeLvlMax}`;
if(!Number.isInteger(c.maxhp)||c.maxhp<1||c.maxhp>BAL.hpMax+15+c.lvl*6)return"PS máximos imposibles para su nivel";
if(!Number.isInteger(c.atk)||c.atk<1||c.atk>BAL.atkMax+10+c.lvl*2)return"ataque imposible para su nivel";
if(!Number.isInteger(c.hp)||c.hp<0||c.hp>c.maxhp)return"PS actuales inválidos";
if(!Array.isArray(c.mv)||c.mv.length<1||c.mv.length>BAL.maxMoves||c.mv.some(m=>!MOVES[m]))return"movimientos inválidos";
if(c.st!=null&&!STATUS[c.st])return"estado alterado inválido";
return null}
function canGiveFromTeam(i){const c=S.team[i];if(S.team.length<=1)return false;
return c.hp<=0?S.team.some((x,j)=>j!==i&&x.hp>0):S.team.filter(x=>x.hp>0).length>1}
function giveList(){const out=[];
S.team.forEach((c,i)=>{if(canGiveFromTeam(i))out.push(["t"+i,c])});
S.box.forEach((c,i)=>out.push(["b"+i,c]));return out}
function takeGive(key){const i=Number(key.slice(1));
return key[0]==="t"?S.team.splice(i,1)[0]:S.box.splice(i,1)[0]}
function offerCode(){const t=S.tradeOut;return enc({k:"offer",id:t.id,world:FED.worldId,c:t.c,wants:t.wants})}
function ficha(c){return `<div class="row" style="margin-bottom:6px">${sprite(c,40)}<div style="flex:1">
<p style="margin:0;font-size:13px;font-weight:500">${c.name}${gSym(c)}${stTag(c)} <span style="color:var(--color-text-secondary);font-weight:400">nv. ${c.lvl}</span></p>
<p style="margin:0;font-size:12px;color:var(--color-text-secondary)">PS ${c.hp}/${c.maxhp} · Ataque ${c.atk} · ${c.mv.map(m=>MOVES[m].n).join(" · ")}</p>
<p style="margin:0;font-size:11px;color:var(--color-text-tertiary)">${DESCS[c.name]||""}</p></div></div>`}
function rTrade(){const t=S.tradeOut;
let body="";
if(t){
body=`<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">Tu criatura en depósito (pedís: ${t.wants.length?t.wants.join(", "):"cualquier especie"}):</p>
${ficha(t.c)}
<p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 4px">Pasale este código de oferta a la otra persona:</p>
<input readonly value="${offerCode()}" onclick="this.select()" style="width:100%;font-size:11px;margin-bottom:6px"/>
<p style="font-size:12px;color:var(--color-text-tertiary);margin:0 0 4px">¿Querés publicarla en el tablón de tu mundo? Agregá esta entrada a <b>trades.json</b> vía PR. Ojo: el contacto que pongas queda público para siempre en el historial del repo.</p>
<input readonly value="${esc(JSON.stringify({code:offerCode(),contact:"tu-contacto-acá"}))}" onclick="this.select()" style="width:100%;font-size:11px;margin-bottom:10px"/>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 4px">Cuando te responda, pegá su código de cierre:</p>
<div class="row" style="margin-bottom:10px"><input id="trclose" placeholder="Código de cierre" style="flex:1"/><button onclick="trClose()">Cerrar intercambio</button></div>
<button onclick="trCancel()"><i class="ti ti-arrow-back-up" aria-hidden="true"></i> Cancelar oferta (recuperar criatura)</button>`}
else{
const give=giveList();
const inOf=S.trIn;
body=`<p style="font-size:14px;font-weight:500;margin:0 0 6px">Crear una oferta</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">1. Elegí qué criatura ofrecés (queda en depósito; no puede ir la última sana del equipo):</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-bottom:8px">
${give.map(([k,c])=>`<button class="mvbtn" onclick="trGiveSel('${k}')" style="${S.trGive===k?"outline:2px solid var(--color-text-primary);":""}"><span style="font-weight:500">${c.name}${gSym(c)}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${k[0]==="t"?"equipo":"base"}</span></button>`).join("")||`<p style="font-size:13px;color:var(--color-text-tertiary)">No tenés criaturas ofrecibles.</p>`}
</div>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">2. Qué pedís a cambio (hasta 3 especies; ninguna = cualquiera):</p>
<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
${Object.keys(SPECIES).map(n=>`<button style="padding:3px 10px;font-size:12px;${S.trWants.includes(n)?"outline:2px solid var(--color-text-primary);":""}" onclick="trWant('${n}')">${n}</button>`).join("")}
</div>
<button onclick="trMakeOffer()" ${S.trGive?"":"disabled"}><i class="ti ti-package-export" aria-hidden="true"></i> Depositar y generar código</button>
<hr style="border:none;border-top:0.5px solid var(--color-border-tertiary);margin:14px 0">
<p style="font-size:14px;font-weight:500;margin:0 0 6px">Aceptar una oferta</p>
<div class="row" style="margin-bottom:8px"><input id="trin" placeholder="Pegá el código de oferta" style="flex:1"/><button onclick="trParseOffer()">Ver oferta</button></div>
${inOf?`<div class="card" style="margin-bottom:8px">
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">Te ofrecen (validada contra tu contrato ✓), desde el mundo ${esc(inOf.world||"?")}:</p>
${ficha(inOf.c)}
<p style="font-size:13px;margin:0 0 6px">Pide a cambio: <b>${inOf.wants.length?inOf.wants.join(", "):"cualquier especie"}</b></p>
${(()=>{const cands=giveList().filter(([k,c])=>!inOf.wants.length||inOf.wants.includes(c.name));
return cands.length?`<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">Elegí cuál entregás:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;margin-bottom:8px">
${cands.map(([k,c])=>`<button class="mvbtn" onclick="trGiveFor('${k}')" style="${S.trGiveFor===k?"outline:2px solid var(--color-text-primary);":""}"><span style="font-weight:500">${c.name}${gSym(c)}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${k[0]==="t"?"equipo":"base"}</span></button>`).join("")}
</div>
<button onclick="trAccept()" ${S.trGiveFor?"":"disabled"}><i class="ti ti-arrows-exchange" aria-hidden="true"></i> Aceptar y generar cierre</button>`:`<p style="font-size:13px;color:#E24B4A;margin:0">No tenés ninguna criatura de las pedidas (o no podés entregarla).</p>`})()}
</div>`:""}
${S.trCloseCode?`<p style="font-size:13px;color:var(--color-text-secondary);margin:8px 0 4px">¡Intercambio aceptado! Mandale este código de cierre a la otra persona:</p>
<input readonly value="${S.trCloseCode}" onclick="this.select()" style="width:100%;font-size:11px"/>`:""}`}
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-arrows-exchange" aria-hidden="true"></i> Puesto de intercambio</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px">Intercambio por códigos: ofrecés una criatura y pedís otra a cambio. El receptor ve la ficha completa y su juego valida que todo sea legal según el contrato. Una oferta a la vez.</p>
${S.trMsg?`<p style="font-size:13px;margin:0 0 10px;color:${S.trMsg.startsWith("¡")?"var(--color-text-primary)":"#E24B4A"}">${S.trMsg}</p>`:""}
${body}
<button style="margin-top:12px" onclick="closeTrade()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver a la base</button></div>`))}
window.openTrade=()=>{S.screen="trade";S.trGive=null;S.trWants=[];S.trIn=null;S.trGiveFor=null;S.trCloseCode=null;S.trMsg="";render()};
window.closeTrade=()=>{S.screen="box";S.trIn=null;S.trMsg="";render()};
window.trGiveSel=k=>{S.trGive=S.trGive===k?null:k;render()};
window.trGiveFor=k=>{S.trGiveFor=S.trGiveFor===k?null:k;render()};
window.trWant=n=>{const i=S.trWants.indexOf(n);if(i>=0)S.trWants.splice(i,1);else{S.trWants.push(n);if(S.trWants.length>3)S.trWants.shift()}render()};
window.trMakeOffer=()=>{if(!S.trGive||S.tradeOut)return;
const c=takeGive(S.trGive);
S.tradeOut={c,wants:[...S.trWants],id:Math.random().toString(36).slice(2,8)};
S.trGive=null;S.trWants=[];S.trMsg="¡Oferta creada! Tu criatura queda en depósito hasta cerrar o cancelar.";render()};
window.trParseOffer=()=>{S.trIn=null;S.trGiveFor=null;S.trMsg="";
let d;try{d=dec(document.getElementById("trin").value)}catch(e){S.trMsg="Código de oferta inválido.";render();return}
if(!d||d.k!=="offer"||typeof d.id!=="string"){S.trMsg="Eso no es un código de oferta.";render();return}
if(S.tradeOut&&S.tradeOut.id===d.id){S.trMsg="No podés aceptar tu propia oferta.";render();return}
const err=tradeCheck(d.c);
if(err){S.trMsg="Oferta rechazada: "+err+".";render();return}
d.wants=(Array.isArray(d.wants)?d.wants.filter(n=>SPECIES[n]):[]).slice(0,3);
S.trIn=d;render()};
window.trAccept=()=>{const d=S.trIn;if(!d||!S.trGiveFor)return;
const cand=giveList().find(([k])=>k===S.trGiveFor);
if(!cand||(d.wants.length&&!d.wants.includes(cand[1].name))){S.trGiveFor=null;render();return}
const given=takeGive(S.trGiveFor);
const nc=cleanCreature(d.c);stash(nc);reg(nc.name);sfx("capture");
S.trCloseCode=enc({k:"close",id:d.id,world:FED.worldId,c:given});
S.trIn=null;S.trGiveFor=null;S.trMsg=`¡Recibiste a ${nc.name}! Entregaste a ${given.name}.`;render()};
window.trClose=()=>{const t=S.tradeOut;if(!t)return;
let d;try{d=dec(document.getElementById("trclose").value)}catch(e){S.trMsg="Código de cierre inválido.";render();return}
if(!d||d.k!=="close"||d.id!==t.id){S.trMsg="Ese cierre no corresponde a tu oferta.";render();return}
const err=tradeCheck(d.c);
if(err){S.trMsg="Cierre rechazado: "+err+".";render();return}
if(t.wants.length&&!t.wants.includes(d.c.name)){S.trMsg=`Cierre rechazado: pediste ${t.wants.join(", ")} y te mandaron ${esc(String(d.c.name))}.`;render();return}
if(S.team.length>=4&&S.box.length>=STORAGE.cap){S.trMsg="No tenés lugar: hacé espacio en el equipo o la base y volvé a pegar el cierre.";render();return}
const nc=cleanCreature(d.c);stash(nc);reg(nc.name);sfx("capture");
S.tradeOut=null;S.trMsg=`¡Intercambio cerrado! Recibiste a ${nc.name}.`;render()};
window.trCancel=()=>{const t=S.tradeOut;if(!t)return;
if(S.team.length>=4&&S.box.length>=STORAGE.cap){S.trMsg="No tenés lugar para recuperarla: hacé espacio primero.";render();return}
stash(t.c);S.tradeOut=null;S.trMsg=`Oferta cancelada: ${t.c.name} volvió con vos.`;render()};

/* ============================================================
   Pantalla: federación de mundos (forks como mundos)
   ============================================================ */
function fedCompat(remoteSpecies){const mine=[...new Set([...S.team,...S.box].map(c=>c.name))];
const have=[],missing=[];mine.forEach(n=>((remoteSpecies||{})[n]?have:missing).push(n));return{have,missing}}
function rFed(){const f=S.fedInfo;
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-world" aria-hidden="true"></i> Federación de mundos</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px">Cada fork de Terravia es un mundo independiente con su propio contrato. Explorá uno para validar su contenido y viajá llevando tu código de guardado. Este mundo: <b>${esc(FED.worldId)}</b>.</p>
${Object.keys(FED.peers).length?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-bottom:10px">
${Object.entries(FED.peers).map(([id,p])=>`<button class="mvbtn" onclick="fedExplore('${esc(p.url)}','${esc(id)}')"><span style="font-weight:500">${esc(p.n)}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${esc(p.url)}</span></button>`).join("")}
</div>`:`<p style="font-size:13px;color:var(--color-text-tertiary);margin:0 0 10px">Este mundo no declara pares todavía (token federation.peers de GAME.md).</p>`}
${FED.directory?(S.fedDir?`<p style="font-size:13px;font-weight:500;margin:0 0 6px"><i class="ti ti-list-search" aria-hidden="true"></i> Directorio de mundos (${S.fedDir.length}):</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-bottom:10px">
${S.fedDir.map(e=>`<button class="mvbtn" onclick="fedExplore('${esc(e.url)}','${esc(e.id||"")}')"><span style="font-weight:500">${esc(e.n||e.id||"?")}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${esc(e.url)}</span></button>`).join("")||`<p style="font-size:13px;color:var(--color-text-tertiary)">El directorio está vacío.</p>`}
</div>`:`<button style="margin-bottom:10px" onclick="fedDirLoad()" ${S.fedDirBusy?"disabled":""}><i class="ti ti-list-search" aria-hidden="true"></i> ${S.fedDirBusy?"Cargando…":"Cargar directorio de mundos"}</button>`):""}
<div class="row" style="margin-bottom:10px"><input id="fedurl" placeholder="https://usuario.github.io/su-fork/" style="flex:1"/><button onclick="fedExplore()" ${S.fedBusy?"disabled":""}>${S.fedBusy?"Consultando…":"Explorar"}</button></div>
${S.fedErr?`<p style="font-size:13px;color:#E24B4A;margin:0 0 10px">${esc(S.fedErr)}</p>`:""}
${f?(()=>{const blocked=f.lintErrors>0&&(f.verRel==="same"||f.verRel==="unknown");
const verTxt=f.verRel==="same"||f.verRel==="unknown"?(f.lintErrors===0?"contrato: válido ✓":`<span style="color:#E24B4A">contrato: ${f.lintErrors} error(es) de lint</span>`):
f.verRel==="older"?`contrato v${esc(f.version)} — anticuado (el tuyo v${VERSION})${f.lintErrors?` · ${f.lintErrors} observación(es) con tus reglas`:""}`:
`contrato v${esc(f.version)} — más nuevo que tu cliente (v${VERSION})${f.lintErrors?` · ${f.lintErrors} observación(es)`:""}`;
return `<div class="card" style="margin-bottom:10px">
<p style="margin:0 0 4px;font-weight:500">${esc(f.name)} <span style="font-weight:400;color:var(--color-text-secondary)">(${esc(f.worldId)} · v${esc(f.version)})</span></p>
${f.idMismatch?`<p style="font-size:13px;color:#B8860B;margin:0 0 6px"><i class="ti ti-alert-triangle" aria-hidden="true"></i> Identidad: este mundo dice ser «${esc(f.worldId)}» pero lo tenés listado como «${esc(f.idMismatch)}». La identidad real es la URL.</p>`:""}
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">${f.species} especies · ${f.zones} zonas · ${f.trainers} entrenadores · ${verTxt}</p>
<p style="font-size:13px;margin:0 0 8px">Tu equipo allá: ${f.compat.have.length?`✓ ${f.compat.have.join(", ")}`:""}${f.compat.missing.length?` <span style="color:#E24B4A">✗ ${f.compat.missing.join(", ")} (no existen en ese mundo: se descartan al cargar)</span>`:""}${!f.compat.have.length&&!f.compat.missing.length?"sin criaturas aún":""}</p>
<button onclick="fedTravel()" ${blocked?"disabled":""}><i class="ti ti-plane-departure" aria-hidden="true"></i> Viajar con tu equipo</button>
${blocked?`<p style="font-size:12px;color:var(--color-text-tertiary);margin:6px 0 0">No se recomienda viajar a un mundo con contrato inválido.</p>`:f.verRel==="older"||f.verRel==="newer"?`<p style="font-size:12px;color:var(--color-text-tertiary);margin:6px 0 0">Las versiones difieren: allá corre su propio motor, estas observaciones son informativas.</p>`:""}
${f.rpeers&&f.rpeers.length?`<p style="font-size:13px;font-weight:500;margin:10px 0 6px"><i class="ti ti-affiliate" aria-hidden="true"></i> Sus pares conocidos:</p>
<div style="display:flex;flex-wrap:wrap;gap:6px">${f.rpeers.map(([id,p])=>`<button style="padding:3px 10px;font-size:12px" onclick="fedExplore('${esc(p.url)}','${esc(id)}')">${esc(p.n||id)}</button>`).join("")}</div>`:""}
${f.board===null?"":f.board.length===0?`<p style="font-size:13px;color:var(--color-text-tertiary);margin:10px 0 0"><i class="ti ti-clipboard-list" aria-hidden="true"></i> Tablón de intercambios: sin ofertas.</p>`:`
<p style="font-size:13px;font-weight:500;margin:10px 0 6px"><i class="ti ti-clipboard-list" aria-hidden="true"></i> Tablón de intercambios (${f.board.length}):</p>
${f.board.map((o,i)=>o.err?`<p style="font-size:12px;color:var(--color-text-tertiary);margin:0 0 6px">· Oferta de ${esc(o.name||"?")} no disponible en tu mundo: ${esc(o.err)}.</p>`:`
<div class="card" style="margin-bottom:8px">${ficha(o.d.c)}
<p style="font-size:13px;margin:0 0 6px">Pide: <b>${o.d.wants.length?o.d.wants.join(", "):"cualquier especie"}</b>${o.contact?` · cierre por: ${esc(o.contact)}`:""}</p>
<button onclick="boardTake(${i})"><i class="ti ti-arrows-exchange" aria-hidden="true"></i> Llevar al puesto de intercambio</button></div>`).join("")}`}
</div>`})():""}
<button onclick="closeFed()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver al mapa</button></div>`))}
window.openFed=()=>{S.screen="fed";S.fedInfo=null;S.fedErr=null;S.fedBusy=false;render()};
window.fedDirLoad=()=>{if(S.fedDirBusy||!FED.directory)return;
if(typeof fetch!=="function"){S.fedErr="El directorio no está disponible en este entorno.";render();return}
S.fedDirBusy=true;render();
fetch(FED.directory).then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json()})
.then(j=>{S.fedDir=(Array.isArray(j&&j.directory)?j.directory:[]).slice(0,50).filter(e=>e&&typeof e.url==="string"&&/^https:\/\//.test(e.url));
S.fedDirBusy=false;render()})
.catch(e=>{S.fedErr="No se pudo leer el directorio: "+e.message;S.fedDirBusy=false;render()})};
window.closeFed=()=>{S.screen="map";S.fedInfo=null;S.fedErr=null;render()};
/* La identidad real de un mundo es su URL; worldId es una etiqueta. La validación
   remota es tolerante por versión: un contrato más viejo/nuevo que el cliente no
   bloquea el viaje (allá corre SU motor), solo informa. */
function fedVerRel(v){return typeof v!=="number"?"unknown":v===VERSION?"same":v<VERSION?"older":"newer"}
window.fedExplore=(u,expectId)=>{if(S.fedBusy)return;
u=(u||document.getElementById("fedurl").value).trim();
if(!/^https?:\/\/.+/.test(u)){S.fedErr="Ingresá una URL válida (https://…).";S.fedInfo=null;render();return}
if(!u.endsWith("/"))u+="/";
if(typeof fetch!=="function"||!window.YamlMin||!window.GameLint){S.fedErr="La exploración remota no está disponible en este entorno.";render();return}
S.fedBusy=true;S.fedErr=null;S.fedInfo=null;render();
fetch(u+"GAME.md").then(r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.text()})
.then(txt=>{const {fm}=window.YamlMin.splitFrontMatter(txt);
if(!fm)throw new Error("El GAME.md remoto no tiene front-matter");
const d=window.YamlMin.parseYamlSubset(fm);
const errs=window.GameLint.lintGame(d).filter(x=>x.level==="error").length;
const wid=(d.federation||{}).worldId||"?";
S.fedInfo={url:u,name:d.name||"(sin nombre)",worldId:wid,version:d.version??"?",verRel:fedVerRel(d.version),
idMismatch:expectId&&expectId!==wid?expectId:null,
rpeers:Object.entries((d.federation||{}).peers||{}).slice(0,8).filter(([,p])=>p&&typeof p.url==="string"),
species:Object.keys(d.species||{}).length,zones:Object.keys(d.zones||{}).length,trainers:Object.keys(d.trainers||{}).length,
lintErrors:errs,compat:fedCompat(d.species),board:null};
S.fedBusy=false;render();
// el tablón de intercambios es opcional: si no existe, no es error
return fetch(u+"trades.json").then(r=>r.ok?r.json():null).then(tr=>{
if(!tr||!Array.isArray(tr.offers)||!S.fedInfo||S.fedInfo.url!==u)return;
S.fedInfo.board=tr.offers.slice(0,50).map(en=>boardEntry(en));render()}).catch(()=>{})})
.catch(e=>{S.fedErr="No se pudo leer ese mundo: "+e.message;S.fedBusy=false;render()})};
/* Decodifica y valida una entrada del tablón remoto CONTRA MI contrato:
   solo es aceptable acá lo que mi mundo reconoce. */
function boardEntry(en){
try{const d=dec(en.code);
if(!d||d.k!=="offer"||typeof d.id!=="string")return{err:"entrada malformada"};
const err=tradeCheck(d.c);
if(err)return{err,name:String(d.c&&d.c.name||"?")};
d.wants=(Array.isArray(d.wants)?d.wants.filter(n=>SPECIES[n]):[]).slice(0,3);
return{d,contact:typeof en.contact==="string"?en.contact.slice(0,200):""}}
catch(e){return{err:"entrada malformada"}}}
window.boardTake=i=>{const f=S.fedInfo;const o=f&&f.board&&f.board[i];if(!o||o.err)return;
if(S.tradeOut&&S.tradeOut.id===o.d.id){S.fedErr="Esa oferta es tuya.";render();return}
S.screen="trade";S.trGive=null;S.trWants=[];S.trGiveFor=null;S.trCloseCode=null;
S.trIn=o.d;S.trMsg=`Oferta traída del tablón de ${f.name}.${o.contact?` Cierre por: ${esc(o.contact)}`:""}`;render()};
window.fedTravel=()=>{const f=S.fedInfo;if(!f)return;
const code=buildSaveCode();
window.open(f.url+(code.length<1800?"#save="+encodeURIComponent(code):""),"_blank");
if(code.length>=1800)S.fedErr="Tu partida es muy grande para viajar por URL: copiá el código con Guardar y pegalo allá.";render()};

/* ============================================================
   Pantalla: base de criaturas (almacenamiento)
   ============================================================ */
function canDeposit(i){const c=S.team[i];if(S.team.length<=1||S.box.length>=STORAGE.cap)return false;
return c.hp<=0?S.team.some((x,j)=>j!==i&&x.hp>0):S.team.filter(x=>x.hp>0).length>1}
function rBox(){
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-box" aria-hidden="true"></i> Base de criaturas</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px">Capacidad: ${S.box.length}/${STORAGE.cap}. Las capturas con el equipo lleno llegan acá. Siempre debe quedar al menos una criatura sana en el equipo.</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">Tu equipo (${S.team.length}/4):</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin-bottom:12px">
${S.team.map((c,i)=>`<button class="mvbtn" onclick="deposit(${i})" ${canDeposit(i)?"":"disabled"}><span style="font-weight:500">${c.name}${gSym(c)}${stTag(c)}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${c.hp}/${c.maxhp} PS · depositar ↓</span></button>`).join("")}
</div>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">En la base:</p>
${S.box.length?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px">
${S.box.map((c,i)=>`<button class="mvbtn" onclick="withdraw(${i})" ${S.team.length>=4?"disabled":""}><span style="font-weight:500">${c.name}${gSym(c)}${stTag(c)}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${c.hp}/${c.maxhp} PS · ${S.team.length>=4?"equipo lleno":"retirar ↑"}</span></button>`).join("")}
</div>`:`<p style="font-size:13px;color:var(--color-text-tertiary);margin:0">La base está vacía.</p>`}
<div class="row" style="margin-top:12px"><button onclick="openTrade()"><i class="ti ti-arrows-exchange" aria-hidden="true"></i> Puesto de intercambio${S.tradeOut?" · 1 en depósito":""}</button>
<button onclick="exitBox()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver al mapa</button></div></div>`))}
window.deposit=i=>{if(!canDeposit(i)||S.box.length>=STORAGE.cap)return;S.box.push(S.team.splice(i,1)[0]);render()};
window.withdraw=i=>{if(S.team.length>=4)return;S.team.push(S.box.splice(i,1)[0]);render()};
window.exitBox=()=>{S.screen="map";S.msg="";render()};

/* ============================================================
   Pantalla: puesto de expediciones (automatización)
   ============================================================ */
function rExp(){
let body="";
if(S.exp)body=`<p style="font-size:14px;margin:0">${S.exp.c.name} está explorando ${BIOMES[S.exp.biome].n}: vuelve en ${S.exp.steps} pasos.</p>`;
else if(S.team.length<2)body=`<p style="font-size:14px;margin:0;color:var(--color-text-secondary)">Necesitás al menos 2 criaturas en el equipo: la expedicionaria y una que te acompañe.</p>`;
else{const sel=S.esel,bio=S.ebio;
body=`<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">1. Elegí quién parte (no puede ir la última criatura sana):</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:10px">
${S.team.map((c,i)=>{const lastHealthy=c.hp>0&&S.team.filter(x=>x.hp>0).length<2;
return `<button class="mvbtn" onclick="expSel(${i})" ${c.hp<=0||lastHealthy?"disabled":""} style="${sel===i?"outline:2px solid var(--color-text-primary);":""}"><span style="font-weight:500">${c.name}${gSym(c)}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${c.hp}/${c.maxhp} PS</span></button>`}).join("")}</div>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 6px">2. Elegí el destino:</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:10px">
${Object.entries(BIOMES).map(([ch,b])=>`<button class="mvbtn" onclick="expBio('${ch}')" style="${bio===ch?"outline:2px solid var(--color-text-primary);":""}"><span style="font-weight:500">${b.n}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nivel ~${b.base} · ${(WILD[ch]||[]).join(", ")}</span></button>`).join("")}</div>
<button onclick="goExp()" ${sel==null||!bio?"disabled":""}><i class="ti ti-compass" aria-hidden="true"></i> Partir (${EXPEDITIONS.duration} pasos)</button>`}
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-compass" aria-hidden="true"></i> Puesto de expediciones</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 12px">La expedicionaria deja el equipo y vuelve tras ${EXPEDITIONS.duration} pasos con monedas, materiales del bioma y XP. Una expedición a la vez.</p>
${body}
<button style="margin-top:12px" onclick="exitExp()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver al mapa</button></div>`))}
window.expSel=i=>{S.esel=S.esel===i?null:i;render()};
window.expBio=ch=>{S.ebio=S.ebio===ch?null:ch;render()};
window.goExp=()=>{if(S.exp||S.esel==null||!S.ebio)return;const c=S.team[S.esel];
if(!c||c.hp<=0||S.team.filter(x=>x.hp>0).length<2)return;
S.team.splice(S.esel,1);S.exp={c,biome:S.ebio,steps:EXPEDITIONS.duration};S.esel=null;S.ebio=null;render()};
window.exitExp=()=>{S.esel=null;S.ebio=null;S.screen="map";S.msg="";render()};
function endExpedition(){const e=S.exp,c=e.c,bio=BIOMES[e.biome];
const coins=c.lvl*EXPEDITIONS.coinsPerLvl;S.coins+=coins;
const gained={};
for(let i=0;i<EXPEDITIONS.rolls;i++){const pool=WILD[e.biome]||[];if(!pool.length)break;
const sp=SPECIES[pool[R(0,pool.length-1)]];const mat=Object.entries(MATERIALS).find(([,m])=>m.from===sp.t);
if(mat&&Math.random()<EXPEDITIONS.matChance){S.mats[mat[0]]=(S.mats[mat[0]]||0)+1;gained[mat[1].n]=(gained[mat[1].n]||0)+1}}
const fake={log:[]};gainXp(c,{lvl:bio.base},fake);
const dest=stash(c);S.exp=null;sfx("win");
const loot=Object.entries(gained).map(([n,q])=>`${q}× ${n}`).join(", ");
S.msg=`¡${c.name} volvió de ${bio.n}${dest==="base"?" (fue a la base)":""}! Trajo ${coins} monedas${loot?` y ${loot}`:""}. ${fake.log.join(" ")}`}

/* ============================================================
   Pantalla: taller (crafteo)
   ============================================================ */
function rCraft(){const have=k=>S.mats[k]||0;
G.appendChild(el(`<div class="card">
<p style="margin:0 0 4px;font-weight:500;font-size:15px"><i class="ti ti-tools" aria-hidden="true"></i> Taller de Terravia</p>
<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 8px">Las criaturas salvajes sueltan materiales según su tipo al vencerlas. Acá los convertís en objetos.</p>
<p style="font-size:13px;margin:0 0 12px">${Object.entries(MATERIALS).map(([k,m])=>`<i class="ti ${m.ic}" aria-hidden="true"></i> ${m.n}: <b>${have(k)}</b>`).join(" · ")}</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px">
${Object.entries(RECIPES).map(([k,cost])=>{const it=SHOP[k];const can=Object.entries(cost).every(([m,q])=>have(m)>=q);
return `<button class="mvbtn" onclick="craft('${k}')" ${can?"":"disabled"}><span style="font-weight:500"><i class="ti ${it.ic}" aria-hidden="true"></i> ${it.n}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${Object.entries(cost).map(([m,q])=>`${q}× ${MATERIALS[m].n}`).join(" · ")}</span></button>`}).join("")}
</div>
<p style="font-size:13px;color:var(--color-text-secondary);margin:14px 0 6px"><i class="ti ti-building-factory-2" aria-hidden="true"></i> Edificios (compra única; producen materiales solos mientras caminás):</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px">
${Object.entries(BUILDINGS).map(([k,b])=>{const owned=S.bld[k];
return `<button class="mvbtn" onclick="buyBld('${k}')" ${owned||S.coins<b.pr?"disabled":""}><span style="font-weight:500"><i class="ti ${b.ic}" aria-hidden="true"></i> ${b.n}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${owned?`en marcha: 1 ${MATERIALS[b.mat].n} cada ${b.every} pasos`:`${b.pr} monedas · 1 ${MATERIALS[b.mat].n} cada ${b.every} pasos`}</span></button>`}).join("")}
</div>
<p style="font-size:12px;color:var(--color-text-tertiary);margin:8px 0 0">Monedas: ${S.coins}</p>
<button style="margin-top:12px" onclick="exitCraft()"><i class="ti ti-arrow-left" aria-hidden="true"></i> Salir del taller</button></div>`))}
window.buyBld=k=>{const b=BUILDINGS[k];if(!b||S.bld[k]||S.coins<b.pr)return;S.coins-=b.pr;S.bld[k]=true;sfx("buy");render()};
window.craft=k=>{const cost=RECIPES[k];if(!Object.entries(cost).every(([m,q])=>(S.mats[m]||0)>=q))return;
Object.entries(cost).forEach(([m,q])=>S.mats[m]-=q);
if(k==="ball")S.balls++;else S.items[k]++;sfx("buy");render()};
window.exitCraft=()=>{S.screen="map";S.msg="";render()};

/* ============================================================
   Pantalla: combate
   ============================================================ */
function rBattle(){const b=S.battle,me=S.team[0],en=b.enemy;const tn=b.trainer?TRAINERS[b.trainer.id].name:null;
const fx=b.fx;b.fx=null;
const fxCls=who=>fx===who?"shake":fx===who+"Faint"?"faintfx":"";
const spr=(c,sz)=>`<div style="display:flex;flex-direction:column;align-items:center;flex:none">${sprite(c,sz)}<div class="plat-sh"></div></div>`;
let actions="";
if(b.over)actions=`<button onclick="endB()" style="width:100%"><i class="ti ti-arrow-left" aria-hidden="true"></i> Volver al mapa</button>`;
else if(b.forceSwitch)actions=`<p style="font-size:13px;color:var(--color-text-secondary);margin:0 0 8px">Elegí quién sigue:</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px">${S.team.map((c,i)=>c.hp>0?`<button class="mvbtn" onclick="swap(${i})"><span style="font-weight:500">${c.name}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${c.hp}/${c.maxhp} PS</span></button>`:"").join("")}</div>`;
else actions=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px">
${me.mv.map((k,i)=>{const m=MOVES[k];return `<button class="mvbtn" onclick="atk(${i})"><span style="font-weight:500">${m.n}</span><br><span style="font-size:12px;color:${TYPES[m.t].c}">${m.t} · pot. ${m.p}</span></button>`}).join("")}
<button class="mvbtn" onclick="capture()" ${b.trainer||S.balls<1||(S.team.length>=4&&S.box.length>=STORAGE.cap)?"disabled":""}><span style="font-weight:500"><i class="ti ti-circle-dot" aria-hidden="true"></i> Esfera</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${b.trainer?"no en duelos":`quedan ${S.balls}${S.team.length>=4?(S.box.length>=STORAGE.cap?" · equipo y base llenos":" · irá a la base"):""}`}</span></button>
<button class="mvbtn" onclick="useB('p')" ${S.items.p<1?"disabled":""}><span style="font-weight:500"><i class="ti ti-flask" aria-hidden="true"></i> Poción</span><br><span style="font-size:12px;color:var(--color-text-secondary)">+25 PS · quedan ${S.items.p}</span></button>
<button class="mvbtn" onclick="useB('s')" ${S.items.s<1?"disabled":""}><span style="font-weight:500"><i class="ti ti-flask-2" aria-hidden="true"></i> Superpoción</span><br><span style="font-size:12px;color:var(--color-text-secondary)">+60 PS · quedan ${S.items.s}</span></button>
${S.team.length>1?`<button class="mvbtn" onclick="showSwap()"><span style="font-weight:500"><i class="ti ti-switch-horizontal" aria-hidden="true"></i> Cambiar</span><br><span style="font-size:12px;color:var(--color-text-secondary)">gasta el turno</span></button>`:""}
<button class="mvbtn" onclick="flee()" ${b.trainer?"disabled":""}><span style="font-weight:500"><i class="ti ti-run" aria-hidden="true"></i> Huir</span><br><span style="font-size:12px;color:var(--color-text-secondary)">${b.trainer?"no en duelos":"70% de éxito"}</span></button>
</div>${b.swapMode?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:8px">${S.team.map((c,i)=>i>0&&c.hp>0?`<button class="mvbtn" onclick="swap(${i})"><span style="font-weight:500">→ ${c.name}</span><br><span style="font-size:12px;color:var(--color-text-secondary)">nv. ${c.lvl} · ${c.hp}/${c.maxhp} PS</span></button>`:"").join("")}</div>`:""}`;
G.appendChild(el(`<div class="card">
${tn?`<p style="margin:0 0 10px;font-size:13px;color:var(--color-text-secondary)"><i class="ti ti-swords" aria-hidden="true"></i> Duelo contra ${tn} (criatura ${b.trainer.idx+1}/${TRAINERS[b.trainer.id].team.length})</p>`:""}
<div style="display:flex;flex-direction:column;gap:10px">
<div class="${fxCls("en")}" style="align-self:flex-end;width:min(380px,100%)"><div class="row">${spr(en,52)}<div style="flex:1"><p style="margin:0;font-weight:500;font-size:15px">${en.name}${tn?"":" salvaje"} <span style="font-weight:400;color:var(--color-text-secondary)">nv. ${en.lvl}</span> ${badge(en.t)}${stTag(en)}</p>${hpbar(en)}</div></div></div>
<div class="${fxCls("me")}" style="align-self:flex-start;width:min(380px,100%)"><div class="row">${spr(me,52)}<div style="flex:1"><p style="margin:0;font-weight:500;font-size:15px">${me.name} <span style="font-weight:400;color:var(--color-text-secondary)">nv. ${me.lvl}</span> ${badge(me.t)}${stTag(me)}</p>${hpbar(me)}</div></div></div>
</div>
<div style="background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:10px 14px;margin:14px 0;font-size:13px;line-height:1.6">${b.log.slice(-5).map(l=>`<p style="margin:0">${l}</p>`).join("")}</div>
${actions}</div>`))}
window.showSwap=()=>{S.battle.swapMode=!S.battle.swapMode;render()};
window.swap=i=>{const b=S.battle;const c=S.team.splice(i,1)[0];S.team.unshift(c);b.log.push(`¡Adelante, ${c.name}!`);b.swapMode=false;
if(b.forceSwitch){b.forceSwitch=false}else enemyTurn();render()};

/* ============================================================
   Lógica de combate
   ============================================================ */
function startWild(pool,lvl){const w=mk(pool[R(0,pool.length-1)],lvl);S.battle={enemy:w,log:[`¡Un ${w.name} salvaje (nv. ${w.lvl}) apareció!`],over:false,trainer:null};S.screen="battle";sfx("encounter")}
function startTrainer(id){const t=TRAINERS[id];const en=mk(...t.team[0]);
S.battle={enemy:en,log:[`¡El entrenador ${t.name} te desafía! Envía a ${en.name} (nv. ${en.lvl}).`],over:false,trainer:{id,idx:0}};S.screen="battle";sfx("encounter");render()}
function dmg(att,move,def){const m=MOVES[move];const ef=(EFF[m.t]||{})[def.t]??1;const stab=m.t===att.t?1.3:1;
return{d:Math.max(1,Math.round((m.p*0.4+att.atk)*ef*stab*(0.9+Math.random()*0.2)/2.2)),ef}}
function tryStatus(m,def,b){if(m.st&&!def.st&&def.hp>0&&Math.random()<m.sc){def.st=m.st;b.log.push(STATUS[m.st].hit.replace("{n}",def.name))}}
function playerFainted(b){const me=S.team[0];me.hp=0;me.st=null;sfx("faint");b.fx="meFaint";
if(S.team.some(c=>c.hp>0)){b.log.push(`${me.name} se debilitó.`);b.forceSwitch=true}
else{b.log.push(`Todo tu equipo se debilitó… Volvés al centro a descansar.`);b.over=true;b.faint=true}}
function enemyDefeated(b){const me=S.team[0],en=b.enemy;en.hp=0;b.log.push(`¡${en.name} se debilitó!`);sfx("faint");b.fx="enFaint";gainXp(me,en,b);
if(b.trainer){const t=TRAINERS[b.trainer.id];
if(b.trainer.idx<t.team.length-1){b.trainer.idx++;b.enemy=mk(...t.team[b.trainer.idx]);b.log.push(`${t.name} envía a ${b.enemy.name} (nv. ${b.enemy.lvl}).`)}
else{b.log.push(`¡Venciste a ${t.name}!`);b.over=true;b.won=true;sfx("win")}}
else{const c=en.lvl*2;S.coins+=c;b.log.push(`Ganaste ${c} monedas.`);
const mat=Object.entries(MATERIALS).find(([,m])=>m.from===en.t);
if(mat&&Math.random()<mat[1].rate){S.mats[mat[0]]=(S.mats[mat[0]]||0)+1;b.log.push(`Conseguiste 1 ${mat[1].n}.`)}
if(Math.random()<0.25){S.items.p++;b.log.push("La criatura soltó una poción.")}b.over=true}}
function endRound(b){if(b.over||b.forceSwitch)return;
const tick=c=>{if(c.st!=="burn"||c.hp<=0)return;const d=Math.max(2,Math.round(c.maxhp/12));c.hp-=d;b.log.push(`${c.name} sufre su quemadura: −${d} PS.`)};
tick(b.enemy);if(b.enemy.hp<=0){enemyDefeated(b);return}
tick(S.team[0]);if(S.team[0].hp<=0)playerFainted(b)}
function enemyTurn(){const b=S.battle,me=S.team[0],en=b.enemy;if(b.over||en.hp<=0)return;
if(en.st==="par"&&Math.random()<0.25)b.log.push(`${en.name} está paralizado y no puede moverse.`);
else{const mvs=SPECIES[en.name].mv;const mv=mvs[R(0,mvs.length-1)];const m=MOVES[mv];const r=dmg(en,mv,me);me.hp-=r.d;sfx(r.ef>1?"super":"hit");b.fx="me";
b.log.push(`${en.name} usó ${m.n}: −${r.d} PS${r.ef>1?" (¡súper eficaz!)":r.ef<1?" (poco eficaz)":""}.`);
if(me.hp<=0){playerFainted(b);return}
tryStatus(m,me,b)}
endRound(b)}
function gainXp(me,en,b){const xp=en.lvl*9;me.xp+=xp;b.log.push(`${me.name} ganó ${xp} XP.`);
while(me.xp>=me.next){me.xp-=me.next;me.lvl++;me.next=me.lvl*20;me.maxhp+=6;me.hp=Math.min(me.maxhp,me.hp+6);me.atk+=2;
b.log.push(`¡${me.name} subió al nivel ${me.lvl}!`);sfx("levelup");
const ev=EVO[me.name];
if(ev&&me.lvl>=ev[1]){const nn=ev[0];me.name=nn;me.maxhp+=12;me.hp+=12;me.atk+=3;me.mv=[...SPECIES[nn].mv];reg(nn);
b.log.push(`¡¿Qué?! ¡Tu criatura evolucionó a ${nn}!`);sfx("evolve")}}}
window.atk=i=>{const b=S.battle,me=S.team[0],en=b.enemy;b.swapMode=false;
if(me.st==="par"&&Math.random()<0.25){b.log.push(`${me.name} está paralizado y no puede moverse.`);enemyTurn();render();return}
const m=MOVES[me.mv[i]];const r=dmg(me,me.mv[i],en);en.hp-=r.d;sfx(r.ef>1?"super":"hit");b.fx="en";
b.log.push(`${me.name} usó ${m.n}: −${r.d} PS${r.ef>1?" (¡súper eficaz!)":r.ef<1?" (poco eficaz)":""}.`);
if(en.hp<=0)enemyDefeated(b);
else{tryStatus(m,en,b);enemyTurn()}render()};
window.useB=k=>{const b=S.battle,me=S.team[0];if(S.items[k]<1)return;S.items[k]--;b.swapMode=false;
me.hp=Math.min(me.maxhp,me.hp+(k==="p"?25:60));b.log.push(`${me.name} recuperó PS con ${k==="p"?"una poción":"una superpoción"}.`);sfx("heal");
enemyTurn();render()};
window.capture=()=>{const b=S.battle,en=b.enemy;if(b.trainer)return;
if(S.team.length>=4&&S.box.length>=STORAGE.cap)return;S.balls--;
const p=Math.min(.9,(1-en.hp/en.maxhp)*0.75+0.2);
if(Math.random()<p){const dest=stash(en);reg(en.name);sfx("capture");
b.log.push(`¡Atrapaste a ${en.name}! ${dest==="equipo"?"Se unió a tu equipo.":"Fue a la base de criaturas."}`);b.over=true;b.caught=true}
else{sfx("escape");b.log.push(`¡${en.name} se escapó de la esfera!`);enemyTurn()}render()};
window.flee=()=>{const b=S.battle;if(b.trainer)return;if(Math.random()<0.7){b.log.push("Escapaste sin problemas.");b.over=true}else{b.log.push("¡No pudiste huir!");enemyTurn()}render()};
window.endB=()=>{const b=S.battle;
if(b.faint){S.team.forEach(c=>{c.hp=c.maxhp;c.st=null});S.zone=PLAYER.respawn[0];S.px=PLAYER.respawn[1];S.py=PLAYER.respawn[2];S.msg=`Despertaste en el centro de curación de ${ZONES[S.zone].name} con el equipo restaurado.`}
else if(b.won){const t=TRAINERS[b.trainer.id];S.beaten[b.trainer.id]=true;S.balls+=t.reward.balls;S.items.p+=t.reward.p;S.items.s+=t.reward.s;S.coins+=t.reward.c;
S.msg=`${t.name} te entregó ${t.reward.balls} esferas${t.reward.p?`, ${t.reward.p} pociones`:""}${t.reward.s?`, ${t.reward.s} superpociones`:""} y ${t.reward.c} monedas.`;
if(t.champion)S.msg=`¡Venciste a ${t.name}! Sos el nuevo campeón de Terravia. `+S.msg}
else if(b.caught)S.msg=`Equipo: ${S.team.map(c=>c.name).join(", ")}.`;
S.battle=null;S.screen="map";render()};

/* ============================================================
   Guardado y carga
   ============================================================ */
function buildSaveCode(){const d={zone:S.zone,px:S.px,py:S.py,team:S.team,box:S.box,balls:S.balls,items:S.items,coins:S.coins,mats:S.mats,bld:S.bld,steps:S.steps,exp:S.exp,beaten:S.beaten,dex:S.dex,egg:S.egg,mounts:S.mounts,snd:S.snd,trade:S.tradeOut};
return btoa(unescape(encodeURIComponent(JSON.stringify(d))))}
window.saveGame=()=>{const code=buildSaveCode();const inp=document.getElementById("savecode");inp.value=code;inp.select();
let msg="Código generado. Copialo y guardalo en un lugar seguro.";
if(navigator.clipboard){navigator.clipboard.writeText(code).then(()=>{document.getElementById("msg").textContent="Código de guardado copiado al portapapeles."}).catch(()=>{})}
document.getElementById("msg").textContent=msg};
/* Saneamiento de códigos de guardado: el estado se reconstruye SOLO con claves que
   existen en el contrato y números acotados. Un código manipulado no puede inyectar
   HTML (los nombres siempre salen de SPECIES/MOVES/etc.) ni corromper el estado. */
function cleanNum(v,def,min,max){v=Number(v);return Number.isFinite(v)?Math.min(max,Math.max(min,Math.round(v))):def}
function cleanCreature(c){if(!c||!SPECIES[c.name])return null;
const lvl=cleanNum(c.lvl,1,1,99);const out=mk(c.name,lvl);
out.maxhp=cleanNum(c.maxhp,out.maxhp,1,9999);
out.hp=cleanNum(c.hp,out.maxhp,0,out.maxhp);
out.atk=cleanNum(c.atk,out.atk,1,9999);
out.xp=cleanNum(c.xp,0,0,1e6);out.next=cleanNum(c.next,lvl*20,1,1e6);
const mv=(Array.isArray(c.mv)?c.mv.filter(m=>MOVES[m]):[]).slice(0,4);
out.mv=mv.length?mv:[...SPECIES[c.name].mv];
out.st=STATUS[c.st]?c.st:null;
if(c.g==="M"||c.g==="F")out.g=c.g;
return out}
window.loadGame=()=>{const v=document.getElementById("loadcode").value.trim();if(!v)return;
try{const d=JSON.parse(decodeURIComponent(escape(atob(v))));
const team=(Array.isArray(d.team)?d.team:[]).map(cleanCreature).filter(Boolean).slice(0,4);
if(!team.length)throw new Error("equipo vacío");
S.team=team;
S.box=(Array.isArray(d.box)?d.box:[]).map(cleanCreature).filter(Boolean).slice(0,STORAGE.cap);
S.balls=cleanNum(d.balls,0,0,999);
S.items={p:cleanNum(d.items&&d.items.p,0,0,999),s:cleanNum(d.items&&d.items.s,0,0,999)};
S.coins=cleanNum(d.coins,0,0,1e9);
S.steps=cleanNum(d.steps,0,0,1e9);
S.mats={};Object.keys(MATERIALS).forEach(k=>{const n=cleanNum(d.mats&&d.mats[k],0,0,1e6);if(n)S.mats[k]=n});
S.bld={};Object.keys(BUILDINGS).forEach(k=>{if(d.bld&&d.bld[k]===true)S.bld[k]=true});
S.beaten={};Object.keys(TRAINERS).forEach(k=>{if(d.beaten&&d.beaten[k])S.beaten[k]=true});
S.dex={};Object.keys(SPECIES).forEach(k=>{if(d.dex&&d.dex[k])S.dex[k]=true});
S.team.concat(S.box).forEach(c=>reg(c.name));
S.mounts=Object.fromEntries(MOUNT_KEYS.map(k=>[k,!!(d.mounts&&d.mounts[k]===true)]));
S.snd=d.snd!==false;
S.tradeOut=null;
if(d.trade&&d.trade.c){const tc=cleanCreature(d.trade.c);
if(tc)S.tradeOut={c:tc,wants:(Array.isArray(d.trade.wants)?d.trade.wants.filter(n=>SPECIES[n]):[]).slice(0,3),
id:(String(d.trade.id||"").replace(/[^a-z0-9]/gi,"").slice(0,12))||Math.random().toString(36).slice(2,8)}}
S.egg=null;
if(d.egg&&SPECIES[d.egg.sp]){const emv=(Array.isArray(d.egg.mv)?d.egg.mv.filter(m=>MOVES[m]):[]).slice(0,2);
S.egg={sp:d.egg.sp,mv:emv.length?emv:[...SPECIES[d.egg.sp].mv],hp:cleanNum(d.egg.hp,0,0,99),atk:cleanNum(d.egg.atk,0,0,99),steps:cleanNum(d.egg.steps,0,0,999)}}
S.exp=null;
if(d.exp&&BIOMES[d.exp.biome]){const ec=cleanCreature(d.exp.c);
if(ec)S.exp={c:ec,biome:d.exp.biome,steps:cleanNum(d.exp.steps,0,0,999)}}
const Z=ZONES[d.zone];const px=cleanNum(d.px,-1,0,999),py=cleanNum(d.py,-1,0,999);
const ch=Z&&(Z.map[py]||[])[px];
if(ch&&!(TILES[ch]&&TILES[ch].solid)){S.zone=d.zone;S.px=px;S.py=py}
else{S.zone=PLAYER.start[0];S.px=PLAYER.start[1];S.py=PLAYER.start[2]}
S.screen="map";S.battle=null;S.msg="Partida cargada. ¡Bienvenido de vuelta!";render()}
catch(e){document.getElementById("loadcode").value="Código inválido"}};

render();
