import { useEffect, useState } from "react";
import { BUSINESS_HOURS } from "@/config/site";
import { dealershipNow } from "@/lib/hours";
import { cn } from "@/lib/utils";

/** Weekly hours; today's row is bolded once the page is live in the browser. */
export function BusinessHoursList({ tone = "dark", suffix = " CDT" }: { tone?: "dark" | "light"; suffix?: string }) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(dealershipNow().day), []);

  return (
    <ul className="text-[0.85rem] leading-[2]">
      {BUSINESS_HOURS.map((h, i) => (
        <li
          key={h.day}
          className={cn(
            "flex justify-between border-b",
            tone === "dark" ? "border-ink-foreground/80" : "border-border py-2",
            today === i && "font-bold",
          )}
        >
          <span>{h.day}</span>
          <span>{h.open ? `${h.open} - ${h.close}${suffix}` : "Closed"}</span>
        </li>
      ))}
    </ul>
  );
}
