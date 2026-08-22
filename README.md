# Landing · El evento de Deenex · Córdoba 20/09/2026

Landing de registro del primer evento propio de Deenex: una jornada de innovación, tecnología y
marketing para el mercado gastronómico. **Domingo 20 de septiembre de 2026, 9 a 18 hs, Hotel Quinto
Centenario, Córdoba.** Entrada gratuita con registro previo obligatorio y cupo real de 200 personas.

La landing es el destino de toda la comunicación del evento: cada video, cada pieza de pauta y cada
bio terminan acá.

## Dónde se toca cada cosa

Casi todo el contenido sale de **`src/data/evento.js`**. Antes de editar un componente, fijate si el
dato que buscás está ahí.

| Qué querés cambiar | Dónde |
|---|---|
| Fecha, horario, venue | `EVENTO` |
| Cupo y lugares tomados | `CUPO.ocupados` |
| Qué se lleva el que viene | `BENEFICIOS` |
| Speakers | `SPEAKERS` |
| Agenda del día | `AGENDA` / `AGENDA_BLOQUES` |
| Publicar la grilla con horarios | `AGENDA_PUBLICA` |
| Partners cerrados | `PARTNERS` |
| Logos de prueba social | `MARCAS_LOGOS` |
| Preguntas frecuentes | `FAQ` |
| Opciones del formulario | `ROLES`, `CANTIDAD_LOCALES` |

### Dos cosas que importan

**Solo se nombra lo cerrado.** Ningún partner ni speaker "en gestión" entra en `evento.js` hasta que
esté confirmado por escrito. Cuando se cierra uno, se agrega a `PARTNERS` y sale publicado.

**La agenda todavía no se publica.** `AGENDA_PUBLICA` está en `false`: la landing muestra la
estructura del día por franjas, sin horarios. `AGENDA` ya tiene la grilla completa cargada — cuando
el orden final esté cerrado, poné el flag en `true` y aparece el timeline con horarios.

## Registro

El formulario valida en cliente y tiene dos modos:

- **Sin backend** (por defecto): abre WhatsApp con todos los datos precargados.
- **Con backend**: si existe `VITE_REGISTRO_ENDPOINT`, hace POST del formulario ahí.

Igual con el cupo: si existe `VITE_CUPO_ENDPOINT`, la landing pide el número real al cargar; si no,
usa `CUPO.ocupados`. Ver [.env.example](.env.example) para el contrato de cada endpoint.

Falta conectar: persistencia de inscriptos, generación y envío del QR, y el escaneo en la puerta.

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 7**
- **Tailwind CSS 3** + **PostCSS** + **Autoprefixer**
- **Vue Router 4** (hash mode, para que ande sin server-side routing en GitHub Pages)
- Cero JS extra: countdown, barra de cupo, contadores animados, FAQ accordion y reveal-on-scroll van
  con vanilla JS adentro de los SFC.

El sistema de diseño (paleta `#695EDE`, fuentes **Inter** + **DM Sans**, patrones de eyebrow /
heading con acento itálico, cards con hover, noise texture) está basado en el sitio público de
Deenex (`deenexproduct/deenex-website-v2`).

---

## Correr localmente

Requiere Node `>=20.19` o `>=22.12`.

```bash
npm install
npm run dev          # arranca Vite en http://localhost:5173
npm run build        # genera dist/
npm run preview      # sirve dist/ localmente
```

## Deploy

El build es estático: `npm run build` genera `dist/` y se puede servir desde cualquier lado.

Para GitHub Pages bajo `/evento-gastronomico/`, buildear con `GITHUB_PAGES=true` para que
`vite.config.js` use el `base` correcto. Para un dominio propio, dejar `base` en `/`.
