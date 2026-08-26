<template>
  <!--
    Sin formulario: la reserva es un mensaje de WhatsApp.

    El único control que queda es el selector de locales, y NO es un campo: no
    valida, no bloquea y no envía nada. Solo reescribe el texto que se
    pre-carga en el chat, para que el dato que califica al público —cuántos
    locales tiene— llegue escrito y no haya que pedirlo doscientas veces. Sin
    tocar nada, el botón funciona igual: vacío es un estado válido.

    TEMA CLARO: esta sección no estrena una sola regla de color. El magenta
    pleno va siempre con bg-acento-boton y SIN text-white — html.claro pisa
    text-white a tinta, y el blanco lo pone la regla de bg-acento-boton.
  -->
  <section id="registro" class="bg-noche py-seccion">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- ── El argumento ──────────────────────────────────────────── -->
        <div>
          <p class="rotulo text-acento-texto">
            {{ agotado ? "Lista de espera" : "Reservá tu lugar" }}
          </p>

          <h2 class="titulo mt-4 text-[clamp(2rem,5.6vw,3.4rem)]">
            <template v-if="agotado">La sala se llenó. Anotate igual.</template>
            <template v-else>Un mensaje y tu lugar queda tomado.</template>
          </h2>

          <p class="mt-6 max-w-[46ch] text-[17px] text-gris">
            <template v-if="agotado">
              Los {{ total }} lugares están tomados. Siempre hay gente que avisa que no puede
              venir: cuando se libera uno, escribimos por orden de lista.
            </template>
            <template v-else>
              No hay formulario. Escribís por WhatsApp, te contestamos, y quedás adentro.
              Entrada sin costo y una sala que se llena.
            </template>
          </p>

          <!--
            La cifra que baja y la barra estaban fuera del v-if: mostraban
            "quedan N" aunque el conteo no fuera un dato real. Mientras no lo
            sea, se muestra el total del salón, que es cierto siempre.
          -->
          <div ref="anclaCupo" class="tarjeta mt-9 p-6">
            <template v-if="mostrarCupo">
              <div class="flex items-baseline justify-between gap-4">
                <span
                  class="inline-block min-w-[3ch] text-[3rem] font-black leading-none tabular-nums text-acento-texto"
                >
                  {{ cupoContado }}
                </span>
                <span class="text-right text-[13px] font-black uppercase tracking-[0.1em] text-gris">
                  lugares<br />disponibles
                </span>
              </div>
              <!--
                El salón, silla por silla, en vez de una barra de progreso de
                8px. El argumento central de la página —"el cupo es el del
                salón, no una fase de venta"— se afirma con palabras en una
                docena de lugares y se ilustraba con una barra que trae
                cualquier plantilla. Dibujado es literalmente cierto: cada
                celda es una butaca, y son doscientas.
              -->
              <Salon
                class="mt-5"
                :total="total"
                :tomadas="ocupados"
                :rotulo="`Plano del salón: ${ocupados} de ${total} butacas tomadas`"
              />
              <p class="mt-3 text-[14px] text-gris">{{ ocupados }} de {{ total }} ya tomados</p>
            </template>

            <template v-else>
              <div class="flex items-baseline justify-between gap-4">
                <span
                  class="inline-block text-[3rem] font-black leading-none tabular-nums text-acento-texto"
                >
                  {{ total }}
                </span>
                <span class="text-right text-[13px] font-black uppercase tracking-[0.1em] text-gris">
                  lugares<br />en total
                </span>
              </div>
              <p class="mt-4 text-[14px] text-gris">
                El cupo es la capacidad real del salón. No hay sillas de más.
              </p>
            </template>
          </div>

          <ul class="mt-8 space-y-3">
            <li
              v-for="(item, i) in INCLUYE"
              :key="i"
              class="flex items-start gap-3 text-[16px] leading-snug"
            >
              <span class="mt-0.5 shrink-0 text-acento-texto">✓</span>
              {{ item }}
            </li>
          </ul>

          <div class="mt-9 grid gap-3">
            <div v-for="r in RIESGO" :key="r.q" class="tarjeta px-5 py-4">
              <p class="text-[15px] font-black uppercase tracking-[0.02em]">{{ r.q }}</p>
              <p class="mt-1.5 max-w-[60ch] text-[14px] leading-[1.45] text-gris">{{ r.a }}</p>
            </div>
          </div>
        </div>

        <!-- ── El canal ──────────────────────────────────────────────── -->
        <!-- Pegajoso en desktop: la columna izquierda es más alta que esta, y
             la barra flotante se esconde mientras esta sección está en
             pantalla. Sin sticky queda un tramo largo sin ningún botón. -->
        <div class="lg:sticky lg:top-[104px] lg:self-start">
          <div class="rounded-2xl border border-acento/40 bg-acento/[0.07] p-6 sm:p-9">
            <p class="rotulo text-acento-texto">Reserva directa</p>
            <h3 class="titulo mt-3 text-[clamp(1.5rem,3.2vw,2rem)]">Se reserva por WhatsApp</h3>
            <p class="mt-4 max-w-[40ch] text-[16px] leading-[1.55] text-gris">
              Sin formularios y sin esperar un mail. Te abrimos el chat con el mensaje escrito:
              completás cuatro renglones y lo mandás.
            </p>

            <!-- Los tres pasos reemplazan la barra de progreso "1 de 2" y
                 cumplen la misma función: antes de tocar un botón que se lleva
                 a la persona a otra aplicación, hay que decirle qué va a
                 pasar. Sin esto el botón se lee como un salto al vacío. -->
            <ol class="mt-7 space-y-3.5">
              <li v-for="(p, i) in PASOS" :key="i" class="flex items-start gap-3.5">
                <span
                  aria-hidden="true"
                  class="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-acento-boton text-[12px] font-black tabular-nums"
                  >{{ i + 1 }}</span
                >
                <span class="text-[15px] leading-[1.45] text-gris">{{ p }}</span>
              </li>
            </ol>

            <!-- No es un campo: son botones que reescriben el mensaje. Sin
                 teclado, sin validación, sin estado de error. El enlace ya
                 funciona antes de tocar cualquiera.
                 No combinar .chip con bg-acento-boton para el estado activo:
                 las dos reglas tienen la misma especificidad y las dos llevan
                 !important, así que ganaría la que esté escrita después. Por
                 eso la geometría va en utilidades y solo el color se condiciona. -->
            <!--
              TU DOMINGO. Cierra el circuito: lo que la persona marcó catorce
              pantallas más arriba, en el termómetro, llega escrito en el chat.
              El renglón "Me interesaría que se hable de:" llega en blanco en el
              100% de los mensajes porque nadie tipea un tema libre desde el
              teléfono. Acá se ve que ya está escrito, así que el que llegó
              hasta el botón sabe qué está mandando antes de mandarlo.

              No lleva chips en estado activo: por definición estos son los ya
              elegidos y la cruz los saca. Así no hace falta combinar .chip con
              bg-acento-boton, que es la combinación prohibida (misma
              especificidad, las dos con !important: gana la escrita después).
              min-h-[44px] escrito a mano porque .chip de fábrica mide 33px y
              el test de mínimo táctil audita todo <button> visible.
            -->
            <div v-if="hayEleccion && !agotado" class="mt-8 rounded-xl border border-acento/40 p-5">
              <p class="rotulo text-acento-texto">Tu domingo</p>
              <ul class="mt-3 flex flex-wrap gap-1.5">
                <li v-for="t in elegidos" :key="t.id">
                  <button
                    type="button"
                    class="chip min-h-[44px] normal-case tracking-[0.02em]"
                    @click="marcar(t.id)"
                  >
                    {{ t.corto }}<span aria-hidden="true"> ×</span>
                    <span class="sr-only"> (sacar de tu mensaje)</span>
                  </button>
                </li>
              </ul>
              <p class="mt-3 text-[13px] leading-[1.45] text-gris">
                Va escrito en el mensaje: no lo tenés que tipear.
              </p>
            </div>

            <!--
              CUÁNTOS VAN. Con cupo duro de 200 es el dato operativo que más
              falta y que hoy no se pregunta en ningún lado: sin esto, 200
              mensajes son 200 personas y en la puerta aparecen 260.

              Va como <div role="group"> y NO como <fieldset>, a propósito:
              tests/e2e/registro.spec.js ubica el selector de locales con
              `#registro fieldset button` .first(). Un segundo fieldset acá
              arriba se lo roba y el test falla sin que la página esté rota.
              El grupo se nombra con aria-labelledby, que cumple lo mismo.

              Sigue sin haber un solo campo: son botones, como los locales. El
              test que verifica que no quede ningún input/textarea/select
              dentro de #registro sigue cubriendo.
            -->
            <div class="mt-8" role="group" aria-labelledby="cuantos-van">
              <p id="cuantos-van" class="text-[12px] font-black uppercase tracking-[0.12em] text-gris">
                ¿Cuántos van?
                <span class="text-gris-2">Para saber cuántas sillas guardar</span>
              </p>
              <div class="mt-3.5 flex flex-wrap gap-2">
                <button
                  v-for="n in [1, 2, 3, 4]"
                  :key="n"
                  type="button"
                  :aria-pressed="personas === n"
                  class="presionable inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors"
                  :class="
                    personas === n
                      ? 'border-transparent bg-acento-boton'
                      : 'border-white/15 bg-white/5 text-gris hover:border-white/40'
                  "
                  @click="cuantos(n)"
                >
                  {{ n === 1 ? "Solo yo" : n }}<span class="sr-only"> personas</span>
                </button>
              </div>
            </div>

            <fieldset v-if="!agotado" class="mt-8 min-w-0 border-0 p-0">
              <legend class="text-[12px] font-black uppercase tracking-[0.12em] text-gris">
                ¿Cuántos locales tenés?
                <span class="text-gris-2">Opcional, para no preguntártelo después</span>
              </legend>
              <div class="mt-3.5 flex flex-wrap gap-2">
                <button
                  v-for="l in CANTIDAD_LOCALES"
                  :key="l"
                  type="button"
                  :aria-pressed="locales === l"
                  class="inline-flex min-h-[44px] items-center rounded-full border px-4 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors"
                  :class="
                    locales === l
                      ? 'border-transparent bg-acento-boton'
                      : 'border-white/15 bg-white/5 text-gris hover:border-white/40'
                  "
                  @click="locales = locales === l ? '' : l"
                >
                  {{ l }}
                </button>
              </div>
            </fieldset>

            <a
              :href="enlaceReserva"
              target="_blank"
              rel="noopener noreferrer"
              class="btn mt-8 w-full"
            >
              {{ agotado ? "Anotarme en la lista" : "Reservar por WhatsApp" }}
              <span class="sr-only"> (abre WhatsApp en una pestaña nueva)</span>
            </a>

            <p class="mt-4 text-center text-[13px] leading-snug text-gris-2">
              Contesta una persona. Si después no podés venir, avisás por el mismo chat y
              liberás el lugar.
            </p>

            <!-- El agendado vivía dentro de la pantalla de éxito del
                 formulario. Sin formulario no hay pantalla de éxito, y
                 useCalendario quedaba como código muerto con diez tests
                 probando algo que no se renderizaba. Además es ahora el único
                 gesto de retención de la página: la mitigación número uno del
                 no-show, que en eventos gratuitos va del 40 al 60%. -->
            <div class="mt-8 border-t border-white/10 pt-7">
              <p class="text-[13px] font-black uppercase tracking-[0.12em] text-gris">
                Agendalo ahora y no te lo olvidás
              </p>
              <div class="mt-4 flex flex-wrap gap-3">
                <a
                  :href="google"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-linea text-[13px]"
                >
                  Google Calendar<span class="sr-only"> (abre en una pestaña nueva)</span>
                </a>
                <a :href="urlIcs" :download="nombreArchivo" class="btn-linea text-[13px]">
                  Apple u Outlook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { CANTIDAD_LOCALES, linkWaReserva } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";
import { useTuDomingo } from "@/composables/useTuDomingo";
import { useCalendario } from "@/composables/useCalendario";
import { useContador } from "@/composables/useContador";
import Salon from "@/components/ui/Salon.vue";

const { total, ocupados, restantes, porcentaje, agotado, mostrarCupo } = useCupo();
const { valor: cupoContado, ancla: anclaCupo } = useContador(() => restantes.value);
const { google, urlIcs, nombreArchivo } = useCalendario();

const { elegidos, temas, hayEleccion, personas, marcar, cuantos } = useTuDomingo();

const locales = ref("");
const enlaceReserva = computed(() =>
  linkWaReserva({
    locales: locales.value,
    temas: temas.value,
    personas: personas.value,
    agotado: agotado.value,
  })
);

const INCLUYE = [
  "Los siete bloques y las demos en vivo",
  "Beneficios exclusivos de todos los partners",
  "Degustaciones y networking de cierre",
  "La grilla del evento por escrito",
];

const PASOS = [
  "Tocás el botón y se abre WhatsApp con el mensaje ya escrito.",
  "Completás los renglones en blanco y lo mandás.",
  "Te contestamos confirmando, y tu lugar queda tomado.",
];

const RIESGO = [
  {
    q: "No cuesta nada",
    a: "No se pide tarjeta ni se paga en la puerta. Lo que sí hace falta es reservar antes.",
  },
  {
    q: "Si no podés venir, avisás",
    a: "Por el mismo chat. Se libera el lugar para el que está esperando.",
  },
  {
    q: "Sí hay proveedores, no hay ronda",
    a: "Bistrosoft muestra su sistema dentro del programa y los partners tienen stand. Lo que no hay es agenda de reuniones ni nadie abordándote: si querés hablar con alguno, vas vos.",
  },
];
</script>
