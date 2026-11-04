import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { BetterWay } from "@/components/home/BetterWay";
import { FeaturedVehicles } from "@/components/home/FeaturedVehicles";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularLinks } from "@/components/home/PopularLinks";
import { SearchByPrice } from "@/components/home/SearchByPrice";
import { inventoryQuery } from "@/lib/inventory.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoEx | Used Cars for Sale in Irving, TX" },
      {
        name: "description",
        content:
          "Your next drive starts here. Shop quality used cars, trucks and SUVs at AutoEx in Irving, TX — great prices, easy financing and exceptional service.",
      },
      { property: "og:title", content: "AutoEx | Used Cars for Sale in Irving, TX" },
      {
        property: "og:description",
        content: "Quality Vehicles. Great Prices. Exceptional Service. Browse the AutoEx inventory in Irving, TX.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(inventoryQuery()),
  component: HomePage,
});

function HomePage() {
  const { data: vehicles } = useSuspenseQuery(inventoryQuery());
  const featured = useMemo(
    () =>
      vehicles
        .filter((v) => v.featured)
        .sort((a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0)),
    [vehicles],
  );

  return (
    <>
      <HeroSection vehicles={vehicles} />
      <SearchByPrice />
      <FeaturedVehicles vehicles={featured} />
      <BetterWay />
      <PopularLinks vehicles={vehicles} />
    </>
  );
}
