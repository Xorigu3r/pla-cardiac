"""Comprova que js/logica.js fa EXACTAMENT el mateix que logic.py del programa d'escriptori.

Genera milers de pautes aleatòries (bones i dolentes) i altres entrades, les passa per Python i per
JavaScript (Node) i compara els resultats: el pla sencer o el missatge d'error, idèntics.
    py -I eines\\prova_logica.py [carpeta_del_programa] [nombre_de_casos]
"""
import json
import random
import subprocess
import sys
from pathlib import Path

ARREL = Path(__file__).resolve().parent.parent
PROGRAMA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Desktop" / "PlaCardiac"
N = int(sys.argv[2]) if len(sys.argv) > 2 else 3000
sys.path.insert(0, str(PROGRAMA))

import constants as C  # noqa: E402
import logic as L      # noqa: E402

rnd = random.Random(20261108)


def valor_enter(mini, maxi):
    r = rnd.random()
    if r < .55:
        return str(rnd.randint(mini, maxi))
    if r < .65:
        return rnd.randint(mini, maxi)
    if r < .70:
        return f"{rnd.randint(mini, maxi)} bpm"
    if r < .75:
        return f"{rnd.randint(mini, maxi)},5"
    if r < .80:
        return ""
    if r < .84:
        return str(rnd.randint(maxi + 1, maxi + 40))
    if r < .87:
        return "abc"
    if r < .90:
        return f"{rnd.randint(mini, maxi)}.5"
    return rnd.randint(mini - 5, maxi + 5)


def pautes():
    p = L.pautes_per_defecte()
    for k, (_, mini, maxi, obl) in L.CAMPS_ENTERS.items():
        if rnd.random() < .85:
            p[k] = valor_enter(mini, maxi)
    # valors coherents més sovint perquè es generin plans
    if rnd.random() < .6:
        a = rnd.randint(0, 60)
        p["aer_min_inicial"], p["aer_min_final"] = a, a + rnd.randint(0, 40)
        si = rnd.randint(1, 3)
        p["series_inicials"], p["series_max"] = si, si + rnd.randint(0, 3)
        rm = rnd.randint(1, 15)
        p["reps_min"], p["reps_max"] = rm, rm + rnd.randint(0, 10)
        p["fc_max_permesa"] = rnd.randint(100, 180)
        p["borg_max"] = rnd.randint(9, 16)
        p["fc_min_objectiu"] = rnd.choice(["", rnd.randint(60, 130)])
        p["setmanes"] = rnd.randint(1, 12)
    nd = rnd.choice([0, 1, 2, 3, 3, 4, 5, 6, 7])
    p["dies"] = [rnd.choice(["casa", "gimnas", "casa", "gimnas", "platja"] if rnd.random() < .05 else ["casa", "gimnas"])
                 for _ in range(nd)]
    tipus = list(C.TIPUS_SESSIO) + (["natacio"] if rnd.random() < .03 else [])
    p["tipus_dies"] = [rnd.choice(tipus) for _ in range(rnd.randint(0, 7))]
    p["nivell_max"] = rnd.choice([1, 2, 3, 1, 2, 3, "2", "4", 0, "x", 2.0])
    p["pes_max_kg"] = rnd.choice(["", "", "5", "2,5", "0", "300", "abc", 7, "10 kg"])
    p["evitar_tags"] = rnd.sample(list(C.ETIQUETES_RISC) + ["esternotomia", "inventat"], rnd.randint(0, 5))
    mats = [k for k, _ in C.MATERIAL_CASA]
    p["material_casa"] = rnd.sample(mats + ["inventat"], rnd.randint(0, len(mats)))
    p["inclou_equilibri"] = rnd.choice([True, False, True])
    p["inclou_respiracio"] = rnd.choice([True, False, True])
    p["fase"] = rnd.choice(["", "  Fase II  ", "IAM 2026"])
    p["notes_cardiolec"] = rnd.choice(["", "Res de pesos", " "])
    p["confirmat"] = rnd.random() < .93
    return p


def serial_pla(pla):
    return [{"setmana": s["setmana"], "series": s["series"], "reps": s["reps"], "aer_min": s["aer_min"],
             "dies": [{"lloc": d["lloc"], "tipus": d["tipus"],
                       "blocs": [{"nom": b["nom"], "tipus": b["tipus"], "nota": b["nota"],
                                  "items": [[it["ex"]["id"], it["dosi"]] for it in b["items"]]}
                                 for b in d["blocs"]]} for d in s["dies"]]} for s in pla]


def executa(p):
    try:
        net = L.validar_pautes(p)
    except ValueError as e:
        return {"error": str(e)}
    try:
        return {"net": net, "pla": serial_pla(L.genera_pla(net))}
    except ValueError as e:
        return {"net": net, "error": str(e)}


def main():
    casos = []
    for _ in range(N):
        p = pautes()
        casos.append({"tipus": "pla", "entrada": p, "python": executa(p)})
    textos = ["1/2/2026", "01/02/2026", "2026-02-01", "2026-2-1", "31/02/2026", "29/02/2024", "29/02/2025", "1-2-2026",
              "", "abc", "12/13/2026", " 05/11/2026 ", "5/11/26", "2026/11/05", "0/1/2026", "00/01/2026"]
    for t in textos:
        try:
            r = {"ok": L.parse_data(t)}
        except ValueError as e:
            r = {"error": str(e)}
        casos.append({"tipus": "data", "entrada": t, "python": r})
    for t in ["120/80", "120 / 80", "120-80", "90/60", "300/80", "12/8", "", "abc", "140/100", "59/40"]:
        try:
            r = {"ok": L.parse_ta(t)}
        except ValueError as e:
            r = {"error": str(e)}
        casos.append({"tipus": "ta", "entrada": t, "python": r})
    for _ in range(400):
        v = {"pes": rnd.choice([rnd.randint(40, 140), round(rnd.uniform(40, 140), 1), "", None]),
             "alcada": rnd.choice([rnd.randint(140, 200), round(rnd.uniform(140, 200), 1), "", None, 0])}
        casos.append({"tipus": "imc", "entrada": v, "python": L.imc(v)})
    for _ in range(300):
        p = {"fc_max_permesa": rnd.randint(100, 180), "borg_max": rnd.randint(9, 16)}
        b, f, s = rnd.choice([None, rnd.randint(6, 20)]), rnd.choice([None, rnd.randint(60, 200)]), rnd.random() < .2
        pp = rnd.choice([p, None])
        casos.append({"tipus": "aval", "entrada": [pp, b, f, s], "python": [list(x) for x in L.avalua_sessio(pp, b, f, s)]})

    fitxer = ARREL / "eines" / "_casos.json"
    fitxer.write_text(json.dumps(casos, ensure_ascii=False), encoding="utf-8")
    res = subprocess.run(["node", str(ARREL / "eines" / "prova_logica.js"), str(fitxer)],
                         capture_output=True, text=True, encoding="utf-8")
    fitxer.unlink()
    print(res.stdout.strip())
    if res.returncode != 0:
        print(res.stderr.strip())
        raise SystemExit(1)
    plans = sum(1 for c in casos if c["tipus"] == "pla" and "pla" in c["python"])
    errs = sum(1 for c in casos if c["tipus"] == "pla" and "error" in c["python"])
    print(f"(dels casos de pla: {plans} plans generats i {errs} errors de validació, tots comparats)")


if __name__ == "__main__":
    main()
