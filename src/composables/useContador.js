import { ref, onMounted, onUnmounted } from "vue";

/**
 * Cuenta hacia arriba cuando el elemento entra en pantalla.
 *
 * Es uno de los dos momentos de animación que se permite la página. Solo
 * cambia un número: sin transform, sin layout, sin costo de render.
 * Con prefers-reduced-motion muestra el valor final directamente.
 */
export function useContador(destino, { duracion = 1400 } = {}) {
  const valor = ref(0);
  const ancla = ref(null);
  let observer = null;
  let raf = null;
  let respaldo = null;

  const objetivo = () => (typeof destino === "function" ? destino() : destino);

  /** Escribe el valor final sin animar. */
  function mostrarFinal() {
    valor.value = objetivo();
  }

  function correr() {
    const fin = objetivo();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      valor.value = fin;
      return;
    }

    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      // easing de salida: arranca rápido y frena, que es como se lee un número
      const e = 1 - Math.pow(1 - t, 3);
      valor.value = Math.round(fin * e);
      if (t < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
  }

  onMounted(() => {
    if (!ancla.value) return;
    observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          correr();
          observer.disconnect();
          if (respaldo) clearTimeout(respaldo);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ancla.value);

    // Si el observer no dispara, el número se muestra igual. Sin animar a
    // propósito: requestAnimationFrame no corre en una pestaña que no compone
    // frames, así que el respaldo no puede depender de él.
    respaldo = setTimeout(mostrarFinal, 2000);
  });

  onUnmounted(() => {
    observer?.disconnect();
    if (raf) cancelAnimationFrame(raf);
    if (respaldo) clearTimeout(respaldo);
  });

  return { valor, ancla };
}
