import { defineConfig, devices } from "@playwright/test";

const PUERTO = 5199;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,

  /*
    Un test.only olvidado hace que Playwright corra ESE SOLO y devuelva verde.
    En local es cómodo; en CI es una suite entera apagada por un descuido, y en
    verde. forbidOnly lo convierte en error de configuración.

    Va con la misma intención que el resto de esta tanda: la suite ya tuvo dos
    casos pasando sin ejecutar una aserción y tres afirmando datos muertos. Un
    .only olvidado sería la tercera forma de tener protección aparente.
  */
  forbidOnly: !!process.env.CI,

  // Un reintento en CI y ninguno en local: los runners son más lentos y algún
  // caso de layout puede quedar corto por timing. Dos corridas rojas seguidas
  // ya no son timing.
  retries: process.env.CI ? 1 : 0,

  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: `http://localhost:${PUERTO}`,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  // Levanta el dev server solo si no hay uno corriendo ya.
  webServer: {
    command: `npm run dev -- --port ${PUERTO}`,
    url: `http://localhost:${PUERTO}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
