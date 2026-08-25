import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref, nextTick } from "vue";
import { useContador } from "@/composables/useContador";

/**
 * El contador del cupo muestra el número sobre el que se apoya todo el
 * argumento de escasez, y al lado, en la misma tarjeta, se lee "X de 200 ya
 * tomados" con un binding reactivo. Si el número real llega del endpoint
 * después de que el contador terminó de animar, la tarjeta se contradice sola.
 *
 * Se monta el composable dentro de un componente mínimo porque usa
 * onMounted/onUnmounted.
 */
async function montar(fuente) {
  const { createApp, h } = await import("vue");
  let api = null;
  const app = createApp({
    setup() {
      api = useContador(fuente);
      return () => h("div", { ref: api.ancla }, String(api.valor.value));
    },
  });
  app.mount(document.createElement("div"));
  return { api, app };
}

describe("contador del cupo", () => {
  beforeEach(() => {
    vi.useRealTimers();
    // Sin IntersectionObserver real, el respaldo por setTimeout es el camino.
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
      }
    );
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
  });

  it("el respaldo muestra el valor final aunque el observer no dispare", async () => {
    vi.useFakeTimers();
    const restantes = ref(115);
    const { api } = await montar(() => restantes.value);
    expect(api.valor.value).toBe(0);

    vi.advanceTimersByTime(2100);
    await nextTick();
    expect(api.valor.value).toBe(115);
  });

  it("se resincroniza si el cupo real llega después de terminar", async () => {
    vi.useFakeTimers();
    const restantes = ref(115);
    const { api } = await montar(() => restantes.value);

    vi.advanceTimersByTime(2100);
    await nextTick();
    expect(api.valor.value).toBe(115);

    // El endpoint responde tarde: se ocuparon más lugares de los que decía
    // el dato estático.
    restantes.value = 40;
    await nextTick();
    expect(api.valor.value).toBe(40);
  });

  it("con la sala llena también se resincroniza", async () => {
    vi.useFakeTimers();
    const restantes = ref(0);
    const { api } = await montar(() => restantes.value);

    vi.advanceTimersByTime(2100);
    await nextTick();
    expect(api.valor.value).toBe(0);

    // Alguien liberó un lugar. Con un chequeo contra cero en vez de un flag,
    // este caso quedaba sin actualizar justo cuando más importa.
    restantes.value = 3;
    await nextTick();
    expect(api.valor.value).toBe(3);
  });

  it("no pisa el valor antes de que el contador haya arrancado", async () => {
    vi.useFakeTimers();
    const restantes = ref(115);
    const { api } = await montar(() => restantes.value);

    restantes.value = 90;
    await nextTick();
    // Todavía no entró en pantalla ni corrió el respaldo: sigue en cero.
    expect(api.valor.value).toBe(0);
  });
});
