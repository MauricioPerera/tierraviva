# SPEC — Contrato GAME de Terravia (perfil tierraviva)

Especificación del contrato de contenido para humanos y agentes de IA. **`GAME.md` es la fuente de verdad**; el motor (`game.js`) implementa comportamiento y deriva lo derivable. Cambiar contenido = editar `GAME.md` y regenerar.

## Pipeline obligatorio

```
1. Editar GAME.md
2. node tools/game-lint.js        ← debe terminar sin errores
3. node tools/game-export.js      ← regenera game-data.generated.js (NUNCA editarlo a mano)
4. node tests/run.js              ← suite completa (incluye paridad y drift)
```

`node tools/game-export.js --check` verifica drift sin escribir. El CI ejecuta los tres pasos en cada push/PR y bloquea el merge si fallan.

## Subconjunto YAML (parser `tools/yaml-min.js`)

- Mapas de bloque con indentación de 2 espacios; mapas/listas de **flujo** (`{ a: 1 }`, `[a, b]`).
- **No hay listas de bloque** (`- item`): toda secuencia va en flujo.
- **Las comas rompen los valores en contexto de flujo** (también entre comillas). Texto con comas → solo como valor de bloque (así funcionan `descriptions`).
- Escalares: números, `true`/`false`, strings (comillas opcionales salvo que empiecen con `{`/`[` o sean `#hex` — convención: los colores van entre comillas).
- Claves con caracteres especiales (`13,4`, `.`) válidas en mapas de bloque.

## Tokens

Todos los tokens listados son **obligatorios** salvo que se indique lo contrario. Los nombres visibles van en español rioplatense.

### `types`
`tipo: { c: "#hex", bg: "#hex", icon: ti-* }` — color, fondo e ícono Tabler. Los tres campos obligatorios.

### `effectiveness`
`tipo: { otroTipo: mult }` — multiplicadores de daño. Solo tipos existentes. Simetría exigida (warn): `a>b = 2` ⇔ `b>a = 0.5`. Lo no declarado vale ×1.

### `status`
`clave: { tag, c, bg, hit }` — efectos de estado. `hit` es plantilla con `{n}` (nombre de la criatura). Mecánica (daño por quemadura, % de parálisis) vive en el motor.

### `moves`
`clave: { n, t, p, st?, sc? }` — nombre visible, tipo existente, potencia, estado opcional (`st` ∈ `status`, exige `sc`).
Límites de balance: `p` ∈ [`powerMin`, `powerMax`] (hoy 30–60); `sc` ∈ (0, `scMax`] (hoy ≤ 0.4).

### `species`
`Nombre: { t, hp, atk, mv: [..], habitats?: [..], evo?, evoLvl?, starter? }`
- `t` ∈ types; `mv`: 1..`maxMoves` (hoy 4) claves de `moves`; `habitats`: biomas donde aparece salvaje (sin él: solo por evolución/crianza); `evo` referencia especie existente y exige `evoLvl > 0`; `starter: true` la ofrece la pantalla inicial (≥1 obligatoria, hay 3).
- Balance: `hp` ∈ [30, 70], `atk` ∈ [8, 18], **presupuesto** `hp + 3×atk ≤ 110`. La evolución debe mejorar stats de su base (warn).

### `descriptions`
`Nombre: texto de una línea.` — **obligatoria para toda especie**, sin huérfanas. Bloque propio porque admite comas.

### `art` (opcional por especie)
`Nombre: [[fila],[..]]` — matriz **12×12 exacta** de enteros 0–5 con paleta semántica por tipo: 0 transparente, 1 color del tipo, 2 sombra, 3 claro, 4 oscuro (ojos/contorno), 5 blanco. Sin entrada → retrato procedural automático. `Flarito` es el ejemplo de referencia.

### `trainers`
`id: { name, team: [[Especie, nivel], ..], reward: { balls, p, s, c }, requires?: [ids], champion?: true }`
- `id` = carácter con que aparece en los mapas (debe estar en exactamente un mapa).
- Niveles ≤ `lvlMax` (hoy 20); `reward` con los 4 campos ≥ 0; `requires` referencia entrenadores existentes; `champion` marca a la jefa final (corona + mensaje).

### `shop`
`clave: { n, pr, ic, mount?, d? }` — precio > 0. `mount` la vuelve compra única que habilita los tiles con ese `mount`. Toda montura exigida por un tile debe venderse en algún lado. Las claves `ball`/`p`/`s` son las que el motor incrementa y las recetas referencian.

### `tiles`
`carácter: { bg, icon?, ic?, solid?, mount?, effect?, screen? }`
- `solid: true` bloquea; `mount` exige esa montura; `effect` ∈ {`heal`}; `screen` ∈ {`shop`, `breed`, `craft`, `expd`, `box`}.
- Los caracteres de entrenador NO van acá (se resuelven contra `trainers`). Texturas/animaciones visuales: CSS por `data-t` en `styles.css`.

### `biomes`
`carácter: { n, rate, base, cap, boost }` — encuentros al pisar ese tile: probabilidad `rate` ∈ (0,1], nivel `R(base, max(cap, nivelLíder + boost))`, `base ≤ cap`. El carácter debe existir en `tiles` y tener ≥1 especie con ese hábitat.

### `materials` / `recipes`
- `materials`: `clave: { n, ic, from: tipo, rate }` — drop por tipo al vencer salvajes, `rate` ∈ (0,1].
- `recipes`: `claveDeShop: { material: cantidad, .. }` — la clave debe ser ítem de tienda no-montura; materiales existentes, cantidades > 0; todo material debería usarse (warn).

### `expeditions` / `buildings`
- `expeditions: { duration, coinsPerLvl, rolls, matChance }` — todos > 0 (`coinsPerLvl` ≥ 0), `matChance` ∈ (0,1].
- `buildings`: `clave: { n, ic, pr, mat, every }` — compra única; produce 1 `mat` (existente) cada `every` pasos.

### `storage`
`{ cap }` — capacidad de la base (> 0).

### `sfx` / `music`
- `sfx`: claves **requeridas por el motor**: `encounter, hit, super, faint, capture, escape, levelup, evolve, heal, buy, hatch, win, warp`. Cada una `{ freq: 20..20000, dur: (0,5], type?: square|triangle|sine|sawtooth, freq2?: 20..20000 }`.
- `music`: requeridos `map` y `battle`. `{ tempo: 40..300, wave: onda, vol: (0,0.2], loop: bool, notes: [MIDI 0..127, ..] }` — corcheas, `0` = silencio.

### `balance`
`{ hpMin, hpMax, atkMin, atkMax, budgetMax, powerMin, powerMax, scMax, lvlMax, maxMoves, tradeLvlMax }` — todos > 0. Define los límites que el lint aplica al resto del contrato y los que el motor usa para validar intercambios (`tradeLvlMax` y plausibilidad de stats). **No aflojar `balance` para que entre contenido nuevo.**

### `breeding`
`{ eggSteps, hatchLvl, hpDiv, atkDiv }` — todos > 0. Herencia: bonus `(statA+statB)/div`.

### `player`
`{ start: [zona, x, y], respawn: [zona, x, y], balls, potions, supers }` — posiciones en casilla caminable; inventario ≥ 0.

### `federation`
`{ worldId, peers: { id: { n, url } } }` — `worldId` slug (`a-z0-9-`); `peers` con URL `https://` que sirva el juego y su `GAME.md`.

### `zones`
```yaml
zonas:
  id:
    name: Nombre visible
    map: ["fila", "fila", ...]     # rectangular; caracteres ∈ tiles ∪ trainers
    warps:
      x,y: [zonaDestino, x, y]     # debe caer sobre casilla E
```
Reglas: toda casilla `E` tiene warp y todo warp cae sobre `E`; destinos en casilla caminable; **todas las zonas alcanzables** desde `player.start` (BFS). El ancho puede variar entre zonas (la grilla se adapta).

## Derivados — NUNCA declararlos a mano

El motor deriva de `species`: pools salvajes (`habitats`), evoluciones (`evo`/`evoLvl`), formas base (inversa), iniciales (`starter`); y de `tiles`: las monturas existentes. No existen listas `WILD_*`, `EVO`, `BASE` ni `STARTERS` en el contrato.

## Fallback embebido y paridad

`game.js` contiene un snapshot de todos los tokens como fallback (degradación sin el generado). El test `test-contract.js` exige **paridad exacta** entre contrato y fallback: si una migración toca tokens, hay que actualizar ambos. Para contenido nuevo normal, NO tocar `game.js`.

## Códigos (interoperabilidad)

Todos base64 de JSON (UTF-8 vía `unescape(encodeURIComponent(..))`):
- **Save**: objeto con `zone, px, py, team, box, balls, items, coins, mats, bld, steps, exp, beaten, dex, egg, mounts, snd, trade`. Al cargar se sanea por lista blanca (lo ilegal se recorta o descarta).
- **Oferta de intercambio**: `{ k: "offer", id, world, c: criatura, wants: [especies] }`.
- **Cierre**: `{ k: "close", id, world, c: criatura }`. Las criaturas recibidas se validan ESTRICTO (`tradeCheck`): se rechazan, no se recortan.
- Viaje federado: hash `#save=<código>` en la URL del mundo destino.

## Tablón de intercambios (`trades.json`)

Cada mundo puede publicar ofertas abiertas en `trades.json` (raíz del repo, junto al juego):

```json
{ "world": "<worldId>", "offers": [ { "code": "<código de oferta>", "contact": "dónde mandar el cierre" } ] }
```

Validado por `node tools/trades-lint.js` (corre en CI): `world` debe coincidir con `federation.worldId`, máximo 50 ofertas, cada `code` debe decodificar a una oferta con id único `[a-z0-9]{4,12}`, mundo coincidente, `wants` existentes (≤3) y criatura que pase los mismos criterios estrictos que `tradeCheck` (la paridad de veredictos se verifica en tests). `contact` opcional, ≤200 caracteres. Publicar/retirar ofertas = PR; el cierre del intercambio usa los códigos de la fase 1. Los clientes federados leen el tablón con `fetch` y re-validan cada oferta **contra su propio contrato** antes de ofrecer aceptarla.
