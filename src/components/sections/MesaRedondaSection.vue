<template>
  <section id="mesa-redonda" class="border-b border-linea bg-violeta-texto py-20 text-white sm:py-28">
    <div class="contenedor">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="rotulo text-white/85">El cierre de la jornada</p>
        </div>

        <div class="lg:col-span-9">
          <h2 class="titular max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.4rem)]">
            Todos los oradores y partners, sentados en el centro del salón.
          </h2>

          <p class="mt-8 max-w-[54ch] text-[1.05rem] leading-[1.65] text-white/90">
            Una hora de mesa redonda sobre cómo se construye un ecosistema gastronómico entre
            nosotros, y cómo apoyarnos para conseguir clientes serios. Con preguntas de la sala.
          </p>

          <p class="mt-5 max-w-[54ch] text-[1.05rem] leading-[1.65] text-white/90">
            Es la única parte del día en la que
            <span class="font-semibold text-white">todos los que hablaron están juntos</span> y las
            preguntas salen de la sala.
          </p>

          <a
            href="#registro"
            class="mt-10 inline-flex items-center gap-2.5 bg-white px-7 py-4 text-[0.92rem] font-semibold text-violeta-texto transition-colors hover:bg-white/90"
            @click.prevent="ir('registro')"
          >
            Quiero estar en la sala
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
function ir(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
</script>
