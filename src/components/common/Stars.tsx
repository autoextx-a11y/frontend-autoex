import { Star } from "lucide-react";

export function Stars({ count, max = 5, size = 16 }: { count: number; max?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < count ? "fill-star text-star" : "fill-muted text-muted"}
        />
      ))}
    </span>
  );
}
