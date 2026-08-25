<template>
  <section id="registro" class="border-b border-linea bg-papel-2 py-20 sm:py-28">
    <div class="contenedor">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <!-- Argumento -->
        <div class="lg:col-span-5">
          <p class="rotulo text-violeta-texto">
            {{ agotado ? "Lista de espera" : "Reservá tu lugar" }}
          </p>
          <h2 class="titular mt-5 max-w-[16ch] text-[clamp(1.9rem,3.6vw,2.9rem)]">
            <template v-if="agotado">La sala se llenó. Anotate igual.</template>
            <template v-else>Son {{ total }} lugares. Este puede ser el tuyo.</template>
          </h2>
          <p class="mt-6 max-w-[44ch] text-[1rem] leading-[1.65] text-gris">
            <template v-if="agotado">
              Los {{ total }} lugares están tomados. Siempre hay gente que avisa que no puede venir,
              y cuando se libera un lugar avisamos por orden de lista. Dejanos tus datos.
            </template>
            <template v-else>
              Entrada gratuita con registro previo obligatorio. Te llega el QR por email: con eso
              entrás el 20/9 y se te abre la agenda completa del día.
            </template>
          </p>

          <!-- Cupo -->
          <div class="mt-9 border-t border-linea pt-6">
            <div class="flex items-baseline justify-between gap-4">
              <span
                class="titular text-[clamp(2.2rem,4.4vw,3rem)]"
                :class="critico ? 'text-[#C2410C]' : 'text-violeta-texto'"
              >
                {{ restantes }}
              </span>
              <span class="rotulo text-right text-gris">Lugares<br />disponibles</span>
            </div>
            <div class="mt-4 h-[3px] w-full bg-linea">
              <div
                class="h-full transition-[width] duration-1000 ease-out"
                :class="critico ? 'bg-[#C2410C]' : 'bg-violeta'"
                :style="{ width: Math.max(porcentaje, 2) + '%' }"
              ></div>
            </div>
            <p class="mt-3 text-[0.85rem] text-gris">{{ ocupados }} de {{ total }} tomados</p>
          </div>

          <ul class="mt-8 border-t border-linea">
            <li
              v-for="(item, i) in INCLUYE"
              :key="i"
              class="flex gap-3.5 border-b border-linea py-3 text-[0.93rem] leading-snug"
            >
              <span class="shrink-0 text-violeta-texto" aria-hidden="true">—</span>
              {{ item }}
            </li>
          </ul>

          <!-- Reducción de riesgo: las tres objeciones, donde se decide -->
          <div class="mt-8 space-y-4">
            <div v-for="r in RIESGO" :key="r.q">
              <p class="text-[0.92rem] font-semibold">{{ r.q }}</p>
              <p class="mt-1 max-w-[44ch] text-[0.88rem] leading-[1.55] text-gris">{{ r.a }}</p>
            </div>
          </div>
        </div>

        <!-- Formulario -->
        <div class="lg:col-span-6 lg:col-start-7">
          <div class="border border-linea bg-white p-7 sm:p-9">
            <!-- Éxito -->
            <div v-if="enviado" class="py-8">
              <p class="rotulo text-violeta-texto">Listo</p>
              <h3 class="titular mt-4 text-[clamp(1.6rem,3vw,2.2rem)]">
                {{ agotado ? "Quedaste en la lista." : "Tu lugar quedó reservado." }}
              </h3>
              <p class="mt-5 max-w-[44ch] text-[0.97rem] leading-[1.65] text-gris">
                <template v-if="agotado">
                  Te escribimos apenas se libere un lugar. Se avisa por orden de anotación, así que
                  cuanto antes entres a la lista, mejor.
                </template>
                <template v-else-if="tieneBackend">
                  Te llega el QR por email. Guardalo: con eso entrás el 20/9 y se te abre la agenda
                  completa del día.
                </template>
                <template v-else>
                  Abrimos WhatsApp con tus datos cargados. Mandá el mensaje y te confirmamos el
                  lugar junto con el QR.
                </template>
              </p>
              <p
                v-if="codigo"
                class="mt-6 inline-block border border-linea px-5 py-3 text-[0.9rem] font-semibold tracking-widest"
              >
                {{ codigo }}
              </p>
              <div v-if="!agotado" class="mt-8 flex flex-wrap gap-3">
                <a
                  :href="CALENDARIO.google"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-linea text-[0.85rem]"
                >
                  Agendar en Google
                </a>
                <a :href="urlIcs" download="gastrotech.ics" class="btn-linea text-[0.85rem]">
                  Apple o Outlook
                </a>
              </div>

              <p class="mt-7 border-t border-linea pt-6 text-[0.9rem] leading-[1.6] text-gris">
                ¿Conocés a otro dueño a quien le sirva?
                <a
                  :href="urlWhatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-violeta-texto underline underline-offset-4"
                  >Pasáselo por WhatsApp</a
                >
                — el mensaje ya está escrito.
              </p>

              <button
                type="button"
                class="mt-6 block text-[0.9rem] font-semibold text-violeta-texto underline underline-offset-4"
                @click="reiniciar"
              >
                Registrar a otra persona
              </button>
            </div>

            <!-- Formulario -->
            <form v-else novalidate @submit.prevent="onSubmit">
              <div class="flex flex-wrap items-baseline justify-between gap-3">
                <h3 class="titular text-[1.35rem]">
                  {{ agotado ? "Dejanos tus datos" : "Completá y quedás anotado" }}
                </h3>
                <span class="rotulo shrink-0 text-gris">30 segundos</span>
              </div>

              <p class="mt-4 border-l-2 border-violeta pl-4 text-[0.88rem] leading-snug text-gris">
                <template v-if="agotado">
                  <span class="font-semibold text-tinta">Los {{ total }} lugares</span> ya están
                  tomados. Entrás a la lista por orden de anotación.
                </template>
                <template v-else>
                  <span class="font-semibold text-tinta">{{ ocupados }} lugares</span> ya
                  reservados. El cupo se cuenta por persona, no por marca.
                </template>
              </p>

              <div class="mt-7 space-y-5">
                <div>
                  <label class="etiqueta" for="reg-nombre">Nombre y apellido</label>
                  <input
                    id="reg-nombre"
                    v-model.trim="form.nombre"
                    type="text"
                    autocomplete="name"
                    placeholder="Cómo te presentamos"
                    class="campo"
                    :class="{ 'campo-error': errores.nombre }"
                  />
                  <p v-if="errores.nombre" class="error">{{ errores.nombre }}</p>
                </div>

                <div>
                  <label class="etiqueta" for="reg-marca">Tu marca</label>
                  <input
                    id="reg-marca"
                    v-model.trim="form.marca"
                    type="text"
                    autocomplete="organization"
                    placeholder="Cómo se llama"
                    class="campo"
                    :class="{ 'campo-error': errores.marca }"
                  />
                  <p v-if="errores.marca" class="error">{{ errores.marca }}</p>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label class="etiqueta" for="reg-rol">Tu rol</label>
                    <select
                      id="reg-rol"
                      v-model="form.rol"
                      class="campo"
                      :class="{ 'campo-error': errores.rol }"
                    >
                      <option value="" disabled>Elegí una opción</option>
                      <option v-for="r in ROLES" :key="r" :value="r">{{ r }}</option>
                    </select>
                    <p v-if="errores.rol" class="error">{{ errores.rol }}</p>
                  </div>
                  <div>
                    <label class="etiqueta" for="reg-locales">Locales de la marca</label>
                    <select
                      id="reg-locales"
                      v-model="form.locales"
                      class="campo"
                      :class="{ 'campo-error': errores.locales }"
                    >
                      <option value="" disabled>Elegí una opción</option>
                      <option v-for="l in CANTIDAD_LOCALES" :key="l" :value="l">{{ l }}</option>
                    </select>
                    <p v-if="errores.locales" class="error">{{ errores.locales }}</p>
                  </div>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label class="etiqueta" for="reg-whatsapp">WhatsApp</label>
                    <input
                      id="reg-whatsapp"
                      v-model.trim="form.whatsapp"
                      type="tel"
                      inputmode="tel"
                      autocomplete="tel"
                      placeholder="351 000 0000"
                      class="campo"
                      :class="{ 'campo-error': errores.whatsapp }"
                    />
                    <p v-if="errores.whatsapp" class="error">{{ errores.whatsapp }}</p>
                  </div>
                  <div>
                    <label class="etiqueta" for="reg-email">Email</label>
                    <input
                      id="reg-email"
                      v-model.trim="form.email"
                      type="email"
                      autocomplete="email"
                      placeholder="Ahí te llega el QR"
                      class="campo"
                      :class="{ 'campo-error': errores.email }"
                    />
                    <p v-if="errores.email" class="error">{{ errores.email }}</p>
                  </div>
                </div>

                <label
                  class="flex cursor-pointer items-start gap-3 border p-4 transition-colors"
                  :class="
                    errores.acepta
                      ? 'border-[#C2410C] bg-[#FEF7F5]'
                      : 'border-linea hover:border-violeta/50'
                  "
                >
                  <input
                    v-model="form.acepta"
                    type="checkbox"
                    class="mt-0.5 h-4 w-4 shrink-0 accent-violeta"
                  />
                  <span class="text-[0.85rem] leading-[1.5] text-gris">
                    Confirmo que voy a asistir el {{ EVENTO.fechaLarga.toLowerCase() }} y que Deenex
                    puede contactarme por email y WhatsApp con la información del evento.
                  </span>
                </label>
                <p v-if="errores.acepta" class="error -mt-3">{{ errores.acepta }}</p>
              </div>

              <div
                v-if="errorEnvio"
                class="mt-6 border border-[#C2410C] bg-[#FEF7F5] p-4 text-[0.88rem] text-[#9A3412]"
              >
                {{ errorEnvio }}
              </div>

              <button
                type="submit"
                :disabled="enviando"
                class="btn mt-7 w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span
                  v-if="enviando"
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                ></span>
                {{ textoBoton }}
              </button>

              <p class="mt-4 text-center text-[0.8rem] text-gris">
                Sin costo · Sin letra chica · Un lugar por persona
              </p>

              <!-- Vía alterna para el que no llena formularios -->
              <p class="mt-6 border-t border-linea pt-5 text-center text-[0.85rem] text-gris">
                ¿Preferís por WhatsApp?
                <a
                  :href="whatsappRegistro"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-violeta-texto underline underline-offset-4"
                  >Escribinos y te anotamos nosotros</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import {
  EVENTO,
  ROLES,
  CANTIDAD_LOCALES,
  WHATSAPP_ORGANIZADOR,
  CALENDARIO,
  INVITACION,
} from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useRegistro } from "@/composables/useRegistro";

const { total, ocupados, restantes, porcentaje, agotado, critico } = useCupo();
const { form, errores, enviando, enviado, errorEnvio, codigo, tieneBackend, enviar, reiniciar } =
  useRegistro(agotado);

const INCLUYE = [
  "Los seis bloques de charla y las demos",
  "Los beneficios exclusivos de todos los partners",
  "Cuatro rondas de degustación y networking de cierre",
  "La mesa redonda de cierre con todos los oradores",
  "La grilla del evento con todos los beneficios",
  "Tu diagnóstico, si lo solicitás ese día",
];

const RIESGO = [
  {
    q: "No cuesta nada.",
    a: "Entrada gratuita. El registro previo es lo único obligatorio, porque el cupo del salón es real.",
  },
  {
    q: "No hay pitch de producto.",
    a: "Son charlas de gente que labura del rubro. Si querés hablar con un partner, hablás; si no, escuchás y listo.",
  },
  {
    q: "Si no podés venir, avisás.",
    a: "Liberás el lugar para alguien de la lista de espera y no pasa nada. Un mensaje alcanza.",
  },
];

const whatsappRegistro =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent(
    "Hola! Quiero reservar mi lugar en el evento de gastronomía y tecnología del 20 de septiembre en Córdoba. Mi nombre es ____ y mi marca es ____."
  );

const urlIcs = import.meta.env.BASE_URL + CALENDARIO.ics;
const urlWhatsapp = `https://wa.me/?text=${encodeURIComponent(INVITACION)}`;

const textoBoton = computed(() => {
  if (enviando.value) return "Guardando tu lugar…";
  if (agotado.value) return "Sumarme a la lista de espera";
  return "Reservar mi lugar";
});

async function onSubmit() {
  const ok = await enviar();
  if (ok)
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>

<style scoped>
.etiqueta {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #5f5c73;
}
.campo {
  width: 100%;
  border: 1px solid #e4e2ee;
  background: #fff;
  padding: 0.8rem 0.9rem;
  font-size: 0.95rem;
  color: #15132a;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.campo::placeholder {
  color: #9c99ad;
}
.campo:focus {
  outline: none;
  border-color: #695ede;
  box-shadow: 0 0 0 3px rgba(105, 94, 222, 0.13);
}
.campo-error {
  border-color: #c2410c;
  background: #fef7f5;
}
select.campo {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%235F5C73' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  padding-right: 2.4rem;
}
.error {
  margin-top: 0.4rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: #9a3412;
}
</style>
