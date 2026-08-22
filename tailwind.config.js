/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Violeta Deenex. Como FONDO de bloque o para piezas grandes.
        violeta: "#695EDE",
        // La versión para TEXTO sobre blanco: 5.9:1, pasa AA en cuerpo chico.
        "violeta-texto": "#5348C9",
        "violeta-claro": "#8F84F0",
        "violeta-tinte": "#EFEDFC",
        tinta: "#15132A", // texto principal
        gris: "#5F5C73", // texto secundario, 6.1:1 sobre blanco
        linea: "#E4E2EE", // reglas de la grilla
        papel: "#FFFFFF",
        "papel-2": "#FAFAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        contenido: "1180px",
      },
    },
  },
  plugins: [],
};
