# Contribuir a Terravia

¡Gracias por querer sumar contenido! El juego está diseñado para que agregar criaturas, movimientos o zonas **no requiera tocar el motor**: todo el contenido vive en [`GAME.md`](GAME.md) como tokens YAML, validados automáticamente.

## Cómo agregar una criatura

1. **Forkeá el repo** y editá `GAME.md`. Agregá tu especie en el bloque `species`:

```yaml
  Rocopa:    { t: normal, hp: 48, atk: 12, mv: [placaje, aturdir], habitats: [M] }
```

   - `t`: tipo existente (`fuego`, `agua`, `planta`, `normal`).
   - `mv`: movimientos del bloque `moves` (podés proponer uno nuevo ahí mismo).
   - `habitats`: en qué biomas aparece salvaje (`G` pastizales, `B` bosque, `M` montaña, `A` lago). Sin `habitats`, solo se obtiene por evolución o crianza.
   - Opcional: `evo`/`evoLvl` para darle evolución, `starter: true` no (los iniciales son 3).

2. **Agregale su descripción** en el bloque `descriptions` (obligatoria, una línea de lore; acá las comas sí están permitidas):

```yaml
  Rocopa: Un topo de roca que colecciona piedritas brillantes, una por cada túnel terminado.
```

3. **(Opcional) Dibujale un retrato** en el bloque `art`: matriz 12×12 con paleta semántica según su tipo — `0` transparente, `1` color del tipo, `2` sombra, `3` claro, `4` oscuro (ojos/contorno), `5` blanco. Sin entrada, recibe un pixel art procedural automático. Mirá `Flarito` como referencia.

4. **Validá y regenerá** (solo necesitás Node, sin `npm install`):

```
node tools/game-lint.js        # valida referencias y balance
node tools/game-export.js      # regenera game-data.generated.js (commitealo)
node tests/run.js              # suite completa
```

5. **Abrí el PR.** El CI corre lint + drift + tests; el merge se bloquea si algo falla. Si te olvidás de regenerar el generado, el chequeo de drift te lo va a decir.

## Reglas de balance (las aplica el lint, no son opinables en el PR)

Para que nadie pueda crear una criatura inmortal o un movimiento que rompa el juego, el bloque `balance` de `GAME.md` define límites duros:

| Regla | Límite actual |
|---|---|
| PS de especie | 30–70 |
| Ataque de especie | 8–18 |
| Presupuesto total `hp + 3×atk` | ≤ 110 (no se puede maximizar todo) |
| Movimientos por especie | ≤ 4 |
| Potencia de movimiento | 30–60 |
| Probabilidad de estado (`sc`) | ≤ 0.4 |
| Nivel de criaturas de entrenador | ≤ 20 |

Además: los tipos forman un triángulo simétrico (x2 ↔ x0.5), todo bioma necesita al menos una especie salvaje, las evoluciones deben mejorar a su forma base, y los mapas/warps deben dejar todas las zonas conectadas (se verifica por BFS).

## Criterios editoriales

- **Criaturas originales**: nombres propios del mundo de Terravia, nada de marcas registradas.
- Español rioplatense en nombres y textos visibles.
- En los valores YAML de flujo no se pueden usar comas (limitación del parser mínimo).

## Qué hacer y qué no

- ✅ Especies, movimientos, recetas, materiales, edificios, zonas nuevas (con sus warps), ajustes de balance argumentados.
- ⚠️ Cambios al motor (`game.js`) o a las herramientas: abrí un issue antes; la frontera dato/código es deliberada.
- ❌ PRs que editen `game-data.generated.js` a mano (se regenera) o que aflojen `balance` para que entre tu criatura.
