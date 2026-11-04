import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { photoUrl } from "@/lib/vehicle-types";
import { cn } from "@/lib/utils";

/** Main photo + 4 thumbnails grid; any photo opens a full-screen lightbox. */
export function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const count = photos.length;
  const extra = count - 5;

  const show = (i: number) => {
    setIdx(i);
    setOpen(true);
  };
  const go = useCallback((d: number) => setIdx((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const main = photos[0];
  const thumbs = photos.slice(1, 5);

  return (
    <>
      <div className={cn("grid gap-2", thumbs.length ? "md:grid-cols-2" : "")}>
        {main && (
          <button type="button" onClick={() => show(0)} className="group relative block overflow-hidden bg-muted" aria-label="Open photo gallery">
            <img
              src={photoUrl(main, "1280x960")}
              alt={alt}
              width={960}
              height={720}
              className="animate-fade-in aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </button>
        )}
        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {thumbs.map((p, i) => {
              const isLast = i === thumbs.length - 1 && extra > 0;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => show(i + 1)}
                  className="group relative block overflow-hidden bg-muted"
                  aria-label={isLast ? `View all ${count} photos` : `Open photo ${i + 2}`}
                >
                  <img
                    src={photoUrl(p, "800x600")}
                    alt={alt}
                    width={480}
                    height={360}
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {isLast && (
                    <span className="absolute inset-0 grid place-items-center bg-ink/55 font-display text-4xl font-bold text-ink-foreground transition-colors group-hover:bg-ink/35 md:text-5xl">
                      +{extra}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl border-0 bg-ink p-0 text-ink-foreground [&>button]:hidden">
          <DialogTitle className="sr-only">
            {alt} ({count})
          </DialogTitle>
          <div className="flex items-center justify-between px-4 py-3">
            <p className="font-display font-semibold">
              {alt} <span className="text-ink-foreground/60">({idx + 1} / {count})</span>
            </p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close gallery" className="rounded p-1 hover:bg-ink-soft">
              <X className="size-6" />
            </button>
          </div>
          <div className="relative">
            {photos[idx] && (
              <img key={idx} src={photoUrl(photos[idx], "1280x960")} alt={alt} className="animate-fade-in mx-auto max-h-[70vh] w-auto object-contain" />
            )}
            {count > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-primary transition-transform hover:scale-110">
                  <ChevronLeft />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-primary transition-transform hover:scale-110">
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto p-3">
            {photos.map((p, i) => (
              <button
                key={p}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Show photo ${i + 1}`}
                className={cn("shrink-0 border-2 transition-opacity", i === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100")}
              >
                <img src={photoUrl(p, "480x360")} alt="" loading="lazy" className="h-16 w-20 object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
