import { Link } from "@tanstack/react-router";
import { DollarSign, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

type Card = {
  icon: ReactNode;
  title: [string, string];
  copy: string;
  cta: string;
  to: "/loan-application" | "/value-your-trade" | "/shopping-request";
  dark?: boolean;
};

const CARDS: Card[] = [
  {
    icon: <DollarSign className="size-8" strokeWidth={2.5} />,
    title: ["Easy", "Financing"],
    copy: "Fast, Easy and Simple financing available today at AutoEx.",
    cta: "Apply Now",
    to: "/loan-application",
  },
  {
    icon: <DollarSign className="size-8" strokeWidth={2.5} />,
    title: ["Value My", "Trade"],
    copy: "With many years of combined experience, our trained sales and service staff are here to answer any questions you may have.",
    cta: "Learn More",
    to: "/value-your-trade",
    dark: true,
  },
  {
    icon: <Search className="size-8" strokeWidth={2.5} />,
    title: ["Shopping", "Request"],
    copy: "Not seeing the car you're looking for? No Worries! Just let us know what you are looking for and we will help you on your search.",
    cta: "Shop For Me",
    to: "/shopping-request",
  },
];

export function BetterWay() {
  return (
    <section>
      <div className="bg-parallax h-[300px] pt-12 text-center text-ink-foreground">
        <Reveal className="px-4">
          <h3 className="text-2xl font-bold uppercase">Better Way To Find Your Car</h3>
          <p className="mt-2 text-sm">At AutoEx, we make car buying easy with our clearly marked lowest price right up front.</p>
        </Reveal>
      </div>
      <div className="container-site mb-12 mt-5 md:-mt-[150px]">
        <div className="mx-auto flex flex-wrap items-stretch justify-center">
          {CARDS.map((c, i) => (
            <Reveal key={c.cta} delay={i * 150} className="w-full px-3 sm:w-1/2 xl:w-1/4">
              <div
                className={cn(
                  "group mb-5 flex h-[calc(100%-20px)] flex-col overflow-hidden rounded-[6px] px-2 py-4 text-center shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]",
                  c.dark ? "bg-card-dark text-ink-foreground" : "bg-card-light text-ink",
                )}
              >
                <div className="flex-1 px-2">
                  <div className="mx-auto mb-2 w-fit transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                    {c.icon}
                  </div>
                  <h4 className="font-display text-xl font-semibold uppercase leading-tight xl:text-[1.35rem]">
                    {c.title[0]}
                    <br />
                    {c.title[1]}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed">{c.copy}</p>
                </div>
                <div className="pb-2 pt-5">
                  <Link
                    to={c.to}
                    className={cn(
                      "btn-shine inline-block rounded-[8px] px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5",
                      c.dark ? "bg-primary" : "bg-primary-deep",
                    )}
                  >
                    {c.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
