import type { Crease } from "./constants";

export function randomCreases(modules: number): Crease[] {
  const buf = new Uint8Array(modules * 3);
  crypto.getRandomValues(buf);
  const out: Crease[] = [];
  for (let i = 0; i < buf.length; i++) {
    const v = (buf[i] % 3) - 1;
    out.push(v as Crease);
  }
  return out;
}

export function sameCreases(a: readonly Crease[], b: readonly Crease[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export function dealTarget(modules: number, avoid: readonly Crease[]): Crease[] {
  for (let i = 0; i < 8; i++) {
    const target = randomCreases(modules);
    const trivial = target.every((c) => c === 0);
    if (!trivial && !sameCreases(target, avoid)) return target;
  }
  const fallback = randomCreases(modules);
  fallback[0] = 1;
  return fallback;
}
