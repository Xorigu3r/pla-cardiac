/* GENERAT AUTOMÀTICAMENT per eines/genera_dades.py a partir del programa d'escriptori.
   No l'editis a mà: canvia el programa i torna a executar l'script. */
const D = {
 "APP_NOM": "Pla Cardíac",
 "VERSIO_PROGRAMA": "1.1.1",
 "CREDIT": "Creat per Xavier Musté",
 "ETIQUETES_RISC": {
  "esternotomia": "Càrrega amb els braços (precaucions post-esternotomia)",
  "isometric": "Exercicis isomètrics (aguantar la postura)",
  "valsalva": "Exercicis que fan retenir l'aire (Valsalva)",
  "bracos_sobre_cap": "Braços per sobre del cap"
 },
 "MATERIAL_CASA": [
  [
   "cadira",
   "Cadira"
  ],
  [
   "taula",
   "Taula"
  ],
  [
   "escala",
   "Escala / esglaó"
  ],
  [
   "paret",
   "Paret"
  ],
  [
   "ampolles",
   "Ampolles d'aigua"
  ],
  [
   "motxilla",
   "Motxilla amb pes (llibres)"
  ],
  [
   "banda_elastica",
   "Banda elàstica"
  ],
  [
   "bici_casa",
   "Bicicleta estàtica"
  ],
  [
   "bastons",
   "Bastons de nordic walking"
  ],
  [
   "inspiratori",
   "Entrenador muscular inspiratori"
  ]
 ],
 "MATERIAL_GIMNAS": [
  "banda_elastica",
  "bici",
  "cadira",
  "cinta",
  "eliptica",
  "erg_bracos",
  "manuelles",
  "maquines",
  "paret",
  "politges",
  "rem"
 ],
 "NIVELLS": {
  "1": "1 - Molt suau",
  "2": "2 - Suau / moderat",
  "3": "3 - Moderat"
 },
 "LLOCS": {
  "casa": "Casa",
  "gimnas": "Gimnàs"
 },
 "LLOCS_EX": {
  "casa": "Casa",
  "gimnas": "Gimnàs",
  "ambdos": "Casa o gimnàs"
 },
 "MAX_DIES": 6,
 "GRUPS_SESSIO": [
  "cames",
  "empenta",
  "estirada",
  "nucli"
 ],
 "GRUPS_EXTRA": [
  "bracos"
 ],
 "NOM_GRUP": {
  "cames": "Cames",
  "empenta": "Empenta",
  "estirada": "Estirada",
  "nucli": "Nucli",
  "bracos": "Braços",
  "equilibri": "Equilibri",
  "aerobic": "Aeròbic",
  "mobilitat": "Mobilitat",
  "flex_inferior": "Estirament de cames",
  "flex_superior": "Estirament de part superior",
  "flex_tronc": "Estirament de tronc",
  "respiracio": "Respiració",
  "relaxacio": "Relaxació"
 },
 "NOM_CAT": {
  "aerobic": "Aeròbic",
  "forca": "Força",
  "flexibilitat": "Flexibilitat",
  "mobilitat": "Mobilitat i escalfament",
  "equilibri": "Equilibri",
  "respiracio": "Respiració",
  "relaxacio": "Relaxació"
 },
 "TIPUS_SESSIO": {
  "complet": "Aeròbic + força",
  "aerobic": "Només aeròbic",
  "forca": "Només força",
  "flexibilitat": "Flexibilitat i relaxació"
 },
 "SENYALS_ALARMA": [
  "Dolor, pressió o opressió al pit, braç, coll o mandíbula",
  "Mareig, sensació de desmai o suor freda",
  "Falta d'aire anormal (no pots parlar mentre fas l'exercici)",
  "Palpitacions o ritme cardíac irregular",
  "Fatiga estranya o sobtada"
 ],
 "GUIA_IMPORTANT": [
  "Aquest programa NO decideix la intensitat: només aplica les pautes que li dones.",
  "El pla generat l'ha de revisar el teu cardiòleg o equip de rehabilitació abans de començar.",
  "Escalfa sempre i fes tornada a la calma. No aguantis mai l'aire en fer força.",
  "Si apareix qualsevol senyal d'alarma: para i avisa. Si no cedeix en repòs, truca al 112."
 ],
 "CAMPS_ENTERS": [
  [
   "setmanes",
   "Setmanes de pla",
   1,
   52,
   true
  ],
  [
   "series_inicials",
   "Sèries inicials",
   1,
   5,
   true
  ],
  [
   "series_max",
   "Sèries màximes",
   1,
   6,
   true
  ],
  [
   "reps_min",
   "Repeticions mínimes",
   1,
   50,
   true
  ],
  [
   "reps_max",
   "Repeticions màximes",
   1,
   50,
   true
  ],
  [
   "reps_increment_setmanal",
   "Increment de repeticions per setmana",
   0,
   5,
   true
  ],
  [
   "descans_entre_series_seg",
   "Descans entre sèries (s)",
   0,
   600,
   true
  ],
  [
   "escalfament_min",
   "Escalfament (min)",
   0,
   30,
   true
  ],
  [
   "tornada_calma_min",
   "Tornada a la calma (min)",
   0,
   30,
   true
  ],
  [
   "aer_min_inicial",
   "Minuts d'aeròbic inicials",
   0,
   120,
   true
  ],
  [
   "aer_min_final",
   "Minuts d'aeròbic finals",
   0,
   120,
   true
  ],
  [
   "aer_increment_setmanal",
   "Increment d'aeròbic per setmana (min)",
   0,
   15,
   true
  ],
  [
   "estirament_seg",
   "Durada de cada estirament (s)",
   10,
   60,
   true
  ],
  [
   "fc_min_objectiu",
   "FC mínima objectiu (bpm)",
   30,
   220,
   false
  ],
  [
   "fc_repos",
   "FC de repòs (bpm)",
   30,
   150,
   false
  ],
  [
   "fc_max_permesa",
   "FC màxima permesa (bpm)",
   30,
   220,
   true
  ],
  [
   "borg_max",
   "Esforç màxim Borg (6-20)",
   6,
   20,
   true
  ]
 ],
 "PAUTES_DEFECTE": {
  "fase": "",
  "setmanes": 8,
  "dies": [
   "gimnas",
   "casa",
   "gimnas"
  ],
  "nivell_max": 1,
  "series_inicials": 1,
  "series_max": 2,
  "reps_min": 8,
  "reps_max": 12,
  "reps_increment_setmanal": 1,
  "descans_entre_series_seg": 60,
  "fc_max_permesa": "",
  "borg_max": "",
  "pes_max_kg": "",
  "escalfament_min": 10,
  "tornada_calma_min": 10,
  "evitar_tags": [
   "isometric",
   "valsalva",
   "bracos_sobre_cap"
  ],
  "tipus_dies": [
   "complet",
   "complet",
   "complet"
  ],
  "aer_min_inicial": 15,
  "aer_min_final": 30,
  "aer_increment_setmanal": 2,
  "fc_min_objectiu": "",
  "fc_repos": "",
  "estirament_seg": 20,
  "inclou_equilibri": true,
  "inclou_respiracio": true,
  "material_casa": [
   "cadira",
   "taula",
   "escala",
   "paret",
   "ampolles",
   "motxilla",
   "banda_elastica",
   "bici_casa",
   "bastons",
   "inspiratori"
  ],
  "notes_cardiolec": "",
  "confirmat": false
 },
 "EXERCICIS": [
  {
   "id": "aixecar_se_i_seure_a_la_cadira_casa",
   "nom": "Aixecar-se i seure a la cadira",
   "lloc": "casa",
   "material": [
    "cadira"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Baixa lent (3 s), puja sense impulsar-te. Expira en pujar.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "pujar_i_baixar_un_esglao_casa",
   "nom": "Pujar i baixar un esglaó",
   "lloc": "casa",
   "material": [
    "escala"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Primer esglaó de l'escala, amb la mà a la barana. Alterna les cames.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "pont_de_glutis_al_terra_casa",
   "nom": "Pont de glutis al terra",
   "lloc": "casa",
   "material": [],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Estirat cara amunt, puja els malucs expirant. Sense retenir l'aire.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "elevacio_de_talons_dempeus_casa",
   "nom": "Elevació de talons dempeus",
   "lloc": "casa",
   "material": [
    "paret"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Mans a la paret per equilibri. Puja i baixa lent.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "elevacio_de_genoll_asseguda_casa",
   "nom": "Elevació de genoll asseguda",
   "lloc": "casa",
   "material": [
    "cadira"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Asseguda, puja un genoll alternant. Esquena recta.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "sentadilla_amb_motxilla_casa",
   "nom": "Sentadilla amb motxilla",
   "lloc": "casa",
   "material": [
    "cadira",
    "motxilla"
   ],
   "grup": "cames",
   "nivell": 3,
   "tags": [],
   "nota": "Seu lleugerament sobre la cadira i torna a pujar. Motxilla lleugera.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "flexions_inclinades_a_la_paret_casa",
   "nom": "Flexions inclinades a la paret",
   "lloc": "casa",
   "material": [
    "paret"
   ],
   "grup": "empenta",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Peus separats de la paret, baixa el pit lentament i empeny.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "flexions_amb_les_mans_a_la_taula_casa",
   "nom": "Flexions amb les mans a la taula",
   "lloc": "casa",
   "material": [
    "taula"
   ],
   "grup": "empenta",
   "nivell": 2,
   "tags": [
    "esternotomia"
   ],
   "nota": "Taula estable. Cos recte, baixa controlat.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "press_d_ampolles_assegut_fins_al_front_casa",
   "nom": "Press d'ampolles assegut (fins al front)",
   "lloc": "casa",
   "material": [
    "ampolles",
    "cadira"
   ],
   "grup": "empenta",
   "nivell": 2,
   "tags": [
    "esternotomia"
   ],
   "nota": "Ampolles petites. No portis els braços per sobre del cap.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "remada_amb_ampolla_inclinat_sobre_la_taula_casa",
   "nom": "Remada amb ampolla inclinat sobre la taula",
   "lloc": "casa",
   "material": [
    "ampolles",
    "taula"
   ],
   "grup": "estirada",
   "nivell": 2,
   "tags": [
    "esternotomia"
   ],
   "nota": "Una mà a la taula, l'altra remena l'ampolla cap al maluc.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "remada_amb_banda_elastica_asseguda_casa",
   "nom": "Remada amb banda elàstica asseguda",
   "lloc": "casa",
   "material": [
    "banda_elastica",
    "cadira"
   ],
   "grup": "estirada",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Banda subjecta davant teu, estira els colzes enrere.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "flexio_de_biceps_amb_ampolles_casa",
   "nom": "Flexió de bíceps amb ampolles",
   "lloc": "casa",
   "material": [
    "ampolles"
   ],
   "grup": "bracos",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Colzes junts al cos, moviment lent.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "elevacions_laterals_amb_ampolles_fins_a_l_espatlla_casa",
   "nom": "Elevacions laterals amb ampolles (fins a l'espatlla)",
   "lloc": "casa",
   "material": [
    "ampolles"
   ],
   "grup": "bracos",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Només fins a l'altura de les espatlles, mai més amunt.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "extensio_de_triceps_amb_ampolla_inclinat_casa",
   "nom": "Extensió de tríceps amb ampolla inclinat",
   "lloc": "casa",
   "material": [
    "ampolles",
    "taula"
   ],
   "grup": "bracos",
   "nivell": 2,
   "tags": [
    "esternotomia"
   ],
   "nota": "Una mà a la taula, estira el braç enrere amb l'ampolla.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "activacio_abdominal_asseguda_casa",
   "nom": "Activació abdominal asseguda",
   "lloc": "casa",
   "material": [
    "cadira"
   ],
   "grup": "nucli",
   "nivell": 1,
   "tags": [],
   "nota": "Seu recte, expira i estira el melic cap a dins. Sense aguantar l'aire.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "bird_dog_brac_i_cama_contraris_casa",
   "nom": "Bird-dog (braç i cama contraris)",
   "lloc": "casa",
   "material": [],
   "grup": "nucli",
   "nivell": 2,
   "tags": [],
   "nota": "A quatre grapes, estén braç i cama oposats alternant. Sense pausa llarga.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "plank_sobre_la_taula_casa",
   "nom": "Plank sobre la taula",
   "lloc": "casa",
   "material": [
    "taula"
   ],
   "grup": "nucli",
   "nivell": 3,
   "tags": [
    "esternotomia",
    "isometric",
    "valsalva"
   ],
   "nota": "Exercici isomètric: només si el cardiòleg ho permet.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "equilibri_a_una_cama_amb_suport_de_cadira_casa",
   "nom": "Equilibri a una cama amb suport de cadira",
   "lloc": "casa",
   "material": [
    "cadira"
   ],
   "grup": "equilibri",
   "nivell": 1,
   "tags": [],
   "nota": "Una mà a la cadira. Canvia de cama.",
   "cat": "equilibri",
   "dosi": null
  },
  {
   "id": "premsa_de_cames_gimnas",
   "nom": "Premsa de cames",
   "lloc": "gimnas",
   "material": [
    "maquines"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Recorregut curt, sense bloquejar genolls. Expira en empènyer.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "extensio_de_quadriceps_maquina_gimnas",
   "nom": "Extensió de quàdriceps (màquina)",
   "lloc": "gimnas",
   "material": [
    "maquines"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Pes lleuger, moviment lent.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "curl_femoral_maquina_gimnas",
   "nom": "Curl femoral (màquina)",
   "lloc": "gimnas",
   "material": [
    "maquines"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Pes lleuger, moviment lent.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "sentadilla_amb_manuelles_lleugeres_gimnas",
   "nom": "Sentadilla amb manuelles lleugeres",
   "lloc": "gimnas",
   "material": [
    "cadira",
    "manuelles"
   ],
   "grup": "cames",
   "nivell": 3,
   "tags": [],
   "nota": "Amb un banc o cadira darrere com a referència.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "press_de_pit_en_maquina_gimnas",
   "nom": "Press de pit en màquina",
   "lloc": "gimnas",
   "material": [
    "maquines"
   ],
   "grup": "empenta",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Seient ajustat. Expira en empènyer.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "press_d_espatlles_en_maquina_gimnas",
   "nom": "Press d'espatlles en màquina",
   "lloc": "gimnas",
   "material": [
    "maquines"
   ],
   "grup": "empenta",
   "nivell": 2,
   "tags": [
    "bracos_sobre_cap",
    "esternotomia"
   ],
   "nota": "Braços per sobre del cap: només si el cardiòleg ho permet.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "politja_alta_estirada_al_pit_gimnas",
   "nom": "Politja alta (estirada al pit)",
   "lloc": "gimnas",
   "material": [
    "politges"
   ],
   "grup": "estirada",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Pes lleuger, baixa la barra al pit, esquena recta.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "remada_asseguda_en_politja_gimnas",
   "nom": "Remada asseguda en politja",
   "lloc": "gimnas",
   "material": [
    "politges"
   ],
   "grup": "estirada",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Esquena recta, uneix els omòplats suaument.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "curl_de_biceps_amb_politja_gimnas",
   "nom": "Curl de bíceps amb politja",
   "lloc": "gimnas",
   "material": [
    "politges"
   ],
   "grup": "bracos",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Pes lleuger, colzes fixos.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "extensio_de_triceps_amb_politja_gimnas",
   "nom": "Extensió de tríceps amb politja",
   "lloc": "gimnas",
   "material": [
    "politges"
   ],
   "grup": "bracos",
   "nivell": 2,
   "tags": [
    "esternotomia"
   ],
   "nota": "Pes lleuger, colzes fixos al cos.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "abdominal_en_maquina_suau_gimnas",
   "nom": "Abdominal en màquina (suau)",
   "lloc": "gimnas",
   "material": [
    "maquines"
   ],
   "grup": "nucli",
   "nivell": 1,
   "tags": [],
   "nota": "Recorregut curt, expira en contraure.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "bird_dog_sobre_marfega_gimnas",
   "nom": "Bird-dog sobre màrfega",
   "lloc": "gimnas",
   "material": [],
   "grup": "nucli",
   "nivell": 2,
   "tags": [],
   "nota": "Alterna braç i cama oposats.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "equilibri_a_una_cama_amb_suport_gimnas",
   "nom": "Equilibri a una cama amb suport",
   "lloc": "gimnas",
   "material": [],
   "grup": "equilibri",
   "nivell": 1,
   "tags": [],
   "nota": "Amb una mà a una barra o màquina.",
   "cat": "equilibri",
   "dosi": null
  },
  {
   "id": "caminar_a_pas_viu_casa",
   "nom": "Caminar a pas viu",
   "lloc": "casa",
   "material": [],
   "grup": "aerobic",
   "nivell": 1,
   "tags": [],
   "nota": "Exterior pla o passadís. Ritme en què encara pots parlar.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "marxa_al_lloc_casa",
   "nom": "Marxa al lloc",
   "lloc": "casa",
   "material": [],
   "grup": "aerobic",
   "nivell": 1,
   "tags": [],
   "nota": "A casa, aixecant els genolls suaument i movent els braços.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "pujar_i_baixar_escales_aerobic_casa",
   "nom": "Pujar i baixar escales (aeròbic)",
   "lloc": "casa",
   "material": [
    "escala"
   ],
   "grup": "aerobic",
   "nivell": 2,
   "tags": [],
   "nota": "Ritme constant i tranquil, amb la mà a la barana.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "bicicleta_estatica_casa_casa",
   "nom": "Bicicleta estàtica (casa)",
   "lloc": "casa",
   "material": [
    "bici_casa"
   ],
   "grup": "aerobic",
   "nivell": 1,
   "tags": [],
   "nota": "Seient a l'altura del maluc, pedaleig regular i sense resistència brusca.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "nordic_walking_casa",
   "nom": "Nordic walking",
   "lloc": "casa",
   "material": [
    "bastons"
   ],
   "grup": "aerobic",
   "nivell": 2,
   "tags": [],
   "nota": "Camina amb els bastons, braços i cames alternats, esquena recta.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "cinta_de_caminar_gimnas",
   "nom": "Cinta de caminar",
   "lloc": "gimnas",
   "material": [
    "cinta"
   ],
   "grup": "aerobic",
   "nivell": 1,
   "tags": [],
   "nota": "Comença lent. Mans lleugeres a la barana, sense agafar-t'hi fort.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "bicicleta_estatica_gimnas_gimnas",
   "nom": "Bicicleta estàtica (gimnàs)",
   "lloc": "gimnas",
   "material": [
    "bici"
   ],
   "grup": "aerobic",
   "nivell": 1,
   "tags": [],
   "nota": "Seient a l'altura del maluc, pedaleig regular, resistència segons el teu pla.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "elliptica_gimnas",
   "nom": "El·líptica",
   "lloc": "gimnas",
   "material": [
    "eliptica"
   ],
   "grup": "aerobic",
   "nivell": 2,
   "tags": [],
   "nota": "Moviment suau i continu, peus plans als pedals.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "ergometre_de_rem_gimnas",
   "nom": "Ergòmetre de rem",
   "lloc": "gimnas",
   "material": [
    "rem"
   ],
   "grup": "aerobic",
   "nivell": 2,
   "tags": [],
   "nota": "Ritme suau: primer cames, després esquena i braços. No aguantis l'aire.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "ergometre_de_bracos_gimnas",
   "nom": "Ergòmetre de braços",
   "lloc": "gimnas",
   "material": [
    "erg_bracos"
   ],
   "grup": "aerobic",
   "nivell": 2,
   "tags": [
    "esternotomia"
   ],
   "nota": "Pedaleig amb els braços a l'altura del pit, ritme regular.",
   "cat": "aerobic",
   "dosi": null
  },
  {
   "id": "cercles_d_espatlles_ambdos",
   "nom": "Cercles d'espatlles",
   "lloc": "ambdos",
   "material": [],
   "grup": "mobilitat",
   "nivell": 1,
   "tags": [],
   "nota": "Cercles lents i amplis cap enrere, braços relaxats.",
   "cat": "mobilitat",
   "dosi": "1 × 10"
  },
  {
   "id": "mobilitat_del_coll_ambdos",
   "nom": "Mobilitat del coll",
   "lloc": "ambdos",
   "material": [],
   "grup": "mobilitat",
   "nivell": 1,
   "tags": [],
   "nota": "Gira i inclina el cap suaument a cada costat, sense forçar.",
   "cat": "mobilitat",
   "dosi": "1 × 5 per costat"
  },
  {
   "id": "cercles_de_turmell_ambdos",
   "nom": "Cercles de turmell",
   "lloc": "ambdos",
   "material": [],
   "grup": "mobilitat",
   "nivell": 1,
   "tags": [],
   "nota": "Asseguda, estén una cama i dibuixa cercles amb el peu.",
   "cat": "mobilitat",
   "dosi": "1 × 10 per peu"
  },
  {
   "id": "rotacio_suau_de_tronc_dret_ambdos",
   "nom": "Rotació suau de tronc dret",
   "lloc": "ambdos",
   "material": [],
   "grup": "mobilitat",
   "nivell": 1,
   "tags": [],
   "nota": "Peus fixos, gira el tronc suaument a cada costat amb els braços relaxats.",
   "cat": "mobilitat",
   "dosi": "1 × 10"
  },
  {
   "id": "abduccio_de_maluc_dempeus_ambdos",
   "nom": "Abducció de maluc dempeus",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Mà a la cadira, separa una cama cap al costat sense inclinar el tronc.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "extensio_de_maluc_dempeus_ambdos",
   "nom": "Extensió de maluc dempeus",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Mans a la cadira, porta una cama estirada enrere sense arquejar l'esquena.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "curl_de_cames_dempeus_ambdos",
   "nom": "Curl de cames dempeus",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "cames",
   "nivell": 1,
   "tags": [],
   "nota": "Mans a la cadira, doblega un genoll portant el taló cap al glutis.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "elevacio_frontal_amb_ampolles_fins_a_l_espatlla_casa",
   "nom": "Elevació frontal amb ampolles (fins a l'espatlla)",
   "lloc": "casa",
   "material": [
    "ampolles"
   ],
   "grup": "bracos",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Braços estirats endavant només fins a l'altura de l'espatlla.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "rotacio_externa_d_espatlla_amb_banda_casa",
   "nom": "Rotació externa d'espatlla amb banda",
   "lloc": "casa",
   "material": [
    "banda_elastica"
   ],
   "grup": "estirada",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Colze enganxat al costat a 90°, gira l'avantbraç cap enfora.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "retraccio_d_omoplats_amb_banda_casa",
   "nom": "Retracció d'omòplats amb banda",
   "lloc": "casa",
   "material": [
    "banda_elastica",
    "cadira"
   ],
   "grup": "estirada",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Asseguda, separa la banda apropant els omòplats.",
   "cat": "forca",
   "dosi": null
  },
  {
   "id": "peus_en_tandem_ambdos",
   "nom": "Peus en tàndem",
   "lloc": "ambdos",
   "material": [],
   "grup": "equilibri",
   "nivell": 1,
   "tags": [],
   "nota": "Un peu davant de l'altre (taló amb punta), mà a prop d'un suport.",
   "cat": "equilibri",
   "dosi": null
  },
  {
   "id": "caminar_peu_davant_peu_ambdos",
   "nom": "Caminar peu davant peu",
   "lloc": "ambdos",
   "material": [],
   "grup": "equilibri",
   "nivell": 2,
   "tags": [],
   "nota": "Camina en línia recta posant el taló davant la punta, a prop d'una paret.",
   "cat": "equilibri",
   "dosi": null
  },
  {
   "id": "transferencia_de_pes_lateral_ambdos",
   "nom": "Transferència de pes lateral",
   "lloc": "ambdos",
   "material": [],
   "grup": "equilibri",
   "nivell": 1,
   "tags": [],
   "nota": "Passa el pes d'un peu a l'altre lentament, sense moure els peus.",
   "cat": "equilibri",
   "dosi": null
  },
  {
   "id": "estirament_de_bessons_a_la_paret_ambdos",
   "nom": "Estirament de bessons a la paret",
   "lloc": "ambdos",
   "material": [
    "paret"
   ],
   "grup": "flex_inferior",
   "nivell": 1,
   "tags": [],
   "nota": "Una cama enrere amb el taló a terra, mans a la paret.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_d_isquiotibials_assegut_ambdos",
   "nom": "Estirament d'isquiotibials assegut",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "flex_inferior",
   "nivell": 1,
   "tags": [],
   "nota": "Asseguda a la vora, estén una cama i inclina el tronc recte endavant.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_de_quadriceps_dempeus_ambdos",
   "nom": "Estirament de quàdriceps dempeus",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "flex_inferior",
   "nivell": 1,
   "tags": [],
   "nota": "Suport a la cadira, porta el taló cap al glutis sense arquejar l'esquena.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_de_flexors_del_maluc_ambdos",
   "nom": "Estirament de flexors del maluc",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "flex_inferior",
   "nivell": 1,
   "tags": [],
   "nota": "Passa llarg endavant amb suport, porta suaument el maluc endavant.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_de_pit_a_la_porta_casa",
   "nom": "Estirament de pit a la porta",
   "lloc": "casa",
   "material": [
    "paret"
   ],
   "grup": "flex_superior",
   "nivell": 1,
   "tags": [
    "esternotomia"
   ],
   "nota": "Avantbraços al marc de la porta, passa suaument endavant.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_d_espatlla_brac_creuat_ambdos",
   "nom": "Estirament d'espatlla (braç creuat)",
   "lloc": "ambdos",
   "material": [],
   "grup": "flex_superior",
   "nivell": 1,
   "tags": [],
   "nota": "Porta un braç creuat davant el pit i ajuda amb l'altra mà.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_lateral_del_coll_ambdos",
   "nom": "Estirament lateral del coll",
   "lloc": "ambdos",
   "material": [],
   "grup": "flex_superior",
   "nivell": 1,
   "tags": [],
   "nota": "Inclina l'orella cap a l'espatlla suaument, sense tibar.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "estirament_de_triceps_ambdos",
   "nom": "Estirament de tríceps",
   "lloc": "ambdos",
   "material": [],
   "grup": "flex_superior",
   "nivell": 1,
   "tags": [
    "bracos_sobre_cap"
   ],
   "nota": "Colze amunt i mà darrere el cap. Braços per sobre del cap: només si el cardiòleg ho permet.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "genolls_al_pit_estirat_ambdos",
   "nom": "Genolls al pit estirat",
   "lloc": "ambdos",
   "material": [],
   "grup": "flex_tronc",
   "nivell": 1,
   "tags": [],
   "nota": "Estirat cara amunt, abraça suaument un genoll cap al pit alternant.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "gat_camell_ambdos",
   "nom": "Gat-camell",
   "lloc": "ambdos",
   "material": [],
   "grup": "flex_tronc",
   "nivell": 1,
   "tags": [],
   "nota": "A quatre grapes, alterna esquena arrodonida i esquena còncava lentament.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "rotacio_de_columna_asseguda_ambdos",
   "nom": "Rotació de columna asseguda",
   "lloc": "ambdos",
   "material": [
    "cadira"
   ],
   "grup": "flex_tronc",
   "nivell": 1,
   "tags": [],
   "nota": "Asseguda recta, gira el tronc suaument a cada costat.",
   "cat": "flexibilitat",
   "dosi": null
  },
  {
   "id": "respiracio_diafragmatica_ambdos",
   "nom": "Respiració diafragmàtica",
   "lloc": "ambdos",
   "material": [],
   "grup": "respiracio",
   "nivell": 1,
   "tags": [],
   "nota": "Una mà a la panxa: infla-la en inspirar pel nas i buida-la en expirar.",
   "cat": "respiracio",
   "dosi": "5 min"
  },
  {
   "id": "respiracio_amb_llavis_arrufats_ambdos",
   "nom": "Respiració amb llavis arrufats",
   "lloc": "ambdos",
   "material": [],
   "grup": "respiracio",
   "nivell": 1,
   "tags": [],
   "nota": "Inspira pel nas 2 s i expira lentament pels llavis semitancats 4 s.",
   "cat": "respiracio",
   "dosi": "5 min"
  },
  {
   "id": "entrenament_muscular_inspiratori_casa",
   "nom": "Entrenament muscular inspiratori",
   "lloc": "casa",
   "material": [
    "inspiratori"
   ],
   "grup": "respiracio",
   "nivell": 2,
   "tags": [],
   "nota": "Amb l'entrenador inspiratori, segons la resistència que t'indiqui l'equip.",
   "cat": "respiracio",
   "dosi": "segons indicació"
  },
  {
   "id": "relaxacio_muscular_progressiva_ambdos",
   "nom": "Relaxació muscular progressiva",
   "lloc": "ambdos",
   "material": [],
   "grup": "relaxacio",
   "nivell": 1,
   "tags": [],
   "nota": "Tensa cada grup muscular 5 s i deixa'l anar 10 s, de peus a cap.",
   "cat": "relaxacio",
   "dosi": "10 min"
  },
  {
   "id": "relaxacio_guiada_escaneig_corporal_ambdos",
   "nom": "Relaxació guiada (escaneig corporal)",
   "lloc": "ambdos",
   "material": [],
   "grup": "relaxacio",
   "nivell": 1,
   "tags": [],
   "nota": "Estirat o assegut, porta l'atenció a cada part del cos i relaxa-la.",
   "cat": "relaxacio",
   "dosi": "10 min"
  }
 ],
 "DESC": {
  "Aixecar-se i seure a la cadira": {
   "musculs": "Quàdriceps, glutis",
   "passos": [
    "Seu al mig de la cadira, esquena recta, peus separats a l'amplada dels malucs.",
    "Aixeca't expirant, sense impulsar-te amb les mans.",
    "Baixa lentament (uns 3 segons) fins a seure."
   ],
   "evitar": "Deixar-te caure a la cadira o ajudar-te amb els braços."
  },
  "Pujar i baixar un esglaó": {
   "musculs": "Quàdriceps, glutis, bessons",
   "passos": [
    "Posa't davant del primer esglaó de l'escala, amb una mà a la barana.",
    "Puja amb un peu i després l'altre, fins a estar dret a l'esglaó.",
    "Baixa amb control i alterna la cama amb què comences."
   ],
   "evitar": "Anar ràpid, saltar o prescindir de la barana."
  },
  "Pont de glutis al terra": {
   "musculs": "Glutis, isquiotibials, zona lumbar",
   "passos": [
    "Estira't cara amunt, genolls doblegats i peus plans a terra.",
    "Expira i puja els malucs fins que espatlles, malucs i genolls facin una línia.",
    "Baixa lentament la columna fins a tornar a terra."
   ],
   "evitar": "Arquejar molt l'esquena o retenir l'aire."
  },
  "Elevació de talons dempeus": {
   "musculs": "Bessons",
   "passos": [
    "Posa't dret davant la paret, amb les mans recolzades a l'altura del pit.",
    "Puja sobre les puntes dels peus expirant.",
    "Baixa lentament els talons fins a terra."
   ],
   "evitar": "Rebotar o doblegar els genolls."
  },
  "Elevació de genoll asseguda": {
   "musculs": "Flexors del maluc, abdominals",
   "passos": [
    "Seu amb l'esquena recta, sense recolzar-te, mans als costats de la cadira.",
    "Puja un genoll cap al pit amb control, expirant.",
    "Baixa el peu a terra i repeteix amb l'altra cama."
   ],
   "evitar": "Inclinar-te enrere o aguantar l'aire."
  },
  "Sentadilla amb motxilla": {
   "musculs": "Quàdriceps, glutis, esquena",
   "passos": [
    "Dret, peus separats a l'amplada de les espatlles, motxilla lleugera agafada al pit.",
    "Porta els malucs enrere i baixa fins a tocar la cadira, expirant en pujar.",
    "Aixeca't empenyent amb els talons, sense impulsar-te."
   ],
   "evitar": "Deixar que els genolls es ficquin cap endins o carregar massa pes."
  },
  "Flexions inclinades a la paret": {
   "musculs": "Pit, tríceps, espatlles",
   "passos": [
    "Dret davant la paret, mans a l'altura del pit, braços estirats.",
    "Doblega els colzes i apropa el pit a la paret, controlat.",
    "Empeny per tornar a la posició inicial, expirant."
   ],
   "evitar": "Deixar caure la cintura o aguantar l'aire."
  },
  "Flexions amb les mans a la taula": {
   "musculs": "Pit, tríceps, espatlles",
   "passos": [
    "Mans a la vora d'una taula estable, braços estirats, cos en línia recta.",
    "Baixa el pit cap a la taula doblegant els colzes, controlat.",
    "Empeny cap amunt expirant fins a estirar els braços."
   ],
   "evitar": "Taula que es mou, cintura caiguda o retenir l'aire."
  },
  "Press d'ampolles assegut (fins al front)": {
   "musculs": "Espatlles, tríceps",
   "passos": [
    "Seu recte, una ampolla a cada mà a l'altura de les espatlles.",
    "Estira els braços cap endavant i amunt, només fins a l'altura del front.",
    "Baixa lentament a la posició inicial."
   ],
   "evitar": "Pujar els braços per sobre del cap o arquejar l'esquena."
  },
  "Remada amb ampolla inclinat sobre la taula": {
   "musculs": "Esquena, bíceps",
   "passos": [
    "Una mà a la taula, esquena recta i inclinada, ampolla a l'altra mà amb el braç estirat.",
    "Porta el colze cap enrere, junt al cos, expirant.",
    "Baixa lentament i canvia de braç en acabar la sèrie."
   ],
   "evitar": "Girar el tronc o arrodonir l'esquena."
  },
  "Remada amb banda elàstica asseguda": {
   "musculs": "Esquena, bíceps",
   "passos": [
    "Seu recte amb la banda subjecta davant teu a l'altura del pit, braços estirats.",
    "Estira els colzes cap enrere apropant els omòplats, expirant.",
    "Torna lentament a la posició inicial."
   ],
   "evitar": "Encongir les espatlles o inclinar-te enrere."
  },
  "Flexió de bíceps amb ampolles": {
   "musculs": "Bíceps",
   "passos": [
    "Dret, una ampolla a cada mà, braços avall i colzes junts al cos.",
    "Doblega els colzes i puja les ampolles cap a les espatlles, expirant.",
    "Baixa lentament."
   ],
   "evitar": "Balancejar el cos o moure els colzes."
  },
  "Elevacions laterals amb ampolles (fins a l'espatlla)": {
   "musculs": "Espatlles",
   "passos": [
    "Dret, una ampolla a cada mà, braços avall als costats.",
    "Aixeca els braços cap als costats només fins a l'altura de les espatlles.",
    "Baixa lentament."
   ],
   "evitar": "Pujar per sobre de l'espatlla o fer-ho amb impuls."
  },
  "Extensió de tríceps amb ampolla inclinat": {
   "musculs": "Tríceps",
   "passos": [
    "Una mà a la taula, esquena inclinada i recta, ampolla a l'altra mà amb el colze enrere.",
    "Estira el braç enrere fins a deixar-lo recte, expirant.",
    "Torna lentament i canvia de braç en acabar."
   ],
   "evitar": "Moure el colze o arrodonir l'esquena."
  },
  "Activació abdominal asseguda": {
   "musculs": "Abdominals profunds",
   "passos": [
    "Seu recte, mans a les cuixes, peus plans a terra.",
    "Expira i estira el melic cap a dins, com si volguessis cordar uns texans estrets.",
    "Manté un instant respirant amb normalitat i relaxa."
   ],
   "evitar": "Aguantar l'aire o encorbar l'esquena."
  },
  "Bird-dog (braç i cama contraris)": {
   "musculs": "Nucli, glutis, esquena",
   "passos": [
    "A quatre grapes sobre una màrfega, mans sota les espatlles, genolls sota els malucs.",
    "Estén un braç endavant i la cama contrària enrere, alineats amb l'esquena.",
    "Torna al centre i canvia de costat, sense pauses llargues."
   ],
   "evitar": "Arquejar l'esquena, girar els malucs o aguantar l'aire."
  },
  "Plank sobre la taula": {
   "musculs": "Nucli (abdomen i esquena)",
   "passos": [
    "Mans a la vora d'una taula estable, cos en línia recta de cap a peus.",
    "Mantén la postura el temps que t'hagin indicat, respirant amb normalitat.",
    "Baixa amb control. Exercici isomètric: només si el cardiòleg ho permet."
   ],
   "evitar": "Aguantar l'aire, deixar caure o pujar els malucs."
  },
  "Equilibri a una cama amb suport de cadira": {
   "musculs": "Cames, equilibri",
   "passos": [
    "Dret darrere d'una cadira estable, una mà sobre el respatller.",
    "Aixeca un peu uns centímetres del terra i mantén uns segons.",
    "Baixa el peu i canvia de cama."
   ],
   "evitar": "Agafar-te amb força a la cadira o fer-ho sense suport."
  },
  "Premsa de cames": {
   "musculs": "Quàdriceps, glutis",
   "passos": [
    "Seu al seient, esquena ben recolzada, peus a la plataforma a l'amplada dels malucs.",
    "Empeny la plataforma expirant, sense bloquejar els genolls.",
    "Torna lentament a la posició inicial."
   ],
   "evitar": "Bloquejar els genolls, aixecar els malucs o aguantar l'aire."
  },
  "Extensió de quàdriceps (màquina)": {
   "musculs": "Quàdriceps",
   "passos": [
    "Ajusta el seient: genolls alineats amb l'eix de la màquina i coixinet sobre els turmells.",
    "Estén les cames expirant, sense bloquejar els genolls.",
    "Baixa lentament."
   ],
   "evitar": "Pes excessiu o moviments bruscos."
  },
  "Curl femoral (màquina)": {
   "musculs": "Isquiotibials",
   "passos": [
    "Ajusta la màquina: coixinet just sobre els turmells, esquena recolzada.",
    "Doblega els genolls portant els talons cap enrere, expirant.",
    "Torna lentament."
   ],
   "evitar": "Aixecar els malucs del seient o fer-ho amb impuls."
  },
  "Sentadilla amb manuelles lleugeres": {
   "musculs": "Quàdriceps, glutis, esquena",
   "passos": [
    "Dret, una manuella lleugera a cada mà, braços als costats. Banc o cadira darrere.",
    "Porta els malucs enrere i baixa fins a tocar el banc, controlat.",
    "Aixeca't expirant, empenyent amb els talons."
   ],
   "evitar": "Pes excessiu o arrodonir l'esquena."
  },
  "Press de pit en màquina": {
   "musculs": "Pit, tríceps, espatlles",
   "passos": [
    "Ajusta el seient perquè les nanses quedin a l'altura del pit, esquena recolzada.",
    "Empeny endavant expirant, sense bloquejar els colzes.",
    "Torna lentament."
   ],
   "evitar": "Pes excessiu, aguantar l'aire o separar l'esquena del respatller."
  },
  "Press d'espatlles en màquina": {
   "musculs": "Espatlles, tríceps",
   "passos": [
    "Ajusta el seient: nanses a l'altura de les espatlles, esquena recolzada.",
    "Empeny cap amunt expirant, sense bloquejar els colzes.",
    "Baixa lentament. Braços per sobre del cap: només si el cardiòleg ho permet."
   ],
   "evitar": "Arquejar l'esquena o aguantar l'aire."
  },
  "Politja alta (estirada al pit)": {
   "musculs": "Esquena, bíceps",
   "passos": [
    "Seu amb els genolls fixats sota el coixinet, agafa la barra una mica més ample que les espatlles.",
    "Baixa la barra fins al pit, apropant els omòplats, expirant.",
    "Puja la barra lentament, amb control."
   ],
   "evitar": "Estirar per darrere del coll, balancejar-te o pes excessiu."
  },
  "Remada asseguda en politja": {
   "musculs": "Esquena, bíceps",
   "passos": [
    "Seu amb els peus fixats a la plataforma, genolls lleugerament doblegats, esquena recta.",
    "Estira l'agafador cap al melic, apropant els omòplats, expirant.",
    "Torna els braços endavant lentament."
   ],
   "evitar": "Inclinar-te enrere o arrodonir l'esquena."
  },
  "Curl de bíceps amb politja": {
   "musculs": "Bíceps",
   "passos": [
    "Dret davant la politja baixa, agafador a les mans, colzes junts al cos.",
    "Doblega els colzes expirant, sense moure'ls.",
    "Baixa lentament."
   ],
   "evitar": "Balancejar el tronc o pes excessiu."
  },
  "Extensió de tríceps amb politja": {
   "musculs": "Tríceps",
   "passos": [
    "Dret davant la politja alta, agafador a les mans, colzes junts al cos.",
    "Estira els braços cap avall expirant, sense moure els colzes.",
    "Torna lentament fins que les mans arribin al pit."
   ],
   "evitar": "Inclinar-te sobre la barra o aguantar l'aire."
  },
  "Abdominal en màquina (suau)": {
   "musculs": "Abdominals",
   "passos": [
    "Ajusta el seient i seu amb l'esquena al respatller, agafadors a les mans.",
    "Arrodoneix suaument el tronc cap endavant expirant, recorregut curt.",
    "Torna lentament."
   ],
   "evitar": "Pes excessiu, aguantar l'aire o tibar del coll."
  },
  "Bird-dog sobre màrfega": {
   "musculs": "Nucli, glutis, esquena",
   "passos": [
    "A quatre grapes sobre la màrfega, mans sota les espatlles, genolls sota els malucs.",
    "Estén un braç endavant i la cama contrària enrere, alineats amb l'esquena.",
    "Torna al centre i canvia de costat, sense pauses llargues."
   ],
   "evitar": "Arquejar l'esquena, girar els malucs o aguantar l'aire."
  },
  "Equilibri a una cama amb suport": {
   "musculs": "Cames, equilibri",
   "passos": [
    "Dret al costat d'una barra o màquina estable, una mà a sobre.",
    "Aixeca un peu uns centímetres del terra i mantén uns segons.",
    "Baixa el peu i canvia de cama."
   ],
   "evitar": "Agafar-te amb força o fer-ho sense suport."
  },
  "Caminar a pas viu": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Camina en terreny pla, esquena recta, mirada endavant i braços relaxats.",
    "Mantén un ritme en què puguis parlar però no cantar (esforç Borg dins del teu límit).",
    "Acaba reduint el ritme els últims minuts per a la tornada a la calma."
   ],
   "evitar": "Pujar el ritme de cop, pendents forts, fred o calor intensos."
  },
  "Marxa al lloc": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Dret, aixeca els genolls alternativament a una altura còmoda, movent els braços.",
    "Mantén un ritme constant segons la FC i el Borg del teu pla.",
    "Acaba baixant el ritme poc a poc."
   ],
   "evitar": "Anar massa ràpid o aguantar l'aire."
  },
  "Pujar i baixar escales (aeròbic)": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Amb una mà a la barana, puja un tram d'escales a ritme tranquil.",
    "Baixa amb la mateixa calma i repeteix el temps indicat.",
    "Redueix el ritme si notes falta d'aire o supera el teu Borg."
   ],
   "evitar": "Córrer, saltar escalons o no usar la barana."
  },
  "Bicicleta estàtica (casa)": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Ajusta el seient: amb el pedal baix, el genoll queda lleugerament doblegat.",
    "Pedaleja a ritme regular amb una resistència lleugera segons el teu pla.",
    "Els últims minuts, pedaleja sense resistència per refredar."
   ],
   "evitar": "Resistència brusca, seient massa baix o agafar-te fort al manillar."
  },
  "Nordic walking": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Camina amb els bastons, que toquen terra a l'altura dels talons.",
    "Alterna braç i cama oposats, esquena recta.",
    "Ritme en què puguis parlar, segons el teu Borg."
   ],
   "evitar": "Bastons massa llargs o terrenys irregulars sense suport."
  },
  "Cinta de caminar": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Puja a la cinta amb la velocitat al mínim i connecta la clau de seguretat.",
    "Augmenta la velocitat (i el pendent, només si t'ho indiquen) fins a la zona del teu pla.",
    "Els últims minuts, redueix la velocitat gradualment abans de baixar."
   ],
   "evitar": "Agafar-te fort a la barana, mirar els peus o aturar la cinta de cop."
  },
  "Bicicleta estàtica (gimnàs)": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Ajusta el seient a l'altura del maluc i comprova que els peus queden fixats.",
    "Pedaleja a ritme regular amb la resistència indicada al teu pla.",
    "Els últims minuts, baixa la resistència i pedaleja suau."
   ],
   "evitar": "Resistència brusca o massa esforç dels braços."
  },
  "El·líptica": {
   "musculs": "Cor, pulmons i cames",
   "passos": [
    "Puja als pedals i agafa les nanses suaument, esquena recta.",
    "Mantén un ritme regular i còmode segons la zona del teu pla.",
    "Redueix gradualment el ritme els últims minuts."
   ],
   "evitar": "Pendre'n la màxima resistència o inclinar-te sobre les nanses."
  },
  "Ergòmetre de rem": {
   "musculs": "Cames, esquena, braços, cor",
   "passos": [
    "Seu amb els peus fixats i agafa l'agafador, braços estirats i genolls doblegats.",
    "Empeny amb les cames, després inclina el tronc enrere i porta l'agafador al pit.",
    "Torna a la inversa i repeteix a ritme suau, expirant en l'esforç."
   ],
   "evitar": "Tirar amb els braços abans de les cames, arrodonir l'esquena o aguantar l'aire."
  },
  "Ergòmetre de braços": {
   "musculs": "Braços, espatlles, cor",
   "passos": [
    "Seu a l'altura de l'ergòmetre, amb els eixos de les manetes a l'altura de les espatlles.",
    "Pedaleja amb els braços a ritme suau i regular.",
    "Els últims minuts, redueix la resistència. Només si el cardiòleg ho permet."
   ],
   "evitar": "Resistència alta, encongir les espatlles o aguantar l'aire."
  },
  "Cercles d'espatlles": {
   "musculs": "Espatlles i coll",
   "passos": [
    "Dret o assegut, braços relaxats.",
    "Fes cercles amplis i lents amb les espatlles cap enrere.",
    "Després de 10 repeticions, canvia el sentit."
   ],
   "evitar": "Moviments bruscos."
  },
  "Mobilitat del coll": {
   "musculs": "Coll",
   "passos": [
    "Assegut o dret, espatlles relaxades.",
    "Gira el cap suaument cap a un costat i després cap a l'altre.",
    "Inclina el cap cap a cada espatlla, sempre sense forçar."
   ],
   "evitar": "Cercles complets forçats o moviments bruscos."
  },
  "Cercles de turmell": {
   "musculs": "Turmells",
   "passos": [
    "Assegut, estén una cama sense bloquejar el genoll.",
    "Dibuixa cercles amplis amb el peu en un sentit i després en l'altre.",
    "Repeteix amb l'altre peu."
   ],
   "evitar": "Moure la cama sencera."
  },
  "Rotació suau de tronc dret": {
   "musculs": "Tronc i columna",
   "passos": [
    "Dret, peus a l'amplada de les espatlles, braços relaxats.",
    "Gira el tronc suaument cap a un costat sense moure els peus.",
    "Torna al centre i gira cap a l'altre costat."
   ],
   "evitar": "Girar de cop o forçar el moviment."
  },
  "Abducció de maluc dempeus": {
   "musculs": "Glutis laterals",
   "passos": [
    "Dret al costat d'una cadira, una mà al respatller.",
    "Separa una cama cap al costat amb el peu endavant, sense inclinar el tronc.",
    "Baixa lentament i canvia de cama."
   ],
   "evitar": "Inclinar el tronc o balancejar la cama."
  },
  "Extensió de maluc dempeus": {
   "musculs": "Glutis",
   "passos": [
    "Dret davant d'una cadira, mans al respatller.",
    "Porta una cama estirada enrere sense arquejar l'esquena, expirant.",
    "Torna lentament i canvia de cama."
   ],
   "evitar": "Arquejar la zona lumbar o balancejar la cama."
  },
  "Curl de cames dempeus": {
   "musculs": "Isquiotibials",
   "passos": [
    "Dret davant d'una cadira, mans al respatller.",
    "Doblega un genoll portant el taló cap al glutis, expirant.",
    "Baixa lentament i canvia de cama."
   ],
   "evitar": "Moure el genoll cap endavant o inclinar el tronc."
  },
  "Elevació frontal amb ampolles (fins a l'espatlla)": {
   "musculs": "Espatlles",
   "passos": [
    "Dret, una ampolla a cada mà, braços avall.",
    "Aixeca els braços estirats endavant només fins a l'altura de les espatlles.",
    "Baixa lentament."
   ],
   "evitar": "Pujar per sobre de l'espatlla o balancejar el tronc."
  },
  "Rotació externa d'espatlla amb banda": {
   "musculs": "Maniguet dels rotadors",
   "passos": [
    "Dret o assegut, colze enganxat al costat a 90°, banda subjecta.",
    "Gira l'avantbraç cap enfora sense moure el colze, expirant.",
    "Torna lentament i canvia de braç."
   ],
   "evitar": "Separar el colze del cos."
  },
  "Retracció d'omòplats amb banda": {
   "musculs": "Esquena alta",
   "passos": [
    "Assegut recte, banda agafada amb els braços estirats davant.",
    "Separa les mans apropant els omòplats, expirant.",
    "Torna lentament."
   ],
   "evitar": "Encongir les espatlles o arquejar l'esquena."
  },
  "Peus en tàndem": {
   "musculs": "Cames i equilibri",
   "passos": [
    "Dret a prop d'un suport (paret o cadira).",
    "Posa un peu davant de l'altre, tocant taló amb punta.",
    "Mantén l'equilibri uns 20 segons i canvia de peu."
   ],
   "evitar": "Fer-ho sense suport a prop."
  },
  "Caminar peu davant peu": {
   "musculs": "Cames i equilibri",
   "passos": [
    "Camina al costat d'una paret, mirant endavant.",
    "Posa el taló d'un peu just davant la punta de l'altre.",
    "Fes uns 10 passos i torna."
   ],
   "evitar": "Mirar els peus o anar ràpid."
  },
  "Transferència de pes lateral": {
   "musculs": "Cames i equilibri",
   "passos": [
    "Dret amb els peus a l'amplada dels malucs, a prop d'un suport.",
    "Passa el pes del cos a una cama lentament, sense moure els peus.",
    "Torna al centre i passa'l a l'altra cama."
   ],
   "evitar": "Inclinar el tronc o aixecar els peus."
  },
  "Estirament de bessons a la paret": {
   "musculs": "Bessons",
   "passos": [
    "Dret davant la paret, mans a la paret, una cama endavant i l'altra enrere.",
    "Mantén el taló de la cama del darrere a terra i doblega el genoll de davant.",
    "Mantén l'estirament sense rebotar i canvia de cama."
   ],
   "evitar": "Rebotar o aixecar el taló."
  },
  "Estirament d'isquiotibials assegut": {
   "musculs": "Isquiotibials",
   "passos": [
    "Assegut a la vora de la cadira, una cama estesa amb el taló a terra.",
    "Inclina el tronc recte endavant des del maluc fins a notar l'estirament.",
    "Mantén i canvia de cama."
   ],
   "evitar": "Arrodonir l'esquena o rebotar."
  },
  "Estirament de quàdriceps dempeus": {
   "musculs": "Quàdriceps",
   "passos": [
    "Dret amb una mà al respatller d'una cadira.",
    "Doblega un genoll i agafa el peu per darrere, portant el taló cap al glutis.",
    "Mantén els genolls junts, sense arquejar l'esquena, i canvia de cama."
   ],
   "evitar": "Arquejar l'esquena o tibar el genoll."
  },
  "Estirament de flexors del maluc": {
   "musculs": "Flexors del maluc",
   "passos": [
    "Dret amb una mà al respatller d'una cadira, un peu endavant i l'altre enrere.",
    "Doblega suaument el genoll de davant i porta el maluc endavant.",
    "Mantén i canvia de cama."
   ],
   "evitar": "Arquejar la zona lumbar o baixar massa."
  },
  "Estirament de pit a la porta": {
   "musculs": "Pit",
   "passos": [
    "Dret al marc d'una porta, avantbraços recolzats a cada costat.",
    "Fes un pas endavant fins a notar l'estirament al pit.",
    "Mantén l'estirament respirant amb calma. Només si el cardiòleg ho permet."
   ],
   "evitar": "Forçar l'estirament o arquejar l'esquena."
  },
  "Estirament d'espatlla (braç creuat)": {
   "musculs": "Espatlla (deltoide posterior)",
   "passos": [
    "Dret o assegut, porta un braç estirat creuat davant el pit.",
    "Ajuda amb l'altra mà, empenyent suaument el colze.",
    "Mantén i canvia de braç."
   ],
   "evitar": "Girar el tronc o tibar l'espatlla."
  },
  "Estirament lateral del coll": {
   "musculs": "Coll",
   "passos": [
    "Assegut o dret, espatlles relaxades.",
    "Inclina l'orella cap a l'espatlla del mateix costat, sense aixecar l'espatlla.",
    "Mantén i canvia de costat."
   ],
   "evitar": "Tibar amb la mà o encongir les espatlles."
  },
  "Estirament de tríceps": {
   "musculs": "Tríceps",
   "passos": [
    "Assegut o dret, porta un braç amunt i doblega el colze deixant la mà darrere el cap.",
    "Ajuda amb l'altra mà empenyent suaument el colze.",
    "Mantén i canvia de braç. Braços per sobre del cap: només si el cardiòleg ho permet."
   ],
   "evitar": "Tibar el coll o forçar el colze."
  },
  "Genolls al pit estirat": {
   "musculs": "Lumbars i glutis",
   "passos": [
    "Estirat cara amunt sobre una màrfega.",
    "Abraça un genoll cap al pit, l'altra cama relaxada.",
    "Mantén i canvia de cama."
   ],
   "evitar": "Aixecar el cap o aguantar l'aire."
  },
  "Gat-camell": {
   "musculs": "Columna",
   "passos": [
    "A quatre grapes, mans sota les espatlles i genolls sota els malucs.",
    "Arrodoneix l'esquena cap amunt amb el cap avall (gat), expirant.",
    "Després, baixa l'esquena i aixeca el cap suaument (camell). Alterna lentament."
   ],
   "evitar": "Moviments bruscos."
  },
  "Rotació de columna asseguda": {
   "musculs": "Columna i tronc",
   "passos": [
    "Assegut recte, peus a terra, braços creuats sobre el pit.",
    "Gira el tronc suaument cap a un costat.",
    "Torna al centre i gira cap a l'altre costat."
   ],
   "evitar": "Girar de cop o aixecar-te del seient."
  },
  "Respiració diafragmàtica": {
   "musculs": "Diafragma",
   "passos": [
    "Estirat o assegut còmodament, una mà a la panxa i l'altra al pit.",
    "Inspira lentament pel nas inflant la panxa; el pit gairebé no es mou.",
    "Expira lentament per la boca buidant la panxa."
   ],
   "evitar": "Fer força o inspirar de cop."
  },
  "Respiració amb llavis arrufats": {
   "musculs": "Pulmons i diafragma",
   "passos": [
    "Assegut còmodament, espatlles relaxades.",
    "Inspira pel nas comptant fins a 2.",
    "Expira lentament pels llavis semitancats, comptant fins a 4."
   ],
   "evitar": "Forçar l'expiració."
  },
  "Entrenament muscular inspiratori": {
   "musculs": "Músculs inspiratoris",
   "passos": [
    "Assegut recte, entrenador inspiratori configurat amb la resistència que t'ha indicat l'equip.",
    "Expira del tot i inspira fort i profund pel dispositiu.",
    "Fes les repeticions indicades amb descans entre si."
   ],
   "evitar": "Canviar la resistència pel teu compte o marejar-te: atura't i descansa."
  },
  "Relaxació muscular progressiva": {
   "musculs": "Tot el cos",
   "passos": [
    "Estirat o assegut en un lloc tranquil, ulls tancats.",
    "Tensa un grup muscular uns 5 segons (peus, cames, abdomen, mans, braços, cara).",
    "Deixa'l anar uns 10 segons notant la relaxació i passa al següent."
   ],
   "evitar": "Tensar fins al dolor o aguantar l'aire."
  },
  "Relaxació guiada (escaneig corporal)": {
   "musculs": "Tot el cos",
   "passos": [
    "Estirat o assegut còmodament, ulls tancats.",
    "Porta l'atenció als peus, després a les cames, el tronc, els braços i el cap.",
    "Respira lent i relaxa cada zona abans de passar a la següent."
   ],
   "evitar": "Forçar-te a no pensar en res: simplement torna a l'atenció."
  }
 },
 "TEMES": [
  [
   "Què és la rehabilitació cardíaca",
   [
    "És un programa supervisat d'exercici, educació i suport emocional per recuperar-te d'un problema de cor.",
    "Es fa en fases: durant l'ingrés, ambulatòria a l'hospital i després de manteniment a casa.",
    "El programa és personal: l'equip fixa la teva intensitat segons la teva cardiopatia i la teva capacitat."
   ]
  ],
  [
   "Com fer l'exercici amb seguretat",
   [
    "Escalfa sempre 10 minuts i acaba amb tornada a la calma i estiraments.",
    "Controla l'esforç: has de poder parlar mentre fas l'exercici (escala de Borg dins del teu límit).",
    "Mai aguantis l'aire en fer força: expira en l'esforç.",
    "Evita exercici intens amb molta calor, molt fred, just després de menjar molt o amb febre.",
    "Hidrata't i porta roba i calçat còmodes."
   ]
  ],
  [
   "Senyals d'alarma",
   [
    "Dolor, pressió o opressió al pit, braç, coll o mandíbula.",
    "Mareig, sensació de desmai o suor freda.",
    "Falta d'aire anormal, palpitacions o ritme irregular.",
    "Si no cedeixen en repòs: truca al 112."
   ]
  ],
  [
   "Alimentació",
   [
    "Dieta de tipus mediterrani: verdura, fruita, llegums, cereals integrals, peix i oli d'oliva.",
    "Redueix la sal, els embotits, la brioixeria i les begudes ensucrades.",
    "Si tens sobrepès, una pèrdua gradual de pes millora el cor. Consulta el teu equip."
   ]
  ],
  [
   "Tabac i alcohol",
   [
    "Deixar de fumar és una de les mesures que més redueix el risc de tornar a tenir un problema.",
    "Demana ajuda al teu centre de salut: hi ha tractaments i seguiment que ho faciliten.",
    "L'alcohol, ben limitat o evitat segons indicació mèdica."
   ]
  ],
  [
   "Medicació",
   [
    "Pren la medicació exactament com t'ho han indicat i no la deixis sense consultar-ho.",
    "Porta sempre la llista actualitzada de la medicació.",
    "Comenta els efectes secundaris amb el metge: sovint tenen solució."
   ]
  ],
  [
   "Factors de risc",
   [
    "Controla la tensió arterial, el colesterol i la glucosa (si tens diabetis) amb les revisions pautades.",
    "Mantén un pes saludable i una activitat física regular.",
    "Dorm prou i redueix l'estrès."
   ]
  ],
  [
   "Estat d'ànim i estrès",
   [
    "És normal sentir por, tristesa o ansietat després d'un problema de cor.",
    "Parla'n amb l'equip, amb la família o amb altres pacients: el suport ajuda a la recuperació.",
    "Les tècniques de respiració i relaxació d'aquest programa et poden ajudar."
   ]
  ],
  [
   "Activitat sexual i retorn a la feina",
   [
    "Les relacions sexuals acostumen a ser possibles quan puguis fer un esforç moderat; ho has de consultar amb el teu cardiòleg.",
    "El retorn a la feina depèn de la teva cardiopatia i del tipus de feina: l'equip t'ho valorarà.",
    "Conduir i viatjar també s'han de pactar amb el teu metge."
   ]
  ],
  [
   "Després de l'alta del programa",
   [
    "Continua caminant o fent exercici 30 minuts, la majoria de dies de la setmana.",
    "Fes dues sessions setmanals de força suau com les d'aquest programa.",
    "Segueix les revisions i no abandonis els hàbits saludables."
   ]
  ]
 ],
 "ETIQ_MATERIAL": {
  "cadira": "Cadira",
  "taula": "Taula",
  "escala": "Escala / esglaó",
  "paret": "Paret",
  "ampolles": "Ampolles d'aigua",
  "motxilla": "Motxilla amb pes (llibres)",
  "banda_elastica": "Banda elàstica",
  "bici_casa": "Bicicleta estàtica",
  "bastons": "Bastons de nordic walking",
  "inspiratori": "Entrenador muscular inspiratori",
  "maquines": "màquina del gimnàs",
  "politges": "politja del gimnàs",
  "manuelles": "manuelles lleugeres",
  "cinta": "cinta de caminar",
  "bici": "bicicleta estàtica",
  "eliptica": "el·líptica",
  "rem": "ergòmetre de rem",
  "erg_bracos": "ergòmetre de braços"
 }
};
if (typeof module !== "undefined") module.exports = D;
