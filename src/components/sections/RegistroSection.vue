<template>
  <section id="registro" class="relative overflow-hidden bg-slate-900 py-24 sm:py-32">
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -left-20 top-10 h-[460px] w-[460px] rounded-full bg-primary/25 blur-[130px]"
      ></div>
      <div
        class="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[120px]"
      ></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[1100px] px-6 sm:px-8">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <!-- Copy -->
        <div class="lg:pt-4">
          <span
            class="inline-block font-mono text-[0.7rem] uppercase tracking-[0.2em] text-primary-light font-bold mb-5"
          >
            Reservá tu lugar
          </span>
          <h2
            class="font-heading text-[clamp(1.8rem,3.4vw,2.8rem)] font-extrabold leading-[1.1] tracking-tighter text-white"
          >
            Son {{ total }} lugares.
            <em class="font-light italic text-primary-light">Este puede ser el tuyo.</em>
          </h2>

          <p class="mt-6 text-[1rem] leading-[1.7] text-slate-400">
            Entrada gratuita con registro previo obligatorio. Te llega el QR por email: con eso
            entrás el 20/9 y se te desbloquea tu reunión de diagnóstico.
          </p>

          <!-- Cupo -->
          <div class="mt-9 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div class="flex items-baseline justify-between">
              <span
                class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-500"
                >Lugares disponibles</span
              >
              <span
                class="font-heading text-[1.6rem] font-black tracking-tighter"
                :class="critico ? 'text-rose-400' : 'text-primary-light'"
                >{{ restantes }}</span
              >
            </div>
            <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full transition-[width] duration-1000 ease-out"
                :class="
                  critico
                    ? 'bg-gradient-to-r from-rose-500 to-orange-400'
                    : 'bg-gradient-to-r from-primary to-primary-light'
                "
                :style="{ width: Math.max(porcentaje, 3) + '%' }"
              ></div>
            </div>
            <p class="mt-3 text-[0.8rem] text-slate-500">
              {{ ocupados }} de {{ total }} tomados · el cupo es el del salón
            </p>
          </div>

          <ul class="mt-8 space-y-3.5">
            <li
              v-for="(item, i) in INCLUYE"
              :key="i"
              class="flex items-start gap-3 text-[0.92rem] leading-snug text-slate-400"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                class="mt-0.5 shrink-0 text-primary-light"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 7.5l3.5 3.5L12 4" />
              </svg>
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Formulario -->
        <div class="rounded-3xl border border-white/10 bg-white p-7 shadow-2xl shadow-black/30 sm:p-9">
          <!-- Éxito -->
          <div v-if="enviado" class="py-8 text-center">
            <div
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                class="text-emerald-600"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 12.5l5 5L20 6.5" />
              </svg>
            </div>
            <h3 class="mt-6 font-heading text-[1.4rem] font-extrabold tracking-tight text-slate-900">
              Tu lugar quedó reservado.
            </h3>
            <p class="mx-auto mt-3 max-w-sm text-[0.95rem] leading-[1.65] text-slate-500">
              <template v-if="tieneBackend">
                Te llega el QR por email. Guardalo: con eso entrás el 20/9 y se te desbloquea tu
                reunión de diagnóstico.
              </template>
              <template v-else>
                Abrimos WhatsApp con tus datos cargados. Mandá el mensaje y te confirmamos el lugar
                junto con el QR.
              </template>
            </p>
            <p
              v-if="codigo"
              class="mt-5 inline-block rounded-xl bg-slate-100 px-4 py-2 font-mono text-[0.85rem] font-bold tracking-widest text-slate-700"
            >
              {{ codigo }}
            </p>
            <button
              type="button"
              class="mt-7 text-[0.85rem] font-semibold text-primary hover:underline"
              @click="reiniciar"
            >
              Registrar a otra persona
            </button>
          </div>

          <!-- Form -->
          <form v-else novalidate @submit.prevent="onSubmit">
            <h3 class="font-heading text-[1.25rem] font-extrabold tracking-tight text-slate-900">
              Completá y quedás anotado
            </h3>
            <p class="mt-1.5 text-[0.85rem] text-slate-500">
              Un minuto. Los datos de la marca nos sirven para armar la sala.
            </p>

            <div class="mt-7 space-y-4">
              <!-- Nombre -->
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

              <!-- Marca -->
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

              <!-- Rol + locales -->
              <div class="grid gap-4 sm:grid-cols-2">
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

              <!-- WhatsApp + email -->
              <div class="grid gap-4 sm:grid-cols-2">
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

              <!-- Ciudad -->
              <div>
                <label class="etiqueta" for="reg-ciudad">
                  Ciudad <span class="font-normal normal-case text-slate-400">(opcional)</span>
                </label>
                <input
                  id="reg-ciudad"
                  v-model.trim="form.ciudad"
                  type="text"
                  autocomplete="address-level2"
                  placeholder="Córdoba capital, Villa María…"
                  class="campo"
                />
              </div>

              <!-- Acepta -->
              <label
                class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors"
                :class="
                  errores.acepta
                    ? 'border-rose-300 bg-rose-50/50'
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                "
              >
                <input
                  v-model="form.acepta"
                  type="checkbox"
                  class="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span class="text-[0.82rem] leading-[1.5] text-slate-600">
                  Confirmo que voy a asistir el {{ EVENTO.fechaLarga.toLowerCase() }} y que Deenex
                  puede contactarme por email y WhatsApp con la información del evento.
                </span>
              </label>
              <p v-if="errores.acepta" class="error -mt-2">{{ errores.acepta }}</p>
            </div>

            <!-- Error de envío -->
            <div
              v-if="errorEnvio"
              class="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-[0.85rem] leading-snug text-rose-700"
            >
              {{ errorEnvio }}
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="enviando || agotado"
              class="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-[0.95rem] font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-[#5346c7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span
                v-if="enviando"
                class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              ></span>
              {{ textoBoton }}
              <svg v-if="!enviando" width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <p class="mt-4 text-center text-[0.75rem] leading-snug text-slate-400">
              Sin costo. Sin letra chica. El único requisito es que vengas.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO, ROLES, CANTIDAD_LOCALES } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useRegistro } from "@/composables/useRegistro";

const { total, ocupados, restantes, porcentaje, agotado, critico } = useCupo();
const { form, errores, enviando, enviado, errorEnvio, codigo, tieneBackend, enviar, reiniciar } =
  useRegistro();

const INCLUYE = [
  "Tu reunión de diagnóstico, sin excepción",
  "Los beneficios exclusivos de todos los partners",
  "La jornada completa: charlas, demos y stands",
  "Cuatro rondas de degustación y networking de cierre",
  "La grilla del evento con todos los beneficios",
];

const textoBoton = computed(() => {
  if (enviando.value) return "Guardando tu lugar…";
  if (agotado.value) return "Cupo completo";
  return "Reservar mi lugar";
});

async function onSubmit() {
  const ok = await enviar();
  if (ok) {
    document.getElementById("registro")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
</script>

<style scoped>
.etiqueta {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(100 116 139);
}

.campo {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid rgb(226 232 240);
  background: rgb(248 250 252);
  padding: 0.75rem 0.9rem;
  font-size: 0.92rem;
  color: rgb(15 23 42);
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}
.campo::placeholder {
  color: rgb(148 163 184);
}
.campo:focus {
  outline: none;
  background: #fff;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(105, 94, 222, 0.12);
}
.campo-error {
  border-color: rgb(253 164 175);
  background: rgb(255 241 242);
}

select.campo {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2394a3b8' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  padding-right: 2.3rem;
}

.error {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(225 29 72);
}
</style>
