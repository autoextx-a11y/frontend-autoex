import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/common/Reveal";
import { PRICE_TIERS } from "@/config/site";

export function SearchByPrice() {
  return (
    <section className="bg-price-band pb-12 pt-16 text-ink-foreground">
      <div className="container-site grid items-center gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-2">
          <h2 className="text-[2rem] font-bold uppercase leading-none">
            Search by <span className="block text-[2.5rem] font-bold text-primary">Price</span>
          </h2>
          <p className="mt-3 leading-relaxed">Find your ideal car within your budget! Begin shopping today!</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3 lg:col-span-10">
          {PRICE_TIERS.map((t, i) => (
            <Reveal key={t.label} delay={i * 140} className="group">
              <div className="flex items-center justify-center gap-2">
                <img
                  src={t.image}
                  alt={`Vehicles under ${t.label}`}
                  width={320}
                  height={240}
                  loading="lazy"
                  className="h-auto w-[55%] max-w-[180px] transition-transform duration-500 group-hover:-translate-x-1 group-hover:scale-105 group-hover:animate-float"
                />
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase opacity-90">shop under</span>
                  <span className="font-display text-[2.1rem] font-bold leading-tight xl:text-5xl">
                    <sup className="-top-3 text-[0.6em]">$</sup>
                    {t.label}
                  </span>
                </div>
              </div>
              <Link
                to="/inventory"
                search={{ maxPrice: t.max }}
                className="btn-shine mt-3 block bg-primary px-4 py-2.5 text-center text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-[var(--shadow-glow)]"
              >
                Browse Vehicles Under {t.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
