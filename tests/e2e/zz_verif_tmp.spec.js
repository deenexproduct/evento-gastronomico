import { test, expect } from "@playwright/test";

async function revelarTodo(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    document.querySelectorAll(".v-reveal").forEach((e) => e.classList.add("v-reveal-visible"));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  await page.waitForTimeout(600);
}

// ---------- FIX 1 propuesto ----------
test("FIX1 el mapa de Google no se descarga: se abre en una pestaña aparte", async ({ page }) => {
  const deGoogle = [];
  page.on("request", (r) => {
    if (/maps\.google|maps\.googleapis|maps\.gstatic/.test(r.url())) deGoogle.push(r.url());
  });
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await revelarTodo(page);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2500);
  expect(deGoogle).toEqual([]);
  await expect(page.locator("iframe")).toHaveCount(0);
  const maps = page.locator("#donde a[href*='google.com/maps']");
  await expect(maps).toHaveCount(1);
  await expect(maps).toHaveAttribute("target", "_blank");
});

// ---------- MEDICIONES 1 ----------
test("MED1 conteos en la home", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await revelarTodo(page);
  const r = await page.evaluate(() => ({
    iframes: document.querySelectorAll("iframe").length,
    lugar: document.querySelectorAll("#lugar").length,
    detrasHome: document.querySelectorAll("#detras").length,
    partnersHome: document.querySelectorAll("#partners").length,
    respaldanHome: document.querySelectorAll("#respaldan").length,
    partnersArticleImg: document.querySelectorAll("#partners article img").length,
    respaldanImg: document.querySelectorAll("#respaldan img").length,
  }));
  console.log("MED1", JSON.stringify(r));
});

// ---------- FIX 2 propuesto ----------
test("FIX2 solo dos logos del muro siguen trayendo su propia caja", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/#/organiza");
  await revelarTodo(page);
  await page.evaluate(() => {
    document.querySelectorAll(".barra-fija, header").forEach((e) => (e.style.visibility = "hidden"));
  });

  const fondoDetras = await page.evaluate(() => {
    const e = document.querySelector("#detras");
    return e ? getComputedStyle(e).backgroundColor : "NO EXISTE";
  });
  const fondo = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log("MED2 fondo#detras=", fondoDetras, " fondoBody=", fondo,
    " nImgs=", await page.evaluate(() => document.querySelectorAll("#detras img").length));
  const f = fondo.match(/\d+/g).map(Number);
  const conCaja = [];

  for (const img of await page.$$("#detras img")) {
    const alt = await img.getAttribute("alt");
    await img.scrollIntoViewIfNeeded();
    const buf = await img.screenshot();
    const esquina = await page.evaluate(async (b64) => {
      const im = new Image();
      im.src = "data:image/png;base64," + b64;
      await im.decode();
      const c = document.createElement("canvas");
      c.width = im.width; c.height = im.height;
      const x = c.getContext("2d");
      x.drawImage(im, 0, 0);
      const dx = Math.max(1, Math.round(im.width * 0.04));
      const dy = Math.max(1, Math.round(im.height * 0.04));
      const puntos = [[dx, dy], [im.width - dx, dy], [dx, im.height - dy], [im.width - dx, im.height - dy]];
      const suma = [0, 0, 0];
      for (const [px, py] of puntos) {
        const d = x.getImageData(px, py, 1, 1).data;
        suma[0] += d[0]; suma[1] += d[1]; suma[2] += d[2];
      }
      return suma.map((v) => Math.round(v / puntos.length));
    }, buf.toString("base64"));
    const dif = Math.max(...esquina.map((v, i) => Math.abs(v - f[i])));
    if (dif > 25) conCaja.push(alt);
  }
  console.log("MED2 conCaja=", JSON.stringify(conCaja.sort()));
  expect(conCaja.sort()).toEqual(["ayres", "hatsu"]);
});

// ---------- FIX 3 propuesto ----------
test("FIX3 cada pestaña del nav lleva a una vista que existe y ninguna se corta", async ({ page }) => {
  for (const ancho of [1024, 1280, 1600]) {
    await page.setViewportSize({ width: ancho, height: 800 });
    await page.goto("/");
    const r = await page.evaluate(() => {
      const enlaces = [...document.querySelectorAll("header nav a")];
      return {
        n: enlaces.length,
        hrefs: enlaces.map((a) => a.getAttribute("href")),
        cortados: enlaces.filter((a) => a.scrollWidth > a.clientWidth + 1).map((a) => a.innerText.trim()),
      };
    });
    console.log("MED3", ancho, JSON.stringify(r));
    expect(r.n, `pestañas a ${ancho}`).toBeGreaterThanOrEqual(5);
    expect(r.cortados, `pestañas cortadas a ${ancho}`).toEqual([]);
    const rotas = [];
    for (const href of r.hrefs) {
      expect(href, `pestaña que no es una ruta a ${ancho}`).toMatch(/^#\//);
      await page.goto("/" + href);
      await page.waitForLoadState("networkidle");
      const destino = new URL(page.url()).hash;
      if (destino !== href) rotas.push(`${href} → ${destino}`);
    }
    expect(rotas, `rutas rotas a ${ancho}`).toEqual([]);
  }
});

// ---------- FIX 4 propuesto ----------
test("FIX4 ningún logo de sponsor queda invisible sobre el fondo claro", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1280, height: 900 });
  const invisibles = [];
  let n = 0;
  for (const ruta of ["/", "/#/participan"]) {
    await page.goto(ruta);
    await revelarTodo(page);
    await page.evaluate(() => {
      document.querySelectorAll(".barra-fija, header").forEach((e) => (e.style.visibility = "hidden"));
    });
    for (const img of await page.$$("#respaldan img, #partners article img")) {
      n++;
      const src = (await img.getAttribute("src")).split("/").pop().split("?")[0];
      await img.scrollIntoViewIfNeeded();
      const buf = await img.screenshot();
      const tinta = await page.evaluate(async (b64) => {
        const im = new Image();
        im.src = "data:image/png;base64," + b64;
        await im.decode();
        const c = document.createElement("canvas");
        c.width = im.width; c.height = im.height;
        const x = c.getContext("2d");
        x.drawImage(im, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data;
        let oscuros = 0;
        for (let i = 0; i < d.length; i += 4) {
          if (d[i + 3] < 10) continue;
          if (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114 < 160) oscuros++;
        }
        return Math.round((oscuros / (c.width * c.height)) * 100);
      }, buf.toString("base64"));
      console.log("MED4", ruta, src, tinta + "%");
      if (tinta < 3) invisibles.push(src + ": " + tinta + "% de tinta");
    }
  }
  console.log("MED4 total imgs=", n);
  expect(invisibles).toEqual([]);
});
