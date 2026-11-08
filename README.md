# Pla Cardíac · app web

Versió web (PWA) del programa d'escriptori **Pla Cardíac**: pla d'exercici per a la rehabilitació cardíaca
a partir de les pautes del cardiòleg, guies d'exercici amb dibuixos, seguiment de sessions, evolució,
valoracions, guia educativa i informes en PDF. Creat amb IA per Xavier Musté.

Publicada a **https://xorigu3r.github.io/pla-cardiac/** (GitHub Pages, branca `main`).

- Funciona sense connexió i s'instal·la com una app (iPhone: Safari → Compartir → Afegeix a la pantalla d'inici;
  Android/PC: Chrome o Edge → Instal·la).
- Les dades es guarden només a l'aparell (`localStorage`, claus `pc.*`). La còpia `.json` té el **mateix format**
  que `Documents\PlaCardiac\dades.json` del programa d'escriptori: es poden passar en tots dos sentits.
- Aquesta eina no substitueix el criteri mèdic.

## Estructura
- `index.html`, `css/app.css`, `js/app.js` – l'app (pantalles, dades, impressió).
- `js/logica.js` – validació de pautes i generació del pla: **traducció exacta de `logic.py`** del programa.
- `js/dades.js` – exercicis, descripcions, guia educativa i textos. **Generat** des del programa: no editar a mà.
- `figures/*.svg` – els ninots de cada exercici. **Generats** des de `figures.py` del programa.
- `sw.js` – funcionament sense connexió. **Puja `VERSION` a cada canvi** perquè els mòbils agafin la nova versió.
- `eines/` – scripts de manteniment (no formen part de l'app).

## Si canvia el programa d'escriptori (`Desktop\PlaCardiac`)
```
py -I eines\genera_dades.py      (exercicis, descripcions, educació, textos)
py -I eines\genera_figures.py    (dibuixos)
py -I eines\prova_logica.py      (comprova que la lògica JS = logic.py; ha de dir "N de N casos idèntics")
```
Si canvia `logic.py`, cal canviar també `js/logica.js` i tornar a passar `prova_logica.py`.
Si s'afegeixen o treuen figures, cal actualitzar la llista de `sw.js`.
