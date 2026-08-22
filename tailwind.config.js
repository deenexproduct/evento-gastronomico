/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Base oscura, en el registro de Food Delivery Day (#1A1A1A).
        noche: "#161616",
        "noche-2": "#1F1F1F",
        // Superficies translúcidas: el recurso que sostiene toda su grilla.
        // Se aplican con bg-white/5 y bg-white/10.

        // Acento único saturado. Ellos usan magenta #FF0054; acá va el
        // violeta de Deenex en ese mismo rol, para no confundirse con ellos.
        violeta: "#9C92F5", // 6.3:1 sobre las superficies oscuras — texto
        "violeta-solido": "#695EDE", // botones y fondos plenos
        "violeta-tinte": "#EEEBFB",

        papel: "#FFFFFF",
        gris: "#A5A1B5", // 7.4:1 sobre noche
        linea: "#2E2E33",
      },
      fontFamily: {
        // Grotesca con peso 900 real: es lo que da el golpe visual del
        // referente. No es Inter, Poppins ni Montserrat.
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      maxWidth: {
        contenido: "1200px",
        lectura: "68ch",
      },
    },
  },
  plugins: [],
};
