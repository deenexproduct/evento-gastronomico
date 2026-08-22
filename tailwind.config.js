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

        // Acento del referente, separado en tres roles. El #FF0054 original
        // da 3.9:1 con texto blanco encima, así que no puede llevar texto
        // chico: queda para superficies grandes, barras y el halo del hero.
        acento: "#FF0054",
        "acento-boton": "#E00049", // 5.0:1 con blanco — botones y píldoras
        "acento-texto": "#FF5C87", // 5.8:1 sobre los negros — texto chico

        papel: "#FFFFFF",
        gris: "#A3A3A8", // 7.3:1 sobre noche
        "gris-2": "#82828A", // 4.9:1 sobre el negro profundo
        linea: "#2A2A2A",
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
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
