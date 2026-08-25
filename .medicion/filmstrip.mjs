import { chromium, devices } from "@playwright/test";
import fs from "node:fs";

const URL_OBJETIVO = process.argv[2];
const PERFIL = process.argv[3] || "slow4g";
const CPU = Number(process.argv[4] || 4);
const DIR = process.argv[5] || ".medicion/tiras";

const REDES = {
  slow4g: { offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8 * 0.9, uploadThroughput: (750 * 1024) / 8 * 0.9, latency: 150 },
  fast4g: { offline: false, downloadThroughput: (9 * 1024 * 1024) / 8 * 0.9, uploadThroughput: (1.5 * 1024 * 1024) / 8 * 0.9, latency: 40 },
};

fs.mkdirSync(DIR, { recursive: true });
const nav = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await nav.newContext({ ...devices["Pixel 7"], serviceWorkers: "block" });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");
await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
await cdp.send("Network.emulateNetworkConditions", REDES[PERFIL]);
await cdp.send("Emulation.setCPUThrottlingRate", { rate: CPU });

const marcos = [];
const t0 = Date.now();
cdp.on("Page.screencastFrame", async (f) => {
  marcos.push({ t: Date.now() - t0, data: f.data });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch (e) {}
});
await cdp.send("Page.enable");
await cdp.send("Page.startScreencast", { format: "jpeg", quality: 55, everyNthFrame: 1 });

await page.goto(URL_OBJETIVO, { waitUntil: "load", timeout: 300000 });
await page.waitForTimeout(4000);
await cdp.send("Page.stopScreencast");

// Detectar el primer marco no-blanco comparando bytes: un JPEG de pantalla
// uniforme pesa mucho menos que uno con texto.
const tam = marcos.map(m => ({ t: m.t, kb: +(Buffer.from(m.data, "base64").length / 1024).toFixed(1) }));
const base = tam.length ? tam[0].kb : 0;
const primerCambio = tam.find(m => m.kb > base * 1.6 + 2);

// Guardar algunos marcos
const guardar = [0, 0.25, 0.5, 0.75, 1].map(p => marcos[Math.min(marcos.length - 1, Math.round(p * (marcos.length - 1)))]);
guardar.forEach((m, i) => m && fs.writeFileSync(`${DIR}/marco-${i}-${m.t}ms.jpg`, Buffer.from(m.data, "base64")));

console.log(JSON.stringify({ marcos: marcos.length, tamanos: tam, primerCambio, ventana: Date.now() - t0 }, null, 1));
await nav.close();
