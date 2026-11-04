import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Reveal } from "@/components/common/Reveal";
import { fmtMoney } from "@/lib/format";
import type { VehicleSummary } from "@/lib/vehicle-types";
import type { InventorySearch } from "@/lib/inventory-filter";

type Entry = { label: string; count: number; min: number; search: InventorySearch };

function summarize(vehicles: VehicleSummary[], key: (v: VehicleSummary) => string, toSearch: (v: VehicleSummary) => InventorySearch) {
  const map = new Map<string, Entry>();
  for (const v of vehicles) {
    const k = key(v);
    const e = map.get(k) ?? { label: k, count: 0, min: Number.POSITIVE_INFINITY, search: toSearch(v) };
    e.count++;
    if (v.price != null) e.min = Math.min(e.min, v.price);
    map.set(k, e);
  }
  return [...map.values()];
}

function Group({ title, entries }: { title: string; entries: Entry[] }) {
  return (
    <Reveal className="mb-12">
      <h2 className="underline-accent mb-6 text-2xl font-bold uppercase">{title}</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
        {entries.map((e) => (
          <Link
            key={e.label}
            to="/inventory"
            search={e.search}
            className="group block text-[13px] leading-snug transition-colors hover:text-primary"
          >
            <span className="font-bold">{e.label}</span>
            <br />
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              {e.count} listing{e.count === 1 ? "" : "s"} starting at {fmtMoney(e.min)}
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}

export function PopularLinks({ vehicles }: { vehicles: VehicleSummary[] }) {
  const { makes, models, bodies } = useMemo(() => {
    const makes = summarize(vehicles, (v) => v.make, (v) => ({ make: [v.make] })).sort((a, b) =>
      a.label.localeCompare(b.label),
    );
    const models = summarize(
      vehicles,
      (v) => `${v.make} ${v.model}`,
      (v) => ({ make: [v.make], model: [`${v.make}|${v.model}`] }),
    )
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 15);
    const bodies = summarize(vehicles, (v) => v.bodyType, (v) => ({ body: [v.bodyType] })).sort(
      (a, b) => b.count - a.count,
    );
    return { makes, models, bodies };
  }, [vehicles]);

  return (
    <div className="container-site pb-6">
      <Group title="Popular Makes" entries={makes} />
      <Group title="Popular Make Models" entries={models} />
      <Group title="Popular Bodystyles" entries={bodies} />
    </div>
  );
}
