import type { Crease } from "@/lib/mosi/constants";

function Line({ crease }: { crease: Crease }) {
  if (crease === -1) {
    return (
      <div className="flex gap-2">
        <span className="h-1.5 flex-1 rounded-sm bg-fg" />
        <span className="h-1.5 flex-1 rounded-sm bg-fg" />
      </div>
    );
  }
  if (crease === 1) return <span className="block h-1.5 rounded-sm bg-fg" />;
  return <span className="block h-1.5 rounded-sm bg-primary" />;
}

export function Hexagram({ creases, label }: { creases: readonly Crease[]; label: string }) {
  const six: Crease[] = [];
  for (let i = 0; i < 6; i++) six.push(creases[i] ?? 0);
  const topDown = [...six].reverse();
  return (
    <div className="w-16">
      <div className="flex flex-col gap-1.5" aria-hidden>
        {topDown.map((crease, index) => (
          <Line key={index} crease={crease} />
        ))}
      </div>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
