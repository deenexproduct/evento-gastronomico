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
        <li v-for="item in QUE_HAY" :key="item.titulo" class="flex gap-4">
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
  El disco del ícono: el mismo lenguaje redondo que usaba el disco de la hora
  en el cronograma que había acá. Sin hover, porque ya no hay nada que abrir.
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
