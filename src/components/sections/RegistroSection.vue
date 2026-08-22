<template>
  <section id="registro" class="bg-lima text-ink">
    <div class="grid lg:grid-cols-[.85fr_1.15fr]">
      <!-- Argumento -->
      <div class="border-b-[3px] border-ink p-8 sm:p-12 lg:border-b-0 lg:border-r-[3px]">
        <p class="kicker opacity-60">Reservá tu lugar</p>
        <h2 class="titular mt-6 text-[clamp(2.2rem,6vw,4rem)]">
          Son {{ total }} lugares. Este puede ser el tuyo.
        </h2>

        <p class="mt-7 max-w-[44ch] text-[1.02rem] leading-[1.6] text-ink/75">
          Entrada gratuita con registro previo obligatorio. Te llega el QR por email: con eso entrás
          el 20/9 y se te desbloquea tu reunión de diagnóstico.
        </p>

        <!-- Cupo -->
        <div class="borde mt-9 bg-ink p-6 text-white">
          <div class="flex items-baseline justify-between gap-4">
            <span class="titular text-[clamp(2.6rem,6vw,4rem)]" :class="critico ? 'text-fuego' : 'text-lima'">
              {{ restantes }}
            </span>
            <span class="kicker text-right text-white/50">Lugares<br />disponibles</span>
          </div>
          <div class="mt-4 h-2 w-full bg-white/15">
            <div
              class="h-full transition-[width] duration-1000 ease-out"
              :class="critico ? 'bg-fuego' : 'bg-lima'"
              :style="{ width: Math.max(porcentaje, 3) + '%' }"
            ></div>
          </div>
          <p class="kicker mt-3 text-white/40">{{ ocupados }} de {{ total }} tomados</p>
        </div>

        <ul class="mt-8 space-y-3">
          <li v-for="(item, i) in INCLUYE" :key="i" class="flex gap-3 text-[0.94rem] font-semibold leading-snug">
            <span class="shrink-0 text-fuego">✓</span>
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Formulario -->
      <div class="bg-ink p-8 text-white sm:p-12">
        <!-- Éxito -->
        <div v-if="enviado" class="py-10">
          <div class="titular text-[clamp(2rem,5vw,3.4rem)] text-lima">Tu lugar quedó reservado.</div>
          <p class="mt-6 max-w-[46ch] text-[1rem] leading-[1.6] text-white/65">
            <template v-if="tieneBackend">
              Te llega el QR por email. Guardalo: con eso entrás el 20/9 y se te desbloquea tu
              reunión de diagnóstico.
            </template>
            <template v-else>
              Abrimos WhatsApp con tus datos cargados. Mandá el mensaje y te confirmamos el lugar
              junto con el QR.
            </template>
          </p>
          <p v-if="codigo" class="mt-6 inline-block bg-lima px-5 py-3 font-black tracking-widest text-ink">
            {{ codigo }}
          </p>
          <button type="button" class="kicker mt-8 block border-b-2 border-lima pb-1 text-lima" @click="reiniciar">
            Registrar a otra persona
          </button>
        </div>

        <!-- Form -->
        <form v-else novalidate @submit.prevent="onSubmit">
          <h3 class="titular text-[clamp(1.4rem,3vw,2rem)]">Completá y quedás anotado</h3>
          <p class="mt-3 text-[0.92rem] text-white/50">
            Un minuto. Los datos de la marca nos sirven para armar la sala.
          </p>

          <div class="mt-8 space-y-5">
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
                <select id="reg-rol" v-model="form.rol" class="campo" :class="{ 'campo-error': errores.rol }">
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

            <div>
              <label class="etiqueta" for="reg-ciudad">
                Ciudad <span class="opacity-40">(opcional)</span>
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

            <label
              class="flex cursor-pointer items-start gap-3 border-[3px] p-4 transition-colors"
              :class="errores.acepta ? 'border-fuego bg-fuego/10' : 'border-white/20 hover:border-white/40'"
            >
              <input
                v-model="form.acepta"
                type="checkbox"
                class="mt-0.5 h-4 w-4 shrink-0 accent-lima"
              />
              <span class="text-[0.85rem] leading-[1.5] text-white/65">
                Confirmo que voy a asistir el {{ EVENTO.fechaLarga.toLowerCase() }} y que Deenex
                puede contactarme por email y WhatsApp con la información del evento.
              </span>
            </label>
            <p v-if="errores.acepta" class="error -mt-3">{{ errores.acepta }}</p>
          </div>

          <div v-if="errorEnvio" class="mt-6 border-[3px] border-fuego bg-fuego/10 p-4 text-[0.9rem] text-white">
            {{ errorEnvio }}
          </div>

          <button
            type="submit"
            :disabled="enviando || agotado"
            class="btn-cartel mt-8 w-full justify-center text-[1rem] disabled:cursor-not-allowed disabled:opacity-50"
            style="box-shadow: 8px 8px 0 #E8FF4A"
          >
            <span
              v-if="enviando"
              class="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
            ></span>
            {{ textoBoton }}
          </button>

          <p class="kicker mt-5 text-center text-white/35">
            Sin costo · Sin letra chica · El único requisito es que vengas
          </p>
        </form>
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
  if (ok) document.getElementById("registro")?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>

<style scoped>
.etiqueta {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.campo {
  width: 100%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  transition: border-color 0.15s, background-color 0.15s;
}
.campo::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.campo:focus {
  outline: none;
  border-color: var(--lima);
  background: rgba(232, 255, 74, 0.05);
}
.campo-error {
  border-color: var(--fuego);
  background: rgba(255, 74, 46, 0.08);
}

select.campo {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23E8FF4A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}
select.campo option {
  background: #101010;
  color: #fff;
}

.error {
  margin-top: 0.45rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--fuego);
}
</style>
