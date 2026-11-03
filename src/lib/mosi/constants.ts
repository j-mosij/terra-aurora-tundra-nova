export const PHI = (1 + Math.sqrt(5)) / 2;
/** Golden angle, about 137.507764°. */
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
/** arccot(φ) = arctan(1/φ). Yoshimura n=3 golden module angle. */
export const GOLDEN_BETA = Math.atan(1 / PHI);
/** Classical flat-foldable Yoshimura angle for n=3. */
export const CLASSIC_BETA = Math.PI / 6;

export const BEST_KEY = "mosimodule-best-v1";
export const SOUND_KEY = "mosimodule-sound-v1";

export type Crease = -1 | 0 | 1;

export const VEHICLES = {
  k0: {
    modules: 1,
    name: "k0 pod",
    line: "One folded container. Three creases.",
  },
  k3: {
    modules: 3,
    name: "k3 triad",
    line: "Three-ring boom. Ternary circumference.",
  },
  k8: {
    modules: 8,
    name: "k8 octet",
    line: "Eight containers. The 2³ pop-space, opened.",
  },
} as const;

export type VehicleId = keyof typeof VEHICLES;

export function moduleCount(id: VehicleId): number {
  return VEHICLES[id].modules;
}

export function emptyFolds(modules: number): Crease[] {
  return Array.from({ length: modules * 3 }, () => 0 as Crease);
}

export function cycleCrease(c: Crease): Crease {
  if (c === -1) return 0;
  if (c === 0) return 1;
  return -1;
}

export function creaseName(c: Crease): string {
  if (c === -1) return "valley";
  if (c === 1) return "mountain";
  return "flat";
}

export function creaseMark(c: Crease): string {
  if (c === -1) return "V";
  if (c === 1) return "M";
  return "F";
}

export function fibonacci(n: number): number {
  let a = 1;
  let b = 1;
  for (let i = 1; i < n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return a;
}

export function fibonacciList(n: number): number[] {
  const out: number[] = [];
  for (let i = 1; i <= n; i++) out.push(fibonacci(i));
  return out;
}

export function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
