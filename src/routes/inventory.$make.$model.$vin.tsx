
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Price } from "@/components/common/Price";
import { PriceBreakdown } from "@/components/inventory/PriceBreakdown";
import { PhotoGallery } from "@/components/vehicle/PhotoGallery";
import { VdpHeader } from "@/components/vehicle/VdpHeader";
import { VehicleSidebar } from "@/components/vehicle/VehicleSidebar";
import {
  Awards,
  CrashRatings,
  Description,
  EngineSection,
  Features,
  GreenScores,
  InfoStrip,
  SafetyEquipment,
  StandardSpecs,
  VehicleInfo,
} from "@/components/vehicle/VehicleSections";
import { fmtMoney, fmtNumber } from "@/lib/format";
import { vehicleByVinQuery } from "@/lib/inventory.functions";
import { photoUrl, vehicleName } from "@/lib/vehicle-types";

export const Route = createFileRoute(
  "/inventory/$make/$model/$vin",
)({
  loader: async ({ context, params }) => {
    const v = await context.queryClient
      .ensureQueryData(vehicleByVinQuery(params.vin))
      .catch(() => null);

    if (
      !v ||
      v.make.toLowerCase() !== decodeURIComponent(params.make).toLowerCase() ||
      v.model.toLowerCase() !== decodeURIComponent(params.model).toLowerCase()
    ) {
      throw notFound();
    }

    return v;
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Vehicle Unavailable | AutoEx" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const v = loaderData;
    const title = `${vehicleName(v)} ${v.subtitle} for sale in Irving, TX | AutoEx`;

    const desc = `${vehicleName(v)} ${v.trim} — ${fmtMoney(v.price)}${
      v.mileage != null ? `, ${fmtNumber(v.mileage)} miles` : ""
    }, ${v.exteriorColor}. Available at AutoEx in Irving, TX.`;

    const img =
      v.photos[0] && !v.comingSoon
        ? photoUrl(v.photos[0], "1280x960")
        : null;

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        ...(img
          ? [
              { property: "og:image", content: img },
              { name: "twitter:image", content: img },
            ]
          : []),
      ],
    };
  },

  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-bold">
        This vehicle is no longer available
      </h1>
      <p className="mt-2 text-muted-foreground">
        It may have been sold. Browse the rest of our inventory below.
      </p>
      <Link
        to="/inventory"
        className="mt-6 inline-block rounded-[3px] bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary-deep"
      >
        View Inventory
      </Link>
    </div>
  ),

  component: VehicleDetailsPage,
});

function VehicleDetailsPage() {
  const { vin } = Route.useParams();
  const { data: v } = useSuspenseQuery(vehicleByVinQuery(vin));
  const name = vehicleName(v);

  return (
    <>
      <VdpHeader v={v} />

      <div className="container-site py-0 lg:max-w-[1500px] lg:px-12 2xl:px-[10.5rem]">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(320px,440px)]">
          <div className="min-w-0 pt-0">
            <div className="lg:-mt-px">
              <PhotoGallery
                photos={v.photos}
                alt={`${name} for sale in Irving, TX`}
              />
            </div>

            <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="animate-fade-up">
                <h2 className="font-display text-3xl font-bold leading-tight">
                  {name}
                </h2>
                <p className="font-display text-xl font-bold uppercase">
                  {v.subtitle}
                </p>
              </div>

              <div className="animate-fade-up text-left [animation-delay:150ms] sm:text-right">
                <p className="text-sm font-bold">Price</p>
                <Price
                  value={v.price}
                  className="text-[2.1rem] font-bold leading-none"
                />
                {v.mileage != null && (
                  <p className="mt-2">{fmtNumber(v.mileage)} miles</p>
                )}
              </div>
            </div>

            <PriceBreakdown price={v.price} className="mt-3" />

            <div className="mt-10 grid gap-12 md:grid-cols-2">
              <VehicleInfo v={v} />
              <div>
                <Description v={v} />
                <Features v={v} />
              </div>
            </div>

            <InfoStrip v={v} />
            <EngineSection v={v} />
            <StandardSpecs v={v} />
            <CrashRatings v={v} />
            <Awards v={v} />
            <SafetyEquipment v={v} />
            <GreenScores v={v} />

            <div className="h-10" />
          </div>

          <div className="pb-12 pt-6 lg:pt-6">
            <VehicleSidebar v={v} />
          </div>
        </div>
      </div>
    </>
  );
}
