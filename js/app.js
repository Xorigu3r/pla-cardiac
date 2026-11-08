/* Pla Cardíac · app web (PWA). Dades 100 % a l'aparell (localStorage), mateix format que el programa d'escriptori. */
(() => {
const APP_VERSIO = "1.0";
const CREDIT = D.CREDIT;
const KEY = "pc.dades.v1", KEY_BAK = "pc.dades.v1.bak", KEY_COPIA = "pc.copia.", KEY_EXPORT = "pc.ultimaExportacio";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const avui = () => L.avuiIso();
const uid = () => (crypto.randomUUID ? crypto.randomUUID().replace(/-/g, "") : Date.now().toString(16) + Math.random().toString(16).slice(2)).slice(0, 10);
const lsGet = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } };
const EX = Object.fromEntries(D.EXERCICIS.map(e => [e.id, e]));
const slug = t => t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
const figura = ex => `figures/${slug(ex.nom)}.svg`;
const numFmt = v => String(Number(v));            // com el :g de Python

// ------------------------------------------------------------------ Dades
let S = { usuari_actual: "", usuaris: {} };
const ui = { tab: "pla", setmana: 1, mes: "valoracio", graf: "borg", prefill: null };

function normalitza(d) {
  const usuaris = {};
  for (const [nom, u] of Object.entries(d.usuaris || {})) {
    usuaris[nom] = { pautes: (u && u.pautes) || L.pautesPerDefecte(), sessions: (u && Array.isArray(u.sessions)) ? u.sessions : [],
      valoracions: (u && Array.isArray(u.valoracions)) ? u.valoracions : [] };
    for (const k of ["sessions", "valoracions"]) usuaris[nom][k].forEach(x => { if (!x.id) x.id = uid(); });
  }
  let actual = d.usuari_actual || "";
  if (!(actual in usuaris)) actual = Object.keys(usuaris)[0] || "";
  return { usuari_actual: actual, usuaris };
}
function validaCopia(d) {
  if (!d || typeof d !== "object" || !d.usuaris || typeof d.usuaris !== "object" || Array.isArray(d.usuaris))
    throw new Error("Aquest fitxer no és una còpia de Pla Cardíac.");
}
function carrega() {
  for (const k of [KEY, KEY_BAK]) {
    const t = lsGet(k); if (!t) continue;
    try { const d = JSON.parse(t); validaCopia(d); S = normalitza(d); return; } catch (e) { /* prova la següent */ }
  }
}
function desa() {
  const prev = lsGet(KEY); if (prev) lsSet(KEY_BAK, prev);
  if (!lsSet(KEY, JSON.stringify(S))) toast("No s'ha pogut desar: l'aparell no té espai o bloqueja l'emmagatzematge.");
  copiaDiaria();
}
function copiaDiaria() {
  lsSet(KEY_COPIA + avui(), JSON.stringify(S));
  const c = copies();
  c.slice(0, Math.max(0, c.length - 14)).forEach(x => { try { localStorage.removeItem(KEY_COPIA + x); } catch (e) {} });
}
function copies() {
  const r = [];
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith(KEY_COPIA) && /^\d{4}-\d\d-\d\d$/.test(k.slice(KEY_COPIA.length))) r.push(k.slice(KEY_COPIA.length)); } } catch (e) {}
  return r.sort();
}
const noms = () => Object.keys(S.usuaris);
const U = () => S.usuaris[S.usuari_actual];
const pautesDe = () => Object.assign(L.pautesPerDefecte(), U().pautes || {});
const sessions = () => [...U().sessions].sort((a, b) => (a.data + a.id < b.data + b.id ? -1 : 1));
const valoracions = () => [...U().valoracions].sort((a, b) => (a.data + a.id < b.data + b.id ? -1 : 1));
function estatPla() {
  try { const p = L.validarPautes(pautesDe()); return { p, pla: L.generaPla(p) }; }
  catch (e) { return { error: e.message }; }
}
function afegeixUsuari(nom) {
  nom = (nom || "").trim();
  if (!nom) throw new Error("El nom no pot estar buit.");
  if (nom in S.usuaris) throw new Error(`Ja existeix l'usuari «${nom}».`);
  S.usuaris[nom] = { pautes: L.pautesPerDefecte(), sessions: [], valoracions: [] };
  if (!S.usuari_actual) S.usuari_actual = nom;
}

// ------------------------------------------------------------------ Utilitats UI
let toastT;
function toast(t) { const e = $("#toast"); e.textContent = t; e.classList.remove("hidden"); clearTimeout(toastT); toastT = setTimeout(() => e.classList.add("hidden"), 3600); }
function modal(html) { const m = $("#modal"); m.innerHTML = `<div class="sheet"><button class="close" id="mClose" aria-label="Tancar">×</button>${html}</div>`; m.classList.remove("hidden"); $("#mClose").onclick = tanca; }
function tanca() { $("#modal").classList.add("hidden"); $("#modal").innerHTML = ""; }
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") tanca(); });
function intOpcional(text, nom, mini, maxi) {          // _int_opcional del programa
  text = String(text ?? "").trim();
  if (!text) return null;
  const num = L.extreuNumero(text);
  if (num === null) throw new Error(`«${nom}» ha de ser un número.`);
  const n = L.pyRound(num);
  if (!(mini <= n && n <= maxi)) throw new Error(`«${nom}» ha d'estar entre ${mini} i ${maxi}.`);
  return n;
}
function decOpcional(text, nom, mini, maxi) {          // _dec del programa
  text = String(text ?? "").trim();
  if (!text) return null;
  const n = L.extreuNumero(text);
  if (n === null) throw new Error(`«${nom}» ha de ser un número.`);
  if (!(mini <= n && n <= maxi)) throw new Error(`«${nom}» ha d'estar entre ${mini} i ${maxi}.`);
  return n;
}
const alarmaHTML = () => `<div class="alarm"><b>PARA I AVISA si apareix:</b><ul>${D.SENYALS_ALARMA.map(s => `<li>${esc(s)}</li>`).join("")}</ul><b>Si no cedeix en repòs: truca al 112.</b></div>`;
const iconaEx = cat => cat === "aerobic" ? '<path d="M3 12h4l2-6 4 12 2-6h6"/>'
  : cat === "forca" ? '<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>'
  : cat === "flexibilitat" ? '<path d="M5 19c4-1 6-5 7-9M12 10l3-5M12 10l4 3"/><circle cx="16" cy="4" r="1.5"/>'
  : cat === "respiracio" || cat === "relaxacio" ? '<path d="M4 9h10a3 3 0 1 0-3-3M4 15h14a3 3 0 1 1-3 3"/>'
  : cat === "equilibri" ? '<path d="M12 3v18M7 21h10M5 8h14"/>' : '<circle cx="12" cy="12" r="7"/><path d="M12 8v4l3 2"/>';

// ------------------------------------------------------------------ Barra d'usuaris
function renderUsuaris() {
  const b = $("#userbar");
  b.innerHTML = noms().length > 1 ? noms().map(u => `<button class="chip ${u === S.usuari_actual ? "on" : ""}" data-u="${esc(u)}">${esc(u)}</button>`).join("") : "";
}
$("#userbar").addEventListener("click", e => {
  const c = e.target.closest("[data-u]"); if (!c) return;
  S.usuari_actual = c.dataset.u; ui.setmana = 1; desa(); render();
});

// ------------------------------------------------------------------ Pautes
function camp(id, text, val, extra = "") {
  return `<div class="fl"><label for="p_${id}">${text}</label><input id="p_${id}" data-p="${id}" inputmode="decimal" value="${esc(val ?? "")}" ${extra}></div>`;
}
function vPautes() {
  const p = pautesDe(), nd = Math.max(1, Math.min(D.MAX_DIES, (p.dies || []).length || 3));
  const dies = Array.from({ length: D.MAX_DIES }, (_, r) => {
    const ll = (p.dies || [])[r] || "casa", tp = (p.tipus_dies || [])[r] in D.TIPUS_SESSIO ? p.tipus_dies[r] : "complet";
    return `<div class="diarow ${r < nd ? "" : "hidden"}" data-dia="${r}"><b>Dia ${r + 1}</b>
      <select data-lloc="${r}">${Object.entries(D.LLOCS).map(([k, v]) => `<option value="${k}" ${k === ll ? "selected" : ""}>${v}</option>`).join("")}</select>
      <select data-tipus="${r}">${Object.entries(D.TIPUS_SESSIO).map(([k, v]) => `<option value="${k}" ${k === tp ? "selected" : ""}>${v}</option>`).join("")}</select></div>`;
  }).join("");
  const ck = (attr, k, txt, on) => `<label class="chk"><input type="checkbox" ${attr}="${k}" ${on ? "checked" : ""}><span>${esc(txt)}</span></label>`;
  return `
  <section class="card"><p class="sub" style="margin:0">Escriu les indicacions del teu <b>cardiòleg o equip de rehabilitació</b>. Sense FC màxima, Borg i la confirmació, no es crea cap pla. El programa no decideix la intensitat: només aplica aquestes pautes.</p></section>
  <section class="card oblig"><h2>Límits fixats pel cardiòleg <small>obligatoris</small></h2>
    ${camp("fc_max_permesa", "FC màxima permesa (bpm)", p.fc_max_permesa)}
    ${camp("borg_max", "Esforç màxim, escala Borg (6-20)", p.borg_max)}
    ${camp("pes_max_kg", "Pes màxim per exercici (kg, opcional)", p.pes_max_kg)}
    ${camp("fc_min_objectiu", "FC mínima objectiu (bpm, opcional)", p.fc_min_objectiu)}
    <div class="fl wide"><label for="p_fase">Fase / diagnòstic (opcional)</label><input id="p_fase" data-p="fase" value="${esc(p.fase ?? "")}"></div></section>
  <section class="card"><h2>Setmanes i dies d'entrenament</h2>
    ${camp("setmanes", "Setmanes de pla", p.setmanes)}
    <div class="fl"><label for="p_ndies">Dies per setmana</label><select id="p_ndies">${Array.from({ length: D.MAX_DIES }, (_, i) => `<option ${i + 1 === nd ? "selected" : ""}>${i + 1}</option>`).join("")}</select></div>
    ${dies}</section>
  <section class="card"><h2>Exercici aeròbic i estiraments</h2>
    ${camp("aer_min_inicial", "Minuts d'aeròbic inicials", p.aer_min_inicial)}
    ${camp("aer_min_final", "Minuts d'aeròbic finals", p.aer_min_final)}
    ${camp("aer_increment_setmanal", "Increment per setmana (min)", p.aer_increment_setmanal)}
    ${camp("estirament_seg", "Durada de cada estirament (s)", p.estirament_seg)}
    ${ck("data-b", "inclou_equilibri", "Incloure exercicis d'equilibri", p.inclou_equilibri !== false)}
    ${ck("data-b", "inclou_respiracio", "Incloure respiració al final", p.inclou_respiracio !== false)}</section>
  <section class="card"><h2>Intensitat i progressió</h2>
    <div class="fl"><label for="p_nivell">Nivell màxim d'exercici</label><select id="p_nivell" style="width:auto;min-width:0">${Object.entries(D.NIVELLS).map(([k, v]) => `<option value="${k}" ${+k === +p.nivell_max ? "selected" : ""}>${v}</option>`).join("")}</select></div>
    ${camp("series_inicials", "Sèries inicials", p.series_inicials)}
    ${camp("series_max", "Sèries màximes", p.series_max)}
    ${camp("reps_min", "Repeticions mínimes", p.reps_min)}
    ${camp("reps_max", "Repeticions màximes", p.reps_max)}
    ${camp("reps_increment_setmanal", "Increment de reps per setmana", p.reps_increment_setmanal)}
    ${camp("descans_entre_series_seg", "Descans entre sèries (s)", p.descans_entre_series_seg)}
    ${camp("escalfament_min", "Escalfament (min)", p.escalfament_min)}
    ${camp("tornada_calma_min", "Tornada a la calma (min)", p.tornada_calma_min)}</section>
  <section class="card"><h2>Exclusions <small>segons el cardiòleg</small></h2>
    ${Object.entries(D.ETIQUETES_RISC).map(([k, t]) => ck("data-evitar", k, "Evitar: " + t, (p.evitar_tags || []).includes(k))).join("")}</section>
  <section class="card"><h2>Material disponible a casa</h2><div class="chk2">
    ${D.MATERIAL_CASA.map(([k, t]) => ck("data-mat", k, t, (p.material_casa || []).includes(k))).join("")}</div></section>
  <section class="card"><h2>Notes del cardiòleg <small>apareixen al pla</small></h2>
    <textarea id="p_notes" data-p="notes_cardiolec">${esc(p.notes_cardiolec ?? "")}</textarea></section>
  <section class="card confirm">
    <label class="chk"><input type="checkbox" id="p_conf" ${p.confirmat ? "checked" : ""}><span><b>Confirmo que aquestes pautes me les ha indicat el cardiòleg o l'equip de rehabilitació</b></span></label>
    <div class="err" id="pErr"></div>
    <button class="btn" id="pGen" style="margin-top:6px">Desar pautes i crear el pla</button></section>`;
}
function formulariAPautes() {                 // _formulari_a_pautes del programa: pautes en brut
  const p = {};
  $$("[data-p]").forEach(i => { p[i.dataset.p] = i.value.trim(); });
  const nd = +$("#p_ndies").value;
  p.nivell_max = +$("#p_nivell").value;
  p.dies = Array.from({ length: nd }, (_, r) => $(`[data-lloc="${r}"]`).value);
  p.tipus_dies = Array.from({ length: nd }, (_, r) => $(`[data-tipus="${r}"]`).value);
  p.inclou_equilibri = $('[data-b="inclou_equilibri"]').checked;
  p.inclou_respiracio = $('[data-b="inclou_respiracio"]').checked;
  p.evitar_tags = $$("[data-evitar]").filter(c => c.checked).map(c => c.dataset.evitar);
  p.material_casa = $$("[data-mat]").filter(c => c.checked).map(c => c.dataset.mat);
  p.notes_cardiolec = $("#p_notes").value.trim();
  p.confirmat = $("#p_conf").checked;
  return p;
}
function liga_pautes() {
  const guarda = () => { U().pautes = formulariAPautes(); desa(); };   // desa en silenci, com el programa
  $("#view").addEventListener("change", guarda);
  $("#p_ndies").onchange = () => { const n = +$("#p_ndies").value; $$("[data-dia]").forEach(r => r.classList.toggle("hidden", +r.dataset.dia >= n)); guarda(); };
  $("#pGen").onclick = () => {
    const brut = formulariAPautes();
    U().pautes = brut; desa();
    try {
      const p = L.validarPautes(brut); L.generaPla(p);
      U().pautes = p; desa();
      ui.tab = "pla"; ui.setmana = 1; render(); window.scrollTo(0, 0);
      toast("Pla creat. Revisa'l amb el teu cardiòleg abans de començar.");
    } catch (e) { $("#pErr").textContent = e.message; }
  };
}

// ------------------------------------------------------------------ Pla
function vPla() {
  const st = estatPla();
  if (st.error) return `<section class="card"><h2>Encara no hi ha pla</h2><div class="msg warn">${esc(st.error)}</div>
    <p class="sub">Omple les pautes que t'ha donat el cardiòleg i marca la confirmació.</p><button class="btn" id="aPautes">Anar a les pautes</button></section>`;
  const { p, pla } = st;
  if (ui.setmana > pla.length) ui.setmana = 1;
  const sem = pla[ui.setmana - 1];
  const dies = sem.dies.map((dia, n) => `
    <section class="card dia"><h2>Dia ${n + 1} · ${esc(D.LLOCS[dia.lloc])} · ${esc(D.TIPUS_SESSIO[dia.tipus])}<button class="btn small" data-apunta="${n + 1}">Apuntar</button></h2>
    ${dia.blocs.map(b => `<div class="bloc"><h3>${esc(b.nom)}</h3>${b.nota ? `<p class="nota">${esc(b.nota)}</p>` : ""}
      ${b.items.map(it => `<button class="ex" data-ex="${it.ex.id}"><span class="num"><svg viewBox="0 0 24 24">${iconaEx(it.ex.cat)}</svg></span>
        <span class="n">${esc(it.ex.nom)}</span><span class="ds">${esc(it.dosi)}</span><span class="in">${esc(it.ex.nota)}</span></button>`).join("")}</div>`).join("")}
    </section>`).join("");
  return `
  <section class="card"><div class="weeks" id="weeks">${pla.map(s => `<button data-s="${s.setmana}" class="${s.setmana === ui.setmana ? "on" : ""}">S${s.setmana}</button>`).join("")}</div>
    <div class="resum">Setmana ${sem.setmana}: força ${sem.series} × ${sem.reps} · aeròbic ${sem.aer_min} min · ${esc(L.textFc(p))} · Borg màx. ${p.borg_max} · descans ${p.descans_entre_series_seg} s.</div>
    <p class="sub" style="margin:8px 0 0">Toca un exercici per veure com es fa, amb dibuixos pas a pas.</p></section>
  ${dies}
  <section class="card">${alarmaHTML()}
    <div class="acts" style="grid-template-columns:1fr 1fr"><button class="btn" id="plaPdf">Pla en PDF</button><button class="btn sec" id="plaHtml">Desar HTML</button></div>
    <p class="sub" style="margin:8px 0 0">El pla l'ha de revisar el teu cardiòleg o equip de rehabilitació abans de començar.</p></section>`;
}
function liga_pla() {
  const a = $("#aPautes"); if (a) { a.onclick = () => { ui.tab = "pautes"; render(); }; return; }
  $("#weeks").onclick = e => { const b = e.target.closest("[data-s]"); if (!b) return; ui.setmana = +b.dataset.s; render(); };
  const on = $("#weeks .on"); if (on) on.scrollIntoView({ inline: "center", block: "nearest" });
  $$("[data-ex]").forEach(b => b.onclick = () => obreGuia(b.dataset.ex));
  $$("[data-apunta]").forEach(b => b.onclick = () => { ui.prefill = { setmana: ui.setmana, dia: +b.dataset.apunta }; ui.tab = "seguiment"; render(); window.scrollTo(0, 0); });
  $("#plaPdf").onclick = imprimeixPla;
  $("#plaHtml").onclick = async () => { const st = estatPla(); if (await baixa(`Pla_${nomFitxer(S.usuari_actual)}_${avui()}.html`, plaHTML(st.p, st.pla), "text/html")) toast("Fitxer creat"); };
}

// ------------------------------------------------------------------ Guia d'exercici
function materialTxt(ex) {
  const m = [...ex.material].sort().map(k => D.ETIQ_MATERIAL[k] || k);
  return m.length ? m.join(", ") : "cap (només el teu cos)";
}
function guiaHTML(ex, p) {                       // mateix contingut que guies.exporta_guia
  const d = D.DESC[ex.nom];
  const pes = p && p.pes_max_kg ? `${numFmt(p.pes_max_kg)} kg` : "segons indicació mèdica";
  return `<div class="guia"><div class="meta">${esc(D.APP_NOM)} · Guia d'exercici</div><h3>${esc(ex.nom)}</h3>
    <div class="meta">Lloc: ${esc(D.LLOCS_EX[ex.lloc])} · Tipus: ${esc(D.NOM_CAT[ex.cat])} · Nivell: ${esc(D.NIVELLS[ex.nivell])}</div>
    <div class="meta">Músculs: ${esc(d.musculs)} · Material: ${esc(materialTxt(ex))}</div>
    <img class="fig" src="${figura(ex)}" alt="Dibuix de l'exercici ${esc(ex.nom)}">
    <h4>Com es fa</h4><ol>${d.passos.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
    <p class="resp">Respiració: expira en fer l'esforç i inspira en tornar. Mai aguantis l'aire. Moviment lent i controlat.</p>
    <h4>Evita</h4><p style="margin:0;font-size:14.5px">${esc(d.evitar)}</p>
    ${ex.tags.length ? `<p class="msg warn"><b>Atenció:</b> aquest exercici inclou «${esc([...ex.tags].sort().map(t => D.ETIQUETES_RISC[t]).join(", "))}». Només si el cardiòleg ho permet.</p>` : ""}
    ${p ? `<h4>Els teus límits (indicats pel cardiòleg)</h4><div class="lims">FC màxima: <b>${p.fc_max_permesa} bpm</b> · Esforç màxim (Borg): <b>${p.borg_max}</b> · Pes màxim: <b>${esc(pes)}</b> · Descans entre sèries: <b>${p.descans_entre_series_seg} s</b></div>` : ""}
    <div style="margin-top:12px">${alarmaHTML()}</div>
    <p class="sub">Els dibuixos són esquemàtics. Aquest exercici forma part d'un pla que ha de revisar el teu cardiòleg o equip de rehabilitació.</p></div>`;
}
function obreGuia(id) {
  const ex = EX[id]; if (!ex) return;
  const st = estatPla();
  modal(guiaHTML(ex, st.p) + `<button class="btn sec" id="gPrint" style="margin-top:6px">Imprimir o desar en PDF</button>`);
  $("#gPrint").onclick = () => { const h = guiaHTML(ex, st.p); tanca(); imprimeix(h, `Guia_${slug(ex.nom)}`); };
}

// ------------------------------------------------------------------ Seguiment
function vSeguiment() {
  const pre = ui.prefill || {}; ui.prefill = null;
  const ses = sessions(), st = estatPla(), p = st.p || null;
  const files = [...ses].reverse().map(s => {
    const av = L.avaluaSessio(p, s.borg, s.fc, s.simptomes), cls = s.simptomes ? "alarma" : av.length ? "avis" : "";
    const v = [s.minuts ? `${s.minuts}′ <span>aer.</span>` : "", s.borg ? `Borg ${s.borg}` : "", s.fc ? `♥ ${s.fc}` : "", s.ta ? `TA ${esc(s.ta)}` : ""].filter(Boolean).join(" · ");
    return `<button class="ses ${cls}" data-ses="${s.id}"><div class="d"><b>${L.dataCatala(s.data).slice(0, 5)}</b>${s.setmana ? `S${s.setmana}` : ""}${s.dia ? ` · D${s.dia}` : ""}</div>
      <div class="v">${v || '<span>sense dades</span>'}</div><div>${s.simptomes ? '<span class="tag" style="background:#F8C9C9">Símptomes</span>' : ""}</div>
      ${s.notes ? `<div class="t">${esc(s.notes)}</div>` : ""}</button>`;
  }).join("");
  const amb = ses.filter(s => s.simptomes).length, mins = ses.reduce((a, s) => a + (+s.minuts || 0), 0);
  return `
  <section class="card"><h2>Sessió feta <small>${esc(S.usuari_actual)}</small></h2>
    <div class="grid"><div><label class="f" for="s_data">Data</label><input id="s_data" type="date" value="${pre.data || avui()}"></div>
      <div class="grid" style="gap:8px"><div><label class="f" for="s_setmana">Setmana</label><input id="s_setmana" inputmode="numeric" value="${pre.setmana || ""}"></div>
      <div><label class="f" for="s_dia">Dia</label><input id="s_dia" inputmode="numeric" value="${pre.dia || ""}"></div></div></div>
    <div class="grid3" style="margin-top:8px"><div><label class="f" for="s_minuts">Aeròbic (min)</label><input id="s_minuts" inputmode="numeric"></div>
      <div><label class="f" for="s_borg">Borg (6-20)</label><input id="s_borg" inputmode="numeric"></div>
      <div><label class="f" for="s_fc">Pols màx.</label><input id="s_fc" inputmode="numeric"></div></div>
    <div class="grid" style="margin-top:8px"><div><label class="f" for="s_ta">Tensió (120/80)</label><input id="s_ta" inputmode="text"></div>
      <div><label class="f" for="s_notes">Notes</label><input id="s_notes"></div></div>
    <label class="chk" style="margin-top:6px"><input type="checkbox" id="s_simp"><span>He tingut símptomes (dolor, mareig...)</span></label>
    ${p ? `<p class="sub" style="margin:2px 0 0">Els teus límits: FC màx. ${p.fc_max_permesa} bpm · Borg màx. ${p.borg_max}</p>` : ""}
    <div class="err" id="sErr"></div><button class="btn" id="sAfegeix" style="margin-top:8px">Afegir sessió</button></section>
  <section class="card"><h2>Sessions</h2>
    <div class="kpi"><div><b>${ses.length}</b>sessions</div><div><b>${mins}</b>min d'aeròbic</div><div><b style="${amb ? "color:var(--bad)" : ""}">${amb}</b>amb símptomes</div></div>
    ${ses.length ? files : '<div class="empty">Encara no has apuntat cap sessió.</div>'}
    <button class="btn sec" id="sInf" style="margin-top:10px">Informe per al cardiòleg (PDF)</button></section>`;
}
function liga_seguiment() {
  $("#sAfegeix").onclick = () => {
    let s;
    try {
      s = { data: L.parseData($("#s_data").value), setmana: intOpcional($("#s_setmana").value, "Setmana", 1, 52),
        dia: intOpcional($("#s_dia").value, "Dia", 1, D.MAX_DIES), minuts: intOpcional($("#s_minuts").value, "Minuts d'aeròbic", 0, 300),
        ta: L.parseTa($("#s_ta").value), borg: intOpcional($("#s_borg").value, "Borg", 6, 20), fc: intOpcional($("#s_fc").value, "Pols màxim", 30, 250),
        simptomes: $("#s_simp").checked, notes: $("#s_notes").value.trim() };
    } catch (e) { $("#sErr").textContent = e.message; return; }
    s.id = uid(); U().sessions.push(s); desa();
    ui.prefill = { data: s.data, setmana: s.setmana || "", dia: s.dia || "" };   // com el programa: es queden data, setmana i dia
    const av = L.avaluaSessio(estatPla().p || null, s.borg, s.fc, s.simptomes);
    render();
    if (av.length) modal(`<h3>${av.some(a => a[0] === "alarma") ? "⚠️ Atenció" : "Avís"}</h3>${av.map(([n, t]) => `<div class="msg ${n === "alarma" ? "bad" : "warn"}">${esc(t)}</div>`).join("")}
      ${av.some(a => a[0] === "alarma") ? alarmaHTML() : ""}<button class="btn" id="avOk" style="margin-top:10px">Entesos</button>`), $("#avOk").onclick = tanca;
    else toast("Sessió apuntada");
  };
  $$("[data-ses]").forEach(b => b.onclick = () => {
    const s = U().sessions.find(x => x.id === b.dataset.ses); if (!s) return;
    modal(`<h3>Sessió del ${L.dataCatala(s.data)}</h3><p class="sub">${[s.setmana && `Setmana ${s.setmana}`, s.dia && `dia ${s.dia}`, s.minuts && `${s.minuts} min d'aeròbic`, s.borg && `Borg ${s.borg}`, s.fc && `pols màx. ${s.fc}`, s.ta && `TA ${esc(s.ta)}`].filter(Boolean).join(" · ") || "Sense dades"}${s.simptomes ? "<br><b>Amb símptomes</b>" : ""}${s.notes ? `<br>${esc(s.notes)}` : ""}</p>
      <button class="btn red" id="sDel">Esborrar la sessió</button>`);
    $("#sDel").onclick = () => { if (!confirm("Esborrar la sessió seleccionada?")) return; U().sessions = U().sessions.filter(x => x.id !== s.id); desa(); tanca(); render(); };
  });
  $("#sInf").onclick = imprimeixInforme;
}

// ------------------------------------------------------------------ Evolució (gràfic SVG, com el programa)
const GRAFS = [["borg", "Esforç (Borg)"], ["fc", "Pols màxim (bpm)"], ["minuts", "Minuts d'aeròbic"], ["pes", "Pes (kg)"], ["m6", "Test de 6 minuts (m)"]];
function serie() {
  const k = ui.graf, p = estatPla().p;
  if (k === "pes" || k === "m6") return { punts: valoracions().filter(v => v[k]).map(v => [v.data, +v[k]]), lim: null };
  const lim = p ? (k === "borg" ? p.borg_max : k === "fc" ? p.fc_max_permesa : null) : null;
  return { punts: sessions().filter(s => s[k]).map(s => [s.data, +s[k]]), lim };
}
function grafic() {
  const { punts, lim } = serie();
  if (!punts.length) return '<p class="empty">Encara no hi ha dades per mostrar.</p>';
  const W = 340, H = 230, ml = 34, mr = 12, mt = 16, mb = 26;
  const vals = punts.map(p => p[1]).concat(lim ? [lim] : []);
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const marge = (hi - lo) * .15 || Math.max(1, hi * .1); lo -= marge; hi += marge;
  const X = i => ml + (W - ml - mr) * (punts.length > 1 ? i / (punts.length - 1) : .5);
  const Y = v => mt + (H - mt - mb) * (1 - (v - lo) / (hi - lo));
  let g = "";
  for (let k = 0; k < 5; k++) { const v = lo + (hi - lo) * k / 4; g += `<line class="gl" x1="${ml}" x2="${W - mr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="tx" x="${ml - 5}" y="${Y(v) + 3}" text-anchor="end">${Math.round(v)}</text>`; }
  if (lim) g += `<line x1="${ml}" x2="${W - mr}" y1="${Y(lim)}" y2="${Y(lim)}" stroke="#C62828" stroke-dasharray="6 4" stroke-width="2"/><text x="${W - mr}" y="${Y(lim) - 5}" text-anchor="end" font-size="10" font-weight="700" fill="#C62828">Límit ${Math.round(lim)}</text>`;
  if (punts.length > 1) g += `<polyline fill="none" stroke="var(--blau)" stroke-width="2.5" stroke-linejoin="round" points="${punts.map((p, i) => `${X(i).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ")}"/>`;
  punts.forEach(([d, v], i) => {
    g += `<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="4" fill="${lim && v > lim ? "#C62828" : "var(--blau)"}" stroke="#fff"/>`;
    if (punts.length <= 8 || i % Math.max(1, Math.ceil(punts.length / 6)) === 0) g += `<text class="tx" x="${X(i)}" y="${H - 8}" text-anchor="middle">${L.dataCatala(d).slice(0, 5)}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gràfic d'evolució">${g}</svg>`;
}
function vEvolucio() {
  return `<section class="card"><h2>Evolució <small>${esc(S.usuari_actual)}</small></h2>
    <div class="sub4" id="gSel">${GRAFS.map(([k, t]) => `<button data-g="${k}" class="${k === ui.graf ? "on" : ""}">${t}</button>`).join("")}</div>
    <h2 style="margin:12px 0 4px;color:var(--blau)">${GRAFS.find(g => g[0] === ui.graf)[1]}</h2>${grafic()}
    <p class="sub" style="margin:6px 0 0">${ui.graf === "pes" || ui.graf === "m6" ? "Dades de les valoracions (pestanya Més → Valoració)." : "Dades de les sessions apuntades. En vermell, els valors per sobre del límit del cardiòleg."}</p></section>`;
}
function liga_evolucio() { $("#gSel").onclick = e => { const b = e.target.closest("[data-g]"); if (!b) return; ui.graf = b.dataset.g; render(); }; }

// ------------------------------------------------------------------ Més: valoració, educació, guia, dades
const MES = [["valoracio", "Valoració"], ["educacio", "Educació"], ["guia", "Guia"], ["dades", "Dades"]];
function vMes() {
  const sub = `<div class="sub4" id="mSel">${MES.map(([k, t]) => `<button data-m="${k}" class="${k === ui.mes ? "on" : ""}">${t}</button>`).join("")}</div>`;
  return sub + (ui.mes === "valoracio" ? vValoracio() : ui.mes === "educacio" ? vEducacio() : ui.mes === "guia" ? vGuia() : vDades());
}
function liga_mes() {
  $("#mSel").onclick = e => { const b = e.target.closest("[data-m]"); if (!b) return; ui.mes = b.dataset.m; render(); };
  if (ui.mes === "valoracio") liga_valoracio(); else if (ui.mes === "educacio") $("#eduPdf").onclick = imprimeixEducacio; else if (ui.mes === "dades") liga_dades();
}
function vValoracio() {
  const val = valoracions(), ult = val[val.length - 1], im = ult ? L.imc(ult) : null;
  const files = [...val].reverse().map(v => `<button class="ses" data-val="${v.id}"><div class="d"><b>${L.dataCatala(v.data).slice(0, 5)}</b>${v.data.slice(0, 4)}</div>
    <div class="v">${[v.pes && `${numFmt(v.pes)} kg`, L.imc(v) && `IMC ${L.imc(v)}`, v.fc_repos && `FC ${v.fc_repos}`, v.ta && `TA ${esc(v.ta)}`, v.m6 && `6′ ${v.m6} m`, v.mets && `${numFmt(v.mets)} METs`].filter(Boolean).join(" · ") || "<span>sense dades</span>"}</div>
    <div>${v.risc ? `<span class="tag" style="background:var(--soft);color:var(--txt)">Risc ${esc(v.risc.toLowerCase())}</span>` : ""}</div>${v.notes ? `<div class="t">${esc(v.notes)}</div>` : ""}</button>`).join("");
  return `<section class="card"><h2>Valoració inicial o de control</h2>
    <div class="grid"><div><label class="f" for="v_data">Data</label><input id="v_data" type="date" value="${avui()}"></div>
      <div><label class="f" for="v_risc">Risc (segons l'equip)</label><select id="v_risc">${["", "Baix", "Moderat", "Alt"].map(r => `<option>${r}</option>`).join("")}</select></div></div>
    <div class="grid3" style="margin-top:8px"><div><label class="f" for="v_pes">Pes (kg)</label><input id="v_pes" inputmode="decimal"></div>
      <div><label class="f" for="v_alcada">Alçada (cm)</label><input id="v_alcada" inputmode="decimal"></div>
      <div><label class="f" for="v_fc">FC repòs</label><input id="v_fc" inputmode="numeric"></div></div>
    <div class="grid3" style="margin-top:8px"><div><label class="f" for="v_ta">TA repòs</label><input id="v_ta" placeholder="120/80"></div>
      <div><label class="f" for="v_m6">Test 6 min (m)</label><input id="v_m6" inputmode="numeric"></div>
      <div><label class="f" for="v_mets">Esforç (METs)</label><input id="v_mets" inputmode="decimal"></div></div>
    <div style="margin-top:8px"><label class="f" for="v_notes">Notes</label><input id="v_notes"></div>
    ${im ? `<p class="sub" style="margin:8px 0 0"><b>Última IMC: ${im}</b></p>` : ""}
    <div class="err" id="vErr"></div><button class="btn" id="vAfegeix" style="margin-top:8px">Afegir valoració</button></section>
  <section class="card"><h2>Valoracions</h2>${val.length ? files : '<div class="empty">Encara no hi ha cap valoració.</div>'}</section>`;
}
function liga_valoracio() {
  $("#vAfegeix").onclick = () => {
    let v;
    try {
      v = { data: L.parseData($("#v_data").value), pes: decOpcional($("#v_pes").value, "Pes", 20, 300), alcada: decOpcional($("#v_alcada").value, "Alçada", 100, 230),
        fc_repos: intOpcional($("#v_fc").value, "FC de repòs", 30, 150), ta: L.parseTa($("#v_ta").value), m6: intOpcional($("#v_m6").value, "Test de 6 minuts", 0, 1500),
        mets: decOpcional($("#v_mets").value, "METs", 1, 25), risc: $("#v_risc").value, notes: $("#v_notes").value.trim() };
    } catch (e) { $("#vErr").textContent = e.message; return; }
    v.id = uid(); U().valoracions.push(v); desa(); toast("Valoració afegida"); render();
  };
  $$("[data-val]").forEach(b => b.onclick = () => {
    if (!confirm("Esborrar la valoració seleccionada?")) return;
    U().valoracions = U().valoracions.filter(x => x.id !== b.dataset.val); desa(); render();
  });
}
function vEducacio() {
  return `<section class="card edu"><h2>Guia educativa de rehabilitació cardíaca</h2>
    ${D.TEMES.map(([t, ps]) => `<h4>${esc(t)}</h4><ul>${ps.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`).join("")}
    <p class="sub">Informació general: no substitueix el criteri del teu cardiòleg o equip de rehabilitació.</p>
    <button class="btn sec" id="eduPdf">Imprimir o desar en PDF</button></section>`;
}
function vGuia() {
  const funcions = [
    ["Pautes", "Escriu les indicacions del cardiòleg: FC màxima, Borg màxim, aeròbic, dies i tipus de sessió (aeròbic + força, només aeròbic, només força o flexibilitat), exclusions i material. Sense FC màxima, Borg i la confirmació, no es genera cap pla."],
    ["Pla", "Cada sessió té blocs: escalfament, aeròbic, força, equilibri, tornada a la calma i estiraments, respiració i relaxació. Toca un exercici per veure'n la guia amb dibuixos pas a pas. El pla es pot desar en PDF o HTML."],
    ["Seguiment", "Apunta cada sessió (minuts d'aeròbic, Borg, pols màxim, tensió, símptomes). L'app avisa si superes els límits. Pots crear un informe PDF per portar al cardiòleg."],
    ["Evolució", "Gràfics del Borg, el pols, els minuts d'aeròbic, el pes i el test de 6 minuts."],
    ["Valoració", "Registra la valoració inicial i les de control: pes, alçada (IMC), FC i TA de repòs, test de 6 minuts, METs i risc."],
    ["Educació", "Guia general sobre alimentació, tabac, medicació, estat d'ànim, retorn a la feina, etc."],
    ["Dades", "Les dades es guarden només en aquest aparell. Fes còpies .json: són el mateix format que el programa d'escriptori Pla Cardíac, i hi pots passar les dades en tots dos sentits."],
  ];
  const borg = [[6, "Cap esforç"], [9, "Molt lleuger"], [11, "Lleuger"], [13, "Una mica dur"], [15, "Dur"], [17, "Molt dur"], [19, "Extremadament dur"], [20, "Màxim"]];
  return `
  <section class="card"><h2>Senyals d'alarma</h2>${alarmaHTML()}</section>
  <section class="card"><h2>Escala de Borg <small>esforç percebut, 6-20</small></h2><div class="borg">${borg.map(([n, t]) => `<div><b>${n}</b>${t}</div>`).join("")}</div>
    <p class="sub" style="margin:8px 0 0">El límit el fixa el teu cardiòleg.</p></section>
  <section class="card"><h2>Important</h2><ul class="pl">${D.GUIA_IMPORTANT.map(t => `<li>${esc(t)}</li>`).join("")}</ul></section>
  <section class="card"><h2>Funcions de l'app</h2><dl>${funcions.map(([a, b]) => `<dt>${a}</dt><dd>${b}</dd>`).join("")}</dl></section>
  <section class="card"><h2>Sobre l'app</h2><p class="sub" style="margin:0">Pla Cardíac web v${APP_VERSIO} (mateixes regles que el programa d'escriptori v${esc(D.VERSIO_PROGRAMA)}) · ${esc(CREDIT)}<br>Aquesta eina no substitueix el criteri mèdic.</p></section>`;
}

// ---- dades i còpies
async function baixa(nom, text, mime) {
  const blob = new Blob([text], { type: mime });
  try {
    const f = new File([blob], nom, { type: mime });
    if (navigator.canShare && navigator.canShare({ files: [f] })) { await navigator.share({ files: [f], title: nom }); return true; }
  } catch (e) { if (e && e.name === "AbortError") return false; }
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nom;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return true;
}
const nomFitxer = t => (t || "pla").replace(/[^\p{L}\p{N}_-]+/gu, "_").replace(/^_+|_+$/g, "") || "pla";
function vDades() {
  const cp = copies().reverse();
  return `
  <section class="card"><h2>Usuaris</h2>
    ${noms().map(u => `<div class="urow"><span>${esc(u)} <small class="muted">· ${S.usuaris[u].sessions.length} sessions</small></span><button class="btn sec small" data-ren="${esc(u)}">Canviar nom</button></div>`).join("")}
    <button class="btn sec" id="uNou" style="margin-top:10px">+ Afegir usuari</button></section>
  <section class="card"><h2>Còpia de seguretat</h2><div class="stack">
    <button class="btn" id="bJson">Desar còpia (.json)</button>
    <label class="btn sec" for="fImp" style="cursor:pointer">Restaurar una còpia…</label>
    <input type="file" id="fImp" accept=".json,application/json" class="hidden"></div>
    <p class="sub" style="margin:10px 0 0">És el mateix format que el programa d'escriptori (Documents\\PlaCardiac\\dades.json): pots passar les dades en tots dos sentits.</p></section>
  <section class="card"><h2>Còpies automàtiques <small>${cp.length}</small></h2>
    ${cp.length ? cp.map(c => `<div class="urow"><span>${L.dataCatala(c)}</span><button class="btn sec small" data-rest="${c}">Restaurar</button></div>`).join("") : '<p class="sub" style="margin:0">Encara no n\'hi ha. Es fa una còpia cada dia que desis dades (en queden 14).</p>'}
    <p class="sub" style="margin:10px 0 0">Aquestes còpies viuen al mateix aparell: no et protegeixen si el perds o s'esborren les dades del navegador. Desa de tant en tant una còpia .json fora.</p></section>`;
}
function liga_dades() {
  $$("[data-ren]").forEach(b => b.onclick = () => {
    const vell = b.dataset.ren, nou = (prompt("Nou nom per a l'usuari:", vell) || "").trim();
    if (!nou || nou === vell) return;
    if (nou in S.usuaris) return toast(`Ja existeix l'usuari «${nou}».`);
    S.usuaris = Object.fromEntries(Object.entries(S.usuaris).map(([k, v]) => [k === vell ? nou : k, v]));
    if (S.usuari_actual === vell) S.usuari_actual = nou; desa(); render();
  });
  $("#uNou").onclick = () => {
    try { const n = (prompt("Nom del nou usuari:") || "").trim(); if (!n) return; afegeixUsuari(n); S.usuari_actual = n; desa(); render(); }
    catch (e) { toast(e.message); }
  };
  $("#bJson").onclick = async () => { if (await baixa(`dades_${avui()}.json`, JSON.stringify(S, null, 2), "application/json")) { lsSet(KEY_EXPORT, avui()); renderAvis(); toast("Còpia desada"); } };
  $("#fImp").onchange = async e => {
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    try {
      const d = JSON.parse(await f.text()); validaCopia(d);
      const n = Object.keys(d.usuaris).length;
      if (!confirm(`La còpia té ${n} usuari${n === 1 ? "" : "s"}. Les dades actuals se substituiran (abans en guardo una còpia automàtica). Continuar?`)) return;
      lsSet(KEY_COPIA + "abans_" + Date.now(), JSON.stringify(S)); S = normalitza(d); desa(); toast("Còpia restaurada"); render();
    } catch (err) { toast(err instanceof SyntaxError ? "El fitxer no és una còpia vàlida." : err.message); }
  };
  $$("[data-rest]").forEach(b => b.onclick = () => {
    const c = b.dataset.rest, t = lsGet(KEY_COPIA + c); if (!t) return;
    try {
      const d = JSON.parse(t); validaCopia(d);
      if (!confirm(`Restaurar la còpia del ${L.dataCatala(c)}? Abans es guarda l'estat actual.`)) return;
      lsSet(KEY_COPIA + "abans_" + Date.now(), JSON.stringify(S)); S = normalitza(d); desa(); toast("Còpia restaurada"); render();
    } catch (e) { toast("Aquesta còpia no es pot llegir."); }
  });
}

// ------------------------------------------------------------------ Impressió (PDF amb el navegador)
function imprimeix(html, titol) {
  $("#report").innerHTML = html;
  const abans = document.title; document.title = titol;
  const imgs = $$("#report img");
  Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))).then(() =>
    setTimeout(() => { window.print(); setTimeout(() => (document.title = abans), 500); }, 150));
}
const exclosos = p => p.evitar_tags.map(t => D.ETIQUETES_RISC[t]).join(", ") || "cap";
const pesTxt = p => (p.pes_max_kg ? `${numFmt(p.pes_max_kg)} kg` : "segons indicació mèdica");
const intro = p => `Cada sessió: escalfament ${p.escalfament_min} min (caminar suau, mobilitat) · força · tornada a la calma ${p.tornada_calma_min} min (caminar lent, respiració). Respira amb naturalitat: mai aguantis l'aire.`;
function plaCos(p, pla) {                        // mateix contingut que exports.exporta_html
  let o = `<p><b>Pacient:</b> ${esc(S.usuari_actual)} &nbsp; <b>Data:</b> ${L.dataCatala(avui())}</p>
  <div class="pautes"><b>Pautes del cardiòleg aplicades</b><ul><li>FC màxima: <b>${p.fc_max_permesa} bpm</b></li><li>Esforç màxim (Borg): <b>${p.borg_max}</b></li>
  <li>Pes màxim: <b>${esc(pesTxt(p))}</b></li><li>Descans entre sèries: <b>${p.descans_entre_series_seg} s</b></li><li>Exclosos: ${esc(exclosos(p))}</li></ul>
  ${p.fase ? `<p><b>Fase:</b> ${esc(p.fase)}</p>` : ""}${p.notes_cardiolec ? `<p><b>Notes:</b> ${esc(p.notes_cardiolec)}</p>` : ""}</div>
  <div style="margin:10px 0">${alarmaHTML()}</div><p>${esc(intro(p))}</p>`;
  for (const sem of pla) {
    o += `<div class="setmana"><h2>Setmana ${sem.setmana} — força ${sem.series} × ${sem.reps} · aeròbic ${sem.aer_min} min</h2>`;
    sem.dies.forEach((dia, i) => {
      o += `<h3>Dia ${i + 1} · ${D.LLOCS[dia.lloc]} · ${D.TIPUS_SESSIO[dia.tipus]}</h3>`;
      for (const b of dia.blocs) {
        o += `<h4>${esc(b.nom)}</h4>${b.nota ? `<p class="small">${esc(b.nota)}</p>` : ""}<table><tr><th>Exercici</th><th>Dosi</th><th>Indicacions</th></tr>`;
        o += b.items.map(it => `<tr><td>${esc(it.ex.nom)}</td><td>${esc(it.dosi)}</td><td>${esc(it.ex.nota)}</td></tr>`).join("") + "</table>";
      }
    });
    o += "</div>";
  }
  return o + `<p class="small">Generat a partir de les pautes mèdiques. Ha de ser revisat pel cardiòleg o equip de rehabilitació abans d'usar-lo. ${D.APP_NOM} web v${APP_VERSIO}.</p>`;
}
const capcalera = t => `<div class="head"><img src="icons/logo-informe.png" alt=""><h1>${t}</h1></div>`;
function imprimeixPla() {
  const st = estatPla(); if (st.error) return toast(st.error);
  imprimeix(capcalera("Pla de força – recuperació cardíaca") + plaCos(st.p, st.pla), `Pla_${nomFitxer(S.usuari_actual)}_${avui()}`);
}
function plaHTML(p, pla) {
  return `<!DOCTYPE html><html lang="ca"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Pla de força</title><style>
body{font-family:Arial,sans-serif;max-width:820px;margin:20px auto;padding:0 14px;color:#222}
h2{border-bottom:2px solid #1F4E78;padding-bottom:4px;margin-top:1.6em;color:#1F4E78}
table{border-collapse:collapse;width:100%;margin:6px 0 14px}
h4{margin:10px 0 2px;color:#1F4E78}td,th{border:1px solid #bbb;padding:6px 8px;text-align:left;vertical-align:top;font-size:.95em}
th{background:#1F4E78;color:#fff}.alarm{background:#fdecea;border:2px solid #C62828;padding:8px 16px;border-radius:6px}
.pautes{background:#eef6ff;border:1px solid #9bc;padding:8px 14px;border-radius:6px}
.small{color:#555;font-size:.85em}@media print{.setmana{page-break-before:always}}
</style></head><body><h1>Pla de força – recuperació cardíaca</h1>${plaCos(p, pla)}</body></html>`;
}
function imprimeixInforme() {                   // exports.exporta_informe_pdf
  const ses = sessions(), val = valoracions(), p = estatPla().p;
  const c = x => esc(x ?? "");
  let o = capcalera("Informe de seguiment — rehabilitació cardíaca") + `<p>Pacient: ${esc(S.usuari_actual)} &nbsp;&nbsp; Data: ${L.dataCatala(avui())}</p>`;
  if (p) o += `<p>Límits: FC màx. ${p.fc_max_permesa} bpm · Borg màx. ${p.borg_max}</p>`;
  if (val.length) o += `<h2>Valoracions</h2><table><tr>${["Data", "Pes (kg)", "IMC", "FC repòs", "TA repòs", "Test 6 min (m)", "METs", "Risc", "Notes"].map(h => `<th>${h}</th>`).join("")}</tr>${val.map(v =>
    `<tr><td>${L.dataCatala(v.data)}</td><td>${c(v.pes ? numFmt(v.pes) : "")}</td><td>${c(L.imc(v) || "")}</td><td>${c(v.fc_repos || "")}</td><td>${c(v.ta || "")}</td><td>${c(v.m6 || "")}</td><td>${c(v.mets ? numFmt(v.mets) : "")}</td><td>${c(v.risc)}</td><td>${c(v.notes)}</td></tr>`).join("")}</table>`;
  o += `<h2>Sessions</h2><table><tr>${["Data", "Setm.", "Dia", "Aeròbic (min)", "Borg", "Pols màx.", "TA", "Símptomes", "Notes"].map(h => `<th>${h}</th>`).join("")}</tr>${ses.map(s =>
    `<tr class="${s.simptomes ? "bad" : ""}"><td>${L.dataCatala(s.data)}</td><td>${c(s.setmana || "")}</td><td>${c(s.dia || "")}</td><td>${c(s.minuts || "")}</td><td>${c(s.borg || "")}</td><td>${c(s.fc || "")}</td><td>${c(s.ta || "")}</td><td>${s.simptomes ? "SÍ" : "no"}</td><td>${c(s.notes)}</td></tr>`).join("")}</table>`;
  o += `<p class="foot">${ses.length} sessions · ${ses.filter(s => s.simptomes).length} amb símptomes. Generat per ${D.APP_NOM} web v${APP_VERSIO}.</p>`;
  imprimeix(o, `Informe_${nomFitxer(S.usuari_actual)}_${avui()}`);
}
function imprimeixEducacio() {
  imprimeix(capcalera("Guia educativa de rehabilitació cardíaca") + "<p>Informació general. No substitueix el criteri del teu cardiòleg o equip de rehabilitació.</p>" +
    D.TEMES.map(([t, ps]) => `<h2>${esc(t)}</h2><ul>${ps.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`).join(""), "Guia_educativa_rehabilitacio_cardiaca");
}

// ------------------------------------------------------------------ Avís de còpia
function renderAvis() {
  const n = $("#notice"); let h = "";
  const ult = lsGet(KEY_EXPORT), total = noms().reduce((a, u) => a + S.usuaris[u].sessions.length, 0);
  if (total >= 5 && (!ult || (Date.parse(avui()) - Date.parse(ult)) / 864e5 > 14))
    h = `<div class="banner"><span>${ult ? "Fa més de 14 dies de l'última còpia." : "Encara no has desat cap còpia fora de l'aparell."} Una còpia .json et protegeix si el perds.</span><button id="avisCopia">Fer còpia</button></div>`;
  n.innerHTML = h;
  const b = $("#avisCopia"); if (b) b.onclick = () => { ui.tab = "mes"; ui.mes = "dades"; render(); window.scrollTo(0, 0); };
}

// ------------------------------------------------------------------ Render principal
function render() {
  renderUsuaris(); renderAvis();
  $$("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === ui.tab));
  const v = $("#view");
  const nou = v.cloneNode(false); v.replaceWith(nou);         // treu els listeners de la vista anterior
  if (!noms().length) {
    nou.innerHTML = `<section class="card"><h2>Benvingut a Pla Cardíac</h2><p class="sub">Aquesta app crea el teu pla d'exercici a partir de les pautes del teu cardiòleg o equip de rehabilitació. Com vols anomenar l'usuari? Més endavant en pots afegir més.</p>
      <label class="f" for="bNom">Nom</label><input id="bNom" autocomplete="off" placeholder="p. ex. Xavi"><div class="err" id="bErr"></div>
      <button class="btn" id="bOk" style="margin-top:10px">Començar</button></section>
      <section class="card">${alarmaHTML()}<p class="sub" style="margin:10px 0 0">Aquesta eina no substitueix el criteri mèdic.</p></section>`;
    $("#bOk").onclick = () => { try { afegeixUsuari($("#bNom").value); S.usuari_actual = $("#bNom").value.trim(); ui.tab = "pautes"; desa(); render(); } catch (e) { $("#bErr").textContent = e.message; } };
    return;
  }
  const vistes = { pla: [vPla, liga_pla], pautes: [vPautes, liga_pautes], seguiment: [vSeguiment, liga_seguiment], evolucio: [vEvolucio, liga_evolucio], mes: [vMes, liga_mes] };
  const [vista, liga] = vistes[ui.tab];
  nou.innerHTML = vista(); liga();
}
$("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (!b) return; ui.tab = b.dataset.tab; render(); window.scrollTo(0, 0); });

carrega();
if (noms().length && estatPla().error) ui.tab = "pautes";
render();
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
if ("serviceWorker" in navigator && location.protocol === "https:") window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
window.__pc = { get S() { return S; }, L, D };   // per a proves
})();
