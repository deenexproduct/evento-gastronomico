/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base neutra apenas cálida. No crema: un blanco con temperatura,
        // para que el violeta no se enfríe encima.
        papel: "#FBFAF8",
        "papel-2": "#F3F1EC",
        // Tinta con sesgo violeta mínimo: base y acento de la misma familia.
        tinta: "#171420",
        gris: "#5A5566", // 6.6:1 sobre papel
        linea: "#E5E1DA",

        // Acento único: el violeta de Deenex.
        violeta: "#695EDE", // fondos de bloque y botones sólidos
        "violeta-texto": "#5348C9", // 6.0:1 sobre papel — texto y números
        "violeta-claro": "#9C92F5", // sobre tinta
        "violeta-tinte": "#EEEBFB", // superficies suaves
      },
      fontFamily: {
        // Fuera Inter: es el marcador nº1 de plantilla según el análisis de
        // 2.248 landings. Display con carácter + grotesca de x-height alta.
        display: ["'Bricolage Grotesque'", "Georgia", "serif"],
        sans: ["'Familjen Grotesk'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        contenido: "1200px",
        lectura: "68ch",
      },
    },
  },
  plugins: [],
};
