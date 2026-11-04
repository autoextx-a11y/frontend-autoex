import { useState } from "react";
import { ConsentNote } from "@/components/common/ConsentNote";
import { Button } from "@/components/ui/button";
import type { LeadInput } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";
import { maskPhone } from "./Fields";
import { useLeadSubmit } from "./useLeadSubmit";

/** Name / email / phone / trade-in / message form used on vehicle pages and modals. */
export function QuickMessageForm({
  form = "vehicle-message",
  vehicleId,
  defaultMessage,
  submitLabel = "Send Message",
  className,
}: {
  form?: LeadInput["form"];
  vehicleId?: string | undefined;
  defaultMessage?: string | undefined;
  submitLabel?: string;
  className?: string;
}) {
  const { onSubmit, status } = useLeadSubmit(form, vehicleId);
  const [trade, setTrade] = useState(false);
  const input = "field h-12 text-base";

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3", className)}>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="firstName" required placeholder="First Name *" aria-label="First Name" className={input} />
        <input name="lastName" required placeholder="Last Name *" aria-label="Last Name" className={input} />
        <input name="email" type="email" required placeholder="Email *" aria-label="Email" className={input} />
        <input name="phone" required placeholder="Phone *" aria-label="Phone" maxLength={14} onInput={maskPhone} className={input} />
      </div>
      <label className="flex cursor-pointer items-center gap-3 text-sm">
        <input type="checkbox" name="hasTradeIn" value="Yes" checked={trade} onChange={(e) => setTrade(e.target.checked)} className="size-5 accent-primary" />
        Do you have a trade-in?
      </label>
      <div className={cn("grid overflow-hidden transition-all duration-500", trade ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="grid min-h-0 gap-3 sm:grid-cols-2">
          {["Year", "Make", "Model", "Mileage", "Color", "VIN"].map((f) => (
            <input key={f} name={`tradeIn${f}`} placeholder={f} aria-label={`Trade-in ${f}`} className={input} disabled={!trade} />
          ))}
        </div>
      </div>
      <textarea
        name="message"
        rows={4}
        defaultValue={defaultMessage}
        aria-label="Message"
        className="field min-h-[110px] resize-y text-base"
      />
      <Button type="submit" variant="brand" className="h-11 w-full text-base" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : submitLabel}
      </Button>
      {status === "sent" && (
        <p className="animate-fade-in text-sm text-primary">
          Thank you for reaching out to us! We appreciate your inquiry and will get back to you as soon as possible.
        </p>
      )}
      <ConsentNote variant="message" />
    </form>
  );
}
