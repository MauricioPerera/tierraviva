/**
 * fed-health.js — Chequeo de salud de la federación (informativo, no falla el build).
 * Uso: node tools/fed-health.js
 * Hace fetch del GAME.md de cada peer declarado y de cada entrada del directorio
 * (worlds.json) y reporta cuáles responden. Pensado para el workflow programado:
 * detectar mundos muertos antes de que pudran las listas.
 */
const fs = require('fs');
const path = require('path');
const { splitFrontMatter, parseYamlSubset } = require('./yaml-min');

const root = path.join(__dirname, '..');

async function ping(url) {
  const u = url.endsWith('/') ? url : url + '/';
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const r = await fetch(u + 'GAME.md', { signal: ctrl.signal });
    clearTimeout(timer);
    if (!r.ok) return 'HTTP ' + r.status;
    const txt = await r.text();
    return splitFrontMatter(txt).fm ? null : 'sin front-matter';
  } catch (e) {
    clearTimeout(timer);
    return e.name === 'AbortError' ? 'timeout' : (e.cause && e.cause.code) || e.message;
  }
}

(async () => {
  const { fm } = splitFrontMatter(fs.readFileSync(path.join(root, 'GAME.md'), 'utf8'));
  const fed = (parseYamlSubset(fm).federation) || {};
  const targets = new Map();
  for (const [id, p] of Object.entries(fed.peers || {})) if (p && p.url) targets.set(p.url, `peer ${id}`);
  try {
    const dir = JSON.parse(fs.readFileSync(path.join(root, 'worlds.json'), 'utf8'));
    for (const e of (dir.directory || [])) if (e && e.url) targets.set(e.url, targets.get(e.url) || `directorio ${e.id || '?'}`);
  } catch (e) { /* sin directorio local */ }

  if (targets.size === 0) { console.log('Sin pares ni directorio que chequear.'); return; }
  let down = 0;
  for (const [url, label] of targets) {
    const err = await ping(url);
    if (err) { down++; console.log(`CAÍDO  ${label}: ${url} (${err})`); }
    else console.log(`OK     ${label}: ${url}`);
  }
  console.log(down ? `\n${down}/${targets.size} mundo(s) sin responder — considerá podar las listas.` : `\nFederación sana (${targets.size} mundo(s)).`);
})();
