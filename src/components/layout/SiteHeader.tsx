import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IMAGES, NAV_LINKS, SITE } from "@/config/site";
import { cn } from "@/lib/utils";

function TopBar() {
  return (
    <div className="bg-ink-soft text-ink-foreground">
      <div className="container-site flex items-center justify-between py-2.5 text-xs xl:text-sm">
        <p className="uppercase">
          Welcome to <span className="font-bold">AutoEx</span>
        </p>
        <p className="hidden items-center sm:flex">
          <a href={SITE.phoneHref} className="transition-colors hover:text-highlight">
            {SITE.phone}
          </a>
          <span className="px-4">|</span>
          <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-highlight">
            {SITE.email}
          </a>
        </p>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-[var(--shadow-header)]">
      <TopBar />
      <nav className="bg-primary text-primary-foreground" aria-label="Main">
        <div
          className={cn(
            "container-site flex items-center justify-between transition-all duration-300",
            scrolled ? "py-1.5" : "py-2.5",
          )}
        >
          <Link to="/" className="block shrink-0" aria-label="AutoEx home" onClick={() => setOpen(false)}>
            <img
              src={IMAGES.logo}
              alt="AutoEx"
              width={180}
              height={60}
              className={cn(
                "h-auto drop-shadow-[0_2px_3px_oklch(0_0_0/0.45)] transition-all duration-300",
                scrolled ? "w-[140px]" : "w-[150px] lg:w-[180px]",
              )}
            />
          </Link>

          <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
            {NAV_LINKS.map((l) => {
              const cls = "nav-underline text-sm font-bold leading-5 transition-opacity hover:opacity-90";
              return (
                <li key={l.label}>
                  <Link to={l.to} activeOptions={{ exact: l.to === "/" }} className={cls}>
                      {l.label}
                    </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="rounded p-2 transition-colors hover:bg-primary-deep lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-7" /> : <Menu className="size-7" />}
          </button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden transition-all duration-500 lg:hidden",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <ul className="min-h-0 container-site">
            {NAV_LINKS.map((l, i) => (
              <li
                key={l.label}
                className={cn("border-t border-primary-foreground/20", open && "animate-slide-left")}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "text-ink" }}
                    className="block py-3 text-center font-bold"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
