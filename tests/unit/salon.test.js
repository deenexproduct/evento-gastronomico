import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Salon from "@/components/ui/Salon.vue";

const PASO = 11, CELDA = 8;

function rects(w) {
  return w.findAll(".salon-lleno").map((r) => ({
    w: r.attributes("width"), h: r.attributes("height"), y: r.attributes("y"),
  }));
}

describe("Salon.vue", () => {
  it("monta y dibuja 200 butacas con pocos nodos", () => {
    const w = mount(Salon, { props: { total: 200, tomadas: 85, proximas: [86], rotulo: "x" } });
    expect(w.find("svg.salon").exists()).toBe(true);
    expect(w.find("svg").attributes("viewBox")).toBe("0 0 217 107");
    // 200 celdas, y el arbol tiene que ser chico
    expect(w.element.querySelectorAll("*").length + 1).toBeLessThanOrEqual(14);
  });

  it("el corte cae exactamente entre la butaca 85 y la 86", () => {
    const w = mount(Salon, { props: { tomadas: 85, rotulo: "x" } });
    expect(rects(w)).toEqual([
      { w: "100%", h: String(4 * PASO), y: "0" },              // filas 0-3 = 80
      { w: String(5 * PASO), h: String(CELDA), y: String(4 * PASO) }, // +5 = 85
    ]);
  });

  it("con 0 tomadas no dibuja un solo rectangulo de acento", () => {
    const w = mount(Salon, { props: { tomadas: 0, rotulo: "x" } });
    expect(rects(w)).toEqual([]);
    expect(w.find(".salon-libre").exists()).toBe(true);
  });

  it("con la sala llena pinta las diez filas y ningun resto", () => {
    const w = mount(Salon, { props: { tomadas: 200, rotulo: "x" } });
    expect(rects(w)).toEqual([{ w: "100%", h: String(10 * PASO), y: "0" }]);
  });

  it("acota un numero fuera de rango en vez de desbordar el dibujo", () => {
    expect(rects(mount(Salon, { props: { tomadas: 999, rotulo: "x" } }))).toEqual([
      { w: "100%", h: "110", y: "0" },
    ]);
    expect(rects(mount(Salon, { props: { tomadas: -5, rotulo: "x" } }))).toEqual([]);
  });

  it("reacciona al contador: repinta cuando `tomadas` sube", async () => {
    const w = mount(Salon, { props: { tomadas: 0, rotulo: "x" } });
    expect(rects(w).length).toBe(0);
    await w.setProps({ tomadas: 42 });
    expect(rects(w)).toEqual([
      { w: "100%", h: String(2 * PASO), y: "0" },
      { w: String(2 * PASO), h: String(CELDA), y: String(2 * PASO) },
    ]);
  });

  it("la butaca 86 se marca en la fila 5, columna 6", () => {
    const w = mount(Salon, { props: { tomadas: 85, proximas: [86, 87], rotulo: "x" } });
    const a = w.findAll(".salon-proxima");
    expect(a.length).toBe(2);
    expect(a[0].attributes("x")).toBe(String(5 * PASO - 1.4));
    expect(a[0].attributes("y")).toBe(String(4 * PASO - 1.4));
  });

  // OJO con la forma de este test: cada mount() crea una APP nueva y el
  // contador de useId() es por app, asi que dos mount() sueltos devuelven los
  // dos "v-0" y el test falla sin que haya bug. Hay que montar las dos
  // instancias dentro de la MISMA app, que es lo que pasa en la landing.
  it("dos instancias en la misma app no comparten los ids de pattern y mask", () => {
    const Dos = {
      components: { Salon },
      template: `<div><Salon rotulo="a" :tomadas="85" /><Salon rotulo="b" :tomadas="10" /></div>`,
    };
    const w = mount(Dos);
    const svgs = [...w.element.querySelectorAll("svg")];
    const ids = svgs.map((s) => [...s.querySelectorAll("pattern,mask")].map((e) => e.id));
    expect(ids[0]).not.toEqual(ids[1]);
    expect(ids.flat().every(Boolean)).toBe(true);
    // y cada <g> tiene que apuntar a SU propia mascara
    svgs.forEach((s, i) => {
      expect(s.querySelector("g").getAttribute("mask")).toBe(`url(#${ids[i][1]})`);
    });
  });

  it("es accesible: role img y rotulo obligatorio", () => {
    const w = mount(Salon, { props: { tomadas: 85, rotulo: "200 lugares: 85 tomados" } });
    expect(w.find("svg").attributes("role")).toBe("img");
    expect(w.find("svg").attributes("aria-label")).toBe("200 lugares: 85 tomados");
  });
});
