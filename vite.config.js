import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// GitHub Pages deploy bajo /evento-gastronomico/
// El sitio vive en saborestech.deenex.tech, o sea en la raíz de su dominio, así
// que el base es "/" siempre. Estuvo en "/evento-gastronomico/" mientras se
// servía desde deenexproduct.github.io, donde el repo era una subcarpeta.
// public/CNAME es lo que le dice a GitHub Pages cuál es el dominio: si se
// borra, Pages vuelve a la URL vieja y este base deja de coincidir.
export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    // Vite incrusta en base64 todo asset menor a 4 KB. Acá eso era contra-
    // producente: los logos de clientes están al final de la página y van con
    // loading="lazy", pero incrustados viajaban dentro del JS que bloquea el
    // primer render — 16 KB de más en el camino crítico para dibujar el hero.
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
