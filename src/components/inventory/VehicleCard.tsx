
import { Link } from "@tanstack/react-router";
import { CarfaxBadge } from "@/components/common/CarfaxBadge";
import { Price } from "@/components/common/Price";
import { Button } from "@/components/ui/button";
import { LINKS, SITE } from "@/config/site";
import { fmtNumber } from "@/lib/format";
import {
  vehicleName,
  vehicleDetailsUrl,
  type VehicleSummary,
} from "@/lib/vehicle-types";
import { CardGallery } from "./CardGallery";
import { PriceBreakdown } from "./PriceBreakdown";

export function VehicleCard({
  v,
  onMessage,
}: {
  v: VehicleSummary;
  onMessage: (v: VehicleSummary) => void;
}) {
  const rows = [
    ["Engine", v.engine],
    ["Transmission", v.transmission],
    ["Drivetrain", v.drivetrain],
    ["Ext. Color", v.exteriorColor],
  ] as const;

  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <CardGallery v={v} />

      <div className="flex flex-1 flex-col px-4 pb-2 pt-2">
        <Link to={vehicleDetailsUrl(v)} className="block text-center">
          <h2 className="font-display text-[1.45rem] font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
            {vehicleName(v)}
          </h2>
          <p className="min-h-6 text-lg text-muted-foreground">{v.trim}</p>
        </Link>

        <div className="mt-6 grid grid-cols-2 border border-border px-2 py-3 text-center">
          <div className="border-r border-border">
            <p className="text-xs font-bold uppercase">Price</p>
            <Price value={v.price} className="text-2xl font-bold" />
          </div>

          <div>
            <p className="text-xs">Mileage</p>
            <p className="text-sm font-semibold">
              {v.mileage == null ? "Coming Soon" : fmtNumber(v.mileage)}
            </p>
          </div>
        </div>

        <PriceBreakdown price={v.price} className="mt-5" />

        <ul className="mt-3 flex-1 text-sm">
          {rows.map(([k, val]) => (
            <li
              key={k}
              className="flex justify-between gap-4 border-b border-border py-2.5"
            >
              <span>{k}:</span>
              <span className="text-right font-bold">{val}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 px-4 pb-4 pt-3">
        <div className="w-[82px] shrink-0">
          <CarfaxBadge href={v.carfaxUrl} />
        </div>

        <div className="grid flex-1 grid-cols-3 gap-2">
          <Button asChild variant="brand" className="h-11 px-1 text-xs">
            <a href={SITE.phoneHref}>Call</a>
          </Button>

          <Button
            type="button"
            variant="brand"
            className="h-11 px-1 text-xs"
            onClick={() => onMessage(v)}
          >
            Message
          </Button>

          <Button asChild variant="brand" className="h-11 px-1 text-xs">
            <a href={LINKS.loanApplication(v.id)}>Apply Now</a>
          </Button>
        </div>
      </div>
    </article>
  );
}
