import { Link } from "@tanstack/react-router";
import { FileText, Handshake, Link2, Mail, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageDialog } from "@/components/forms/MessageDialog";
import { LINKS, SITE } from "@/config/site";
import { vehicleName, type Vehicle } from "@/lib/vehicle-types";
import { OpenBadge } from "./VehicleSidebar";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
      <path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.8 2.3h7l4.8 6.4 5.6-6.4Zm-1.2 17.9h1.9L7.1 4.2H5.1l11.9 16Z" />
    </svg>
  );
}

const action =
  "btn-shine flex h-11 items-center justify-center gap-1.5 rounded-[3px] bg-primary px-3 text-xs text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[var(--shadow-glow)]";

export function VdpHeader({ v }: { v: Vehicle }) {
  const name = vehicleName(v);
  const [msg, setMsg] = useState(false);
  const [share, setShare] = useState("");
  useEffect(() => setShare(window.location.href), []);

  return (
    <section className="border-b border-border pb-9 pt-3 shadow-[0_6px_10px_-8px_oklch(0_0_0/0.25)]">
      <div className="container-site lg:max-w-[1500px] lg:px-12 2xl:px-[10.5rem]">
        <nav aria-label="Breadcrumb" className="mb-3 text-sm">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="px-2 text-muted-foreground">/</span>
          <Link to="/inventory" className="hover:text-primary">Inventory</Link>
          <span className="px-2 text-muted-foreground">/</span>
          <Link to="/inventory" search={{ make: [v.make] }} className="hover:text-primary">{v.make}</Link>
          <span className="px-2 text-muted-foreground">/</span>
          <span>{v.model}</span>
        </nav>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="animate-fade-up">
            <h1 className="font-display text-3xl font-bold md:text-[2.15rem]">{name}</h1>
            <p className="mt-1 text-base">{v.subtitle}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <OpenBadge />
            <div className="flex items-center gap-3 text-xs">
              SHARE:
              <a aria-label="Share on Facebook" target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share)}`} className="transition-colors hover:text-primary">
                <FacebookIcon />
              </a>
              <a aria-label="Share on X" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(share)}&text=${encodeURIComponent(name)}`} className="transition-colors hover:text-primary">
                <XIcon />
              </a>
              <a aria-label="Share by email" href={`mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(share)}`} className="transition-colors hover:text-primary">
                <Mail className="size-4" />
              </a>
              <button
                type="button"
                aria-label="Copy link"
                className="transition-colors hover:text-primary"
                onClick={() => {
                  void navigator.clipboard?.writeText(window.location.href);
                  toast.success("Link copied");
                }}
              >
                <Link2 className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-1.5 sm:flex">
          <a href={SITE.phoneHref} className={`${action} sm:w-[150px]`}>
            <Phone className="size-3.5" /> {SITE.phone}
          </a>
          <button type="button" onClick={() => setMsg(true)} className={`${action} sm:w-[150px]`}>
            <MessageSquare className="size-3.5" /> Message Us
          </button>
          <a href={LINKS.valueYourTrade} className={`${action} sm:w-[150px]`}>
            <Handshake className="size-3.5" /> Value Your Trade
          </a>
          <a href={LINKS.loanApplication(v.id)} className={`${action} sm:w-[150px]`}>
            <FileText className="size-3.5" /> Get Approved
          </a>
        </div>
      </div>
      <MessageDialog
        open={msg}
        onOpenChange={setMsg}
        title="Message Us"
        vehicleId={v.id}
        defaultMessage={`Could you provide more information about this ${name}?`}
      />
    </section>
  );
}
