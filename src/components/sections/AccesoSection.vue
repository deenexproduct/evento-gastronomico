<template>
  <!--
    Réplica del bloque "Asegurá tu lugar" del referente: tres columnas con
    estados (agotado / actual / próximamente). Ellos usan fases de precio;
    acá los tres estados son tramos reales de llenado del salón, porque la
    entrada no se cobra. Misma mecánica visual, dato honesto.
  -->
  <section id="acceso" class="border-b border-linea bg-noche-3 py-seccion">
    <div class="contenedor">
      <p class="rotulo text-center text-acento-texto">Edición 01</p>
      <h2 class="titulo mt-4 text-center text-[clamp(2rem,6vw,3.5rem)]">Asegurá tu lugar</h2>
      <p class="mx-auto mt-5 max-w-[52ch] text-center text-[17px] text-gris">
        La entrada no tiene costo. Lo que es limitado es el salón: entran {{ total }} personas y cuando se
        llena, se cierran las reservas.
      </p>

      <div class="mt-14 grid gap-4 lg:grid-cols-3">
        <!--
          En una columna el tramo abierto va primero. Apilados en el orden
          del llenado, en un telefono de 667px la primera pantalla de esta
          seccion terminaba en la palabra COMPLETO: el tramo que se puede
          reservar arrancaba 129px por debajo del pliegue y el "115
          disponibles" quedaba fuera de cuadro. En tres columnas el orden
          del llenado se lee igual de izquierda a derecha, asi que ahi se
          restituye.
        -->
        <article
          v-for="t in tramos"
          :key="t.titulo"
          class="flex flex-col rounded-2xl border p-7"
          :class="[
            t.estado === 'actual'
              ? 'border-acento bg-white/[0.06] order-first lg:order-none'
              : 'border-white/10 bg-white/[0.03]',
          ]"
        >
          <div class="flex items-center justify-between gap-3">
            <span
              class="text-[12px] font-semibold uppercase tracking-[0.14em]"
              :class="t.estado === 'actual' ? 'text-acento-texto' : 'text-gris-2'"
            >
              {{ t.etiqueta }}
            </span>
            <span
              v-if="t.estado === 'actual'"
              class="rounded-full bg-acento-boton px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white"
            >
              {{ agotado ? "Lista abierta" : "Abierto" }}
            </span>
          </div>

          <h3
            class="mt-5 text-[1.35rem] font-extrabold uppercase leading-[1.1] tracking-[-0.02em]"
            :class="t.estado === 'completo' ? 'text-gris-2' : 'text-white'"
          >
            {{ t.titulo }}
          </h3>

          <p class="mt-6 flex items-baseline gap-2">
            <span
              class="text-[3.2rem] font-extrabold leading-none tabular-nums tracking-[-0.04em]"
              :class="t.estado === 'actual' ? 'text-white' : 'text-gris-2'"
              >{{ t.cifra }}</span
            >
            <span class="text-[14px] font-semibold text-gris">{{ t.unidad }}</span>
          </p>

          <ul class="mt-7 flex-1 space-y-2.5 border-t border-white/10 pt-6">
            <li
              v-for="(i, k) in t.incluye"
              :key="k"
              class="flex items-start gap-2.5 text-[15px] leading-[1.45]"
              :class="t.estado === 'completo' ? 'text-gris-2' : 'text-gris'"
            >
              <span class="mt-[3px] shrink-0" :class="t.estado === 'actual' ? 'text-acento-texto' : ''">✓</span>
              {{ i }}
            </li>
          </ul>

          <a
            v-if="t.estado === 'actual'"
            href="#reservar"
            class="btn mt-7 w-full"
            @click.prevent="ir('reservar')"
            >{{ agotado ? "Anotarme en la lista" : "Reservar mi lugar" }}</a
          >
          <p
            v-else
            class="mt-7 rounded-xl border border-white/10 py-4 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-gris-2"
          >
            {{ t.estado === "completo" ? "Completo" : "Cuando se llene" }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCupo } from "@/composables/useCupo";

const { total, ocupados, restantes, agotado, mostrarCupo } = useCupo();

/** Los tres tramos son el llenado real del salón, no fases de precio. */
const tramos = computed(() =>
  [
  {
    etiqueta: "Ya tomados",
    titulo: "Primeras marcas",
    cifra: ocupados.value,
    unidad: "lugares ocupados",
    estado: "completo",
    incluye: [
      "Reservaron antes que vos",
      "Ya confirmaron su lugar",
      "Están en la lista de la puerta",
    ],
  },
  {
    // Con la sala llena este tramo pasa a "completo" y el activo es la lista
    // de espera. Era el único consumidor de useCupo que ignoraba `agotado`:
    // seguía diciendo "Registro abierto · 0 lugares disponibles" con botón de
    // reservar, contra las otras cuatro piezas que ya avisan que está llena.
    etiqueta: agotado.value ? "Cerrado" : "Tramo actual",
    titulo: agotado.value ? "Sala completa" : "Reservas abiertas",
    cifra: restantes.value,
    unidad: "lugares disponibles",
    estado: agotado.value ? "completo" : "actual",
    // Estas cuatro viñetas eran las mismas de la sección de reserva, tres de
    // ellas palabra por palabra. Antes las separaba media página; ahora las
    // dos secciones quedaron pegadas y la repetición se ve. Se quedan allá,
    // que es donde son la última confirmación antes del botón. Acá va el
    // estado, que es de lo que hablan las otras dos columnas.
    incluye: [
      "Todavía se puede reservar",
      "Se reserva por WhatsApp, sin formulario",
      "No hay sillas de más: entra lo que entra",
    ],
  },
  {
    etiqueta: agotado.value ? "Tramo actual" : "Después de los " + total.value,
    titulo: "Lista de espera",
    cifra: "0",
    unidad: "lugares extra",
    estado: agotado.value ? "actual" : "espera",
    incluye: [
      "Te anotás por el mismo WhatsApp",
      "Se libera lugar solo si alguien avisa que no viene",
      "Te escribimos si se abre uno",
    ],
  },
  ].filter((t) => mostrarCupo.value || t.etiqueta !== "Ya tomados")
);

function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
