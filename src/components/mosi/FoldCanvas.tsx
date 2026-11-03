import { useEffect, useRef } from "react";
import type { StageHandle } from "@/lib/mosi/stage";

type Props = {
  folds: readonly number[];
  target: readonly number[];
  modules: number;
  onCycle: (module: number, crease: number) => void;
};

export function FoldCanvas({ folds, target, modules, onCycle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleRef = useRef<StageHandle | null>(null);
  const cycleRef = useRef(onCycle);
  const viewRef = useRef({ folds, target, modules });
  cycleRef.current = onCycle;
  viewRef.current = { folds, target, modules };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;
    let handle: StageHandle | null = null;
    void import("@/lib/mosi/stage").then(({ mountStage }) => {
      if (!alive) return;
      handle = mountStage(canvas, (module, crease) => cycleRef.current(module, crease));
      handleRef.current = handle;
      const view = viewRef.current;
      handle.setFolds(view.folds, view.target, view.modules);
    });
    return () => {
      alive = false;
      handle?.dispose();
      handleRef.current = null;
    };
  }, []);

  useEffect(() => {
    handleRef.current?.setFolds(folds, target, modules);
  }, [folds, target, modules]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full touch-none"
      aria-label="Mosimodule sculpture. Drag to orbit, pinch to zoom, tap a facet to cycle valley, flat, mountain."
    />
  );
}
