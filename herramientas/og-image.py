# -*- coding: utf-8 -*-
"""Genera la imagen que levantan WhatsApp, LinkedIn e Instagram al compartir.

Se rehace porque la anterior decia "para duenos de MARCAS" y el evento es para
duenos de CADENAS — la correccion se habia hecho en toda la pagina y en los
metadatos, pero la imagen quedo vieja, y es lo primero que ve el que recibe el
link. Se generan las dos variantes de fondo para poder elegir.
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

DEST = sys.argv[1] if len(sys.argv) > 1 else "."
W, H = 1200, 630
MAGENTA = (255, 0, 84)
MAGENTA_TXT = (255, 92, 135)
MAGENTA_CLARO = (224, 0, 73)

FUENTES = "C:/Windows/Fonts/"
def f(nombre, tam):
    for c in (nombre, "segoeuib.ttf", "arialbd.ttf"):
        try:
            return ImageFont.truetype(FUENTES + c, tam)
        except OSError:
            continue
    return ImageFont.load_default()

def espaciado(d, xy, texto, fuente, fill, sep=0):
    """Dibuja con tracking manual: PIL no lo trae."""
    x, y = xy
    for ch in texto:
        d.text((x, y), ch, font=fuente, fill=fill)
        x += d.textlength(ch, font=fuente) + sep
    return x

def generar(oscuro=True):
    fondo   = (13, 13, 13) if oscuro else (255, 255, 255)
    tinta   = (255, 255, 255) if oscuro else (26, 26, 26)
    gris    = (163, 163, 168) if oscuro else (85, 83, 92)
    linea   = (42, 42, 42) if oscuro else (224, 222, 219)
    acento  = MAGENTA_TXT if oscuro else MAGENTA_CLARO
    caja    = MAGENTA if oscuro else MAGENTA_CLARO

    img = Image.new("RGB", (W, H), fondo)
    d = ImageDraw.Draw(img)

    # Filete superior: la firma de color, visible incluso en la miniatura
    d.rectangle([0, 0, W, 8], fill=caja)

    espaciado(d, (64, 52), "DEENEX PRESENTA", f("segoeuib.ttf", 21), acento, 2.6)
    fecha = "CÓRDOBA  ·  20.09.2026"
    fu = f("segoeuib.ttf", 21)
    ancho = sum(d.textlength(c, font=fu) + 2.6 for c in fecha)
    espaciado(d, (W - 64 - ancho, 52), fecha, fu, gris, 2.6)
    d.line([64, 96, W - 64, 96], fill=linea, width=1)

    # La caja del cupo, a la derecha
    d.rectangle([936, 126, 1136, 358], fill=caja)
    fn = f("segoeuib.ttf", 96)
    d.text((1036 - d.textlength("200", font=fn) / 2, 152), "200", font=fn, fill=(255, 255, 255))
    fl = f("segoeuib.ttf", 26)
    al = sum(d.textlength(c, font=fl) + 3 for c in "LUGARES")
    espaciado(d, (1036 - al / 2, 268), "LUGARES", fl, (255, 255, 255), 3)
    d.line([966, 302, 1106, 302], fill=(255, 255, 255), width=2)
    fp = f("segoeui.ttf", 20)
    d.text((1036 - d.textlength("es la sala entera", font=fp) / 2, 316),
           "es la sala entera", font=fp, fill=(255, 255, 255))

    # El nombre, en tamaño de cartel
    d.text((60, 168), "GASTROTECH", font=f("segoeuib.ttf", 108), fill=tinta)
    d.text((64, 298), "GASTRONOMÍA Y TECNOLOGÍA", font=f("segoeuib.ttf", 44), fill=acento)
    # ← lo que estaba mal: decía "DUEÑOS DE MARCAS"
    d.text((64, 352), "PARA DUEÑOS DE CADENAS", font=f("segoeuib.ttf", 44), fill=tinta)

    d.line([64, 458, W - 64, 458], fill=linea, width=1)
    fd = f("segoeui.ttf", 25)
    d.text((64, 486), "Un día entero de charlas, demos en vivo y networking.", font=fd, fill=gris)
    d.text((64, 524), "Hotel Quinto Centenario, Córdoba  ·  9 a 18 h", font=fd, fill=gris)
    espaciado(d, (64, 576), "SIETE BLOQUES  ·  UN SOLO TRACK  ·  SE RESERVA POR WHATSAPP",
              f("segoeuib.ttf", 20), acento, 2.2)
    return img

for oscuro, nombre in ((True, "og-oscura.png"), (False, "og-clara.png")):
    im = generar(oscuro)
    ruta = os.path.join(DEST, nombre)
    im.save(ruta, optimize=True)
    im.resize((300, 158)).save(os.path.join(DEST, "mini-" + nombre))
    print(nombre, "%.0f KB" % (os.path.getsize(ruta) / 1024))
