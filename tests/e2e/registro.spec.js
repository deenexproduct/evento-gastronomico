import { test, expect } from "@playwright/test";

/**
 * La reserva es un enlace a WhatsApp, no un formulario.
 *
 * Lo que hay que proteger acá no es una validación —ya no hay ninguna— sino
 * que el enlace salga bien armado: si el mensaje se rompe, la persona lo manda
 * igual y el dato se pierde en el chat sin que nada avise.
 */

/** El href del botón principal de la sección de reserva. */
async function enlaceReserva(page) {
  return page.locator('#registro a[href*="wa.me"]').first().getAttribute("href");
}

test("el botón de reservar abre WhatsApp con el mensaje escrito", async ({ page }) => {
  await page.goto("/");
  const href = await enlaceReserva(page);
  expect(href).toContain("wa.me/5491154596266");

  const texto = decodeURIComponent(href.split("text=")[1]);
  expect(texto).toContain("GASTROTECH · QUIERO IR");
  expect(texto).toContain("Nombre:");
  expect(texto).toContain("Mi mail");
});

test("no queda ningún formulario en la página", async ({ page }) => {
  await page.goto("/#registro");
  // La sección de reserva no puede pedir que se tipee nada: si aparece un
  // campo, es que volvió parte del formulario que se sacó a propósito.
  await expect(page.locator("#registro input, #registro textarea, #registro select")).toHaveCount(0);
});

test("el selector de locales escribe el dato en el mensaje", async ({ page }) => {
  await page.goto("/#registro");
  const antes = await enlaceReserva(page);
  expect(decodeURIComponent(antes)).toContain("Cuántos locales tengo:");

  await page.locator("#registro fieldset button").first().click();
  const despues = await enlaceReserva(page);
  const texto = decodeURIComponent(despues.split("text=")[1]);

  expect(texto).toContain("Locales:");
  // El renglón en blanco tiene que desaparecer, o el mensaje pregunta dos
  // veces lo mismo y la persona borra uno al azar.
  expect(texto).not.toContain("Cuántos locales tengo:");
});

test("el selector se puede deshacer y el mensaje vuelve atrás", async ({ page }) => {
  await page.goto("/#registro");
  const boton = page.locator("#registro fieldset button").first();
  await boton.click();
  await expect(boton).toHaveAttribute("aria-pressed", "true");

  await boton.click();
  await expect(boton).toHaveAttribute("aria-pressed", "false");
  expect(decodeURIComponent(await enlaceReserva(page))).toContain("Cuántos locales tengo:");
});

test("lo que se marca arriba llega escrito en el mensaje de abajo", async ({ page }) => {
  // Es la tesis entera de la pieza en un test: el termómetro está catorce
  // pantallas más arriba que el botón. Si esto se cae, la interacción volvió
  // a ser decoración y el renglón del tema vuelve a llegar en blanco, que es
  // lo que pasa hoy en el 100% de los mensajes.
  await page.goto("/");
  const antes = decodeURIComponent(await enlaceReserva(page));
  expect(antes).toContain("Me interesaría que se hable de:");

  const fila = page.locator("#termometro li").first();
  const etiqueta = (await fila.locator("p").first().innerText()).trim();
  await fila.getByRole("button", { name: "No", exact: true }).click();

  const texto = decodeURIComponent((await enlaceReserva(page)).split("text=")[1]);
  // El renglón dejó de estar vacío.
  expect(texto).toMatch(/Me interesaría que se hable de: .+/);
  expect(etiqueta.length).toBeGreaterThan(10);
});

test("el cuántos van escribe las sillas en el mensaje y se puede deshacer", async ({ page }) => {
  // Con cupo duro de 200, doscientos mensajes no son doscientas personas.
  await page.goto("/#registro");
  expect(decodeURIComponent(await enlaceReserva(page))).not.toContain("Vamos");

  const tres = page.locator('#registro [role="group"] button').nth(2);
  await tres.click();
  await expect(tres).toHaveAttribute("aria-pressed", "true");
  expect(decodeURIComponent(await enlaceReserva(page))).toContain("Vamos 3");

  await page.locator('#registro [role="group"] button').first().click();
  expect(decodeURIComponent(await enlaceReserva(page))).not.toContain("Vamos");
});

test("el enlace se abre en otra pestaña y avisa que lo hace", async ({ page }) => {
  await page.goto("/#registro");
  const boton = page.locator('#registro a[href*="wa.me"]').first();
  await expect(boton).toHaveAttribute("target", "_blank");
  // rel noopener: sin esto la pestaña nueva puede manipular la original.
  await expect(boton).toHaveAttribute("rel", /noopener/);
  await expect(boton.locator(".sr-only")).toContainText("pestaña nueva");
});

test("se puede agendar el evento sin haber reservado", async ({ page }) => {
  await page.goto("/#registro");
  // El agendado vivía detrás del formulario enviado. Es la mitigación número
  // uno del no-show, así que ahora tiene que estar a la vista de todos.
  await expect(page.locator('#registro a[href*="calendar.google.com"]')).toBeVisible();
  await expect(page.locator("#registro a[download]")).toBeVisible();
});

test("la página no promete un mail que ya nadie manda", async ({ page }) => {
  await page.goto("/");
  const texto = await page.locator("body").innerText();
  // Sin formulario no hay envío automático de código: cualquier frase que lo
  // prometa es una promesa que nadie puede cumplir.
  expect(texto).not.toMatch(/código de acceso te llega por mail/i);
  expect(texto).not.toMatch(/código de acceso llega por mail/i);
});
