import { defineConfig, devices } from "@playwright/test";

const PUERTO = 5199;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
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
