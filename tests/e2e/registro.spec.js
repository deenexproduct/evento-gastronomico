import { test, expect } from "@playwright/test";
import { WHATSAPP_ORGANIZADOR, mensajeReserva } from "../../src/data/evento.js";

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

/*
  Este caso afirmaba TRES datos que ya no existían, y ninguno se cayó nunca
  porque los e2e no corren en CI: el número 5491154596266 —dos números atrás—,
  el texto "Quiero reservar mi lugar" —hoy el mensaje dice "Quiero sumarme"— y
  los campos "Nombre:" y "Mi mail", que son el formulario de cinco renglones
  que el commit cddae8e eliminó por fricción.

  La causa de fondo era escribir los datos a mano en el test. Ahora se importan
  de evento.js, así que el spec no puede volver a quedar atrás sin que el
  cambio se vea acá.
*/
test("el botón de reservar abre WhatsApp con el mensaje escrito", async ({ page }) => {
  await page.goto("/");
  const href = await enlaceReserva(page);
  expect(href).toContain(`wa.me/${WHATSAPP_ORGANIZADOR}`);

  const texto = decodeURIComponent(href.split("text=")[1]);
  // El mensaje del botón es EXACTAMENTE el que produce la fuente. El del
  // noscript también, y eso lo vigila tests/unit/respaldo-sin-js.test.js.
  expect(texto).toBe(mensajeReserva());
  // Y no revive el formulario que se sacó.
  expect(texto).not.toMatch(/Nombre:|Mi mail|Marca:/);
});

test("no queda ningún formulario en la página", async ({ page }) => {
  await page.goto("/#registro");
  // La sección de reserva no puede pedir que se tipee nada: si aparece un
  // campo, es que volvió parte del formulario que se sacó a propósito.
  await expect(page.locator("#registro input, #registro textarea, #registro select")).toHaveCount(0);
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

test("la reserva es un solo botón, sin nada que elegir antes", async ({ page }) => {
  // Es el pedido hecho test: cualquier control que vuelva a aparecer en esta
  // sección —una píldora, un selector, un campo— lo caza acá.
  await page.goto("/#registro");
  await expect(page.locator("#registro input, #registro select, #registro textarea")).toHaveCount(0);
  await expect(page.locator("#registro fieldset, #registro [role=\"group\"]")).toHaveCount(0);
  // El único control es el enlace que abre el chat.
  await expect(page.locator("#registro button")).toHaveCount(0);
  await expect(page.locator('#registro a[href*="wa.me"]')).toHaveCount(1);
});

test("tocar Reservar deja el botón que reserva a la vista", async ({ page }) => {
  // El camino completo, que es lo que puede costar reservas: antes esto
  // dejaba el botón a 1.037px del pliegue en escritorio y a 2.816 en teléfono,
  // con dos pantallas y media de scroll pendiente.
  await page.goto("/");
  await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
  await page.locator("#hero a.btn").click();
  await page.waitForTimeout(2000);

  const d = await page.evaluate(() => {
    const wa = document.querySelector('#reservar a[href*="wa.me"]');
    const r = wa.getBoundingClientRect();
    const visible = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / r.height;
    return { visible, barra: !!document.querySelector(".barra-flotante") };
  });
  // O se ve el botón real, o está la barra: nunca ninguno de los dos.
  expect(d.visible > 0.5 || d.barra, "no quedó ningún botón en pantalla").toBe(true);
});
