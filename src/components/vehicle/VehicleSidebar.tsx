import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { MapEmbed } from "@/components/common/MapEmbed";
import { MessageDialog } from "@/components/forms/MessageDialog";
import { QuickMessageForm } from "@/components/forms/QuickMessageForm";
import { BusinessHoursList } from "@/components/layout/BusinessHoursList";
import { LINKS, MAP_LINK_URL, SITE } from "@/config/site";
import { openStatus } from "@/lib/hours";
import { vehicleName, type Vehicle } from "@/lib/vehicle-types";
import { cn } from "@/lib/utils";
import { LoanCalculator } from "./LoanCalculator";

export function useOpenStatus() {
  const [s, setS] = useState<ReturnType<typeof openStatus> | null>(null);
  useEffect(() => setS(openStatus()), []);
  return s;
}

export function OpenBadge() {
  const s = useOpenStatus();
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className={cn("rounded-[2px] px-2.5 py-1 text-xs text-primary-foreground", s?.isOpen ? "bg-primary" : "bg-primary-deep")}>
        {s ? (s.isOpen ? "Open Now" : "Closed") : "Hours"}
      </span>
      {s?.todayLabel === "Closed" ? "10:00 am - 7:00 pm" : (s?.todayLabel ?? "10:00 am - 7:00 pm")}
    </span>
  );
}

const btn =
  "btn-shine block w-full bg-primary py-2.5 text-center font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[var(--shadow-glow)]";

export function VehicleSidebar({ v }: { v: Vehicle }) {
  const name = vehicleName(v);
  const [dialog, setDialog] = useState<null | "drop" | "offer" | "test">(null);
  const [hoursOpen, setHoursOpen] = useState(false);
  const titles = { drop: "Request Price Drop Alert", offer: "Make an Offer", test: "Schedule Test Drive" } as const;
  const messages = {
    drop: `Please let me know if the price drops on this ${name}.`,
    offer: `I would like to make an offer on this ${name}.`,
    test: `I would like to schedule a test drive for this ${name}.`,
  } as const;

  return (
    <aside className="animate-slide-right">
      <h2 className="section-heading font-sans text-[2rem]">Quick Connect</h2>
      <div className="space-y-2 px-2">
        <a href={LINKS.loanApplication(v.id)} className={btn}>
          Apply For Financing
        </a>
        <a href={LINKS.valueYourTrade} className={btn}>
          Free Trade In Quote
        </a>
        <button type="button" onClick={() => setDialog("drop")} className={btn}>
          Request Price Drop Alert
        </button>
        <button type="button" onClick={() => setDialog("offer")} className={btn}>
          Make an Offer
        </button>
      </div>

      <div className="mt-6 rounded-[10px] border border-border bg-panel p-5">
        <QuickMessageForm vehicleId={v.id} defaultMessage={`Could you provide more information about this ${name}?`} />
      </div>

      <h2 className="section-heading mt-6 font-sans text-[2rem]">Dealership Info</h2>
      <p className="font-bold">{SITE.name}</p>
      <p>{SITE.address.street}</p>
      <p>
        {SITE.address.city} {SITE.address.state}, {SITE.address.zip}
      </p>
      <button type="button" onClick={() => setHoursOpen((o) => !o)} aria-expanded={hoursOpen} className="mt-3 flex items-center gap-1">
        <OpenBadge />
        <ChevronDown className={cn("size-5 transition-transform duration-300", hoursOpen && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all duration-500", hoursOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="min-h-0 overflow-hidden">
          <div className="pt-3">
            <BusinessHoursList tone="light" suffix="" />
          </div>
        </div>
      </div>
      <div className="relative mt-4">
        <MapEmbed className="h-[200px] w-full" />
        <a
          href={MAP_LINK_URL}
          target="_blank"
          rel="noreferrer"
          className="absolute left-2 top-2 inline-flex items-center gap-1 bg-background px-2 py-1 text-sm text-link shadow"
        >
          Open in Maps <ExternalLink className="size-3.5" />
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2">
        <a href={SITE.phoneHref} className={btn}>
          {SITE.phone}
        </a>
        <button type="button" onClick={() => setDialog("test")} className={btn}>
          Schedule Test Drive
        </button>
      </div>

      <LoanCalculator price={v.price} vehicleId={v.id} />

      <MessageDialog
        open={dialog != null}
        onOpenChange={(o) => !o && setDialog(null)}
        title={dialog ? titles[dialog] : ""}
        vehicleId={v.id}
        defaultMessage={dialog ? messages[dialog] : undefined}
      />
    </aside>
  );
}
