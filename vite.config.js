import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// GitHub Pages deploy bajo /evento-gastronomico/
// Si vas a un dominio raíz custom, cambiá base a "/"
export default defineConfig({
  plugins: [vue()],
  base: process.env.GITHUB_PAGES === "true" ? "/evento-gastronomico/" : "/",
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
