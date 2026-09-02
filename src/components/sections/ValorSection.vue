<!--
  La propuesta de valor. Es lo que faltaba: la home mostraba el programa antes
  de decir por qué conviene ir, así que el lector tenía que deducir el valor
  de una grilla de horarios.

  Tres movimientos y nada más. Cada uno ocupa su propia franja de scroll, con
  una sola idea: el lector no compara tres cosas a la vez, las lee de a una.
  El número grande no es decoración — es el ancla que hace que la fila se lea
  como una secuencia y no como tres tarjetas sueltas.
-->
<template>
  <section id="valor" class="py-seccion">
    <div class="contenedor">
      <p class="rotulo text-acento-texto">Por qué ir</p>
      <h2 class="titulo mt-4 max-w-[16ch] text-[clamp(2.1rem,6vw,3.8rem)]">
        Lo que un día resuelve y tres meses de reuniones no
      </h2>

      <div class="mt-16 grid gap-16 sm:mt-20 sm:gap-24">
        <article v-for="(m, i) in movimientos" :key="m.t" class="movimiento">
          <p class="mov-n" aria-hidden="true">{{ String(i + 1).padStart(2, "0") }}</p>

          <div class="min-w-0">
            <h3 class="mov-titulo">{{ m.t }}</h3>
            <p class="mov-bajada">{{ m.d }}</p>

            <p v-if="m.dato" class="mov-dato">
              <span class="mov-dato-n">{{ m.dato.n }}</span>
              <span class="mov-dato-r">{{ m.dato.r }}</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CUPO } from "@/data/evento";

/*
  Los tres salen de lo que el evento sí tiene, no de lo que suena bien: la sala
  cerrada, el track único con un rubro por proveedor, y la comparación de los
  números de la sala. Nada acá promete algo que la jornada no entregue.
*/
const movimientos = [
  {
    t: "La sala, no el escenario",
    d: "Dueños y decisores de cadenas con varios locales, sin público general y sin salas paralelas. Todos escuchan lo mismo y se cruzan en las mismas pausas, así que con quién te sentás es tan parte del día como quién habla.",
    dato: { n: CUPO.total, r: "dueños y decisores en la misma sala" },
  },
  {
    t: "Los proveedores del rubro, comparados en un día",
    d: "Un lugar por rubro y cada uno manda a quien decide. Ves el sistema andando, preguntás por tu caso y comparás en una jornada lo que de otra forma son tres meses de reuniones separadas.",
    dato: { n: "10", r: "rubros, uno por empresa" },
  },
  {
    t: "Tus números, contra los de la sala",
    d: "Food cost, ticket promedio y mezcla de canales, comparados con la mediana de las cadenas que tenés al lado. Es el único lugar donde ese número existe: nadie lo publica y nadie te lo va a contar en una reunión.",
    dato: null,
  },
];
</script>

<style scoped>
.movimiento {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  align-items: start;
}
@media (min-width: 768px) {
  .movimiento {
    grid-template-columns: 7rem 1fr;
    gap: 2.5rem;
  }
}

/* El número, grande y en el violeta al 20%: ordena la secuencia sin robarle
   peso al titular, que es lo que el lector tiene que leer. */
.mov-n {
  font-family: "Panchang", sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: color-mix(in srgb, var(--acento, #695ede) 22%, transparent);
  font-variant-numeric: tabular-nums;
}

.mov-titulo {
  font-size: clamp(1.5rem, 3.6vw, 2.3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  max-width: 22ch;
  text-wrap: balance;
}

.mov-bajada {
  margin-top: 1rem;
  max-width: 58ch;
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.6;
  color: var(--gris, #6b6779);
}

/* El dato cierra el movimiento con algo verificable. Va después del texto y
   no antes: primero se entiende la idea, después se la mide. */
.mov-dato {
  margin-top: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  flex-wrap: wrap;
}
.mov-dato-n {
  font-family: "Panchang", sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 4.5vw, 2.9rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--acento-texto, #4f42c4);
  font-variant-numeric: tabular-nums;
}
.mov-dato-r {
  font-size: 0.95rem;
  color: var(--gris, #6b6779);
  max-width: 26ch;
}
</style>
