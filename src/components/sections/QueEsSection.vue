<template>
  <!--
    Va apenas debajo del hero porque responde la primera pregunta que se hace
    cualquiera que llega por un anuncio: qué es esto, exactamente. Sin esto,
    el visitante tiene que deducirlo del programa varias pantallas más abajo.
  -->
  <section id="que-es" class="bg-noche py-seccion">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <p class="rotulo text-gris">Qué es</p>
          <!--
            El titular decía "Un domingo entre dueños de cadenas": abría con
            lo que el lector PAGA, no con lo que pasa. Y la casilla de al lado
            volvía a decir "Cuánto sale · Un domingo".

            Después salió el día como argumento de toda la página, así que la
            casilla tampoco lo dice: contesta "Nada", que es la verdad y es lo
            que la FAQ ya venía contestando.

            Segunda pasada: la versión intermedia decía "Un día entero, siete
            bloques y una sola sala", que repetía palabra por palabra el
            párrafo de al lado y encima rompía en cinco líneas, dejando media
            columna derecha en blanco. El titular enmarca, el párrafo detalla.
          -->
          <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(2rem,6vw,3.6rem)]">
            Un día de tendencias e innovación para tu cadena.
          </h2>
        </div>

        <div>
          <!--
            La frase más grande de la sección ponía al lector de oyente
            —"escuchan a los que ya resolvieron"— cuando lo que la jornada
            ofrece de distinto es lo contrario: pararse adelante y preguntar
            por el caso propio. Acá se dice en ese orden.

            Sale el párrafo sobre Deenex. Quién organiza tiene una sección
            entera más abajo —"Las marcas nos venían pidiendo este día"— con
            el mismo dato de las +350 marcas. Repetirlo acá, en el segundo
            renglón de la primera sección de contenido, es gastar la atención
            del lector en nosotros antes de haberle dicho qué gana él.
          -->
          <p class="text-[clamp(1.1rem,2.4vw,1.45rem)] font-bold leading-[1.4]">
            Hacia dónde va el mercado gastronómico y qué están aplicando las cadenas que crecen:
            <span class="text-acento-texto"
              >tendencias de consumo, formas nuevas de operar varios locales y las herramientas
              que lo hacen posible</span
            >.
          </p>

          <p class="lectura mt-6 text-[17px] leading-[1.6] text-gris">
            Lo cuenta gente que ya lo aplicó adentro de su propia cadena, y lo que se muestra en el
            salón se puede probar ahí mismo: te parás adelante, preguntás por tu caso y ves si te
            sirve.
          </p>
        </div>
      </div>

      <!-- Las cuatro preguntas que se hace cualquiera que llega de un anuncio -->
      <!--
        Eran cuatro. "Cuándo" y "Dónde" se fueron: desde que el rótulo del
        hero dice "Hotel Quinto Centenario · Córdoba / Domingo 20 de
        septiembre de 2026", estas dos repetían ese dato una pantalla más
        abajo y con el mismo peso visual que las dos que sí traen algo nuevo.
      -->
      <dl class="mt-14 grid gap-4 sm:grid-cols-2">
        <div v-for="q in CLAVES" :key="q.pregunta" class="tarjeta flex flex-col p-6">
          <span
            class="flex h-11 w-11 items-center justify-center rounded-full bg-acento/10 text-acento-texto"
          >
            <Pictograma :nombre="q.icono" :tam="20" />
          </span>
          <dt class="mt-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-gris">
            {{ q.pregunta }}
          </dt>
          <dd class="mt-2 text-[1.05rem] font-extrabold uppercase leading-[1.15] tracking-[-0.01em]">
            {{ q.respuesta }}
          </dd>
          <p class="mt-2.5 text-[14px] leading-[1.5] text-gris">{{ q.detalle }}</p>
        </div>
      </dl>

      <!--
        El filtro, al final: recién cuando el lector entendió la propuesta
        puede decidir si es para él. Ponerlo antes es pedirle que descarte
        algo que todavía no sabe qué es.
      -->
      <div class="no-es">
        <p class="text-[11px] font-semibold uppercase tracking-[0.13em] text-gris-2">
          Qué no es
        </p>
        <ul class="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          <li v-for="n in NO_ES" :key="n" class="flex items-center gap-2.5 text-[15px] text-gris">
            <span class="no-cruz" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </span>
            {{ n }}
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script setup>
import { EVENTO, NO_ES } from "@/data/evento";
import Pictograma from "@/components/ui/Pictograma.vue";

const CLAVES = [
  {
    icono: "gente",
    pregunta: "Para quién",
    respuesta: "Dueños de cadenas",
    detalle: "Cadenas con más de un local. Dueño, socio o gerente general: el que decide, no el que ejecuta.",
  },
  {
    icono: "entrada",
    pregunta: "Cuánto sale",
    respuesta: "Sin costo",
    detalle:
      "Entrada sin costo, con reserva previa. El cupo es la capacidad real del salón: 200 lugares.",
  },
];

</script>

<style scoped>
.no-es {
  margin-top: 1rem;
  padding: 1.5rem 1.75rem;
  border-radius: 16px;
  border: 1px dashed var(--linea-fuerte, #d5d0e4);
}
.no-cruz {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: color-mix(in srgb, currentColor 10%, transparent);
  flex-shrink: 0;
}
</style>
