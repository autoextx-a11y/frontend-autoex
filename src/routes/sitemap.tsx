import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageTitle } from "@/components/common/PageTitle";
import { NAV_LINKS } from "@/config/site";
import { inventoryQuery } from "@/lib/inventory.functions";
import { vehicleName } from "@/lib/vehicle-types";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap | AutoEx" },
      { name: "description", content: "All pages and vehicles on the AutoEx website." },
      { property: "og:title", content: "Sitemap | AutoEx" },
      { property: "og:description", content: "All pages and vehicles on the AutoEx website." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(inventoryQuery()),
  component: SitemapPage,
});

function SitemapPage() {
  const { data } = useSuspenseQuery(inventoryQuery());
  const cars = [...data].sort((a, b) => a.addedRank - b.addedRank);
  return (
    <>
      <PageTitle title="Sitemap" />
      <div className="container-site pb-16">
        <h2 className="mb-3 text-xl font-bold">Pages</h2>
        <ul className="bullet-list mb-10 space-y-1.5">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-primary hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mb-3 text-xl font-bold">Inventory</h2>
        <ul className="bullet-list grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((v) => (
            <li key={v.id}>
              <Link to="/inventory/details/$vehicleId" params={{ vehicleId: v.id }} className="text-primary hover:underline">
                {vehicleName(v)} {v.trim}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
