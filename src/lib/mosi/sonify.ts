import { PHI } from "./constants";
import type { Crease } from "./constants";

let ctx: AudioContext | null = null;

export function unlockAudio(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(context: AudioContext, freq: number, when: number, dur: number, peak: number): void {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "triangle";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(peak, when + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(when);
  osc.stop(when + dur + 0.02);
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  };
}

export function playFold(crease: Crease, index: number): void {
  const context = unlockAudio();
  if (!context) return;
  const freq = 196 * Math.pow(PHI, (index % 6) / 2) * (crease === 0 ? 1 : crease === 1 ? 1.03 : 0.97);
  tone(context, freq, context.currentTime, 0.28, 0.06);
}

export function playSeat(): void {
  const context = unlockAudio();
  if (!context) return;
  const now = context.currentTime;
  for (let i = 0; i < 3; i++) tone(context, 220 * Math.pow(PHI, i / 2), now + i * 0.07, 0.4, 0.05);
}

export function playLadder(): void {
  const context = unlockAudio();
  if (!context) return;
  const now = context.currentTime;
  for (let i = 0; i < 5; i++) tone(context, 196 * Math.pow(PHI, i / 2), now + i * 0.09, 0.22, 0.05);
}
