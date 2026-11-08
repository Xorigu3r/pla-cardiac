"""Genera figures/<nom>.svg (els ninots de cada exercici) a partir de figures.py del programa d'escriptori.

Reprodueix exactament el que fa la classe Dibuix (els mateixos càlculs i colors), però en SVG en lloc de PDF.
    py -I eines\\genera_figures.py [carpeta_del_programa]
"""
import math
import re
import sys
import unicodedata
from pathlib import Path
from xml.sax.saxutils import escape

ARREL = Path(__file__).resolve().parent.parent
PROGRAMA = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.home() / "Desktop" / "PlaCardiac"
sys.path.insert(0, str(PROGRAMA))

from figures import DIBUIXOS, _limits  # noqa: E402
from exercicis import EXERCICIS        # noqa: E402

CM = 72 / 2.54
AMPLE, ALT = 17.4 * CM, 6.6 * CM       # la mateixa mida que a la guia en PDF


def slug(text):
    t = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "_", t.lower()).strip("_")


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def svg(nom):
    p1, p2, caps = DIBUIXOS[nom]()
    panels = (p1, p2)
    gap, cap_h = 10, 16
    pw, ph = (AMPLE - gap) / 2, ALT - cap_h
    xs, ys = [], [0.0]
    for pr in panels:
        x, y = _limits(pr)
        xs += x
        ys += y
    xmin, xmax = min(xs) - .1, max(xs) + .1
    ymin, ymax = -.06, max(ys) + .1
    bw, bh = xmax - xmin, ymax - ymin
    s = min((pw - 12) / bw, (ph - 10) / bh)
    H = ALT
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(AMPLE)} {f(ALT)}" '
         f'font-family="Helvetica, Arial, sans-serif" font-weight="bold" '
         f'stroke-linecap="round" stroke-linejoin="round">']
    o.append("<defs>" + "".join(
        f'<clipPath id="c{i}"><rect x="{f(i * (pw + gap))}" y="0" width="{f(pw)}" height="{f(ph)}"/></clipPath>'
        for i in range(2)) + "</defs>")
    for i, prims in enumerate(panels):
        px = i * (pw + gap)
        ox = px + (pw - bw * s) / 2
        oy = cap_h + 5
        X = lambda x: ox + (x - xmin) * s          # noqa: E731
        Y = lambda y: H - (oy + (y - ymin) * s)    # coordenades SVG (y cap avall)
        o.append(f'<rect x="{f(px)}" y="0" width="{f(pw)}" height="{f(ph)}" rx="6" fill="#fff" stroke="#CFD8DC"/>')
        o.append(f'<g clip-path="url(#c{i})">')
        o.append(f'<line x1="{f(px + 6)}" y1="{f(Y(0))}" x2="{f(px + pw - 6)}" y2="{f(Y(0))}" stroke="#9E9E9E" stroke-width="1.6"/>')
        for p in prims:
            k = p[0]
            if k in ("line", "dash"):
                d = ' stroke-dasharray="5 4"' if k == "dash" else ""
                o.append(f'<line x1="{f(X(p[1][0]))}" y1="{f(Y(p[1][1]))}" x2="{f(X(p[2][0]))}" y2="{f(Y(p[2][1]))}" '
                         f'stroke="{p[3]}" stroke-width="{f(p[4])}"{d}/>')
            elif k == "rect":
                x0, y0 = X(p[1]), Y(p[4])
                o.append(f'<rect x="{f(x0)}" y="{f(y0)}" width="{f((p[3] - p[1]) * s)}" height="{f((p[4] - p[2]) * s)}" '
                         f'fill="{p[5]}" stroke="{p[6]}" stroke-width="{f(p[7])}"/>')
            elif k == "circle":
                o.append(f'<circle cx="{f(X(p[1][0]))}" cy="{f(Y(p[1][1]))}" r="{f(p[2] * s)}" '
                         f'fill="{p[3]}" stroke="{p[4]}" stroke-width="{f(p[5])}"/>')
            elif k == "text":
                o.append(f'<text x="{f(X(p[1][0]))}" y="{f(Y(p[1][1]))}" fill="{p[3]}" font-size="{f(p[4])}">'
                         f'{escape(p[2])}</text>')
            elif k == "arrow":
                x1, y1, x2, y2 = X(p[1][0]), Y(p[1][1]), X(p[2][0]), Y(p[2][1])
                ang = math.atan2(y2 - y1, x2 - x1)
                cap = "".join(f'<line x1="{f(x2)}" y1="{f(y2)}" x2="{f(x2 + 8 * math.cos(ang + da))}" '
                              f'y2="{f(y2 + 8 * math.sin(ang + da))}"/>' for da in (2.6, -2.6))
                o.append(f'<g stroke="{p[3]}" stroke-width="{f(p[4])}"><line x1="{f(x1)}" y1="{f(y1)}" '
                         f'x2="{f(x2)}" y2="{f(y2)}"/>{cap}</g>')
        o.append("</g>")
        o.append(f'<text x="{f(px + pw / 2)}" y="{f(H - 4)}" text-anchor="middle" font-size="9" fill="#1F4E78">'
                 f'{i + 1}.  {escape(caps[i])}</text>')
    o.append("</svg>")
    return "".join(o)


def main():
    carpeta = ARREL / "figures"
    carpeta.mkdir(exist_ok=True)
    noms = sorted({e["nom"] for e in EXERCICIS})
    falten = [n for n in noms if n not in DIBUIXOS]
    if falten:
        raise SystemExit(f"Falten dibuixos per a: {falten}")
    for n in noms:
        (carpeta / f"{slug(n)}.svg").write_text(svg(n), encoding="utf-8")
    print(f"{len(noms)} figures a {carpeta}")


if __name__ == "__main__":
    main()
