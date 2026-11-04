import { MAP_EMBED_URL } from "@/config/site";
import { cn } from "@/lib/utils";

export function MapEmbed({ className, title = "AutoEx location map" }: { className?: string; title?: string }) {
  return (
    <div className={cn("overflow-hidden bg-muted", className)}>
      <iframe
        title={title}
        src={MAP_EMBED_URL}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
