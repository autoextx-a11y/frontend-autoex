import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { fmtMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PriceBreakdown({ price, className }: { price: number | null; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("border border-border bg-background", className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3.5 py-3 text-left text-sm font-bold transition-colors hover:text-primary"
      >
        View Price Breakdown
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
      </button>
      <div className={cn("grid transition-all duration-400 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-1.5 border-t border-border px-3.5 pb-3 pt-2.5 text-sm">
            <div className="flex justify-between">
              <span>Vehicle Price</span>
              <span>{fmtMoney(price)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-1.5 font-bold">
              <span>Price</span>
              <span>{fmtMoney(price)}</span>
            </div>
            <p className="pt-1 text-xs text-muted-foreground">Price excludes tax, title, and registration fees.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
