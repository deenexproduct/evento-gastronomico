import { describe, it, expect } from "vitest";
import { CUPO } from "@/data/evento";
import { useCupo } from "@/composables/useCupo";

describe("cupo", () => {
  it("el estado es compartido entre llamadas", () => {
    // Cinco componentes usan useCupo. Si cada uno tuviera su propio estado,
    // el hero podría mostrar un número y el formulario otro.
    const a = useCupo();
    const b = useCupo();
    expect(a.total).toBe(b.total);
    expect(a.ocupados).toBe(b.ocupados);
  });

  it("restantes nunca es negativo", () => {
    const { total, ocupados, restantes } = useCupo();
    expect(restantes.value).toBe(Math.max(0, total.value - ocupados.value));
    expect(restantes.value).toBeGreaterThanOrEqual(0);
  });

  it("el porcentaje queda entre 0 y 100", () => {
    const { porcentaje } = useCupo();
    expect(porcentaje.value).toBeGreaterThanOrEqual(0);
    expect(porcentaje.value).toBeLessThanOrEqual(100);
  });

  it("critico y agotado son excluyentes", () => {
    const { critico, agotado } = useCupo();
    expect(critico.value && agotado.value).toBe(false);
  });

  it("los datos de partida son coherentes", () => {
    // Un ocupados mayor al total publicaría un cupo negativo.
    expect(CUPO.ocupados).toBeLessThanOrEqual(CUPO.total);
    expect(CUPO.total).toBeGreaterThan(0);
  });
});
