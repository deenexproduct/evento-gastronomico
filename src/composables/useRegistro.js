import { reactive, ref, computed } from "vue";
import { WHATSAPP_ORGANIZADOR } from "@/data/evento";

const VACIO = {
  nombre: "",
  marca: "",
  rol: "",
  locales: "",
  whatsapp: "",
  email: "",
  ciudad: "",
  acepta: false,
};

/**
 * Registro al evento.
 *
 * Con VITE_REGISTRO_ENDPOINT definido hace POST del formulario ahí y espera
 * JSON con { ok: true } y, si el backend ya emite el código, { qr, codigo }.
 * Sin endpoint cae a WhatsApp con el mensaje precargado, así la landing
 * convierte desde el día uno.
 */
export function useRegistro() {
  const form = reactive({ ...VACIO });
  const errores = reactive({});
  const enviando = ref(false);
  const enviado = ref(false);
  const errorEnvio = ref("");
  const codigo = ref("");

  const endpoint = import.meta.env.VITE_REGISTRO_ENDPOINT || "";
  const tieneBackend = computed(() => Boolean(endpoint));

  function limpiarTelefono(valor) {
    return valor.replace(/[^\d+]/g, "");
  }

  function validar() {
    Object.keys(errores).forEach((k) => delete errores[k]);

    if (form.nombre.trim().length < 3) errores.nombre = "Poné tu nombre y apellido.";
    if (form.marca.trim().length < 2) errores.marca = "¿Cuál es tu marca o negocio?";
    if (!form.rol) errores.rol = "Elegí tu rol.";
    if (!form.locales) errores.locales = "Elegí cuántos locales tenés.";

    const tel = limpiarTelefono(form.whatsapp);
    if (tel.length < 8) errores.whatsapp = "Necesitamos un WhatsApp válido.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      errores.email = "Revisá el email: ahí te llega el QR.";

    if (!form.acepta) errores.acepta = "Necesitamos tu confirmación para guardarte el lugar.";

    return Object.keys(errores).length === 0;
  }

  function mensajeWhatsapp() {
    return encodeURIComponent(
      [
        "Hola Alan! Quiero mi lugar en el evento del 20 de septiembre en Córdoba.",
        "",
        `Nombre: ${form.nombre}`,
        `Marca: ${form.marca}`,
        `Rol: ${form.rol}`,
        `Locales: ${form.locales}`,
        `Email: ${form.email}`,
        form.ciudad ? `Ciudad: ${form.ciudad}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
  }

  async function enviar() {
    errorEnvio.value = "";
    if (!validar()) return false;

    enviando.value = true;
    try {
      if (!tieneBackend.value) {
        window.open(
          `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=${mensajeWhatsapp()}`,
          "_blank",
          "noopener,noreferrer"
        );
        enviado.value = true;
        return true;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          whatsapp: limpiarTelefono(form.whatsapp),
          evento: "deenex-cordoba-2026-09-20",
          origen: window.location.href,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json().catch(() => ({}));
      if (data.codigo) codigo.value = data.codigo;

      enviado.value = true;
      return true;
    } catch {
      errorEnvio.value =
        "No pudimos guardar tu lugar. Probá de nuevo o escribinos por WhatsApp.";
      return false;
    } finally {
      enviando.value = false;
    }
  }

  function reiniciar() {
    Object.assign(form, VACIO);
    Object.keys(errores).forEach((k) => delete errores[k]);
    enviado.value = false;
    errorEnvio.value = "";
    codigo.value = "";
  }

  return {
    form,
    errores,
    enviando,
    enviado,
    errorEnvio,
    codigo,
    tieneBackend,
    enviar,
    reiniciar,
    mensajeWhatsapp,
  };
}
