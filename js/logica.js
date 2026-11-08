/* Lògica de Pla Cardíac: validació de pautes, generació del pla i avaluació de sessions.
   Traducció exacta de logic.py del programa d'escriptori (Desktop\PlaCardiac).
   Si canvia una regla, s'ha de canviar als dos llocs i passar eines/prova_logica.py. */
const L = (() => {
  const Dd = (typeof D !== "undefined") ? D : require("./dades.js");
  const C = Dd;
  const EXERCICIS = Dd.EXERCICIS;
  const CAMPS_ENTERS = Dd.CAMPS_ENTERS;          // [clau, etiqueta, mínim, màxim, obligatori]
  const NIVELLS = Object.fromEntries(Object.entries(Dd.NIVELLS).map(([k, v]) => [+k, v]));
  const MATERIAL_CASA = Object.fromEntries(Dd.MATERIAL_CASA);

  // ---------------------------------------------------------------- Ajudes per imitar Python
  const pyRound = x => {                          // round() de Python: les meitats van al parell
    const r = Math.round(x);
    return Math.abs(x % 1) === 0.5 ? 2 * Math.round(x / 2) : r;
  };
  const pyRound1 = x => {                         // round(x, 1)
    const t = x * 10;
    if (Number.isInteger(t * 2) && !Number.isInteger(t)) return pyRound(t) / 10;
    return Number(x.toFixed(1));
  };
  const pyBool = v => !(v === null || v === undefined || v === false || v === 0 || v === "" ||
    (Array.isArray(v) && v.length === 0) || (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0));
  const pyStr = v => (v === null || v === undefined) ? "None" : v === true ? "True" : v === false ? "False" : String(v);
  const pyInt = v => {
    if (typeof v === "boolean") return v ? 1 : 0;
    if (typeof v === "number" && Number.isFinite(v)) return Math.trunc(v);
    if (typeof v === "string" && /^\s*[+-]?\d+\s*$/.test(v)) return parseInt(v, 10);
    throw new Error("int");
  };
  const copia = o => JSON.parse(JSON.stringify(o));
  const pad = n => String(n).padStart(2, "0");
  const has = (o, k) => Object.prototype.hasOwnProperty.call(o, String(k));

  function pautesPerDefecte() { return copia(Dd.PAUTES_DEFECTE); }

  function extreuNumero(text) {
    const m = (pyBool(text) ? pyStr(text) : "").match(/-?\d+(?:[.,]\d+)?/);
    return m ? parseFloat(m[0].replace(",", ".")) : null;
  }

  function aEnter(valor, etiqueta, mini, maxi, obligatori) {
    const text = (valor !== null && valor !== undefined) ? pyStr(valor).trim() : "";
    if (text === "") {
      if (obligatori) {
        const extra = (etiqueta.includes("FC") || etiqueta.includes("Borg")) ? " (l'ha d'indicar el cardiòleg)" : "";
        throw new Error(`Falta el camp «${etiqueta}»${extra}.`);
      }
      return null;
    }
    const num = extreuNumero(text);
    if (num === null) throw new Error(`«${etiqueta}» ha de ser un número.`);
    const n = pyRound(num);
    if (!(mini <= n && n <= maxi)) throw new Error(`«${etiqueta}» ha d'estar entre ${mini} i ${maxi}.`);
    return n;
  }

  function validarPautes(brut) {
    const p = Object.assign(pautesPerDefecte(), brut || {});
    const net = {};
    for (const [k, etiqueta, mini, maxi, obl] of CAMPS_ENTERS) net[k] = aEnter(p[k], etiqueta, mini, maxi, obl);

    if (net.aer_min_final < net.aer_min_inicial) throw new Error("Els minuts d'aeròbic finals no poden ser menys que els inicials.");
    if (pyBool(net.fc_min_objectiu) && net.fc_min_objectiu >= net.fc_max_permesa)
      throw new Error("La FC mínima objectiu ha de ser menor que la FC màxima permesa.");
    if (net.series_max < net.series_inicials) throw new Error("Les sèries màximes no poden ser menys que les inicials.");
    if (net.reps_min > net.reps_max) throw new Error("Les repeticions mínimes no poden ser més que les màximes.");

    const dies = [...(pyBool(p.dies) ? p.dies : [])];
    if (!(1 <= dies.length && dies.length <= C.MAX_DIES)) throw new Error(`Cal entre 1 i ${C.MAX_DIES} dies d'entrenament per setmana.`);
    for (const d of dies) if (!has(C.LLOCS, d)) throw new Error(`Lloc no vàlid: «${pyStr(d)}».`);
    net.dies = dies;
    let tip = [...(pyBool(p.tipus_dies) ? p.tipus_dies : [])];
    tip = tip.concat(Array(dies.length).fill("complet")).slice(0, dies.length);
    for (const t of tip) if (!has(C.TIPUS_SESSIO, t)) throw new Error(`Tipus de sessió no vàlid: «${pyStr(t)}».`);
    net.tipus_dies = tip;
    net.inclou_equilibri = pyBool("inclou_equilibri" in p ? p.inclou_equilibri : true);
    net.inclou_respiracio = pyBool("inclou_respiracio" in p ? p.inclou_respiracio : true);

    let nivell;
    try { nivell = pyInt(p.nivell_max); } catch (e) { throw new Error("Nivell màxim no vàlid."); }
    if (!has(NIVELLS, nivell)) throw new Error("Nivell màxim no vàlid.");
    net.nivell_max = nivell;

    const pes = pyStr(pyBool(p.pes_max_kg) ? p.pes_max_kg : "").trim();
    if (pes) {
      net.pes_max_kg = extreuNumero(pes);
      if (net.pes_max_kg === null) throw new Error("«Pes màxim» ha de ser un número.");
      if (!(0 < net.pes_max_kg && net.pes_max_kg <= 200)) throw new Error("«Pes màxim» ha d'estar entre 0 i 200 kg.");
    } else net.pes_max_kg = null;

    net.evitar_tags = ("evitar_tags" in p ? p.evitar_tags : []).filter(t => has(C.ETIQUETES_RISC, t));
    net.material_casa = ("material_casa" in p ? p.material_casa : []).filter(m => has(MATERIAL_CASA, m));
    net.fase = pyStr(pyBool(p.fase) ? p.fase : "").trim();
    net.notes_cardiolec = pyStr(pyBool(p.notes_cardiolec) ? p.notes_cardiolec : "").trim();
    net.confirmat = pyBool(p.confirmat);
    if (!net.confirmat) throw new Error("Cal marcar la confirmació que aquestes pautes les ha indicat el cardiòleg o l'equip de rehabilitació.");
    return net;
  }

  // ---------------------------------------------------------------- Generació
  function exercicisPermesos(p, lloc) {
    const material = new Set(lloc === "casa" ? p.material_casa : C.MATERIAL_GIMNAS);
    const evitar = new Set(p.evitar_tags);
    return EXERCICIS.filter(e => (e.lloc === lloc || e.lloc === "ambdos") && e.nivell <= p.nivell_max &&
      e.material.every(m => material.has(m)) && !e.tags.some(t => evitar.has(t)));
  }
  function tria(permesos, grup, index, cat = null) {
    const op = permesos.filter(e => e.grup === grup && (cat === null || e.cat === cat));
    return op.length ? op[index % op.length] : null;
  }
  function tries(permesos, grups, index, cat, n) {
    const r = [];
    for (let k = 0; k < n; k++) {
      const e = tria(permesos, grups[k % grups.length], index + Math.floor(k / grups.length), cat);
      if (e && !r.includes(e)) r.push(e);
    }
    return r;
  }
  function seriesReps(p, setmana) {
    let reps = p.reps_min, series = p.series_inicials;
    for (let s = 0; s < setmana - 1; s++) {
      if (reps < p.reps_max) reps = Math.min(p.reps_max, reps + p.reps_increment_setmanal);
      else if (series < p.series_inicials || series < p.series_max) { series += 1; reps = p.reps_min; }
    }
    return [series, reps];
  }
  const minutsAerobic = (p, setmana) => Math.min(p.aer_min_final, p.aer_min_inicial + p.aer_increment_setmanal * (setmana - 1));
  const textFc = p => (pyBool(p.fc_min_objectiu) ? `FC ${p.fc_min_objectiu}-${p.fc_max_permesa} bpm` : `FC fins a ${p.fc_max_permesa} bpm`);
  const item = (ex, dosi) => ({ ex, dosi });
  const bloc = (nom, tipus, items, nota = "") => ({ nom, tipus, items, nota });

  function generaSessio(p, setmana, i, lloc, tipus) {
    const [series, reps] = seriesReps(p, setmana);
    const perm = exercicisPermesos(p, lloc);
    let blocs = [];

    const mob = tries(perm, ["mobilitat"], i, "mobilitat", 3);
    if (tipus !== "flexibilitat")
      blocs.push(bloc("1. Escalfament", "escalfament", mob.map(e => item(e, e.dosi || "1 × 10")),
        `Camina suau o pedaleja a baixa intensitat ${p.escalfament_min} min i fes la mobilitat.`));

    if (tipus === "complet" || tipus === "aerobic") {
      const aer = perm.filter(e => e.cat === "aerobic");
      if (aer.length) {
        const e = aer[i % aer.length], m = minutsAerobic(p, setmana);
        blocs.push(bloc("2. Aeròbic", "aerobic", [item(e, `${m} min · ${textFc(p)} · Borg ≤ ${p.borg_max}`)],
          "Intensitat on puguis parlar. Si superes la FC o el Borg, redueix el ritme."));
      }
    }

    if (tipus === "complet" || tipus === "forca") {
      const f = C.GRUPS_SESSIO.map(g => tria(perm, g, i, "forca")).filter(Boolean);
      const extra = tria(perm, "bracos", i, "forca");
      if (extra) f.push(extra);
      if (f.length)
        blocs.push(bloc("3. Força", "forca", f.map(e => item(e, `${series} × ${reps}`)),
          `Descans ${p.descans_entre_series_seg} s entre sèries. Expira en fer l'esforç.`));
    }

    if ((tipus === "complet" || tipus === "forca") && p.inclou_equilibri) {
      const eq = tries(perm, ["equilibri"], i, "equilibri", 2);
      if (eq.length) blocs.push(bloc("4. Equilibri", "equilibri", eq.map(e => item(e, "2 × 20 s per costat")), "Sempre amb un suport a prop."));
    }

    const est = tries(perm, ["flex_inferior", "flex_superior", "flex_tronc"], i, "flexibilitat", tipus === "flexibilitat" ? 6 : 4);
    if (est.length) {
      const seg = p.estirament_seg;
      blocs.push(bloc(tipus !== "flexibilitat" ? "5. Tornada a la calma i estiraments" : "1. Estiraments",
        "flexibilitat", est.map(e => item(e, `2 × ${seg} s per costat`)),
        `Camina lent ${p.tornada_calma_min} min i estira sense rebotar ni sentir dolor.`));
    }

    if (tipus === "flexibilitat" || p.inclou_respiracio) {
      let r = tries(perm, ["respiracio"], i, "respiracio", 1);
      if (tipus === "flexibilitat") r = r.concat(tries(perm, ["relaxacio"], i, "relaxacio", 1));
      if (r.length) blocs.push(bloc("6. Respiració i relaxació", "respiracio", r.map(e => item(e, e.dosi))));
    }

    if (!blocs.some(b => b.items.length))
      throw new Error(`Amb aquestes pautes no queda cap exercici per al dia ${i + 1} (${C.LLOCS[lloc]}). Revisa el nivell, les exclusions o el material.`);
    blocs = blocs.filter(b => b.items.length);
    blocs.forEach((b, n) => { const k = b.nom.indexOf(". "); b.nom = `${n + 1}. ${k >= 0 ? b.nom.slice(k + 2) : b.nom}`; });
    return { lloc, tipus, blocs };
  }

  function generaPla(p) {
    const pla = [];
    for (let s = 1; s <= p.setmanes; s++) {
      const [series, reps] = seriesReps(p, s);
      const dies = p.dies.map((lloc, i) => generaSessio(p, s, i, lloc, p.tipus_dies[i]));
      pla.push({ setmana: s, series, reps, aer_min: minutsAerobic(p, s), dies });
    }
    return pla;
  }

  // ---------------------------------------------------------------- Seguiment
  function avaluaSessio(p, borg, fc, simptomes) {
    const avisos = [];
    if (simptomes) avisos.push(["alarma", "Has marcat símptomes. Para l'activitat. Si no cedeixen en repòs o són intensos, truca al 112. Comenta-ho amb el teu cardiòleg abans de la propera sessió."]);
    if (p) {
      if (fc !== null && fc !== undefined && fc > p.fc_max_permesa)
        avisos.push(["avis", `El pols màxim (${fc}) supera el límit de ${p.fc_max_permesa} bpm. Redueix la intensitat i comenta-ho amb el cardiòleg.`]);
      if (borg !== null && borg !== undefined && borg > p.borg_max)
        avisos.push(["avis", `L'esforç percebut (${borg}) supera el màxim de Borg ${p.borg_max}. Redueix la intensitat.`]);
    }
    return avisos;
  }

  // ---------------------------------------------------------------- Dates
  function dataValida(y, m, d) {
    const t = new Date(Date.UTC(y, m - 1, d));
    return y >= 1 && t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
  }
  function parseData(text) {
    const t = (text || "").trim();
    const formats = [[/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "dmy"], [/^(\d{4})-(\d{1,2})-(\d{1,2})$/, "ymd"], [/^(\d{1,2})-(\d{1,2})-(\d{4})$/, "dmy"]];
    for (const [re, o] of formats) {
      const m = t.match(re); if (!m) continue;
      const [y, mo, d] = o === "ymd" ? [+m[1], +m[2], +m[3]] : [+m[3], +m[2], +m[1]];
      if (dataValida(y, mo, d)) return `${String(y).padStart(4, "0")}-${pad(mo)}-${pad(d)}`;
    }
    throw new Error(`Data no vàlida: «${t}». Usa el format dd/mm/aaaa.`);
  }
  const dataCatala = iso => { const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; };
  const avuiIso = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

  // ---------------------------------------------------------------- Valoració
  function imc(v) {
    const pes = parseFloat(v && v.pes), alt = parseFloat(v && v.alcada);
    if (!Number.isFinite(pes) || !Number.isFinite(alt) || alt === 0) return null;
    return pyRound1(pes / (alt / 100) ** 2);
  }
  function parseTa(text) {
    const t = (text || "").trim();
    if (!t) return null;
    const m = t.match(/^(\d{2,3})\s*[/-]\s*(\d{2,3})$/);
    if (!m || !(60 <= +m[1] && +m[1] <= 260 && 30 <= +m[2] && +m[2] <= 160)) throw new Error("La tensió arterial ha de tenir el format 120/80.");
    return `${m[1]}/${m[2]}`;
  }

  return { pautesPerDefecte, extreuNumero, validarPautes, exercicisPermesos, seriesReps, minutsAerobic, textFc,
    generaSessio, generaPla, avaluaSessio, parseData, dataCatala, avuiIso, imc, parseTa, pyRound, NIVELLS };
})();
if (typeof module !== "undefined") module.exports = L;
