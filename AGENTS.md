# Instrucciones para agentes de IA

Este repo es **Terravia RPG**: un juego en vanilla JS (sin build, corre con doble clic vía `file://`) cuyo contenido vive como **contrato declarativo** en `GAME.md`, siguiendo la filosofía del [Protocolo GAME](https://github.com/MauricioPerera/game-protocol). Si vas a agregar criaturas, zonas, recetas o crear un mundo nuevo: **casi nunca hace falta tocar el motor**.

## Reglas de oro

1. **Contenido = `GAME.md`.** Criaturas, movimientos, zonas, tienda, recetas, audio, balance: todo se declara ahí. Leé [SPEC.md](SPEC.md) para el formato exacto de cada token y sus restricciones.
2. **`game-data.generated.js` NUNCA se edita a mano.** Se regenera con `node tools/game-export.js`.
3. **El motor (`game.js`) es solo comportamiento.** Tocarlo es excepcional (mecánicas nuevas); si una migración cambia tokens, el fallback embebido en `game.js` debe quedar idéntico al contrato (el test de paridad lo exige).
4. **No aflojar `balance`** para que entre tu contenido: los límites son la garantía anti-contenido-roto.
5. **Pipeline obligatorio tras editar el contrato** (sin npm install, solo Node):

```
node tools/game-lint.js        # debe salir sin errores
node tools/game-export.js      # regenerar (commitear el generado)
node tests/run.js              # suite completa
```

## Tareas guiadas (skills)

En `.claude/skills/` hay guías paso a paso que Claude Code carga automáticamente; con otros agentes, leelas como documentos:

- [`add-creature`](.claude/skills/add-creature/SKILL.md) — agregar una especie (stats, descripción, hábitats, arte opcional).
- [`add-zone`](.claude/skills/add-zone/SKILL.md) — agregar una zona al mundo (mapa, warps, bioma).
- [`create-world`](.claude/skills/create-world/SKILL.md) — crear un mundo propio: fork, personalización, GitHub Pages y federación.

## Mapa del repo

| Ruta | Qué es |
|---|---|
| `GAME.md` | El contrato: tokens YAML (front-matter) + documentación. Fuente de verdad. |
| `SPEC.md` | Especificación formal de todos los tokens y sus restricciones. |
| `game.js` | El motor. Consume `window.GAME` con fallback embebido. |
| `game-data.generated.js` | Compilado del contrato. Auto-generado. |
| `index.html`, `styles.css` | Esqueleto y estilos (texturas/animaciones por `data-t`). |
| `tools/yaml-min.js` | Parser YAML mínimo, isomorfo (vendoreado del protocolo). |
| `tools/game-lint.js` | ~45 reglas de validación. Isomorfo (el cliente valida mundos remotos). |
| `tools/game-export.js` | Compila el contrato; `--check` detecta drift. |
| `tests/` | Suite headless (~195 checks). `node tests/run.js`. |
| `.github/workflows/ci.yml` | CI: lint + drift + suite. Bloquea merges rotos. |

## Trampas conocidas

- El parser YAML es un subconjunto: **las comas rompen los valores de flujo** (texto con comas solo como valor de bloque, como `descriptions`); no hay listas de bloque (`- item`).
- Los pools salvajes, evoluciones, formas base e iniciales **se derivan** de `species` — no existen listas manuales que mantener.
- El repo usa LF (`.gitattributes`): no convertir finales de línea, el chequeo de drift compara byte a byte.
- Los saves y códigos de intercambio son del usuario: al cargarlos, el motor sanea por lista blanca; nunca confiar en sus strings para HTML.
