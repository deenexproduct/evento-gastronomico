/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101010", // negro base
        lima: "#E8FF4A", // acento principal
        // Solo como FONDO de bloque, siempre con texto ink encima (5.6:1).
        // Como color de texto no llega a contraste en ningún fondo del sistema.
        fuego: "#FF4A2E",
        // La versión para texto de acento sobre fondo claro (4.8:1 sobre hueso).
        "fuego-tinta": "#C7300F",
        // Y la versión para texto de urgencia sobre fondo oscuro (7.4:1 sobre ink).
        "fuego-luz": "#FF7A5E",
        hueso: "#F2F0E9", // fondo claro
      },
      fontFamily: {
        sans: ["Archivo", "system-ui", "sans-serif"],
        black: ["'Archivo Black'", "Archivo", "sans-serif"],
      },
      boxShadow: {
        // Sombra dura de cartel: sin blur, desplazada.
        cartel: "8px 8px 0 #101010",
        "cartel-lima": "8px 8px 0 #E8FF4A",
        "cartel-fuego": "8px 8px 0 #FF4A2E",
        "cartel-sm": "5px 5px 0 #101010",
      },
    },
  },
  plugins: [],
};
