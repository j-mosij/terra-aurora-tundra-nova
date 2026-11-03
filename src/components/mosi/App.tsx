import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import creasePy from "@/lib/mosi/mosimodule_crease.py?raw";
import gitmodPy from "@/lib/mosi/gitmod_vault.py?raw";
import {
  CLASSIC_BETA,
  GOLDEN_ANGLE,
  GOLDEN_BETA,
  PHI,
  VEHICLES,
  creaseMark,
  creaseName,
  cycleCrease,
  emptyFolds,
  fibonacci,
  fibonacciList,
  moduleCount,
  toDeg,
  type Crease,
  type VehicleId,
} from "@/lib/mosi/constants";
import { dealTarget, sameCreases } from "@/lib/mosi/deal";
import { playFold, playLadder, playSeat } from "@/lib/mosi/sonify";
import { readBest, readSound, writeBest, writeSound } from "@/lib/mosi/storage";
import { FoldCanvas } from "./FoldCanvas";
import { GitmodPanel } from "./GitmodPanel";
import { Hexagram } from "./Hexagram";

const control =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-3 text-sm text-fg hover:border-primary disabled:opacity-40";
const primary =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 text-sm text-bg hover:opacity-90 disabled:opacity-40";

function download(name: string, source: string) {
  const blob = new Blob([source], { type: "text/x-python" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export function App() {
  const [vehicle, setVehicle] = useState<VehicleId>("k3");
  const [folds, setFolds] = useState<Crease[]>(() => emptyFolds(3));
  const [target, setTarget] = useState<Crease[]>(() => emptyFolds(3).map(() => 1 as Crease));
  const [booted, setBooted] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState(0);
  const [moves, setMoves] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [flash, setFlash] = useState(false);
  const [history, setHistory] = useState<Crease[][]>([]);

  useEffect(() => {
    const next = emptyFolds(3);
    setFolds(next);
    setTarget(dealTarget(3, next));
    setBest(readBest());
    setSoundOn(readSound());
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!flash) return;
    const timer = window.setTimeout(() => setFlash(false), 1200);
    return () => window.clearTimeout(timer);
  }, [flash]);

  const modules = moduleCount(vehicle);

  function onCycle(module: number, crease: number) {
    if (!booted) return;
    const index = module * 3 + crease;
    if (index < 0 || index >= folds.length) return;
    const next = folds.slice();
    next[index] = cycleCrease(next[index] ?? 0);
    setMoves((value) => value + 1);
    if (soundOn) playFold(next[index], index);
    if (sameCreases(next, target)) {
      const scored = score + fibonacci(streak + 1);
      const bestNext = Math.max(best, scored);
      setScore(scored);
      setBest(bestNext);
      writeBest(bestNext);
      setStreak((value) => value + 1);
      setSolved((value) => value + 1);
      setHistory((prev) => [next.slice(0, 6), ...prev].slice(0, 4));
      setFlash(true);
      if (soundOn) playSeat();
      setTarget(dealTarget(modules, next));
    }
    setFolds(next);
  }

  function choose(id: VehicleId) {
    const count = moduleCount(id);
    const next = emptyFolds(count);
    setVehicle(id);
    setFolds(next);
    setTarget(dealTarget(count, next));
    setStreak(0);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-bg text-fg">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div>
          <h1 className="font-display text-xl leading-none">Mosimodule</h1>
          <p className="mt-1 text-sm text-muted">Golden ternary flat fold</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted">
            {score}
            <span className="text-fg"> / {best}</span>
          </p>
          <button
            type="button"
            className={control}
            aria-pressed={soundOn}
            onClick={() => {
              const next = !soundOn;
              setSoundOn(next);
              writeSound(next);
              if (next) playLadder();
            }}
          >
            {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            <span className="sr-only">{soundOn ? "Sound on" : "Sound off"}</span>
            Sonify
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="relative h-1/2 min-h-64 shrink-0 lg:h-auto lg:min-h-0 lg:flex-1">
          <FoldCanvas folds={folds} target={target} modules={modules} onCycle={onCycle} />
          <p className="pointer-events-none absolute bottom-3 left-4 text-sm text-muted">
            Drag to orbit. Pinch to zoom. Tap a facet.
          </p>
          {flash ? (
            <p className="absolute left-4 top-3 rounded-xl bg-primary px-3 py-2 text-sm text-bg">Fold seated</p>
          ) : null}
        </div>

        <aside className="min-h-0 flex-1 overflow-y-auto border-t border-border lg:h-full lg:w-96 lg:flex-none lg:border-l lg:border-t-0">
          <div className="sticky top-0 z-10 flex items-end gap-4 border-b border-border bg-bg px-4 py-3">
            <Hexagram creases={folds} label="Live" />
            <Hexagram creases={target} label="Target" />
            <p className="pb-1 text-sm text-muted">
              {solved} seated
              <span className="block">Mountain solid, valley broken, flat gold.</span>
            </p>
          </div>
          {history.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto border-b border-border px-4 py-3">
              {history.map((reading, index) => (
                <Hexagram key={index} creases={reading} label={`Seat ${solved - index}`} />
              ))}
            </div>
          ) : null}

          <section className="border-b border-border px-4 py-4">
            <p className="text-xs tracking-widest text-muted">CELL 01</p>
            <h2 className="mt-1 font-display text-lg">Vehicle</h2>
            <p className="mt-2 text-sm text-muted">
              Design angle β ≈ {toDeg(GOLDEN_BETA).toFixed(2)}° where cot β = φ. Classical flat fold sits at{" "}
              {toDeg(CLASSIC_BETA).toFixed(0)}°. These are lattice sizes, not a cluster install.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(Object.keys(VEHICLES) as VehicleId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  className={vehicle === id ? primary : control}
                  onClick={() => choose(id)}
                >
                  {VEHICLES[id].name}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-fg">{VEHICLES[vehicle].line}</p>
          </section>

          <section className="border-b border-border px-4 py-4">
            <p className="text-xs tracking-widest text-muted">CELL 02</p>
            <h2 className="mt-1 font-display text-lg">Creases</h2>
            <p className="mt-2 text-sm text-muted">
              Cycle valley, flat, mountain. A match scores the next Fibonacci step. {moves} moves.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {Array.from({ length: modules }, (_, module) => (
                <div key={module} className="grid grid-cols-4 gap-2">
                  <span className="flex min-h-11 items-center text-sm text-muted">{module + 1}</span>
                  {[0, 1, 2].map((crease) => {
                    const value = folds[module * 3 + crease] ?? 0;
                    const wanted = target[module * 3 + crease] ?? 0;
                    const matched = value === wanted;
                    return (
                      <button
                        key={crease}
                        type="button"
                        className={matched ? `${control} border-accent text-accent` : control}
                        onClick={() => onCycle(module, crease)}
                        aria-label={`Module ${module + 1} crease ${crease + 1}, ${creaseName(value)}`}
                      >
                        {creaseMark(value)}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" className={control} onClick={() => setFolds(emptyFolds(modules))}>
                Rest
              </button>
              <button
                type="button"
                className={control}
                onClick={() => {
                  setTarget(dealTarget(modules, folds));
                  setStreak(0);
                }}
              >
                Redeal
              </button>
            </div>
          </section>

          <details className="border-b border-border">
            <summary className="px-4 py-4">
              <span className="text-xs tracking-widest text-muted">CELL 03</span>
              <span className="mt-1 block font-display text-lg">Gitmod seal</span>
            </summary>
            <div className="px-4 pb-4">
              <GitmodPanel />
            </div>
          </details>

          <details className="border-b border-border">
            <summary className="px-4 py-4">
              <span className="text-xs tracking-widest text-muted">CELL 04</span>
              <span className="mt-1 block font-display text-lg">Research twin</span>
            </summary>
            <div className="flex flex-col gap-3 px-4 pb-4 text-sm text-muted">
              <p>
                φ {PHI.toFixed(6)}. Golden angle {toDeg(GOLDEN_ANGLE).toFixed(3)}°. Fibonacci{" "}
                {fibonacciList(8).join(" ")}.
              </p>
              <p>
                The sunflower disk, pinecone stack, ocean spray, and torus are one sculpture. The Python files are the
                stdlib twin of the crease math and the vault policy. They do not run in the page.
              </p>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={control} onClick={() => download("mosimodule_crease.py", creasePy)}>
                  Crease script
                </button>
                <button type="button" className={control} onClick={() => download("gitmod_vault.py", gitmodPy)}>
                  Gitmod policy
                </button>
              </div>
              <p>
                Sonify plays a golden ladder, 196 Hz times powers of φ, on the first tap after you turn it on. No
                audio leaves the browser.
              </p>
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
}
