import { ChevronDown } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { countBy, filterVehicles, type InventorySearch } from "@/lib/inventory-filter";
import type { VehicleSummary } from "@/lib/vehicle-types";
import { cn } from "@/lib/utils";
import { RangeFilter } from "./RangeFilter";

export type SearchPatch = Partial<InventorySearch>;

const BODY_ORDER = ["Convertible", "Coupe", "Hatchback", "Minivan", "Pickup", "SUV", "Sedan", "Wagon"];

function Section({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm transition-colors hover:text-primary"
      >
        {title}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all duration-500", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pb-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Check({
  label,
  count,
  checked,
  onChange,
  swatch,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (c: boolean) => void;
  swatch?: string;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 py-1 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-4 cursor-pointer accent-primary" />
      {swatch && <span className="size-3.5 shrink-0 border border-border" style={{ background: `var(--swatch-${swatch})` }} />}
      <span className="transition-colors group-hover:text-primary">
        {label}
        {count != null && <span className="text-muted-foreground"> ({count})</span>}
      </span>
    </label>
  );
}

function toggle(list: string[] | undefined, value: string, on: boolean) {
  const set = new Set(list ?? []);
  if (on) set.add(value);
  else set.delete(value);
  const out = [...set];
  return out.length ? out : undefined;
}

function sortedEntries(map: Map<string, number>, order?: string[]) {
  return [...map.entries()].sort((a, b) =>
    order ? order.indexOf(a[0]) - order.indexOf(b[0]) || a[0].localeCompare(b[0]) : b[1] - a[1] || a[0].localeCompare(b[0]),
  );
}

export function FilterSidebar({
  vehicles,
  search,
  onChange,
  onClear,
}: {
  vehicles: VehicleSummary[];
  search: InventorySearch;
  onChange: (patch: SearchPatch) => void;
  onClear: () => void;
}) {
  const facets = useMemo(() => {
    const by = (skip: Parameters<typeof filterVehicles>[2]) => filterVehicles(vehicles, search, skip);
    const makeBase = by("make");
    const modelBase = by("model");
    return {
      condition: countBy(by("condition"), (v) => v.condition),
      make: countBy(makeBase, (v) => v.make),
      allMakes: [...new Set(vehicles.map((v) => v.make))].sort(),
      model: countBy(modelBase, (v) => `${v.make}|${v.model}`),
      body: countBy(by("body"), (v) => v.bodyType),
      ext: countBy(by("ext"), (v) => v.exteriorColor),
      int: countBy(by("int"), (v) => v.interiorColor),
      prices: by("minPrice").filter((v) => v.price != null).map((v) => v.price as number),
      miles: by("minMiles").map((v) => v.mileage ?? 0),
      years: by("minYear").map((v) => v.year),
    };
  }, [vehicles, search]);

  const bounds = useMemo(() => {
    const p = vehicles.map((v) => v.price ?? 0);
    const m = vehicles.map((v) => v.mileage ?? 0);
    const y = vehicles.map((v) => v.year);
    const roundDown = (n: number, s: number) => Math.floor(n / s) * s;
    const roundUp = (n: number, s: number) => Math.ceil(n / s) * s;
    return {
      price: [roundDown(Math.min(...p), 1000), roundUp(Math.max(...p), 1000)] as const,
      miles: [0, roundUp(Math.max(...m), 5000)] as const,
      year: [Math.min(...y), Math.max(...y)] as const,
    };
  }, [vehicles]);

  const selectedMakes = search.make ?? [];
  const modelsForMakes = sortedEntries(facets.model, undefined)
    .filter(([k]) => selectedMakes.length === 0 || selectedMakes.includes(k.split("|")[0] ?? ""))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <aside className="overflow-hidden border border-border bg-card">
      <div className="flex items-center justify-between bg-primary-deep px-4 py-5 text-primary-foreground">
        <h2 className="font-sans text-lg font-bold">Filter Inventory</h2>
        <button type="button" onClick={onClear} className="font-bold underline underline-offset-2 transition-opacity hover:opacity-80">
          Clear
        </button>
      </div>

      <Section title="Condition">
        {sortedEntries(facets.condition).map(([k, n]) => (
          <Check
            key={k}
            label={k}
            count={n}
            checked={search.condition?.includes(k) ?? false}
            onChange={(c) => onChange({ condition: toggle(search.condition, k, c) })}
          />
        ))}
      </Section>

      <Section title="Make, Model & Trim">
        <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Make</p>
        <div className="max-h-56 overflow-y-auto pr-1">
          {facets.allMakes.map((m) => (
            <Check
              key={m}
              label={m}
              count={facets.make.get(m) ?? 0}
              checked={selectedMakes.includes(m)}
              onChange={(c) => {
                const make = toggle(search.make, m, c);
                // drop models of makes that were unselected
                const model = search.model?.filter((x) => (make ?? []).includes(x.split("|")[0] ?? ""));
                onChange({ make, model: model?.length ? model : undefined });
              }}
            />
          ))}
        </div>
        <p className="mb-2 mt-4 text-xs font-semibold uppercase text-muted-foreground">Model</p>
        <div className="max-h-56 overflow-y-auto pr-1">
          {modelsForMakes.map(([k, n]) => (
            <Check
              key={k}
              label={k.split("|")[1] ?? k}
              count={n}
              checked={search.model?.includes(k) ?? false}
              onChange={(c) => onChange({ model: toggle(search.model, k, c) })}
            />
          ))}
        </div>
      </Section>

      <RangeFilter
        label="Price"
        prefix="$"
        min={bounds.price[0]}
        max={bounds.price[1]}
        step={500}
        values={facets.prices}
        low={search.minPrice}
        high={search.maxPrice}
        onCommit={(minPrice, maxPrice) => onChange({ minPrice, maxPrice })}
      />
      <RangeFilter
        label="Mileage"
        min={bounds.miles[0]}
        max={bounds.miles[1]}
        step={1000}
        values={facets.miles}
        low={search.minMiles}
        high={search.maxMiles}
        onCommit={(minMiles, maxMiles) => onChange({ minMiles, maxMiles })}
      />
      <YearRange bounds={bounds.year} search={search} onChange={onChange} values={facets.years} />

      <Section title="Body Style">
        {sortedEntries(facets.body, BODY_ORDER).map(([k, n]) => (
          <Check
            key={k}
            label={k}
            count={n}
            checked={search.body?.includes(k) ?? false}
            onChange={(c) => onChange({ body: toggle(search.body, k, c) })}
          />
        ))}
      </Section>

      <Section title="Style">
        <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Exterior Color</p>
        <div className="grid grid-cols-2 gap-x-2">
          {sortedEntries(facets.ext).map(([k, n]) => (
            <Check
              key={k}
              label={k}
              count={n}
              swatch={k.toLowerCase()}
              checked={search.ext?.includes(k) ?? false}
              onChange={(c) => onChange({ ext: toggle(search.ext, k, c) })}
            />
          ))}
        </div>
        <p className="mb-1 mt-4 text-xs font-semibold uppercase text-muted-foreground">Interior Color</p>
        <div className="grid grid-cols-2 gap-x-2">
          {sortedEntries(facets.int).map(([k, n]) => (
            <Check
              key={k}
              label={k}
              count={n}
              swatch={k.toLowerCase()}
              checked={search.int?.includes(k) ?? false}
              onChange={(c) => onChange({ int: toggle(search.int, k, c) })}
            />
          ))}
        </div>
      </Section>
    </aside>
  );
}

function YearRange({
  bounds,
  search,
  onChange,
  values,
}: {
  bounds: readonly [number, number];
  search: InventorySearch;
  onChange: (p: SearchPatch) => void;
  values: number[];
}) {
  return (
    <RangeFilter
      label="Year"
      plain
      min={bounds[0]}
      max={bounds[1]}
      step={1}
      values={values}
      low={search.minYear}
      high={search.maxYear}
      onCommit={(minYear, maxYear) => onChange({ minYear, maxYear })}
    />
  );
}
