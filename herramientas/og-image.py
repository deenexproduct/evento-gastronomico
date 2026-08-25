# -*- coding: utf-8 -*-
"""Genera la imagen que levantan WhatsApp, LinkedIn e Instagram al compartir.

Es la primera superficie de la marca: el 100% del público la ve en el chat
antes de abrir la página. Por eso se compone en Archivo, la misma tipografía
que usa el sitio. Antes se componía en Segoe UI Bold, que en Windows existe y
en un runner Linux no: la cadena de respaldo caía a Arial Bold o al bitmap de
PIL, y el resultado era una tarjeta en otra tipografía que la página.

DOS COSAS QUE NO SE TOCAN SIN ENTENDERLAS:

1. EL ORDEN DE LOS EJES. Archivo declara sus ejes variables como
   [Weight, Width] — en ese orden, verificado con get_variation_axes(). PIL
   pasa la lista posicionalmente y NO valida nombres, así que invertirla no da
   error: da un titular en peso 100 y ancho 125 (una línea de pelo estirada) y
   se descubre mirando el PNG, nunca fallando. Por eso ejes() arma la lista a
   partir del orden declarado por la fuente y no de una constante escrita acá.

2. LA COORDENADA ES EL TOPE DE LAS MAYÚSCULAS, no el tope del ascendente que
   PIL usa por defecto. Archivo y Segoe UI tienen ascendentes distintos (a
   cuerpo 108, 41 px contra 18), así que un cambio de fuente movía cada línea
   una distancia distinta y descuadraba la composición entera. Con cap() la
   maqueta queda expresada en donde se ve la tinta, y la próxima fuente que
   entre no mueve nada.
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

DEST = sys.argv[1] if len(sys.argv) > 1 else "."
# La revisión NO va dentro de DEST: todo lo que cae en public/ lo copia Vite
# a dist/ y se publica. Así es como og-image-oscura.png terminó pesando 55 KB
# en el deploy sin que ningún archivo del proyecto la referencie.
REVISION = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_revision")
W, H = 1200, 630
MAGENTA = (255, 0, 84)
MAGENTA_TXT = (255, 92, 135)
MAGENTA_CLARO = (224, 0, 73)

FUENTES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fuentes")
VARIABLE = os.path.join(FUENTES, "Archivo-Variable.ttf")


def f(tam, wght=900, wdth=100):
    """Archivo al peso y ancho pedidos. Sin respaldo a otra familia: un
    respaldo silencioso es exactamente el bug que este archivo vino a arreglar
    —la tarjeta salía en Segoe UI o en Arial y nadie se enteraba—, así que si
    la fuente no está, esto tiene que romper acá y no en el chat de alguien."""
    if not os.path.exists(VARIABLE):
        raise SystemExit(
            "Falta %s.\n"
            "Bajala de https://github.com/google/fonts/tree/main/ofl/archivo\n"
            "  curl -sSL -o herramientas/fuentes/Archivo-Variable.ttf \\n"
            "    'https://github.com/google/fonts/raw/main/ofl/archivo/Archivo%%5Bwdth,wght%%5D.ttf'"
            % VARIABLE
        )
    fu = ImageFont.truetype(VARIABLE, tam)
    fu.set_variation_by_axes(ejes(fu, wght, wdth))
    return fu


def ejes(fu, wght, wdth):
    """La lista en el orden que declara la fuente, no en uno supuesto."""
    pedido = {b"Weight": wght, b"Width": wdth}
    return [pedido[a["name"]] for a in fu.get_variation_axes()]


def cap(d, xy, texto, fuente, fill):
    """Dibuja con la Y en el tope de las mayúsculas."""
    x, y = xy
    d.text((x, y - fuente.getbbox("H")[1]), texto, font=fuente, fill=fill)


def espaciado(d, xy, texto, fuente, fill, sep=0):
    """Dibuja con tracking manual —PIL no lo trae— y la Y en el tope de las
    mayúsculas, igual que cap()."""
    x, y = xy
    y -= fuente.getbbox("H")[1]
    for ch in texto:
        d.text((x, y), ch, font=fuente, fill=fill)
        x += d.textlength(ch, font=fuente) + sep
    return x


def ancho(d, texto, fuente, sep=0):
    if not texto:
        return 0
    return sum(d.textlength(c, font=fuente) + sep for c in texto) - sep


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

    espaciado(d, (64, 60), "DEENEX PRESENTA", f(21), acento, 2.6)
    fecha = "CÓRDOBA  ·  20.09.2026"
    fu = f(21)
    espaciado(d, (W - 64 - ancho(d, fecha, fu, 2.6), 60), fecha, fu, gris, 2.6)
    d.line([64, 96, W - 64, 96], fill=linea, width=1)

    # La caja del cupo, a la derecha
    d.rectangle([936, 126, 1136, 358], fill=caja)
    # 88 y no 96: Archivo es ~17% más ancha que la Segoe UI con la que estaba
    # compuesta esta caja, y a cuerpo 96 el número mide 193 px dentro de una
    # caja de 200 —3,5 px de aire por lado, se lee reventando el recuadro—.
    # A 88 vuelven los 12 px de margen que tenía la versión publicada.
    fn = f(88)
    cap(d, (1036 - ancho(d, "200", fn) / 2, 192), "200", fn, (255, 255, 255))
    fl = f(26)
    espaciado(d, (1036 - ancho(d, "LUGARES", fl, 3) / 2, 279), "LUGARES", fl, (255, 255, 255), 3)
    d.line([966, 302, 1106, 302], fill=(255, 255, 255), width=2)
    fp = f(20, 500)
    cap(d, (1036 - ancho(d, "es la sala entera", fp) / 2, 324),
        "es la sala entera", fp, (255, 255, 255))

    # El nombre, en tamaño de cartel
    cap(d, (60, 209), "GASTROTECH", f(108), tinta)
    cap(d, (64, 315), "GASTRONOMÍA Y TECNOLOGÍA", f(44), acento)
    cap(d, (64, 369), "PARA DUEÑOS DE CADENAS", f(44), tinta)

    d.line([64, 458, W - 64, 458], fill=linea, width=1)
    fd = f(25, 500)
    cap(d, (64, 495), "Un día entero de charlas, demos en vivo y networking.", fd, gris)
    cap(d, (64, 533), "Hotel Quinto Centenario, Córdoba  ·  9 a 18 h", fd, gris)
    espaciado(d, (64, 584), "SIETE BLOQUES  ·  UN SOLO TRACK  ·  SE RESERVA POR WHATSAPP",
              f(20), acento, 2.2)
    return img


# La clara es la que se publica y sale con su nombre final: el renombrado a
# mano es lo que una vez dejó la variante OSCURA publicada como og-image.png.
# La oscura y las miniaturas van a _revision/, que no se publica.
os.makedirs(REVISION, exist_ok=True)
for oscuro, ruta in ((False, os.path.join(DEST, "og-image.png")),
                     (True, os.path.join(REVISION, "og-oscura.png"))):
    im = generar(oscuro)
    im.save(ruta, optimize=True)
    # WhatsApp la muestra a ~300x158: la revisión se hace acá, no en el 1200.
    im.resize((300, 158), Image.LANCZOS).save(
        os.path.join(REVISION, "mini-" + os.path.basename(ruta)))
    print(os.path.basename(ruta), "%.0f KB" % (os.path.getsize(ruta) / 1024))
