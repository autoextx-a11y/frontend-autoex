import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import type { VehicleSummary } from "@/lib/vehicle-types";
import { cn } from "@/lib/utils";

const BODY_TYPES = ["Convertible", "Coupe", "Hatchback", "Minivan", "Pickup", "SUV", "Sedan", "Wagon"];
export const MAX_PRICES = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000,
  18000, 19000, 20000, 22000, 24000, 26000, 28000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000,
  100000,
];
export const MAX_MILEAGES = [5000, 10000, 20000, 30000, 50000, 75000, 100000, 150000];
const YEARS = Array.from({ length: 2026 - 1901 + 1 }, (_, i) => 2026 - i);

const selectCls =
  "field h-[38px] cursor-pointer appearance-none bg-[length:12px] bg-[right_0.75rem_center] bg-no-repeat pr-8 text-[0.85rem] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground";
const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e\")",
};

export function HeroSearch({ vehicles }: { vehicles: VehicleSummary[] }) {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxMiles, setMaxMiles] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");

  const makes = useMemo(() => [...new Set(vehicles.map((v) => v.make))].sort(), [vehicles]);
  const models = useMemo(
    () => [...new Set(vehicles.filter((v) => v.make === make).map((v) => v.model))].sort(),
    [vehicles, make],
  );

  function submit(e: FormEvent) {
    e.preventDefault();
    navigate({
      to: "/inventory",
      search: {
        body: type ? [type] : undefined,
        make: make ? [make] : undefined,
        model: make && model ? [`${make}|${model}`] : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        maxMiles: maxMiles ? Number(maxMiles) : undefined,
        minYear: minYear ? Number(minYear) : undefined,
        maxYear: maxYear ? Number(maxYear) : undefined,
      },
    });
  }

  return (
    <form
      onSubmit={submit}
      className="animate-slide-right pointer-events-auto ml-auto grid w-full grid-cols-1 gap-3 border-0 p-0 sm:grid-cols-2 lg:mr-4 lg:w-[clamp(300px,50%,650px)] lg:gap-4 lg:border lg:border-ink-foreground/30 lg:bg-ink/50 lg:p-4 lg:backdrop-blur-[2px] xl:grid-cols-4"
      aria-label="Search inventory"
    >
      <select aria-label="Type" value={type} onChange={(e) => setType(e.target.value)} className={cn(selectCls, "xl:col-span-2")} style={chevron}>
        <option value="">All Types</option>
        {BODY_TYPES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <select
        aria-label="Make"
        value={make}
        onChange={(e) => {
          setMake(e.target.value);
          setModel("");
        }}
        className={cn(selectCls, "xl:col-span-2")}
        style={chevron}
      >
        <option value="">All Makes</option>
        {makes.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <select aria-label="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={cn(selectCls, "xl:col-span-2")} style={chevron}>
        <option value="">Max Price</option>
        {MAX_PRICES.map((p) => (
          <option key={p} value={p}>
            ${p.toLocaleString("en-US")}
          </option>
        ))}
      </select>
      <select
        aria-label="Model"
        value={model}
        disabled={!make}
        onChange={(e) => setModel(e.target.value)}
        className={cn(selectCls, "xl:col-span-2")}
        style={chevron}
      >
        <option value="">All Models</option>
        {models.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
      <select aria-label="Max Mileage" value={maxMiles} onChange={(e) => setMaxMiles(e.target.value)} className={cn(selectCls, "xl:col-span-2")} style={chevron}>
        <option value="">Max Mileage</option>
        {MAX_MILEAGES.map((m) => (
          <option key={m} value={m - 1}>
            {m.toLocaleString("en-US")}
          </option>
        ))}
      </select>
      <select aria-label="Min Year" value={minYear} onChange={(e) => setMinYear(e.target.value)} className={selectCls} style={chevron}>
        <option value="">Min Year</option>
        {YEARS.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
      <select aria-label="Max Year" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} className={selectCls} style={chevron}>
        <option value="">Max Year</option>
        {YEARS.map((y) => (
          <option key={y}>{y}</option>
        ))}
      </select>
      <Button type="submit" variant="brand" className="h-[42px] sm:col-span-2 xl:col-span-4">
        Search Inventory
      </Button>
    </form>
  );
}
