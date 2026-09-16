<template>
  <!--
    La jornada, hora por hora.

    ACÁ VOLVIÓ LA GRILLA, y conviene dejar escrito por qué, porque este mismo
    archivo tuvo durante meses el comentario contrario.

    La grilla se había sacado por un motivo real: "una agenda hora por hora
    obliga a publicar quién da cada bloque, y hoy cuatro de diez dicen orador
    por confirmar". Con cuatro huecos —incluidos el que abría el día y el panel
    que lo cerraba— el que escaneaba no leía diez títulos, leía cuatro huecos.
    En su lugar iba una lista de lo que había, sin horas.

    Esa condición se dio vuelta: el run-of-show de producción tiene nombre y
    empresa en cada bloque de contenido. Lo que sigue abierto son TÍTULOS, no
    personas, y eso el lector lo lee distinto — un tema sin cerrar con alguien
    puesto es un programa cerrándose; una persona sin poner es un evento a
    medio vender. Así que el motivo del retiro se cayó y la grilla vuelve.

    Esos títulos abiertos dicen «Tema a confirmar» en su fila y nada más: hubo
    una línea al pie explicándolos y Alan la sacó el 15/09. Tenía razón — era
    una disculpa por algo que la grilla ya dice sola, y puesta debajo del
    programa lo último que quedaba en la cabeza era lo que falta.

    LO QUE SE RECORTÓ PARA QUE ENTRE: la lista QUE_HAY pasó de ocho ítems a
    cuatro. "Charlas", "Paneles" y "Networking del mediodía" decían sin horas lo
    que la grilla dice con horas, nombre y empresa —repetían en abstracto lo que
    abajo se ve en concreto—, y "Referentes tecnológicos" es lo que cuenta la
    sección de oradores. El 16/09 salió también el invitado especial, que pasó
    a tener fila en la grilla. Los que quedan son los que la grilla no puede
    mostrar porque no ocupan una fila del escenario, y van abajo de ella.
  -->
  <section id="jornada" class="border-b border-linea py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">La jornada</p>
      <h2 class="titulo mt-4 max-w-[18ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
        Todo esto pasa el mismo día
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        Track único: no hay salas paralelas ni hay que elegir qué perderse. El
        salón abre a las {{ abre }} y el networking de cierre va hasta las
        {{ cierra }}.
      </p>

      <!--
        UNA SOLA FICHA. Hubo tres —el horario, "7 empresas en escenario" y
        "285′ de contenido"— y las dos últimas las sacó Alan el 15/09.

        Tenía razón y el motivo se ve en la pantalla: las dos contaban lo que la
        grilla muestra entera cuatro centímetros más abajo. Un número que
        resume una lista visible no informa, compite con ella — y peor, invita
        a verificarlo. La que queda es la única que la grilla no contesta de un
        vistazo: para saber a qué hora abre y a qué hora se corta habría que
        leer la primera fila y la última.

        Sale calculada igual, de GRILLA. Si mañana se mueve una fila, se mueve
        sola.
      -->
      <dl class="mt-9 flex flex-wrap gap-x-4 gap-y-4">
        <div class="ficha border-linea">
          <dd class="ficha-n">{{ abre }} a {{ cierra }}</dd>
          <dt class="ficha-r">En el salón</dt>
        </div>
      </dl>

      <div class="mt-10">
        <GrillaDia />
      </div>

      <!--
        LO QUE NO ENTRA EN LA GRILLA, porque no ocupa una fila del escenario.

        Los stands están abiertos todo el día, y la degustación y el café pasan
        entre bloque y bloque. Si esto no estuviera, el lector concluiría que
        el sábado es sentarse a
        mirar el escenario nueve horas, que es justamente lo que el evento no
        es. Va después de la grilla y no antes: primero el programa, después lo
        que lo rodea.
      -->
      <div class="mt-12 border-t border-linea pt-9">
        <p class="rotulo text-gris-2">Y además, todo el día</p>
        <ul class="mt-6 grid list-none gap-x-8 gap-y-6 sm:grid-cols-2">
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
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { GRILLA, QUE_HAY } from "@/data/evento";
import GrillaDia from "@/components/ui/GrillaDia.vue";
import Pictograma from "@/components/ui/Pictograma.vue";

/*
  Todo lo de esta sección se deriva de GRILLA. No hay una hora ni un número
  escrito a mano acá adentro: es la lección que este archivo ya aprendió tres
  veces —el horario, el conteo de bloques, los colores— y siempre de la misma
  forma, con un dato viejo sobreviviendo a la fuente que lo generó.
*/
const abre = computed(() => GRILLA[0].desde);
const cierra = computed(() => GRILLA[GRILLA.length - 1].hasta);

</script>

<style scoped>
/*
  El disco del ícono en la lista de lo que pasa en paralelo. Acá no hay nada
  que abrir, así que no se rellena al pasar el mouse ni cambia el cursor: sería
  prometer un clic que no existe.
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

/*
  La entrada escalonada de esos cuatro ítems, colgada del .v-reveal que ya
  maneja HomeView. Sin estado oculto propio: si el JavaScript no llega, los
  cuatro se ven igual.
*/
.item-jornada {
  transition-delay: calc(var(--orden, 0) * 55ms);
}
@media (prefers-reduced-motion: reduce) {
  .item-jornada {
    transition-delay: 0ms;
  }
}

/* Las fichas del día. Un número grande sin caja obliga a leer el rótulo para
   saber de qué es. */
.ficha {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border-width: 1px;
  border-style: solid;
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
