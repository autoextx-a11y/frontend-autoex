import { describe, expect, it } from "vitest";
import data from "@/data/vehicles.json";
import { filterVehicles, paginate, sortVehicles } from "@/lib/inventory-filter";
import { estimateLoan } from "@/lib/loan";
import { toSummary } from "@/lib/inventory.server";
import type { Vehicle } from "@/lib/vehicle-types";

const all = (data as unknown as Vehicle[]).map(toSummary);

describe("inventory rules", () => {
  it("shows 24 cars per page, so 85 cars span 4 pages", () => {
    const p = paginate(all, 4);
    expect(all.length).toBe(85);
    expect(p.totalPages).toBe(4);
    expect(p.from).toBe(73);
    expect(p.to).toBe(85);
  });

  it("'Browse Vehicles Under 10k' only returns cars priced at or under $10,000", () => {
    const res = filterVehicles(all, { maxPrice: 10000 });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((v) => (v.price ?? 0) <= 10000)).toBe(true);
  });

  it("Price: Lowest puts the cheapest car first", () => {
    const sorted = sortVehicles(all, "price-asc");
    expect(sorted[0]?.price).toBe(Math.min(...all.map((v) => v.price ?? Infinity)));
  });
});

describe("payment calculator", () => {
  it("matches the dealership estimate: $14,250, 10% down, 5.85% APR, 60 months", () => {
    const est = estimateLoan({ price: 14250, tradeIn: 0, down: 1425, apr: 5.85, months: 60 });
    expect(est.payment).toBe(247.05);
    expect(est.total).toBe(16248);
  });
});
