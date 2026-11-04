import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function PageBtn({
  children,
  onClick,
  disabled,
  active,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid h-9 min-w-9 place-items-center px-2 text-sm transition-all duration-300",
        active ? "bg-primary font-bold text-primary-foreground shadow-[var(--shadow-glow)]" : "hover:bg-muted hover:text-primary",
        disabled && "pointer-events-none opacity-40",
      )}
    >
      {children}
    </button>
  );
}

export function InventoryPagination({
  page,
  totalPages,
  from,
  to,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => totalPages <= 7 || Math.abs(p - page) <= 2 || p === 1 || p === totalPages,
  );
  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex flex-wrap items-center gap-1">
        <PageBtn label="Go to the first page" disabled={page === 1} onClick={() => onPage(1)}>
          <span className="flex">
            <ArrowLeft className="size-4" />
            <ArrowLeft className="-ml-2 size-4" />
          </span>
        </PageBtn>
        <PageBtn label="Go to the previous page" disabled={page === 1} onClick={() => onPage(page - 1)}>
          <ArrowLeft className="size-4" />
        </PageBtn>
        {pages.map((p, i) => (
          <span key={p} className="flex items-center">
            {i > 0 && p - (pages[i - 1] ?? p) > 1 && <span className="px-1 text-muted-foreground">…</span>}
            <PageBtn label={String(p)} active={p === page} onClick={() => onPage(p)}>
              {p}
            </PageBtn>
          </span>
        ))}
        <PageBtn label="Go to the next page" disabled={page === totalPages} onClick={() => onPage(page + 1)}>
          <ArrowRight className="size-4" />
        </PageBtn>
        <PageBtn label="Go to the last page" disabled={page === totalPages} onClick={() => onPage(totalPages)}>
          <span className="flex">
            <ArrowRight className="size-4" />
            <ArrowRight className="-ml-2 size-4" />
          </span>
        </PageBtn>
      </div>
      <p className="text-sm md:mr-3">
        Showing <span className="font-bold">{from}</span> - <span className="font-bold">{to}</span> of{" "}
        <span className="font-bold">{total}</span> Results
      </p>
    </nav>
  );
}
