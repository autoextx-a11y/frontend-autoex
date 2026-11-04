import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Content clipped to `height` with a fade and a "Show More / Show Less" toggle. */
export function ShowMore({ children, height = 300 }: { children: ReactNode; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [needed, setNeeded] = useState(true);
  const [full, setFull] = useState(height);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      setFull(el.scrollHeight);
      setNeeded(el.scrollHeight > height + 10);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  return (
    <div>
      <div
        ref={ref}
        className={cn("overflow-hidden transition-[max-height] duration-700 ease-in-out", needed && !open && "fade-bottom")}
        style={{ maxHeight: needed ? (open ? full : height) : undefined }}
      >
        {children}
      </div>
      {needed && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="mt-2 font-bold text-primary transition-colors hover:text-primary-deep">
          {open ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="section-heading font-sans">{children}</h2>;
}
