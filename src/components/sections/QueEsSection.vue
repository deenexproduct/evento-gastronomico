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
        Quién lo crea, y por qué eso importa para el que evalúa venir: una
        edición 01 no tiene historial, así que el respaldo es lo único que
        contesta "¿esto va a estar bien hecho?". Va acá y no sólo en la
        sección de Deenex más abajo, porque el que llega de un anuncio decide
        en esta pantalla.
      -->
      <div class="mt-4 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <div class="tarjeta p-7">
          <p class="text-[12px] font-semibold uppercase tracking-[0.12em] text-gris-2">
            Quién lo crea
          </p>
          <p class="mt-4 text-[1.05rem] leading-[1.55]">
            GastroTech lo organiza <strong>Deenex</strong>, que trabaja con más de 350 marcas del
            rubro y viene escuchando hace tres años cómo deciden los dueños de cadenas.
          </p>
          <p class="mt-3.5 text-[15px] leading-[1.55] text-gris">
            <strong class="font-semibold text-papel">Alan Tapia</strong>, su CEO y co-fundador,
            comparte el escenario con otros empresarios del sector: la jornada la sostienen los
            que ya tomaron estas decisiones adentro de su propia operación, no consultores.
          </p>
        </div>

        <div class="tarjeta p-7">
          <p class="text-[12px] font-semibold uppercase tracking-[0.12em] text-gris-2">
            Además, ese día
          </p>
          <p class="mt-4 text-[1.05rem] font-semibold leading-[1.3]">
            Se abre el podcast, a puertas cerradas
          </p>
          <p class="mt-3 text-[15px] leading-[1.55] text-gris">
            Una conversación entre empresarios sobre lo que la tecnología está moviendo en el
            rubro: qué mercado se abre, qué conflictos aparecen y cómo responde el negocio.
          </p>
        </div>
      </div>

      <!-- Qué NO es: filtra tan rápido como lo que sí es -->
      <div class="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-7">
        <p class="text-[12px] font-semibold uppercase tracking-[0.12em] text-gris-2">Qué no es</p>
        <div class="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          <span
            v-for="n in NO_ES"
            :key="n"
            class="flex items-center gap-2.5 text-[15px] font-semibold text-gris"
          >
            <Pictograma nombre="cruz" :tam="15" :grosor="2.4" />
            {{ n }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { EVENTO } from "@/data/evento";
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

const NO_ES = [
  "Una feria de comida",
  "Un curso ni una capacitación",
  "Una ronda de reuniones agendadas",
  "Un evento para público general",
];
</script>
