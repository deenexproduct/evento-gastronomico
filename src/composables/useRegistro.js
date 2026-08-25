import { reactive, ref, computed } from "vue";
import { WHATSAPP_ORGANIZADOR } from "@/data/evento";

const VACIO = {
  nombre: "",
  email: "",
  marca: "",
  rol: "",
  locales: "",
  whatsapp: "",
  acepta: false,
  publicar: false,
  tema: "",
};

/**
 * Registro en dos pasos.
 *
 * Paso 1 pide lo mínimo — nombre y mail — porque el dataset de HubSpot sobre
 * 40.000 landings muestra la caída más fuerte al pasar de 3 a 4 campos, y el
 * multi-paso rinde +59%. Paso 2 pide los datos de la marca, que es la data
 * comercial que sirve para armar la sala.
 *
 * Clave: si abandona en el paso 2, el mail del paso 1 ya quedó capturado.
 */
export function useRegistro() {
  const form = reactive({ ...VACIO });
  const errores = reactive({});
  const paso = ref(1);
  const enviando = ref(false);
  const enviado = ref(false);
  const errorEnvio = ref("");
  const codigo = ref("");
  /** Se marca al completar el paso 1: sirve para no perder el contacto. */
  const parcialGuardado = ref(false);

  const endpoint = import.meta.env.VITE_REGISTRO_ENDPOINT || "";
  const tieneBackend = computed(() => Boolean(endpoint));

  function limpiarTelefono(v) {
    return v.replace(/[^\d+]/g, "");
  }

  function limpiarErrores(claves) {
    claves.forEach((k) => delete errores[k]);
  }

  function validarPaso1() {
    limpiarErrores(["nombre", "email"]);
    if (form.nombre.trim().length < 3) errores.nombre = "Poné tu nombre y apellido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      errores.email = "Revisá el email: ahí te llega el código de acceso.";
    return !errores.nombre && !errores.email;
  }

  function validarPaso2() {
    const propios = ["marca", "rol", "locales", "whatsapp", "acepta"];
    limpiarErrores(propios);
    if (form.marca.trim().length < 2) errores.marca = "¿Cuál es tu marca o negocio?";
    if (!form.rol) errores.rol = "Elegí tu rol.";
    if (!form.locales) errores.locales = "Elegí cuántos locales tenés.";
    if (limpiarTelefono(form.whatsapp).length < 8)
      errores.whatsapp = "Necesitamos un WhatsApp válido.";
    if (!form.acepta) errores.acepta = "Necesitamos tu confirmación para guardarte el lugar.";
    // Solo los errores de este paso. Mirando el objeto entero, un error del
    // paso 1 que quedara colgado bloquearía el envío sin mostrar nada: los
    // campos que lo causaron ya no están en pantalla.
    return !propios.some((k) => errores[k]);
  }

  /**
   * Guarda el contacto apenas termina el paso 1, antes de pedir nada más.
   *
   * Se dispara en cada "Continuar", así que ir y volver entre pasos mandaba
   * el mismo contacto varias veces y llenaba el CRM de duplicados. Se reenvía
   * solo si el nombre o el mail cambiaron desde el último guardado.
   */
  let ultimoParcial = "";

  async function guardarParcial() {
    if (!endpoint) return;
    const huella = `${form.nombre}|${form.email}`;
    if (huella === ultimoParcial) return;
    ultimoParcial = huella;
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          estado: "parcial",
          evento: "deenex-cordoba-2026-09-20",
        }),
      });
      parcialGuardado.value = true;
    } catch {
      // Un parcial que no se guarda no puede frenar el registro, pero sí tiene
      // que poder reintentarse en el próximo "Continuar".
      ultimoParcial = "";
    }
  }

  function siguiente() {
    if (!validarPaso1()) return false;
    guardarParcial();
    paso.value = 2;
    return true;
  }

  function volver() {
    paso.value = 1;
  }

  function mensajeWhatsapp() {
    return encodeURIComponent(
      [
        "Hola! Quiero mi lugar en el evento del 20 de septiembre en Córdoba.",
        "",
        `Nombre: ${form.nombre}`,
        `Email: ${form.email}`,
        `Marca: ${form.marca}`,
        `Rol: ${form.rol}`,
        `Locales: ${form.locales}`,
      ].join("\n")
    );
  }

  async function enviar() {
    errorEnvio.value = "";
    if (!validarPaso2()) return false;

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
          estado: "completo",
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
      errorEnvio.value = "No pudimos guardar tu lugar. Probá de nuevo o escribinos por WhatsApp.";
      return false;
    } finally {
      enviando.value = false;
    }
  }

  function reiniciar() {
    Object.assign(form, VACIO);
    Object.keys(errores).forEach((k) => delete errores[k]);
    paso.value = 1;
    enviado.value = false;
    errorEnvio.value = "";
    codigo.value = "";
    parcialGuardado.value = false;
    ultimoParcial = "";
  }

  return {
    form,
    errores,
    paso,
    enviando,
    enviado,
    errorEnvio,
    codigo,
    tieneBackend,
    parcialGuardado,
    siguiente,
    volver,
    enviar,
    reiniciar,
  };
}
