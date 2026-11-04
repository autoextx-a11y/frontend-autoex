import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PageTitle } from "@/components/common/PageTitle";
import { Reveal } from "@/components/common/Reveal";
import { MessageDialog } from "@/components/forms/MessageDialog";
import { FilterSidebar, type SearchPatch } from "@/components/inventory/FilterSidebar";
import { InventoryContactForm } from "@/components/inventory/InventoryContactForm";
import { InventoryPagination } from "@/components/inventory/InventoryPagination";
import { VehicleCard } from "@/components/inventory/VehicleCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { fmtMoney } from "@/lib/format";
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  activeFilterCount,
  filterVehicles,
  inventorySearchSchema,
  paginate,
  sortVehicles,
  type SortValue,
} from "@/lib/inventory-filter";
import { inventoryQuery } from "@/lib/inventory.functions";
import { vehicleName, type VehicleSummary } from "@/lib/vehicle-types";

export const Route = createFileRoute("/inventory/")({
  validateSearch: inventorySearchSchema,
  head: () => ({
    meta: [
      { title: "Used Cars for Sale in Irving, TX | AutoEx Inventory" },
      {
        name: "description",
        content:
          "Browse every used car, truck and SUV for sale at AutoEx in Irving, TX. Filter by make, model, price, mileage, year, body style and color.",
      },
      { property: "og:title", content: "Inventory in Irving, TX | AutoEx" },
      { property: "og:description", content: "Shop the full AutoEx inventory of quality used vehicles in Irving, TX." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(inventoryQuery()),
  component: InventoryPage,
});

function InventoryPage() {
  const { data: vehicles } = useSuspenseQuery(inventoryQuery());
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/inventory/" });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [messageFor, setMessageFor] = useState<VehicleSummary | null>(null);
  const [q, setQ] = useState(search.q ?? "");
  useEffect(() => setQ(search.q ?? ""), [search.q]);

  const sort: SortValue = search.sort ?? DEFAULT_SORT;
  const filtered = useMemo(() => sortVehicles(filterVehicles(vehicles, search), sort), [vehicles, search, sort]);
  const pageData = paginate(filtered, search.page ?? 1);

  const update = (patch: SearchPatch) =>
    navigate({ search: (prev) => ({ ...prev, ...patch, page: undefined }), resetScroll: false, replace: true });
  const clear = () => navigate({ search: {}, resetScroll: false });
  const goPage = (page: number) => {
    navigate({ search: (prev) => ({ ...prev, page: page === 1 ? undefined : page }) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const seo = useMemo(() => {
    const counts = new Map<string, number>();
    for (const v of vehicles) counts.set(v.bodyType, (counts.get(v.bodyType) ?? 0) + 1);
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    const prices = vehicles.map((v) => v.price).filter((p): p is number => p != null);
    const list = top.map(([k, n]) => `${n} ${k}`);
    const joined = list.length > 1 ? `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}` : list[0];
    return `AutoEx has ${joined} listings for sale in Irving, TX between ${fmtMoney(Math.min(...prices))} and ${fmtMoney(Math.max(...prices))}. Shop top brands and get a great deal on your next vehicle.`;
  }, [vehicles]);

  const filters = <FilterSidebar vehicles={vehicles} search={search} onChange={update} onClear={clear} />;
  const nActive = activeFilterCount(search);

  return (
    <>
      <PageTitle title="Inventory in Irving, TX" />
      <div className="container-site pb-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="px-2 text-muted-foreground">/</span>
          <span className="text-muted-foreground">Inventory</span>
        </nav>

        <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 items-center justify-center gap-2 bg-primary px-4 font-semibold text-primary-foreground lg:hidden"
          >
            <SlidersHorizontal className="size-4" /> Filters {nActive > 0 && `(${nActive})`}
          </button>
          <p className="text-base">
            Showing {pageData.from} - {pageData.to} of {pageData.total}
          </p>
          <select
            aria-label="Sort inventory"
            value={sort}
            onChange={(e) => update({ sort: e.target.value as SortValue })}
            className="field h-10 cursor-pointer md:w-60"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <form
            className="flex md:ml-4"
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: q.trim() || undefined });
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Stock # or VIN"
              aria-label="Search Stock # or VIN"
              className="field h-10 md:w-50"
            />
            <button type="submit" aria-label="Search" className="grid h-10 w-11 shrink-0 place-items-center bg-primary text-primary-foreground transition-colors hover:bg-primary-deep">
              <Search className="size-4" />
            </button>
          </form>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(260px,325px)_1fr]">
          <div className="hidden lg:block">
            {filters}
            <InventoryContactForm />
          </div>

          <div>
            {pageData.items.length === 0 ? (
              <div className="animate-fade-in border border-border p-12 text-center">
                <p className="text-lg font-semibold">No vehicles match your filters.</p>
                <button type="button" onClick={clear} className="mt-3 font-semibold text-primary underline">
                  Clear all filters
                </button>
              </div>
            ) : (
              <ul key={`${pageData.page}-${sort}`} className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {pageData.items.map((v, i) => (
                  <li key={v.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                    <VehicleCard v={v} onMessage={setMessageFor} />
                  </li>
                ))}
              </ul>
            )}
            {pageData.total > 0 && (
              <InventoryPagination
                page={pageData.page}
                totalPages={pageData.totalPages}
                from={pageData.from}
                to={pageData.to}
                total={pageData.total}
                onPage={goPage}
              />
            )}
          </div>
        </div>

        <Reveal className="mx-auto mt-10 max-w-6xl">
          <h2 className="text-2xl font-bold md:text-[1.75rem]">Find Your Next Vehicle in Irving, TX at AutoEx</h2>
          <p className="mt-2">{seo}</p>
        </Reveal>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[90vw] max-w-sm overflow-y-auto p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Filter Inventory</SheetTitle>
          </SheetHeader>
          {filters}
          <div className="p-4">
            <button type="button" onClick={() => setMobileOpen(false)} className="h-11 w-full bg-primary font-semibold text-primary-foreground">
              Show {filtered.length} Results
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <MessageDialog
        open={messageFor != null}
        onOpenChange={(o) => !o && setMessageFor(null)}
        title={messageFor ? vehicleName(messageFor) : "Message Us"}
        {...(messageFor
          ? {
              vehicleId: messageFor.id,
              defaultMessage: `Could you provide more information about this ${vehicleName(messageFor)}?`,
            }
          : {})}
      />
    </>
  );
}
