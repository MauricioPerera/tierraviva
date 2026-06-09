#!/usr/bin/env node
/**
 * run.js — Punto de entrada de la suite: lint del contrato, chequeo de drift y todos los tests.
 * Uso: node tests/run.js
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");

const steps = [
  ["lint del contrato", [path.join(root, "tools", "game-lint.js")]],
  ["drift del generado", [path.join(root, "tools", "game-export.js"), "--check"]],
  ...fs.readdirSync(__dirname).filter(f => f.startsWith("test-") && f.endsWith(".js")).sort()
    .map(f => [f, [path.join(__dirname, f)]]),
];

let failed = 0;
for (const [name, args] of steps) {
  process.stdout.write(`\n== ${name} ==\n`);
  try {
    process.stdout.write(execFileSync(process.execPath, args, { encoding: "utf8" }));
  } catch (e) {
    failed++;
    process.stdout.write((e.stdout || "") + (e.stderr || ""));
    console.log(`** ${name} FALLÓ **`);
  }
}
console.log(failed ? `\nSUITE: ${failed} paso(s) con fallos` : "\nSUITE: todo OK");
process.exit(failed ? 1 : 0);
