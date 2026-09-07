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

/*
  Este caso medía el camino viejo: el botón del hero hacía scroll hasta el panel
  de reserva, y lo que había que proteger era que ese scroll no dejara al lector
  con el botón real 1.037px por debajo del pliegue en escritorio —2.816 en
  teléfono—, o sea dos pantallas y media de scroll pendiente después de tocar
  algo que dice "Quiero mi lugar".

  Ese camino ya no existe: el botón del hero abre WhatsApp directo, que es la
  misma mejora llevada hasta el final —antes eran tres toques para una acción
  que el lector cree que es una—. El test quedó midiendo un scroll que no
  ocurre, y por eso fallaba: nunca llega al panel.

  Lo que hay que proteger ahora es que ese primer botón sea la salida completa y
  no un intermediario: que abra el chat, con el mensaje escrito, en otra pestaña.
*/
test("el botón del hero abre el chat directo, sin escalas", async ({ page }) => {
  await page.goto("/");
  const boton = page.locator("#hero a.btn").first();

  const href = await boton.getAttribute("href");
  expect(href).toContain(`wa.me/${WHATSAPP_ORGANIZADOR}`);
  expect(decodeURIComponent(href.split("text=")[1])).toBe(mensajeReserva());

  // En otra pestaña y avisándolo: se lleva a la persona fuera del sitio.
  await expect(boton).toHaveAttribute("target", "_blank");
  await expect(boton).toHaveAttribute("rel", /noopener/);

  // Y no hace scroll a ningún lado: si volviera a apuntar a #reservar, esto
  // vuelve a ser un intermediario.
  expect(href).not.toContain("#reservar");
});
