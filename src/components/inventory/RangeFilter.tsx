import { useEffect, useMemo, useState } from "react";
import { histogram } from "@/lib/inventory-filter";

type Props = {
  label: string;
  min: number;
  max: number;
  step: number;
  values: number[];
  low?: number | undefined;
  high?: number | undefined;
  prefix?: string;
  plain?: boolean;
  onCommit: (low: number | undefined, high: number | undefined) => void;
};

/** Dual-thumb range slider with a live histogram of matching vehicles. */
export function RangeFilter({ label, min, max, step, values, low, high, prefix = "", plain = false, onCommit }: Props) {
  const show = (n: number) => `${prefix}${plain ? String(n) : n.toLocaleString("en-US")}`;
  const [lo, setLo] = useState(low ?? min);
  const [hi, setHi] = useState(high ?? max);

  useEffect(() => setLo(low ?? min), [low, min]);
  useEffect(() => setHi(high ?? max), [high, max]);

  const bars = useMemo(() => histogram(values, min, max, 28), [values, min, max]);
  const peak = Math.max(1, ...bars);
  const span = Math.max(1, max - min);
  const loPct = ((lo - min) / span) * 100;
  const hiPct = ((hi - min) / span) * 100;

  const commit = (l = lo, h = hi) => onCommit(l <= min ? undefined : l, h >= max ? undefined : h);

  return (
    <div className="border-b border-border px-5 py-4">
      <p className="mb-3 text-sm">{label}</p>
      <div className="flex items-center gap-2 text-sm">
        <input
          aria-label={`${label} minimum`}
          inputMode="numeric"
          className="field h-9 px-2"
          value={show(lo)}
          onChange={(e) => setLo(Number(e.target.value.replace(/\D/g, "")) || 0)}
          onBlur={() => commit()}
          onKeyDown={(e) => e.key === "Enter" && commit()}
        />
        <span className="text-muted-foreground">to</span>
        <input
          aria-label={`${label} maximum`}
          inputMode="numeric"
          className="field h-9 px-2"
          value={show(hi)}
          onChange={(e) => setHi(Number(e.target.value.replace(/\D/g, "")) || 0)}
          onBlur={() => commit()}
          onKeyDown={(e) => e.key === "Enter" && commit()}
        />
      </div>

      <div className="mt-4 flex h-10 items-end gap-px" aria-hidden>
        {bars.map((b, i) => {
          const pos = ((i + 0.5) / bars.length) * 100;
          const inRange = pos >= loPct && pos <= hiPct;
          return (
            <div
              key={i}
              className={inRange ? "flex-1 bg-primary/70 transition-all duration-500" : "flex-1 bg-border transition-all duration-500"}
              style={{ height: `${(b / peak) * 100}%`, minHeight: b ? 3 : 0 }}
            />
          );
        })}
      </div>

      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
        />
        <input
          type="range"
          aria-label={`${label} minimum slider`}
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => setLo(Math.min(Number(e.target.value), hi))}
          onPointerUp={() => commit()}
          onKeyUp={() => commit()}
          className="range-thumb absolute inset-0 w-full"
        />
        <input
          type="range"
          aria-label={`${label} maximum slider`}
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => setHi(Math.max(Number(e.target.value), lo))}
          onPointerUp={() => commit()}
          onKeyUp={() => commit()}
          className="range-thumb absolute inset-0 w-full"
        />
      </div>
    </div>
  );
}
