// Pla Cardíac · funcionament sense connexió
// Quan canviïs l'app, puja el número de versió perquè els mòbils agafin la nova.
const VERSION = "placardiac-v3";
const APP = [
  "./",
  "index.html",
  "manifest.json",
  "css/app.css", "marca/marca.css", "marca/Montserrat-ExtraBold.ttf",
  "js/dades.js",
  "js/logica.js",
  "js/app.js",
  "vendor/fonts/pjs-400.woff2",
  "vendor/fonts/pjs-600.woff2",
  "vendor/fonts/pjs-700.woff2",
  "vendor/fonts/pjs-800.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/logo-informe.png",
  "icons/mark-256.png",
  "icons/favicon-64.png",
  "figures/abdominal_en_maquina_suau.svg",
  "figures/abduccio_de_maluc_dempeus.svg",
  "figures/activacio_abdominal_asseguda.svg",
  "figures/aixecar_se_i_seure_a_la_cadira.svg",
  "figures/bicicleta_estatica_casa.svg",
  "figures/bicicleta_estatica_gimnas.svg",
  "figures/bird_dog_brac_i_cama_contraris.svg",
  "figures/bird_dog_sobre_marfega.svg",
  "figures/caminar_a_pas_viu.svg",
  "figures/caminar_peu_davant_peu.svg",
  "figures/cercles_d_espatlles.svg",
  "figures/cercles_de_turmell.svg",
  "figures/cinta_de_caminar.svg",
  "figures/curl_de_biceps_amb_politja.svg",
  "figures/curl_de_cames_dempeus.svg",
  "figures/curl_femoral_maquina.svg",
  "figures/elevacio_de_genoll_asseguda.svg",
  "figures/elevacio_de_talons_dempeus.svg",
  "figures/elevacio_frontal_amb_ampolles_fins_a_l_espatlla.svg",
  "figures/elevacions_laterals_amb_ampolles_fins_a_l_espatlla.svg",
  "figures/elliptica.svg",
  "figures/entrenament_muscular_inspiratori.svg",
  "figures/equilibri_a_una_cama_amb_suport.svg",
  "figures/equilibri_a_una_cama_amb_suport_de_cadira.svg",
  "figures/ergometre_de_bracos.svg",
  "figures/ergometre_de_rem.svg",
  "figures/estirament_d_espatlla_brac_creuat.svg",
  "figures/estirament_d_isquiotibials_assegut.svg",
  "figures/estirament_de_bessons_a_la_paret.svg",
  "figures/estirament_de_flexors_del_maluc.svg",
  "figures/estirament_de_pit_a_la_porta.svg",
  "figures/estirament_de_quadriceps_dempeus.svg",
  "figures/estirament_de_triceps.svg",
  "figures/estirament_lateral_del_coll.svg",
  "figures/extensio_de_maluc_dempeus.svg",
  "figures/extensio_de_quadriceps_maquina.svg",
  "figures/extensio_de_triceps_amb_ampolla_inclinat.svg",
  "figures/extensio_de_triceps_amb_politja.svg",
  "figures/flexio_de_biceps_amb_ampolles.svg",
  "figures/flexions_amb_les_mans_a_la_taula.svg",
  "figures/flexions_inclinades_a_la_paret.svg",
  "figures/gat_camell.svg",
  "figures/genolls_al_pit_estirat.svg",
  "figures/marxa_al_lloc.svg",
  "figures/mobilitat_del_coll.svg",
  "figures/nordic_walking.svg",
  "figures/peus_en_tandem.svg",
  "figures/plank_sobre_la_taula.svg",
  "figures/politja_alta_estirada_al_pit.svg",
  "figures/pont_de_glutis_al_terra.svg",
  "figures/premsa_de_cames.svg",
  "figures/press_d_ampolles_assegut_fins_al_front.svg",
  "figures/press_d_espatlles_en_maquina.svg",
  "figures/press_de_pit_en_maquina.svg",
  "figures/pujar_i_baixar_escales_aerobic.svg",
  "figures/pujar_i_baixar_un_esglao.svg",
  "figures/relaxacio_guiada_escaneig_corporal.svg",
  "figures/relaxacio_muscular_progressiva.svg",
  "figures/remada_amb_ampolla_inclinat_sobre_la_taula.svg",
  "figures/remada_amb_banda_elastica_asseguda.svg",
  "figures/remada_asseguda_en_politja.svg",
  "figures/respiracio_amb_llavis_arrufats.svg",
  "figures/respiracio_diafragmatica.svg",
  "figures/retraccio_d_omoplats_amb_banda.svg",
  "figures/rotacio_de_columna_asseguda.svg",
  "figures/rotacio_externa_d_espatlla_amb_banda.svg",
  "figures/rotacio_suau_de_tronc_dret.svg",
  "figures/sentadilla_amb_manuelles_lleugeres.svg",
  "figures/sentadilla_amb_motxilla.svg",
  "figures/transferencia_de_pes_lateral.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("placardiac-") && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Pàgina i codi propi: primer internet (per rebre actualitzacions), si no, la còpia guardada
  if (req.mode === "navigate" || /\.(html|js|css|json)$/.test(url.pathname) || url.pathname.endsWith("/")) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("index.html")))
    );
    return;
  }
  // Figures, icones i fonts: primer la còpia guardada
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res && res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return res;
  })));
});
