<template>
  <section id="registro" class="bg-noche-3 py-seccion">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <!-- Argumento -->
        <div>
          <p class="rotulo text-acento-texto">Reservá tu lugar</p>
          <h2 class="titulo mt-4 text-[clamp(2rem,5.6vw,3.4rem)]">
            Son {{ total }} lugares. Este puede ser el tuyo.
          </h2>

          <p class="mt-6 max-w-[46ch] text-[17px] text-gris">
            Entrada sin costo con registro previo. El código de acceso te llega por mail: con eso
            entrás el 20/9.
          </p>

          <!-- Cupo -->
          <div ref="anclaCupo" class="tarjeta mt-9 p-6">
            <div class="flex items-baseline justify-between gap-4">
              <span class="text-[3rem] font-black leading-none tabular-nums text-acento-texto">
                {{ cupoContado }}
              </span>
              <span class="text-right text-[13px] font-black uppercase tracking-[0.1em] text-gris">
                lugares<br />disponibles
              </span>
            </div>
            <div class="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-acento transition-[width] duration-1000"
                :style="{ width: Math.max(porcentaje, 3) + '%' }"
              ></div>
            </div>
            <p class="mt-3 text-[14px] text-gris">{{ ocupados }} de {{ total }} ya tomados</p>
          </div>

          <ul class="mt-8 space-y-3">
            <li
              v-for="(item, i) in INCLUYE"
              :key="i"
              class="flex items-start gap-3 text-[16px] leading-snug"
            >
              <span class="mt-0.5 shrink-0 text-acento-texto">✓</span>
              {{ item }}
            </li>
          </ul>

          <!-- Reducción de riesgo, en el mismo viewport que el formulario -->
          <div class="mt-9 grid gap-3">
            <div v-for="r in RIESGO" :key="r.q" class="tarjeta px-5 py-4">
              <p class="text-[15px] font-black uppercase tracking-[0.02em]">{{ r.q }}</p>
              <p class="mt-1.5 text-[14px] leading-[1.45] text-gris">{{ r.a }}</p>
            </div>
          </div>
        </div>

        <!-- Formulario -->
        <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-9">
          <!-- Éxito -->
          <div v-if="enviado" class="py-8">
            <p class="text-[2rem] font-black uppercase leading-[1.05] text-acento-texto sm:text-[2.6rem]">
              Tu lugar quedó reservado.
            </p>
            <p class="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-gris">
              <template v-if="tieneBackend">
                Te llega el código de acceso por mail. Guardalo en el celular: con eso entrás el
                20/9, no hace falta imprimir nada.
              </template>
              <template v-else>
                Abrimos WhatsApp con tus datos cargados. Mandá el mensaje y te confirmamos el lugar
                junto con el código.
              </template>
            </p>
            <p
              v-if="codigo"
              class="mt-6 inline-block rounded-full bg-acento-boton px-5 py-2.5 font-black tracking-widest text-white"
            >
              {{ codigo }}
            </p>
            <button
              type="button"
              class="mt-8 block min-h-[44px] text-[15px] font-bold text-acento-texto underline underline-offset-4"
              @click="reiniciar"
            >
              Registrar a otra persona
            </button>
          </div>

          <!-- Form -->
          <form v-else novalidate @submit.prevent="onSubmit">
            <!-- Progreso de dos pasos -->
            <div class="flex items-center gap-3">
              <span
                v-for="n in 2"
                :key="n"
                class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                :class="paso >= n ? 'bg-acento' : 'bg-white/12'"
              ></span>
              <span class="shrink-0 text-[12px] font-black uppercase tracking-[0.1em] text-gris">
                {{ paso }} de 2
              </span>
            </div>

            <!-- ── Paso 1: lo mínimo ── -->
            <div v-if="paso === 1" class="mt-7">
              <h3 class="text-[1.5rem] font-black uppercase leading-[1.1]">Empecemos</h3>
              <p class="mt-2 text-[15px] text-gris">Dos datos y ya tenés el lugar apartado.</p>

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
                  <label class="etiqueta" for="reg-email">Email</label>
                  <input
                    id="reg-email"
                    v-model.trim="form.email"
                    type="email"
                    inputmode="email"
                    autocomplete="email"
                    placeholder="Ahí te llega el código de acceso"
                    class="campo"
                    :class="{ 'campo-error': errores.email }"
                  />
                  <p v-if="errores.email" class="error">{{ errores.email }}</p>
                </div>
              </div>

              <button type="button" class="btn mt-8 w-full" @click="siguiente">Continuar</button>
              <p class="mt-4 text-center text-[13px] text-gris">
                Falta un paso más · Sin costo · Sin letra chica
              </p>
            </div>

            <!-- ── Paso 2: la marca ── -->
            <div v-else class="mt-7">
              <button
                type="button"
                class="mb-5 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-bold text-gris hover:text-white"
                @click="volver"
              >
                ← Volver
              </button>

              <h3 class="text-[1.5rem] font-black uppercase leading-[1.1]">Contanos de tu marca</h3>
              <p class="mt-2 text-[15px] text-gris">
                Nos sirve para armar la sala y saber quién viene.
              </p>

              <div class="mt-7 space-y-5">
                <div>
                  <label class="etiqueta" for="reg-marca">Marca o negocio</label>
                  <input
                    id="reg-marca"
                    v-model.trim="form.marca"
                    type="text"
                    autocomplete="organization"
                    placeholder="El nombre de tu marca"
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
                    <label class="etiqueta" for="reg-locales">Locales</label>
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

                <label
                  class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors"
                  :class="errores.acepta ? 'border-acento bg-acento/10' : 'border-white/15 hover:border-white/30'"
                >
                  <input
                    v-model="form.acepta"
                    type="checkbox"
                    class="mt-0.5 h-4 w-4 shrink-0 accent-acento"
                  />
                  <span class="text-[14px] leading-[1.5] text-gris">
                    Confirmo que voy a asistir el domingo 20 de septiembre y que Deenex puede
                    contactarme con la información del evento.
                  </span>
                </label>
                <p v-if="errores.acepta" class="error -mt-3">{{ errores.acepta }}</p>
              </div>

              <div
                v-if="errorEnvio"
                class="mt-6 rounded-xl border border-acento bg-acento/10 p-4 text-[15px] text-white"
              >
                {{ errorEnvio }}
              </div>

              <button type="submit" :disabled="enviando || agotado" class="btn mt-8 w-full disabled:opacity-50">
                <span
                  v-if="enviando"
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                ></span>
                {{ textoBoton }}
              </button>
            </div>

            <!-- Vía alterna -->
            <p class="mt-7 border-t border-white/10 pt-6 text-center text-[14px] text-gris">
              ¿Preferís por WhatsApp?
              <a
                :href="whatsappRegistro"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-[44px] items-center font-bold text-acento-texto underline underline-offset-4"
                >Escribinos y te anotamos</a
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { ROLES, CANTIDAD_LOCALES, WHATSAPP_ORGANIZADOR } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useRegistro } from "@/composables/useRegistro";
import { useContador } from "@/composables/useContador";

const { total, ocupados, restantes, porcentaje, agotado } = useCupo();

// El contador que sube al entrar en pantalla: uno de los dos momentos de motion.
const { valor: cupoContado, ancla: anclaCupo } = useContador(() => restantes.value);
const {
  form, errores, paso, enviando, enviado, errorEnvio, codigo,
  tieneBackend, siguiente, volver, enviar, reiniciar,
} = useRegistro();

const INCLUYE = [
  "Los siete bloques y las demos en vivo",
  "Beneficios exclusivos de todos los partners",
  "Degustaciones y networking de cierre",
  "La grilla del evento por escrito",
];

const RIESGO = [
  { q: "No cuesta nada.", a: "El registro previo es lo único obligatorio, porque el cupo del salón es real." },
  { q: "No hay pitch de producto.", a: "Son charlas de gente que labura del rubro. Si querés hablar con un partner, hablás." },
  { q: "Si no podés venir, avisás.", a: "Liberás el lugar para alguien de la lista de espera. Un mensaje alcanza." },
];

const textoBoton = computed(() => {
  if (enviando.value) return "Guardando tu lugar…";
  if (agotado.value) return "Cupo completo";
  return "Confirmar mi lugar";
});

const whatsappRegistro =
  `https://wa.me/${WHATSAPP_ORGANIZADOR}?text=` +
  encodeURIComponent(
    "Hola! Quiero reservar mi lugar en el evento de gastronomía y tecnología del 20 de septiembre en Córdoba."
  );

async function onSubmit() {
  const ok = await enviar();
  if (ok) document.getElementById("registro")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>

<style scoped>
.etiqueta {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #a3a3a8;
}
.campo {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.9rem 1rem;
  font-size: 16px; /* 16px evita el zoom automático en iOS */
  font-weight: 500;
  color: #fff;
  transition: border-color 0.15s, background-color 0.15s;
}
.campo::placeholder { color: #74747c; }
.campo:focus {
  outline: none;
  border-color: #ff5c87;
  background: rgba(255, 255, 255, 0.08);
}
.campo-error { border-color: #ff5c87; background: rgba(255, 0, 84, 0.08); }
select.campo {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%23FF5C87' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}
select.campo option { background: #1a1a1a; color: #fff; }
.error { margin-top: 0.45rem; font-size: 13px; font-weight: 700; color: #ff5c87; }
</style>
