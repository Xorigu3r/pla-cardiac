// Part JavaScript de eines/prova_logica.py (no s'executa sol).
const fs = require("fs");
const path = require("path");
global.D = require(path.join(__dirname, "..", "js", "dades.js"));
const L = require(path.join(__dirname, "..", "js", "logica.js"));

const casos = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const serialPla = pla => pla.map(s => ({ setmana: s.setmana, series: s.series, reps: s.reps, aer_min: s.aer_min,
  dies: s.dies.map(d => ({ lloc: d.lloc, tipus: d.tipus,
    blocs: d.blocs.map(b => ({ nom: b.nom, tipus: b.tipus, nota: b.nota, items: b.items.map(it => [it.ex.id, it.dosi]) })) })) }));
const err = f => { try { return { ok: f() }; } catch (e) { return { error: e.message }; } };

function executa(p) {
  let net;
  try { net = L.validarPautes(p); } catch (e) { return { error: e.message }; }
  try { return { net, pla: serialPla(L.generaPla(net)) }; } catch (e) { return { net, error: e.message }; }
}
// igualtat estructural (les claus en qualsevol ordre; 2 i 2.0 iguals)
function igual(a, b) {
  if (a === b) return true;
  if (typeof a === "number" && typeof b === "number") return a === b;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => igual(x, b[i]));
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a).sort(), kb = Object.keys(b).sort();
    return igual(ka, kb) && ka.every(k => igual(a[k], b[k]));
  }
  return false;
}

let bons = 0; const dolents = [];
for (const c of casos) {
  let js;
  if (c.tipus === "pla") js = executa(c.entrada);
  else if (c.tipus === "data") js = err(() => L.parseData(c.entrada));
  else if (c.tipus === "ta") js = err(() => L.parseTa(c.entrada));
  else if (c.tipus === "imc") js = L.imc(c.entrada);
  else if (c.tipus === "aval") js = L.avaluaSessio(...c.entrada);
  if (igual(js, c.python)) bons++; else dolents.push({ c, js });
}
console.log(`${bons} de ${casos.length} casos idèntics entre Python i JavaScript.`);
if (dolents.length) {
  for (const { c, js } of dolents.slice(0, 5)) {
    console.log("--- DIFERENT (" + c.tipus + ")");
    console.log("entrada:", JSON.stringify(c.entrada).slice(0, 600));
    console.log("python: ", JSON.stringify(c.python).slice(0, 600));
    console.log("js:     ", JSON.stringify(js).slice(0, 600));
  }
  process.exit(1);
}
