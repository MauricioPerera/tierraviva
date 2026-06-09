# Terravia RPG

RPG por turnos en HTML, CSS y JavaScript vanilla, sin dependencias de build. Explorás un mundo de zonas conectadas (pueblos, rutas, ciudad, bosque, lago y montaña), encontrás criaturas salvajes, las combatís o capturás, subís de nivel, evolucionás, criás y enfrentás entrenadores. Todas las criaturas son originales.

## Cómo jugar

Abrí `index.html` en cualquier navegador moderno. No requiere servidor ni instalación. La única dependencia externa es la webfont de Tabler Icons servida por CDN, así que necesitás conexión a internet para ver los íconos (el juego funciona igual sin ellos).

Controles: flechas del teclado o los botones en pantalla para moverte. Todo lo demás es por clic.

Los retratos de las criaturas son **pixel art procedural** generado en el navegador: una silueta determinista por especie (simetría especular, ojos, paleta según su tipo), sin un solo archivo de imagen. El mapa tiene texturas y animaciones por CSS (agua ondulante, salidas que laten, salto al caminar) y el combate muestra sacudidas al recibir daño, desmayos y barras de PS que pulsan en estado crítico — todo respeta `prefers-reduced-motion`.

Hay música y efectos de sonido sintetizados con Web Audio (sin archivos de audio): tema de mapa, tema de batalla y tonos por evento (golpes, capturas, subidas de nivel, etc.), todos declarados en el contrato. El botón de altavoz del mapa silencia todo; la preferencia viaja en el código de guardado. Por política de los navegadores, el audio arranca con tu primera interacción.

## Mecánicas

Elegís una de tres criaturas iniciales: Flarito (fuego), Aquino (agua) o Brotín (planta). El triángulo de tipos es el clásico: fuego supera a planta, planta a agua, agua a fuego. Los movimientos del mismo tipo que la criatura reciben un bonus del 30% (STAB).

En combate podés atacar, usar pociones (+25 PS) o superpociones (+60 PS), cambiar de criatura (gasta el turno, salvo cuando la activa se debilita), tirar una esfera de captura o huir. La probabilidad de captura sube cuanto más debilitado esté el rival, con tope del 90%. El equipo admite hasta 4 criaturas; las capturas con el equipo lleno van a la base.

### Base de criaturas

En Pueblo Brote (casilla celeste con caja) está la base, con capacidad para 24 criaturas. Ahí depositás y retirás miembros del equipo libremente, con una sola regla: siempre debe quedar al menos una criatura sana en el equipo. Las capturas, las eclosiones de huevo y los retornos de expedición desbordan automáticamente a la base cuando el equipo está lleno; capturar solo se bloquea si equipo y base están llenos. La capacidad es un token del contrato (`storage.cap`).

### El mundo

Seis zonas conectadas por casillas de salida (violetas con pin):

- **Pueblo Brote** — el inicio. Tiene el centro de curación (restaura PS y estados al pasar), el criadero, el puesto de expediciones y la base de criaturas.
- **Ruta 1** — pasto con criaturas débiles (niveles 3 a 6) y la entrenadora Lía.
- **Ciudad Terral** — la tienda, el taller de crafteo, otro centro de curación y el entrenador Bruno.
- **Bosque Umbrío** — especies más fuertes (niveles 7+) y Sora, la jefa del bosque.
- **Lago Azur** — agua profunda: solo se cruza con la montura acuática. Especies acuáticas (niveles 8+), incluidas Ondino y Coralix, que no aparecen en otro lado.
- **Monte Magna** — al otro lado del lago, especies de élite (niveles 10+): Magmoz, Cascadón, Zarzudo y Rocaroz. La campeona espera rodeada de rocas escarpadas.

Si todo tu equipo se debilita, despertás en el centro de curación de Pueblo Brote.

### Monturas

La tienda de Ciudad Terral vende dos monturas, compra única:

- **Montura acuática** (120 monedas) — permite moverte por las casillas de agua del Lago Azur, donde hay encuentros acuáticos y el paso hacia el monte.
- **Montura montés** (160 monedas) — permite escalar las rocas del Monte Magna que rodean a la campeona.

### Efectos de estado

Algunos movimientos infligen estados, marcados con una etiqueta junto al nombre de la criatura:

- **Quemadura (QUE)**: los movimientos de fuego (Ascuas 10%, Llamarada 20%, Colmillo ígneo 30%) pueden quemar. La criatura quemada pierde ~1/12 de sus PS máximos al final de cada ronda.
- **Parálisis (PAR)**: Esporas (35%) y Aturdir (30%) pueden paralizar. La criatura paralizada tiene 25% de probabilidad de perder su turno.

Un estado dura hasta curarse en el centro de curación o hasta que la criatura se debilite. Una criatura solo puede tener un estado a la vez.

### Crianza

Cada criatura tiene género (♂/♀), asignado al azar. En el criadero (casilla del huevo, en Pueblo Brote) podés elegir dos criaturas del equipo de distinto género para que dejen un huevo. Solo puede incubarse un huevo a la vez, y eclosiona después de 24 pasos por el mundo.

La cría combina la información de ambos progenitores: nace al nivel 5 con la especie (en su forma base) de uno de los dos al azar, hereda un movimiento de cada padre —puede aprender así movimientos que su especie no conoce— y recibe un bonus de PS y ataque proporcional a los stats de los padres. Si el equipo está lleno al momento de eclosionar, el huevo espera hasta que haya lugar. Los padres no se gastan: siguen en el equipo.

### Lista de criaturas

El botón "Criaturas" del mapa abre el registro con las 20 especies del juego. Las capturadas (incluida la inicial y las evoluciones obtenidas) muestran su ficha: tipo, stats base y movimientos. Las demás aparecen como "???" hasta que las captures. El progreso se incluye en el código de guardado; al cargar un código viejo se reconstruye a partir del equipo.

### Crafteo

Al vencer una criatura salvaje, con 40% de probabilidad suelta el material de su tipo: ceniza ígnea (fuego), perla de agua (agua), savia (planta) o pelaje suave (normal). En el taller de Ciudad Terral (casilla violeta con herramientas) se convierten en objetos:

- **Poción** = 2 savia + 1 pelaje
- **Superpoción** = 2 perla + 2 ceniza
- **Esfera** = 2 pelaje + 1 perla

Materiales y recetas son tokens del contrato (`materials`/`recipes` en `GAME.md`): agregar una receta no toca el motor.

### Automatización: expediciones y edificios

En el puesto de expediciones de Pueblo Brote (casilla con brújula) podés enviar una criatura del equipo a un bioma (pastizales, bosque, montaña o lago). Deja el equipo, y tras 30 pasos vuelve con monedas (nivel × 1), hasta 3 materiales del bioma y la XP de un combate del nivel base de la zona. Una expedición a la vez, y nunca puede partir tu última criatura sana. Si el equipo está lleno al volver, espera a que haya lugar.

En el taller se compran además edificios de producción automática (compra única, 150 monedas): brasero ígneo (ceniza), draga de perlas (perla), invernadero (savia) y esquiladora (pelaje). Cada uno produce 1 material cada 12 pasos mientras caminás, sin intervención.

Ambas mecánicas son tokens del contrato (`expeditions`/`buildings` en `GAME.md`).

### Monedas y tienda

Vencer criaturas salvajes da monedas (nivel × 2) y los entrenadores pagan recompensas mayores. La tienda (casilla dorada de Ciudad Terral) vende esferas (8), pociones (10), superpociones (25) y las dos monturas.

### Entrenadores y jefa final

Hay tres entrenadores fijos: Lía en la Ruta 1 (fácil, una criatura), Bruno en Ciudad Terral (dos criaturas de fuego) y Sora en el Bosque Umbrío (niveles 11 y 12). En duelos no se puede capturar ni huir. Al ganar entregan esferas, objetos y monedas, y quedan vencidos de forma permanente.

Al vencer a los tres se desbloquea la casilla con corona del Monte Magna: la campeona Magna, con tres criaturas de élite (niveles 14 a 16). Llegar hasta ella exige además ambas monturas (cruzar el lago y escalar las rocas). Vencerla te corona campeón de Terravia y paga la mayor recompensa del juego.

Las criaturas iniciales evolucionan al nivel 12 con mejora de stats y nuevo set de movimientos: Flarito a Flaranto, Aquino a Aquantor y Brotín a Brotalón.

## Guardado

El botón "Guardar partida" genera un código (JSON serializado en base64) que se copia al portapapeles. Para retomar, pegalo en el campo de carga de la pantalla inicial. No usa localStorage a propósito: el código es portable entre navegadores y dispositivos. Los códigos de versiones anteriores siguen funcionando: lo que falte arranca en su valor por defecto (monedas 0, sin monturas) y, como el mapa viejo ya no existe, reaparecés en Pueblo Brote con el equipo intacto.

## Contrato GAME (contenido como dato)

El contenido del juego sigue la filosofía del [Protocolo GAME](https://github.com/MauricioPerera/game-protocol) con un perfil propio: **`GAME.md` es la fuente de verdad** de especies, movimientos, tipos, estados, entrenadores, tienda, tiles, biomas, crianza, jugador y zonas. El motor (`game.js`) solo implementa comportamiento y **deriva** lo derivable: pools salvajes (de `habitats`), evoluciones (de `evo`/`evoLvl`), formas base, iniciales (de `starter`) y monturas existentes (de los tiles).

Flujo para crear contenido (una criatura, un bioma, una zona entera) sin tocar el motor:

```
1. Editar GAME.md
2. node tools/game-lint.js      ← valida referencias, warps, conectividad, balance
3. node tools/game-export.js    ← regenera game-data.generated.js
```

`game-export.js --check` detecta drift (generado desincronizado del contrato). El motor consume `window.GAME` con **fallback embebido**: si `game-data.generated.js` falta, el juego degrada con gracia a su snapshot interno — el doble clic vía `file://` nunca se rompe. La lógica (fórmulas de daño, captura, herencia, IA) vive en el motor por diseño.

### Intercambio de criaturas

En la base está el puesto de intercambio, que funciona por códigos (como el guardado): elegís una criatura para ofrecer —queda **en depósito**, fuera de tu equipo— y hasta 3 especies que aceptás a cambio (ninguna = cualquiera). Eso genera un código de oferta para pasarle a otra persona. Quien lo recibe ve la ficha completa (stats, movimientos, género, descripción) y su juego **valida la criatura contra su contrato**: especie existente, nivel ≤ `tradeLvlMax`, stats plausibles para el nivel, movimientos y estados reales — lo ilegal se rechaza, no se recorta. Al aceptar entrega una de las especies pedidas y genera el código de cierre; cuando lo pegás, recuperás el control: recibís su criatura y se libera el depósito. Podés cancelar la oferta en cualquier momento y recuperar la tuya.

Límites honestos: el intercambio no es atómico (quien acepta podría no mandarte el cierre — el depósito y la cancelación cubren el caso honesto) y, como los saves son locales, la clonación no es prevenible. La garantía fuerte es de **legalidad**: nada que viole el contrato puede entrar a tu partida.

**Tablón de la federación**: cada mundo puede publicar sus ofertas abiertas en `trades.json` (el puesto te da la entrada lista para agregar vía PR, con tu contacto para recibir el cierre). El CI valida cada oferta publicada con los mismos criterios estrictos del motor — el tablón público solo puede contener ofertas legales. Al explorar un mundo desde "Federación", el juego lee su tablón, re-valida cada oferta contra **tu** contrato (lo que tu mundo no reconoce aparece como no disponible) y te deja llevarla directo al puesto de intercambio.

## Federación de mundos

Cada fork de este repo es un **mundo independiente**: su `GAME.md` define criaturas, zonas y balance propios, y el lint garantiza que sea un mundo válido. El token `federation` declara la identidad del mundo (`worldId`) y sus pares conocidos (`peers`).

Desde el botón "Federación" del mapa podés explorar cualquier mundo por URL: el cliente descarga su contrato, lo **valida con el lint en el navegador** (el linter es isomorfo), muestra qué ofrece, qué criaturas de tu equipo existen allá, y te deja viajar — abre el mundo destino con tu código de guardado en la URL, listo para cargar. Las especies que el destino no declara se descartan al cargar (saneamiento estándar); las partidas muy grandes viajan copiando el código a mano.

Para sumar tu fork a la federación: publicalo en GitHub Pages, poné tu `worldId` en `GAME.md`, y agregá los mundos que conozcas en `peers` (idealmente, pedile a esos mundos vía PR que te listen de vuelta).

## Contribuir

Se aceptan criaturas, movimientos y zonas nuevas vía PR editando solo `GAME.md` — ver [CONTRIBUTING.md](CONTRIBUTING.md). Si trabajás **asistido por un agente de IA** (Claude Code u otro): el repo trae [AGENTS.md](AGENTS.md) con las instrucciones del proyecto, [SPEC.md](SPEC.md) con la especificación formal de cada token del contrato, y skills guiadas en `.claude/skills/` para agregar criaturas (`add-creature`), zonas (`add-zone`) y crear tu propio mundo federado (`create-world`). El lint aplica reglas de balance duras (presupuesto de stats, potencias y probabilidades acotadas, entrenadores con nivel máximo) para que ningún aporte pueda romper el juego, y el CI bloquea el merge si algo falla.

## Estructura

Sin build ni servidor (scripts clásicos, no módulos ES, justamente para que funcione con doble clic vía `file://`):

- `GAME.md` — el contrato: todos los tokens de contenido (YAML) + documentación (Markdown).
- `game-data.generated.js` — compilado del contrato (`window.GAME`); no se edita a mano.
- `index.html` — el esqueleto de la página; carga el generado y el motor.
- `styles.css` — estilos con variables CSS y soporte de modo oscuro vía `prefers-color-scheme`.
- `game.js` — el motor: consumo del contrato con fallback, derivados, estado global, helpers de UI, una sección por pantalla (inicio, mapa, criadero, tienda, lista de criaturas, combate), lógica de combate y guardado.
- `tools/yaml-min.js` — parser YAML mínimo, vendoreado del protocolo (sin dependencias).
- `tools/game-lint.js` — ~25 reglas de validación del perfil tierraviva (referencias, simetría de tipos, biomas con pool, monturas comprables, mapas rectangulares, warps sobre casillas E con destinos caminables, conectividad de zonas por BFS, posiciones del jugador, parámetros de crianza).
- `tools/game-export.js` — compila el contrato a `game-data.generated.js`; `--check` para drift.
- `tests/` — suite headless (Node, sin dependencias): paridad contrato/fallback, mundo, combate, crianza, economía y guardado. Correr con `node tests/run.js` (incluye lint y chequeo de drift).
- `.github/workflows/ci.yml` — CI: lint + drift + suite en cada push.
