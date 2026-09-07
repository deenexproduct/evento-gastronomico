# SaboresTech · Córdoba, sábado 19/09/2026

Landing de convocatoria de **SaboresTech**: un día de gastronomía y tecnología para dueños de
cadenas gastronómicas. **Sábado 19 de septiembre de 2026, Hotel Quinto Centenario, Duarte Quirós
1300, Córdoba.** Entrada sin costo, con reserva previa y cupo real de 200 personas.

El día se parte en dos franjas: **jornada de 9 a 18** —acreditación desde las 9:00, charlas de 10 a
18— y **networking de 18 a 21**. El evento completo, que es lo que leen el `.ics` y el JSON-LD, va de
9 a 21.

La landing es el destino de toda la comunicación del evento: cada video, cada pieza de pauta y cada
bio terminan acá. **No hay formulario**: se reserva escribiendo por WhatsApp, con el mensaje
precargado.

## Dónde se toca cada cosa

Casi todo el contenido sale de **`src/data/evento.js`**. Antes de editar un componente, fijate si el
dato que buscás está ahí.

| Qué querés cambiar | Dónde |
|---|---|
| Nombre, fecha, las cuatro ventanas horarias, venue | `EVENTO` |
| Las dos puntas del día: acreditación y cierre | `BORDES` |
| Cupo y lugares tomados | `CUPO.ocupados` |
| Qué se lleva el que viene | `EL_LUNES` |
| Los temas del día, con hora y duración | `TEMAS` |
| Qué va a haber ese día (lo que muestra la home) | `QUE_HAY` |
| Qué NO es el evento | `NO_ES` |
| Partners cerrados | `PARTNERS` |
| Logos de prueba social | `MARCAS_LOGOS` |
| Marcas anotadas que dieron opt-in | `MARCAS_ANOTADAS` |
| Preguntas frecuentes | `FAQ` |
| Las cinco vistas de la cabecera | `BLOQUES` |
| Número de WhatsApp y los mensajes | `WHATSAPP_ORGANIZADOR`, `MENSAJES_WA`, `mensajeReserva()` |

### Cuatro cosas que importan

**Solo se nombra lo cerrado.** Ningún partner ni orador "en gestión" entra en `evento.js` hasta que
esté confirmado por escrito. Por eso hay bloques con "orador por confirmar" y un invitado especial
sin nombre.

**Hay cuatro ventanas horarias y no son intercambiables.** `horario` es el evento entero (9 a 21, lo
que se agenda), `horarioJornada` el programa (9 a 18), `horarioNetworking` lo que sigue (18 a 21) y
`horarioCharlas` el escenario (10 a 18). Mezclarlas ya rompió esta página tres veces; el bloque de
comentarios arriba de esas constantes explica cuál contesta qué.

**Dos cierres distintos.** `BORDES.cierre.hora` (18:00) es cuando termina la grilla y arranca el
networking; `BORDES.cierre.hasta` (21:00) es cuando se corta la sala. El `.ics` tiene que cubrir
hasta el segundo, o la alarma de fin suena tres horas antes de que el evento termine.

**La grilla ya no se muestra.** `TEMAS` sigue siendo la fuente —alimenta el `.ics`, la aritmética del
día y los tests que verifican que todo cierre a horario— pero la home muestra `QUE_HAY`, que es la
lista de qué va a haber sin horas.

## La tarjeta que se comparte

`public/og-image.png` es lo primero que ve el 100% de la convocatoria: en WhatsApp la imagen se lee
antes que el título. Se genera con:

```bash
python herramientas/og-image.py public
```

Los datos del script son una copia a mano de `evento.js` —es Python y no puede importar el módulo—,
y los vigila `tests/unit/tarjeta-compartida.test.js`. **Al regenerar, mirá el PNG**: ningún test
valida el dibujo. Y tené en cuenta que WhatsApp cachea la previsualización **por URL**, así que
cambiar el archivo no actualiza los links que ya circulan.

## Correr localmente

Requiere Node `>=20.19` o `>=22.12`.

```bash
npm install
npm run dev          # Vite en http://localhost:5173
npm test             # 129 unitarios con Vitest
npm run build        # genera dist/
npm run preview      # sirve dist/ localmente
```

Los e2e de Playwright (`npm run test:e2e`) necesitan `npx playwright install` y hoy tienen
aserciones desactualizadas: no corren en CI.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 7**
- **Tailwind CSS 3** + **PostCSS** + **Autoprefixer**
- **Vue Router 4** en hash mode, para que ande sin routing de servidor en GitHub Pages
- Sin dependencias de UI: cuenta regresiva, barra de cupo, acordeón del FAQ y reveal-on-scroll van
  con JS propio adentro de los SFC

Tipografías: **Panchang** para el titular y el reloj, **Bespoke Sans** para el cuerpo, las dos desde
Fontshare, con **Archivo** de respaldo. Paleta unificada en el violeta `#695EDE`.

## Deploy

Se publica solo con cada push a `main`, vía `.github/workflows/deploy.yml`. El workflow corre
`npm test` antes del build: si los unitarios fallan, no se publica.

El build es estático. Para GitHub Pages bajo `/evento-gastronomico/` se buildea con
`GITHUB_PAGES=true`, que es lo que activa el `base` correcto en `vite.config.js`. Para un dominio
propio, dejar `base` en `/`.
