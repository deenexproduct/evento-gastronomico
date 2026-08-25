import { ref, watch, onMounted, onUnmounted } from "vue";

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
  let animando = false;
  let arranco = false;

  const objetivo = () => (typeof destino === "function" ? destino() : destino);

  /** Escribe el valor final sin animar. */
  function mostrarFinal() {
    animando = false;
    arranco = true;
    if (raf) cancelAnimationFrame(raf);
    valor.value = objetivo();
  }

  function correr() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mostrarFinal();
      return;
    }

    animando = true;
    arranco = true;
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      // easing de salida: arranca rápido y frena, que es como se lee un número
      const e = 1 - Math.pow(1 - t, 3);
      // El objetivo se relee en cada cuadro y no se captura al arrancar: el
      // cupo puede llegar de un endpoint en el medio de la animación.
      valor.value = Math.round(objetivo() * e);
      if (t < 1) raf = requestAnimationFrame(paso);
      else animando = false;
    };
    raf = requestAnimationFrame(paso);
  }

  /**
   * El cupo real llega por fetch y puede resolverse después de que el contador
   * terminó. Sin esto quedaba clavado en el valor estático, y en la misma
   * tarjeta se leía "115 lugares disponibles" al lado de "160 de 200 ya
   * tomados": el número sobre el que se apoya todo el argumento de escasez,
   * contradiciéndose solo.
   */
  watch(objetivo, (nuevo) => {
    if (arranco && !animando) valor.value = nuevo;
  });

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
