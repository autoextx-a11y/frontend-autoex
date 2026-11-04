// Pure inventory search logic: filtering, sorting, paging and facet counts.
// Runs in the browser on the summaries returned by the server.
import { z } from "zod";
import type { VehicleSummary } from "./vehicle-types";

export const PAGE_SIZE = 24;

export const SORT_OPTIONS = [
  { value: "added-desc", label: "Date Added: Newest" },
  { value: "added-asc", label: "Date Added: Oldest" },
  { value: "make-asc", label: "Make: A-Z" },
  { value: "make-desc", label: "Make: Z-A" },
  { value: "mileage-desc", label: "Mileage: Highest" },
  { value: "mileage-asc", label: "Mileage: Lowest" },
  { value: "popular-desc", label: "Popular: Most" },
  { value: "popular-asc", label: "Popular: Least" },
  { value: "price-desc", label: "Price: Highest" },
  { value: "price-asc", label: "Price: Lowest" },
  { value: "year-desc", label: "Year: Newest" },
  { value: "year-asc", label: "Year: Oldest" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];
export const DEFAULT_SORT: SortValue = "popular-desc";

const list = z
  .union([z.array(z.string()), z.string()])
  .transform((v) => (Array.isArray(v) ? v : v ? [v] : []))
  .optional()
  .catch(undefined);
const num = z.coerce.number().int().nonnegative().optional().catch(undefined);

export const inventorySearchSchema = z.object({
  page: z.coerce.number().int().min(1).optional().catch(undefined),
  sort: z
    .enum(SORT_OPTIONS.map((o) => o.value) as [SortValue, ...SortValue[]])
    .optional()
    .catch(undefined),
  q: z.string().max(40).optional().catch(undefined),
  condition: list,
  make: list,
  model: list,
  body: list,
  ext: list,
  int: list,
  minPrice: num,
  maxPrice: num,
  minMiles: num,
  maxMiles: num,
  minYear: num,
  maxYear: num,
});

export type InventorySearch = z.infer<typeof inventorySearchSchema>;

type Facet = Exclude<keyof InventorySearch, "page" | "sort" | "q">;

function inList(values: string[] | undefined, value: string) {
  return !values || values.length === 0 || values.includes(value);
}

/** Apply every filter except the one named in `skip` (used for facet counts). */
export function filterVehicles(
  vehicles: VehicleSummary[],
  s: InventorySearch,
  skip?: Facet,
): VehicleSummary[] {
  const q = s.q?.trim().toLowerCase();
  return vehicles.filter((v) => {
    if (q && !v.stock.toLowerCase().includes(q) && !v.vin.toLowerCase().includes(q)) return false;
    if (skip !== "condition" && !inList(s.condition, v.condition)) return false;
    if (skip !== "make" && !inList(s.make, v.make)) return false;
    if (skip !== "model" && !inList(s.model, `${v.make}|${v.model}`)) return false;
    if (skip !== "body" && !inList(s.body, v.bodyType)) return false;
    if (skip !== "ext" && !inList(s.ext, v.exteriorColor)) return false;
    if (skip !== "int" && !inList(s.int, v.interiorColor)) return false;
    const price = v.price ?? 0;
    if (s.minPrice != null && price < s.minPrice) return false;
    if (s.maxPrice != null && price > s.maxPrice) return false;
    const miles = v.mileage ?? 0;
    if (s.minMiles != null && miles < s.minMiles) return false;
    if (s.maxMiles != null && miles > s.maxMiles) return false;
    if (s.minYear != null && v.year < s.minYear) return false;
    if (s.maxYear != null && v.year > s.maxYear) return false;
    return true;
  });
}

export function sortVehicles(vehicles: VehicleSummary[], sort: SortValue = DEFAULT_SORT) {
  const out = [...vehicles];
  const [key, dir] = sort.split("-") as [string, "asc" | "desc"];
  const m = dir === "asc" ? 1 : -1;
  out.sort((a, b) => {
    switch (key) {
      case "added":
        // addedRank 0 = most recently added
        return (a.addedRank - b.addedRank) * -m;
      case "make":
        return a.make.localeCompare(b.make) * m || a.model.localeCompare(b.model) * m;
      case "mileage":
        return ((a.mileage ?? 0) - (b.mileage ?? 0)) * m;
      case "popular":
        // rank 0 = most popular
        return (a.rank - b.rank) * -m;
      case "price":
        return ((a.price ?? 0) - (b.price ?? 0)) * m;
      case "year":
        return (a.year - b.year) * m;
      default:
        return 0;
    }
  });
  return out;
}

export function paginate<T>(items: T[], page = 1, size = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * size;
  return {
    items: items.slice(start, start + size),
    page: current,
    totalPages,
    total: items.length,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + size, items.length),
  };
}

export function countBy(vehicles: VehicleSummary[], key: (v: VehicleSummary) => string) {
  const map = new Map<string, number>();
  for (const v of vehicles) {
    const k = key(v);
    if (!k) continue;
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return map;
}

/** Bucket counts for the price / mileage histogram above each range slider. */
export function histogram(values: number[], min: number, max: number, buckets = 24) {
  const out = new Array(buckets).fill(0) as number[];
  const span = Math.max(1, max - min);
  for (const v of values) {
    const i = Math.min(buckets - 1, Math.max(0, Math.floor(((v - min) / span) * buckets)));
    out[i] = (out[i] ?? 0) + 1;
  }
  return out;
}

export function activeFilterCount(s: InventorySearch) {
  let n = 0;
  for (const k of ["condition", "make", "model", "body", "ext", "int"] as const) n += s[k]?.length ?? 0;
  for (const k of ["minPrice", "maxPrice", "minMiles", "maxMiles", "minYear", "maxYear", "q"] as const)
    if (s[k] != null && s[k] !== "") n++;
  return n;
}
