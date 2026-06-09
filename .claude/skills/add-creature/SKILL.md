---
name: add-creature
description: Agrega una especie nueva a Terravia editando solo GAME.md, respetando balance y validación. Usar cuando el usuario quiera crear/agregar una criatura o especie al juego.
---

# Agregar una criatura

Todo ocurre en `GAME.md` (tokens YAML del front-matter). No tocar `game.js` ni `game-data.generated.js`.

## Pasos

1. **Diseñá la especie** dentro de los límites duros (los aplica el lint, regla `balance-species`):

   | Campo | Límite |
   |---|---|
   | `hp` | 30–70 |
   | `atk` | 8–18 |
   | Presupuesto | `hp + 3×atk ≤ 110` (no se puede maximizar todo) |
   | `mv` | 1–4 claves existentes de `moves` |
   | `t` | `fuego`, `agua`, `planta` o `normal` |

   Guía de nicho: pasto `G` ≈ hp 36–44 / atk 9–11 · bosque `B` ≈ 46–52 / 12–14 · montaña `M` y lago `A` ≈ 46–62 / 11–15. Nombre original en español rioplatense, sin marcas registradas.

2. **Agregá el bloque** en `species` (una línea, mapa de flujo — sin comas dentro de los valores):

   ```yaml
   Rocopa:    { t: normal, hp: 48, atk: 12, mv: [placaje, aturdir], habitats: [M] }
   ```

   - `habitats`: biomas donde aparece salvaje (`G`/`B`/`M`/`A`); puede tener varios; sin él, solo se obtiene por evolución o crianza.
   - Evolución opcional: `evo: OtraEspecie, evoLvl: 12` (la evolución debe existir como especie y mejorar los stats de la base).
   - No uses `starter: true` (los iniciales son 3 y ya están).

3. **Descripción obligatoria** en el bloque `descriptions` (acá las comas SÍ están permitidas — es valor de bloque):

   ```yaml
   Rocopa: Un topo de roca que colecciona piedritas brillantes, una por cada túnel terminado.
   ```

   Una línea de lore, tono del resto del dex.

4. **(Opcional) Movimiento nuevo** en `moves`: `{ n, t, p: 30–60, st?: burn|par, sc?: ≤0.4 }`. Si inflige estado, `st` y `sc` van juntos.

5. **(Opcional) Retrato dibujado** en `art`: matriz 12×12 exacta, valores 0–5 (0 transparente, 1 color del tipo, 2 sombra, 3 claro, 4 oscuro/ojos, 5 blanco). Sin entrada, recibe pixel art procedural automático. Referencia: `Flarito`.

6. **Validá y regenerá** (obligatorio, en este orden):

   ```
   node tools/game-lint.js
   node tools/game-export.js
   node tests/run.js
   ```

## Checklist de aceptación

- [ ] Lint sin errores (presta atención a `balance-species`, `species-valid`, `species-desc`)
- [ ] `game-data.generated.js` regenerado y commiteado (el CI verifica drift)
- [ ] Suite en verde
- [ ] Si tiene `habitats`, el bioma existe y la criatura tiene sentido para su rango de niveles
- [ ] El dex contará la especie automáticamente (no hay listas manuales que actualizar)
