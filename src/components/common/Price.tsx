import { fmtNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Price with the small raised dollar sign used throughout the site. */
export function Price({ value, className }: { value: number | null; className?: string }) {
  if (value == null) return <span className={className}>Request Price</span>;
  return (
    <span className={cn("whitespace-nowrap", className)}>
      <sup className="mr-0.5 text-[0.55em] font-bold">$</sup>
      {fmtNumber(value)}
    </span>
  );
}
