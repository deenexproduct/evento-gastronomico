import { test, expect } from "@playwright/test";

/** El camino que tiene que funcionar sí o sí: el visitante deja sus datos. */

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("#registro").scrollIntoViewIfNeeded();
});

test("el paso 1 pide dos campos y frena si están vacíos", async ({ page }) => {
  const registro = page.locator("#registro");
  await expect(registro.locator("#reg-nombre")).toBeVisible();
  await expect(registro.locator("#reg-email")).toBeVisible();

  await registro.getByRole("button", { name: /continuar/i }).click();

  await expect(registro.locator(".error")).toHaveCount(2);
  await expect(registro.locator("#reg-nombre")).toBeVisible(); // sigue en el paso 1
});

test("con datos válidos avanza al paso 2", async ({ page }) => {
  const registro = page.locator("#registro");
  await registro.locator("#reg-nombre").fill("Alan Tapia");
  await registro.locator("#reg-email").fill("alan@deenex.tech");
  await registro.getByRole("button", { name: /continuar/i }).click();

  await expect(registro.locator("#reg-marca")).toBeVisible();
  await expect(registro.locator("#reg-rol")).toBeVisible();
  await expect(registro.locator("#reg-locales")).toBeVisible();
  await expect(registro.locator("#reg-whatsapp")).toBeVisible();
});

test("se puede volver al paso 1 sin perder lo cargado", async ({ page }) => {
  const registro = page.locator("#registro");
  await registro.locator("#reg-nombre").fill("Alan Tapia");
  await registro.locator("#reg-email").fill("alan@deenex.tech");
  await registro.getByRole("button", { name: /continuar/i }).click();
  await registro.getByRole("button", { name: /volver/i }).click();

  await expect(registro.locator("#reg-nombre")).toHaveValue("Alan Tapia");
  await expect(registro.locator("#reg-email")).toHaveValue("alan@deenex.tech");
});

test("el mail inválido no pasa del paso 1", async ({ page }) => {
  const registro = page.locator("#registro");
  await registro.locator("#reg-nombre").fill("Alan Tapia");
  await registro.locator("#reg-email").fill("noesunmail");
  await registro.getByRole("button", { name: /continuar/i }).click();

  await expect(registro.locator(".error")).toHaveCount(1);
  await expect(registro.locator("#reg-email")).toBeVisible();
});

test("las opciones de locales corresponden a cadenas", async ({ page }) => {
  const registro = page.locator("#registro");
  await registro.locator("#reg-nombre").fill("Alan Tapia");
  await registro.locator("#reg-email").fill("alan@deenex.tech");
  await registro.getByRole("button", { name: /continuar/i }).click();

  // allTextContents no espera: sin esta línea devuelve [] si el paso 2 todavía
  // no se pintó, y el test falla de forma intermitente solo en mobile.
  await expect(registro.locator("#reg-locales")).toBeVisible();
  const opciones = await registro.locator("#reg-locales option").allTextContents();
  // El público es de cadenas: "1 local" no puede seguir siendo una opción.
  expect(opciones.some((o) => /^1 local$/i.test(o.trim()))).toBe(false);
  expect(opciones.some((o) => /locales/i.test(o))).toBe(true);
});

test("la captura de mail valida y confirma", async ({ page }) => {
  const avisame = page.locator("#avisame");
  await avisame.scrollIntoViewIfNeeded();

  await avisame.locator("#avisame-email").fill("noesunmail");
  await avisame.getByRole("button", { name: /avisame/i }).click();
  await expect(avisame.locator(".error")).toHaveCount(1);

  await avisame.locator("#avisame-email").fill("alan@deenex.tech");
  await avisame.getByRole("button", { name: /avisame/i }).click();
  // Con un mail válido desaparece el error y aparece la confirmación.
  await expect(avisame.locator(".error")).toHaveCount(0);
  await expect(avisame.getByRole("link", { name: /el registro está acá/i })).toBeVisible();
});

test("sin backend, la confirmación no afirma una reserva que no ocurrió", async ({ page }) => {
  // Así se publica hoy: el workflow compila sin VITE_REGISTRO_ENDPOINT, o sea
  // que el envío es abrir WhatsApp. Hasta que la persona mande ese mensaje no
  // hay nada guardado en ningún lado.
  await page.addInitScript(() => {
    // Navegador embebido tipo Instagram: window.open no abre nada.
    window.open = () => null;
  });
  await page.reload();

  const registro = page.locator("#registro");
  await registro.locator("#reg-nombre").fill("Alan Tapia");
  await registro.locator("#reg-email").fill("alan@deenex.tech");
  await registro.getByRole("button", { name: /continuar/i }).click();

  await expect(registro.locator("#reg-marca")).toBeVisible();
  await registro.locator("#reg-marca").fill("La Fábrica");
  await registro.locator("#reg-whatsapp").fill("3514459626");
  await registro.locator("#reg-tema").fill("Cómo bajar la merma en cocina");
  await registro.locator("#reg-rol").selectOption({ index: 1 });
  await registro.locator("#reg-locales").selectOption({ index: 1 });
  await registro.locator('input[type="checkbox"]').first().check();
  await registro.locator('button[type="submit"]').click();

  const panel = registro.locator('[tabindex="-1"]');
  await expect(panel).toBeVisible();
  await expect(panel).not.toContainText(/qued[óo] reservado/i);
  await expect(panel).toContainText(/falta un paso/i);

  // El enlace tiene que quedar tocable: el window.open pudo no abrir nada.
  const boton = panel.locator('a[href*="wa.me"]');
  await expect(boton).toBeVisible();

  // Y el tema que escribió tiene que viajar en el mensaje: por esta vía era
  // lo único que se quedaba en el navegador.
  const href = await boton.getAttribute("href");
  expect(decodeURIComponent(href)).toContain("Cómo bajar la merma en cocina");
});
