---
name: create-world
description: Crea un mundo propio de Terravia (fork del repo, contenido personalizado, GitHub Pages y federación). Usar cuando el usuario quiera su propio mundo, servidor o fork del juego.
---

# Crear tu propio mundo

Un mundo = un fork de este repo con su `GAME.md` propio, publicado en GitHub Pages y federado con otros mundos. El motor, las herramientas y el CI vienen incluidos y no se tocan.

## Pasos

1. **Forkeá el repo** (`gh repo fork MauricioPerera/tierraviva --clone` o desde la web) y clonalo.

2. **Identidad del mundo** en `GAME.md`, token `federation`:

   ```yaml
   federation:
     worldId: mi-mundo            # slug: minúsculas, números y guiones
     peers:
       terravia-prime: { n: Terravia (mundo original), url: "https://mauricioperera.github.io/tierraviva/" }
   ```

   También cambiá `name:` (el título del mundo).

3. **Personalizá el contenido** — todo en `GAME.md`, guiándote por [SPEC.md](../../../SPEC.md):
   - Especies y movimientos propios (skill `add-creature`; respetá `balance`, que es lo que hace a tu mundo confiable para visitantes e intercambios).
   - Zonas y mapa propios (skill `add-zone`; mantené la conectividad).
   - Economía, recetas, expediciones, música: cualquier token.
   - Lo que NO se debe hacer: editar `game-data.generated.js` a mano, aflojar `balance`, o romper la paridad tocando datos embebidos en `game.js`.

4. **Validá localmente** (solo Node, sin npm install):

   ```
   node tools/game-lint.js && node tools/game-export.js && node tests/run.js
   ```

   Nota: si cambiaste mucho contenido, los tests de gameplay pueden referenciar especies/zonas del mundo original — adaptalos o consultá; el lint y la paridad son los innegociables.

5. **Publicá en GitHub Pages**: commit + push, y luego:

   ```
   gh api repos/TU_USUARIO/TU_REPO/pages -X POST --input - <<< '{"source":{"branch":"master","path":"/"}}'
   ```

   (o Settings → Pages → Deploy from a branch → master / root). En ~1 minuto tu mundo vive en `https://TU_USUARIO.github.io/TU_REPO/` y el CI corre en cada push.

6. **Federate**: verificá desde el juego (botón "Federación" → pegá tu URL → el cliente valida tu contrato en el navegador). Después abrí un PR al mundo original (u otros) agregando tu mundo a sus `peers` — y listá los suyos en el tuyo.

## Checklist de aceptación

- [ ] `worldId` propio y lint sin errores
- [ ] Generado regenerado; CI del fork en verde
- [ ] Pages sirviendo el juego y `GAME.md` (probá explorar tu URL desde otro mundo: debe decir "contrato: válido ✓")
- [ ] `peers` apuntando al menos al mundo de origen
- [ ] Los saves de visitantes cargan (las especies que no declares se descartan — es el comportamiento esperado)
