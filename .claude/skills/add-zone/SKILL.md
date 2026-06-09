---
name: add-zone
description: Agrega una zona nueva al mundo de Terravia (mapa ASCII, salidas, bioma y especies) editando solo GAME.md. Usar cuando el usuario quiera crear una zona, ruta, pueblo o región nueva.
---

# Agregar una zona

Todo en `GAME.md`. El lint valida conectividad por BFS: una zona inalcanzable rompe el build.

## Pasos

1. **Diseñá el mapa** como lista de filas (rectangular: todas del mismo ancho; 14 es el ancho de las existentes pero puede variar — la grilla se adapta). Caracteres permitidos: los declarados en `tiles` más los ids de `trainers`:

   | Char | Significado |
   |---|---|
   | `T` árboles (sólido) · `h` casa (sólido) | bordes y decoración |
   | `.` camino · `G` pasto · `B` bosque · `M` montaña | terreno (G/B/M con encuentros) |
   | `A` agua (montura acuática) · `R` rocas (montura montés) | terreno con candado |
   | `C` curación · `S` tienda · `H` criadero · `W` taller · `X` expediciones · `P` base | edificios |
   | `E` salida (warp obligatorio) · `1`–`4` entrenadores | conexiones y duelos |

2. **Agregá el bloque** en `zones`:

   ```yaml
   cueva:
     name: Cueva Lumbre
     map: ["TTTTTTTTTTTTTT", "TMMM.MMMM.MMMT", "EM.M.MM.MM.MMT", "TMMMM....MMMMT", "TTTTTTTTTTTTTT"]
     warps:
       0,2: [monte, 11, 5]
   ```

3. **Conectala en ambos sentidos**: agregá una casilla `E` en la zona vecina y su warp de vuelta hacia tu zona. Reglas del lint (`warp-valid`, `zone-connectivity`): toda `E` tiene warp, todo warp cae sobre `E`, el destino es caminable, y todas las zonas se alcanzan desde `player.start`.

4. **(Opcional) Bioma nuevo**: si usás un carácter de terreno propio, declaralo en `tiles` y en `biomes` (`{ n, rate ∈ (0,1], base ≤ cap, boost }`) y dale ≥1 especie con ese hábitat (regla `biome-valid`). Para los biomas existentes alcanza con usar sus caracteres.

5. **(Opcional) Entrenador**: declaralo en `trainers` (niveles ≤ `lvlMax`, `reward` completo) y ubicá su id exactamente una vez en algún mapa.

6. **Validá y regenerá**:

   ```
   node tools/game-lint.js
   node tools/game-export.js
   node tests/run.js
   ```

## Checklist de aceptación

- [ ] Mapa rectangular, solo caracteres declarados (`zone-valid`)
- [ ] Ida y vuelta conectadas; lint sin `zone-connectivity`
- [ ] Si hay bioma: tile + bioma + ≥1 especie con ese hábitat
- [ ] Generado regenerado y suite en verde
- [ ] Caminá la zona en el navegador (abrir `index.html`) para sentir tamaño y densidad de encuentros
