import { cn } from "@/lib/utils";

/** "SHOW ME THE CARFAX" badge drawn inline so it always renders. */
export function CarfaxBadge({ href, className }: { href: string | null; className?: string }) {
  const badge = (
    <svg viewBox="0 0 190 64" role="img" aria-label="Show me the CARFAX" className={cn("h-auto w-full", className)}>
      <text x="4" y="24" fontFamily="Arial Narrow, Arial, sans-serif" fontWeight="900" fontSize="24" fill="currentColor" letterSpacing="-0.5">
        SHOW
      </text>
      <text x="74" y="24" fontFamily="Arial Narrow, Arial, sans-serif" fontWeight="400" fontSize="24" fill="currentColor" letterSpacing="-0.5">
        ME THE
      </text>
      <rect x="2" y="30" width="176" height="30" rx="2" fill="currentColor" />
      <rect x="5" y="33" width="170" height="24" rx="1" fill="none" stroke="var(--background)" strokeWidth="1.5" />
      {"CARFA".split("").map((ch, i) => (
        <text
          key={i}
          x={12 + i * 30}
          y="53"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="20"
          fill="var(--background)"
        >
          {ch}
        </text>
      ))}
      <rect x="150" y="35" width="26" height="22" fill="var(--background)" />
      <text x="153" y="54" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="20" fill="currentColor">
        X
      </text>
      <text x="180" y="34" fontSize="7" fill="currentColor">
        ®
      </text>
    </svg>
  );
  if (!href) return <span className="block text-ink">{badge}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="block text-ink transition-transform duration-300 hover:scale-105"
      aria-label="View CARFAX report"
    >
      {badge}
    </a>
  );
}
