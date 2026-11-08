"""Genera js/dades.js a partir del programa d'escriptori (Desktop\\PlaCardiac).

Així els exercicis, les descripcions, la guia educativa i els textos són exactament els mateixos
que al programa. Torna'l a executar si canvies aquests arxius al programa d'escriptori:

    py -I eines\\genera_dades.py [carpeta_del_programa]
"""
import json
import sys
from pathlib import Path

ARREL = Path(__file__).resolve().parent.parent
PROGRAMA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Desktop" / "PlaCardiac"
sys.path.insert(0, str(PROGRAMA))

import constants as C          # noqa: E402
import logic as L              # noqa: E402
from descripcions import DESC  # noqa: E402
from educacio import TEMES     # noqa: E402
from exercicis import EXERCICIS  # noqa: E402
from guies import ETIQ_MATERIAL  # noqa: E402

exercicis = [{
    "id": e["id"], "nom": e["nom"], "lloc": e["lloc"], "material": sorted(e["material"]),
    "grup": e["grup"], "nivell": e["nivell"], "tags": sorted(e["tags"]), "nota": e["nota"],
    "cat": e["cat"], "dosi": e["dosi"],
} for e in EXERCICIS]

falten = [e["nom"] for e in EXERCICIS if e["nom"] not in DESC]
if falten:
    raise SystemExit(f"Falten descripcions per a: {falten}")

D = {
    "APP_NOM": C.APP_NOM,
    "VERSIO_PROGRAMA": C.APP_VERSIO,
    "CREDIT": C.APP_CREDIT,
    "ETIQUETES_RISC": C.ETIQUETES_RISC,
    "MATERIAL_CASA": C.MATERIAL_CASA,
    "MATERIAL_GIMNAS": sorted(C.MATERIAL_GIMNAS),
    "NIVELLS": {str(k): v for k, v in C.NIVELLS.items()},
    "LLOCS": C.LLOCS,
    "LLOCS_EX": C.LLOCS_EX,
    "MAX_DIES": C.MAX_DIES,
    "GRUPS_SESSIO": C.GRUPS_SESSIO,
    "GRUPS_EXTRA": C.GRUPS_EXTRA,
    "NOM_GRUP": C.NOM_GRUP,
    "NOM_CAT": C.NOM_CAT,
    "TIPUS_SESSIO": C.TIPUS_SESSIO,
    "SENYALS_ALARMA": C.SENYALS_ALARMA,
    "GUIA_IMPORTANT": C.GUIA_IMPORTANT,
    "CAMPS_ENTERS": [[k, *v] for k, v in L.CAMPS_ENTERS.items()],
    "PAUTES_DEFECTE": L.pautes_per_defecte(),
    "EXERCICIS": exercicis,
    "DESC": DESC,
    "TEMES": TEMES,
    "ETIQ_MATERIAL": ETIQ_MATERIAL,
}

sortida = ARREL / "js" / "dades.js"
sortida.parent.mkdir(exist_ok=True)
text = ("/* GENERAT AUTOMÀTICAMENT per eines/genera_dades.py a partir del programa d'escriptori.\n"
        "   No l'editis a mà: canvia el programa i torna a executar l'script. */\n"
        "const D = " + json.dumps(D, ensure_ascii=False, indent=1) + ";\n"
        "if (typeof module !== \"undefined\") module.exports = D;\n")
sortida.write_text(text, encoding="utf-8")
print(f"{sortida}: {len(exercicis)} exercicis, {len(DESC)} descripcions, {len(TEMES)} temes")
