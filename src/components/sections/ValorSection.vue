<!--
  El recorrido del día, no una lista de beneficios.

  La versión anterior eran tres números gigantes en violeta y tres párrafos.
  Los números competían con los titulares y no ordenaban nada: el lector veía
  "200" y "10" sueltos sin saber de qué eran hasta leer al lado.

  Acá el orden es el del día: dónde entrás, adónde entrás vos, qué pasa
  adentro y qué se abre a puertas cerradas. Eso cuenta la propuesta —estás
  dentro de un evento de veinte mil personas, en una sala de doscientas— sin
  tener que afirmarla.

  El dato de cada hito va en línea con el texto, en el peso del cuerpo. Es
  información, no un cartel.
-->
<template>
  <section id="valor" class="py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Cómo es el día</p>
      <h2 class="titulo mt-4 max-w-[17ch] text-[clamp(2rem,5.6vw,3.5rem)]">
        Así es el día, de la puerta al cierre
      </h2>
      <p class="lectura mt-5 text-[17px] text-gris">
        GastroTech pasa adentro del Hotel Quinto Centenario, el mismo día que Córdoba Corazón de
        Moda ocupa el resto del centro de convenciones. Entrás a los dos con la misma
        acreditación, y la jornada se hace en un salón propio.
      </p>

      <ol class="ruta mt-14 sm:mt-16">
        <li v-for="(h, i) in hitos" :key="h.t" class="hito">
          <span class="hito-marca" aria-hidden="true">
            <span class="hito-punto"></span>
          </span>

          <div class="min-w-0 pb-12 sm:pb-14">
            <p class="hito-rotulo">{{ h.r }}</p>
            <h3 class="hito-titulo">{{ h.t }}</h3>
            <p class="hito-texto">{{ h.d }}</p>
            <p v-if="h.dato" class="hito-dato">{{ h.dato }}</p>
          </div>
        </li>
      </ol>

      <!--
        El filtro, al final del recorrido: recién cuando el lector entendió la
        propuesta puede decidir si es para él. Ponerlo antes es pedirle que
        descarte algo que todavía no sabe qué es.
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
import { NO_ES } from "@/data/evento";

/*
  Cuatro hitos y en orden cronológico: es lo que hace que se lea como un
  recorrido y no como cuatro argumentos sueltos. Cada uno dice algo que la
  jornada entrega de verdad; el podcast se nombra sin franja horaria porque
  todavía no tiene una.
*/
const hitos = [
  {
    r: "Al llegar",
    t: "Llegás a un edificio en movimiento",
    d: "Ese fin de semana el centro de convenciones recibe Córdoba Corazón de Moda: pasarela, diseño y marcas, con gente circulando todo el día. Tu acreditación de GastroTech te habilita ese evento también, sin trámite aparte.",
    dato: "Más de 20.000 personas ese fin de semana",
  },
  {
    r: "Adentro",
    t: "Y entrás a una sala tranquila",
    d: "La jornada tiene su propio salón, con entrada por lista y sin público general. Alrededor tuyo hay dueños, socios y gerentes generales de cadenas con varios locales: con quién te sentás es tan parte del día como quién habla.",
    dato: "200 lugares · entrada por lista",
  },
  {
    r: "Durante el día",
    t: "Ves a todos los proveedores el mismo día",
    d: "Un lugar por rubro, y cada empresa manda a quien decide. Ves el sistema funcionando, preguntás por tu caso y comparás en una tarde lo que si no son meses de reuniones sueltas. Un solo escenario: no hay que elegir entre salas.",
    dato: "Diez rubros, una empresa cada uno",
  },
  {
    r: "A puertas cerradas",
    t: "Y se graba el podcast, entre empresarios",
    d: "Una charla entre empresarios sobre lo que la tecnología está moviendo en el rubro: qué mercado se abre, qué se pone difícil y cómo responde el negocio. Se graba ese mismo día, adentro del evento.",
    dato: null,
  },
];
</script>

<style scoped>
/*
  La línea vertical que une los hitos es lo que convierte cuatro bloques en un
  recorrido. Se dibuja sobre el <li> y no como borde de la lista, así el
  último no arrastra la línea hasta abajo.
*/
.ruta {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hito {
  position: relative;
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .hito {
    grid-template-columns: 3rem 1fr;
    gap: 2rem;
  }
}

.hito-marca {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 0.45rem;
}
/* La línea baja desde el punto hasta el hito siguiente. En el último no se
   dibuja: si siguiera, el recorrido parecería continuar fuera de la sección. */
.hito:not(:last-child) .hito-marca::after {
  content: "";
  position: absolute;
  top: 1.5rem;
  bottom: -0.45rem;
  width: 1px;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--acento, #695ede) 35%, transparent),
    color-mix(in srgb, var(--acento, #695ede) 8%, transparent)
  );
}

.hito-punto {
  width: 13px;
  height: 13px;
  border-radius: 999px;
  border: 2px solid var(--acento, #695ede);
  background: var(--papel, #fff);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.hito-rotulo {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--acento-texto, #4f42c4);
}

.hito-titulo {
  margin-top: 0.6rem;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  max-width: 24ch;
  text-wrap: balance;
}

.hito-texto {
  margin-top: 0.9rem;
  max-width: 58ch;
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--gris, #6b6779);
}

/*
  El dato, en línea y en el cuerpo del texto: es información que respalda al
  hito, no un titular que compita con él. Antes iba en 2,9rem de Panchang
  violeta y se leía antes que el título que venía a explicarlo.
*/
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

.hito-dato {
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.42rem 0.9rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--acento, #695ede) 8%, transparent);
  color: var(--acento-texto, #4f42c4);
  font-size: 0.88rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
