import { chromium, devices } from "@playwright/test";
const REDES = { slow4g: { offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8 * 0.9, uploadThroughput: (750 * 1024) / 8 * 0.9, latency: 150 } };
const nav = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const ctx = await nav.newContext({ ...devices["Pixel 7"] });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
console.log("enable", await cdp.send("Network.enable"));
console.log("cache", await cdp.send("Network.setCacheDisabled", { cacheDisabled: true }));
console.log("emul", await cdp.send("Network.emulateNetworkConditions", REDES.slow4g));
console.log("cpu", await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 }));
await page.goto("about:blank");
// control: descargar el JS de la landing y medir
const r = await page.evaluate(async () => {
  const t = performance.now();
  const res = await fetch("https://deenexproduct.github.io/evento-gastronomico/assets/index-BiDpig0V.js", { cache: "no-store" });
  const b = await res.arrayBuffer();
  return { ms: Math.round(performance.now() - t), bytes: b.byteLength };
});
console.log("descarga control", r, "kbps efectivos", Math.round((r.bytes * 8 / 1024) / (r.ms / 1000)));
await nav.close();
