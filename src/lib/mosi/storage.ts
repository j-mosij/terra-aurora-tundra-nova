import { BEST_KEY, SOUND_KEY } from "./constants";

export function readBest(): number {
  try {
    const n = Number(localStorage.getItem(BEST_KEY));
    if (!Number.isFinite(n) || n < 0 || n > 1_000_000) return 0;
    return Math.floor(n);
  } catch {
    return 0;
  }
}

export function writeBest(n: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(Math.floor(n)));
  } catch {
    /* private mode */
  }
}

export function readSound(): boolean {
  try {
    return localStorage.getItem(SOUND_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeSound(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? "1" : "0");
  } catch {
    /* private mode */
  }
}

export function readSessionId(): string {
  const key = "mosimodule-session-v1";
  try {
    const existing = sessionStorage.getItem(key);
    if (existing && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existing)) {
      return existing;
    }
    const id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
    return id;
  } catch {
    return crypto.randomUUID();
  }
}
