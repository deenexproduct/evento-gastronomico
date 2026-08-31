/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Los tres tonos de negro que alterna el referente sección a sección.
        // Es lo que le da profundidad sin usar un solo borde.
        noche: "#1A1A1A",
        "noche-2": "#0D0D0D",
        "noche-3": "#0A0A0A",

        // El acento es el violeta de Deenex, en tres roles por contraste.
        // Antes acá vivía el magenta #FF0054 del referente: convivían dos
        // acentos en la misma página —el magenta en las barras y el violeta
        // en los botones— y ninguno de los dos quería decir "esta es LA
        // acción". Queda uno solo, y es el de la marca.
        acento: "#695EDE", // Majorelle — superficies grandes y halos
        "acento-boton": "#695EDE", // 4.93:1 con blanco encima — botones
        "acento-texto": "#4F42C4", // 7.1:1 sobre papel — texto chico y rótulos

        // ── Marca Deenex ──────────────────────────────────────────────
        // Paleta oficial (marketing/narrativa/la-narrativa-oficial.md, 27/08).
        // El Majorelle da 4.93:1 con texto blanco encima, así que a diferencia
        // del magenta —que hubo que oscurecer de #FF0054 a #E00049— este entra
        // como botón tal cual viene de la marca, sin retocar.
        deenex: "#695EDE", // Majorelle Blue
        "deenex-hover": "#5B4FD6", // 5.94:1, mismo tono un paso más oscuro
        "deenex-naranja": "#FF8911", // Dodger Orange — 2.38:1: nunca con texto
        "deenex-negro": "#1B1B1B", // Eerie Black
        "deenex-hueso": "#F5EAEA", // Isabellina

        papel: "#FFFFFF",
        gris: "#A3A3A8", // 7.3:1 sobre noche
        "gris-2": "#82828A", // 4.9:1 sobre el negro profundo
        linea: "#2A2A2A",
      },
      fontFamily: {
        // Marca Deenex. Archivo queda de respaldo en las dos: comparte
        // proporciones con Bespoke Sans, así que el salto cuando Fontshare
        // tarda no reacomoda la página.
        sans: ["Bespoke Sans", "Archivo", "system-ui", "sans-serif"],
        display: ["Panchang", "Archivo", "system-ui", "sans-serif"],
      },
      maxWidth: {
        contenido: "1200px",
        lectura: "68ch",
      },
      spacing: {
        // El ritmo vertical del referente: 96px en todas las secciones.
        seccion: "96px",
      },
    },
  },
  plugins: [],
};
