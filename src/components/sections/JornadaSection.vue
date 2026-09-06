<template>
  <!--
    Qué hay ese día, no a qué hora.

    Acá vivía el cronograma completo: once renglones con hora exacta, cada uno
    con su orador y su diálogo de detalle. Se sacó por una razón de fondo, no
    de forma: una agenda hora por hora obliga a publicar quién da cada bloque, y
    hoy cuatro de diez dicen "orador por confirmar" —incluidos el que abre el
    día y el panel que lo cierra—. El lector que escanea no lee diez títulos:
    lee dos huecos seguidos y concluye que el evento está a medio vender.

    La lista de abajo dice lo mismo sin pedir prestado un dato que todavía no
    está cerrado. Y no pierde concreción, porque las tres cifras siguen saliendo
    de TEMAS: los minutos de contenido y de networking son los reales de la
    grilla, calculados, no escritos a mano.

    LO QUE SE PIERDE Y HAY QUE SABERLO: los títulos de los bloques eran el
    mejor material de venta de la página —"La mayoría de las cadenas no quiebra
    por vender poco: quiebra creciendo"— y ahora no se leen en ningún lado de la
    home. Si se quieren recuperar sin volver a la grilla, el lugar es una vista
    propia enlazada desde acá, con los temas y sin las horas.
  -->
  <section id="jornada" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">La jornada</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Todo esto pasa el mismo día
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Track único: no hay salas paralelas ni hay que elegir qué perderse. De
        {{ EVENTO.horarioCharlas }}, con la acreditación abierta desde las {{ EVENTO.puertas }}.
      </p>

      <!--
        Las tres cifras del día, antes de la lista. Salen calculadas de TEMAS y
        no escritas a mano: si la grilla se mueve, se mueven solas.
      -->
      <dl class="mt-9 flex flex-wrap gap-x-4 gap-y-4">
        <div v-for="c in cifras" :key="c.r" class="ficha">
          <dd class="ficha-n">{{ c.n }}</dd>
          <dt class="ficha-r">{{ c.r }}</dt>
        </div>
      </dl>

      <!--
        Grilla de dos columnas desde 640px y una en teléfono. El ícono aporta
        información que el texto no da —distingue una charla de un panel de un
        corte de un stand de un vistazo—, que es la única razón por la que este
        proyecto usa pictogramas.
      -->
      <ul class="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <li
          v-for="(item, i) in QUE_HAY"
          :key="item.titulo"
          class="item-jornada flex gap-4"
          :style="{ '--orden': i }"
        >
          <span class="disco-icono" aria-hidden="true">
            <Pictograma :nombre="item.icono" :tam="20" />
          </span>
          <div>
            <p class="text-[1.02rem] font-semibold leading-snug">{{ item.titulo }}</p>
            <p class="mt-1 text-[14px] leading-[1.5] text-gris">{{ item.detalle }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { EVENTO, TEMAS, QUE_HAY } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

/*
  Las cifras se calculan de la grilla real aunque la grilla ya no se muestre.
  Es lo que impide que la sección diga un número y el .ics otro: el día sigue
  teniendo la duración que tiene, no la que alguien escriba acá.
*/
const cifras = computed(() => {
  const conOrador = TEMAS.filter((b) => b.tipo !== "networking");
  const contenido = conOrador.reduce((a, b) => a + b.dur, 0);
  const networking = TEMAS.filter((b) => b.tipo === "networking").reduce((a, b) => a + b.dur, 0);
  return [
    { r: "Bloques", n: conOrador.length },
    { r: "De contenido", n: `${contenido}′` },
    { r: "Networking", n: `${networking}′` },
  ];
});
</script>

<style scoped>
/*
  ── La entrada escalonada ─────────────────────────────────────────────

  Los ocho ítems no aparecen de golpe: entran de a uno, 55 ms de diferencia
  entre vecinos. Ocho por 55 son 440 ms de cascada, que es lo que tarda el ojo
  en recorrer la lista de arriba abajo — más lento se siente lento, y más
  rápido no se lee como cascada sino como un parpadeo.

  NO monta un IntersectionObserver propio: se cuelga del .v-reveal que ya
  maneja HomeView, igual que hace .cinta en main.css. Ese sistema trae además
  el respaldo de dos segundos que revela todo si el observer no dispara.

  Y respeta la regla de la casa: el estado oculto SÓLO existe bajo
  .reveal-listo, la clase que el script pone en el <html> recién cuando
  confirmó que puede revelar. Si el JavaScript no llega, los ocho ítems se ven
  igual — una animación de entrada no puede dejar media sección en blanco.
*/
.item-jornada {
  transition:
    opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  /* El índice lo pone el v-for como --orden; acá se convierte en tiempo. */
  transition-delay: calc(var(--orden, 0) * 55ms);
}
.reveal-listo .v-reveal:not(.v-reveal-visible) .item-jornada {
  opacity: 0;
  transform: translateY(14px);
}

/*
  El disco del ícono: el mismo lenguaje redondo que usaba el disco de la hora
  en el cronograma que había acá.

  Al pasar el mouse se rellena y el ícono pasa a blanco. En el cronograma ese
  relleno avisaba "esto se toca"; acá no hay nada que abrir, así que es sólo
  peso visual — por eso el ítem entero no se mueve ni cambia el cursor: no
  promete un clic que no existe.
*/
.disco-icono {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--acento, #695ede) 30%, transparent);
  background: color-mix(in srgb, var(--acento, #695ede) 6%, transparent);
  color: var(--acento-texto, #4f42c4);
  transition:
    background-color 0.22s ease,
    border-color 0.22s ease,
    color 0.22s ease,
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.item-jornada:hover .disco-icono {
  background: var(--acento, #695ede);
  border-color: var(--acento, #695ede);
  color: #fff;
  transform: scale(1.08);
}

/*
  Repite el selector completo, no alcanza con .item-jornada: una media query no
  suma especificidad y la regla de arriba le ganaría. Es la misma trampa que
  main.css documenta para .v-reveal.
*/
@media (prefers-reduced-motion: reduce) {
  .item-jornada {
    transition: none;
    transition-delay: 0s;
  }
  .reveal-listo .v-reveal:not(.v-reveal-visible) .item-jornada {
    opacity: 1;
    transform: none;
  }
  .disco-icono {
    transition: none;
  }
  .item-jornada:hover .disco-icono {
    transform: none;
  }
}

/* Las tres cifras del día: fichas, no números sueltos. Un número grande sin
   caja obliga a leer el rótulo para saber de qué es. */
.ficha {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--linea, #e7e4f0);
}
.ficha-n {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--acento-texto, #4f42c4);
}
.ficha-r {
  font-size: 0.82rem;
  color: var(--gris, #6b6779);
}
</style>
