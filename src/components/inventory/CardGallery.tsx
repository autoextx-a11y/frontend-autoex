import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { photoUrl, vehicleName, vehicleDetailsUrl, type VehicleSummary } from "@/lib/vehicle-types";
import { cn } from "@/lib/utils";
import { ComingSoonImage } from "@/components/vehicle/ComingSoonImage";

/** Swipeable photo strip on each inventory card. */
export function CardGallery({ v }: { v: VehicleSummary }) {
  const [idx, setIdx] = useState(0);
  const [failedPhotos, setFailedPhotos] = useState<Set<string>>(() => new Set());

  // Remove empty photo values.
  const photos = (v.photos ?? []).filter(
    (p): p is string => typeof p === "string" && p.trim().length > 0,
  );

  const photoKey = photos.join("|");

  // Reset gallery state when the vehicle photos change.
  useEffect(() => {
    setIdx(0);
    setFailedPhotos(new Set());
  }, [photoKey]);

  const allPhotosFailed = photos.length > 0 && photos.every((p) => failedPhotos.has(p));

  const hasPhotos = photos.length > 0 && !allPhotosFailed;
  const many = photos.length > 1;

  const go = (d: number) => {
    setIdx((i) => (i + d + photos.length) % photos.length);
  };

  // Local images must not be sent through the CarsForSale CDN helper.
  const getPhotoSrc = (path: string) => {
    if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    return photoUrl(path, "800x600");
  };

  return (
    <div className="group/gal relative overflow-hidden bg-muted">
      <Link to={vehicleDetailsUrl(v)} className="relative block aspect-[4/3] overflow-hidden">
        {!hasPhotos ? (
          <ComingSoonImage />
        ) : (
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {photos.map((p, i) => (
              <div key={`${p}-${i}`} className="relative h-full w-full shrink-0">
                {failedPhotos.has(p) ? (
                  <ComingSoonImage />
                ) : (
                  <img
                    src={getPhotoSrc(p)}
                    alt={`${vehicleName(v)} for sale in Irving, TX`}
                    width={480}
                    height={360}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                    onError={() => {
                      setFailedPhotos((current) => {
                        const next = new Set(current);
                        next.add(p);
                        return next;
                      });
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Link>

      {hasPhotos && many && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-ink-foreground opacity-0 transition-all duration-300 hover:bg-primary group-hover/gal:opacity-100"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-ink-foreground opacity-0 transition-all duration-300 hover:bg-primary group-hover/gal:opacity-100"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {photos.map((p, i) => (
              <button
                key={`${p}-${i}`}
                type="button"
                aria-label={`Show photo ${i + 1}`}
                onClick={() => setIdx(i)}
                className={cn(
                  "size-1.5 rounded-full transition-all duration-300",
                  i === idx ? "w-4 bg-primary" : "bg-highlight/70 hover:bg-primary",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
