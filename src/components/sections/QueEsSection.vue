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
          <!--
            EL TEXTO DE ESTE BLOQUE ES DE ALAN, del 16/09 a la tarde.

            Reemplazó al de Joaquín Lombardi de la mañana del mismo día, que
            abría por la negativa —"No es una feria de franquicias. No es un evento
            de delivery."— y duró publicado unas horas.

            "Tecnología APLICADA" y no "tecnología" a secas, y la palabra importa:
            el 27/08 se había rechazado "Un día de tecnología para tu cadena"
            porque pedía al lector que viniera por una categoría. "Aplicada" le
            dice que viene a ver algo que ya funciona en una cadena como la suya,
            que es lo que la bajada de al lado enumera.
          -->
          <h2 class="titulo mt-4 max-w-[20ch] text-[clamp(1.4rem,4.4vw,2.85rem)]">
            Un día de tecnología aplicada para tu cadena.
          </h2>
        </div>

        <div>
          <!--
            LA BAJADA ENUMERA, Y EN VIOLETA VA LA LISTA. Lo que el que evalúa venir
            quiere saber es QUÉ va a ver, y esos cinco ítems —sistemas para
            varios locales, canales propios, datos, inteligencia artificial,
            automatización— son la respuesta concreta. La primera mitad de la
            frase los presenta; el acento cae donde está la información.

            "Que funciona de verdad" cierra la lista a propósito: es la única
            aclaración que le importa a un dueño que ya compró una herramienta que
            prometió mucho.

            Sale el párrafo sobre Deenex. Quién organiza se contesta en el FAQ,
            que es donde lo busca el que quiere saberlo. Decirlo acá, en el
            segundo renglón de la primera sección de contenido, es gastar la
            atención del lector en nosotros antes de haberle dicho qué gana él.

            Tuvo además una sección entera —"Las marcas nos venían pidiendo
            este día", con el dato de las +350 marcas— que se eliminó junto con
            la vista del organizador.
          -->
          <p class="text-[clamp(1.1rem,2.4vw,1.45rem)] font-bold leading-[1.4]">
            Qué están usando hoy las cadenas que crecen:
            <span class="text-acento-texto">sistemas para operar varios locales, canales propios,
              datos para decidir, inteligencia artificial y automatización que funciona de
              verdad</span>.
          </p>

          <!--
            QUIÉN LO CUENTA, en dos grupos y no en uno. Referentes de tecnología
            del mercado —los que venden y arman los sistemas— y marcas
            gastronómicas que ya los aplicaron: el que escucha a un proveedor sabe
            que le están vendiendo, y el que escucha a otra cadena sabe que le
            están contando. Tener los dos es lo que hace creíble al primero.

            Hubo acá un renglón sobre probar las cosas en el salón y preguntar por
            el caso propio. Sale con este texto; los stands siguen dichos en "Y
            además, todo el día", en la jornada.
          -->
          <p class="lectura mt-6 text-[17px] leading-[1.6] text-gris">
            Lo cuentan referentes de tecnología del mercado y marcas gastronómicas que ya lo
            aplicaron para la misma industria en la que estás vos.
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
    // "el que decide, no el que ejecuta" separaba a la sala en dos y dejaba a
    // media industria del lado equivocado. La calificación se sostiene igual
    // nombrando los roles: quien tiene esos cargos ya sabe si es él.
    detalle: "Cadenas con más de un local. Dueño, socio o gerente general.",
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
