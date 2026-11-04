
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Price } from "@/components/common/Price";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { fmtNumber } from "@/lib/format";
import {
  photoUrl,
  vehicleName,
  vehicleDetailsUrl,
  type VehicleSummary,
} from "@/lib/vehicle-types";

function FeaturedCard({ v }: { v: VehicleSummary }) {
  const rows = [
    ["Engine", v.engine],
    ["Transmission", v.transmission],
    ["Drivetrain", v.drivetrain],
    ["Ext. Color", v.exteriorColor],
  ] as const;

  const cover = v.photos[0];
  const detailsUrl = vehicleDetailsUrl(v);

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      <Link
        to={detailsUrl as "/inventory/$make/$model/$vin"}
        className="block overflow-hidden bg-muted"
      >
        {cover && (
          <img
            src={photoUrl(cover, "800x600")}
            alt={`${vehicleName(v)} for sale at AutoEx in Irving, TX`}
            width={640}
            height={480}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-3 pt-3">
        <Link
          to={detailsUrl as "/inventory/$make/$model/$vin"}
          className="text-center"
        >
          <h3 className="font-display text-lg font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
            {vehicleName(v)}
          </h3>

          <p className="min-h-5 text-xs text-muted-foreground">
            {v.trim}
          </p>
        </Link>

        <div className="mx-2 mt-2 grid grid-cols-2 bg-primary py-1.5 text-center text-primary-foreground">
          <div className="border-r border-primary-foreground/60">
            <p className="text-[10px]">Price</p>
            <Price value={v.price} className="text-base font-bold" />
          </div>

          <div>
            <p className="text-[10px]">Mileage</p>
            <p className="text-base font-bold">
              {v.mileage == null ? "Coming Soon" : fmtNumber(v.mileage)}
            </p>
          </div>
        </div>

        <dl className="mt-3 flex-1 px-2 text-[11px]">
          {rows.map(([k, val]) => (
            <div
              key={k}
              className="flex justify-between gap-3 border-b border-border/70 py-2"
            >
              <dt>{k}</dt>
              <dd className="text-right font-semibold">
                {val || "Coming Soon"}
              </dd>
            </div>
          ))}
        </dl>

        <Button asChild variant="brand" className="mx-2 mt-4 h-10">
          <Link to={detailsUrl as "/inventory/$make/$model/$vin"}>
            View Details
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function FeaturedVehicles({
  vehicles,
}: {
  vehicles: VehicleSummary[];
}) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla || paused || vehicles.length <= 1) return;

    const timer = window.setInterval(() => {
      embla.scrollNext();
    }, 4500);

    return () => window.clearInterval(timer);
  }, [embla, paused, vehicles.length]);

  return (
    <section className="pb-20 pt-16">
      <div className="container-site">
        <Reveal className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2>
              <span className="block font-sans text-2xl font-normal uppercase">
                Featured
              </span>
              <span className="block text-[2.5rem] font-extrabold uppercase leading-[0.9] md:text-5xl">
                Vehicles
              </span>
            </h2>

            <p className="mt-3 text-sm leading-relaxed">
              Explore our featured vehicles, where you’ll find the best deals
              on the latest models and popular makes. From sleek sedans to
              powerful trucks, our featured vehicles offer exceptional value
              and quality that you won’t find anywhere else.
            </p>
          </div>

          <Button asChild variant="brand" className="w-fit">
            <Link to="/inventory">View All Inventory</Link>
          </Button>
        </Reveal>

        <Reveal className="relative px-6" delay={150}>
          <div
            className="overflow-hidden"
            ref={emblaRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="-ml-2 flex">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <FeaturedCard v={v} />
                </div>
              ))}
            </div>
          </div>

          {vehicles.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous vehicles"
                className="absolute left-0 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-125"
              >
                <ChevronLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next vehicles"
                className="absolute right-0 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-125"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
