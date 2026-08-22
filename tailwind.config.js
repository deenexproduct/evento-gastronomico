/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101010", // negro base
        lima: "#E8FF4A", // acento principal
        fuego: "#FF4A2E", // urgencia: cupo, cuenta regresiva
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
