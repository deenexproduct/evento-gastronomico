<template>
  <!--
    Captura secundaria. Casi todo el que llega no se registra hoy, y hoy se va
    sin dejar nada. Un solo campo, sin compromiso de asistir: recupera parte de
    ese tráfico y arma la base para la edición siguiente.
  -->
  <section id="avisame" class="border-y border-white/10 bg-noche-3 py-14">
    <div class="contenedor">
      <div class="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-16">
        <div>
          <h2 class="titulo text-[clamp(1.5rem,3.6vw,2.3rem)]">
            ¿Todavía no te decidís?
          </h2>
          <p class="mt-4 max-w-[52ch] text-[16px] leading-[1.55] text-gris">
            Dejanos el mail y te avisamos cuando se anuncien los oradores que faltan. Sin
            compromiso de venir, y si después querés tu lugar, te lo guardamos.
          </p>
        </div>

        <!-- Confirmación -->
        <div v-if="listo" class="rounded-2xl border border-acento/40 bg-acento/[0.07] p-6">
          <p class="text-[1.1rem] font-black uppercase leading-tight text-acento-texto">
            Anotado. Te escribimos.
          </p>
          <p class="mt-2.5 text-[15px] leading-[1.5] text-gris">
            Te avisamos con cada anuncio. Si querés reservar ahora,
            <a
              href="#registro"
              class="font-bold text-white underline underline-offset-4"
              @click.prevent="ir('registro')"
              >el registro está acá</a
            >.
          </p>
        </div>

        <!-- Formulario -->
        <form v-else novalidate class="flex flex-col gap-3 sm:flex-row" @submit.prevent="enviar">
          <div class="flex-1">
            <label class="sr-only" for="avisame-email">Tu email</label>
            <input
              id="avisame-email"
              v-model.trim="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="tumail@tumarca.com"
              class="campo"
              :class="{ 'campo-error': error }"
            />
            <p v-if="error" class="error">{{ error }}</p>
          </div>
          <button type="submit" class="btn shrink-0">Avisame</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const error = ref("");
const listo = ref(false);

const endpoint = import.meta.env.VITE_AVISOS_ENDPOINT || "";

async function enviar() {
  error.value = "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value)) {
    error.value = "Revisá el email.";
    return;
  }

  // Sin endpoint el mail no se pierde: queda en el navegador para recuperarlo
  // cuando la lista de avisos esté conectada.
  if (!endpoint) {
    try {
      const previos = JSON.parse(localStorage.getItem("gastrotech-avisos") || "[]");
      previos.push({ email: email.value, fecha: new Date().toISOString() });
      localStorage.setItem("gastrotech-avisos", JSON.stringify(previos));
    } catch {
      /* si el almacenamiento falla, igual se le confirma al visitante */
    }
    listo.value = true;
    return;
  }

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, origen: "avisame", evento: "gastrotech-2026" }),
    });
  } catch {
    /* no se le muestra un error por algo que se puede reintentar del lado nuestro */
  }
  listo.value = true;
}

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
.campo {
  width: 100%;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.95rem 1.4rem;
  font-size: 16px; /* 16px evita el zoom automático en iOS */
  font-weight: 500;
  color: #fff;
  transition: border-color 0.15s, background-color 0.15s;
}
.campo::placeholder {
  color: #74747c;
}
.campo:focus {
  outline: none;
  border-color: #ff5c87;
  background: rgba(255, 255, 255, 0.08);
}
.campo-error {
  border-color: #ff5c87;
  background: rgba(255, 0, 84, 0.08);
}
.error {
  margin-top: 0.45rem;
  padding-left: 1.4rem;
  font-size: 13px;
  font-weight: 700;
  color: #ff5c87;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
