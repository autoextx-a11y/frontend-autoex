import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/config/site";
import type { VehicleSummary } from "@/lib/vehicle-types";
import { HeroSearch } from "./HeroSearch";

export function HeroSection({ vehicles }: { vehicles: VehicleSummary[] }) {
  return (
    <section className="relative">
      {/* Search panel floats over the hero on large screens, sits above it on small ones */}
      <div className="bg-ink-soft py-4 sm:pt-6 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:bg-transparent lg:pt-14">
        <div className="container-site lg:max-w-[1140px] 2xl:max-w-[1320px]">
          <HeroSearch vehicles={vehicles} />
        </div>
      </div>

      <div className="bg-hero relative z-[4] pb-24 pt-16 sm:pt-20 lg:min-h-[500px]">
        <div className="container-site relative z-[2] text-ink-foreground">
          <div className="max-w-[560px] lg:w-1/2 xl:w-5/12">
            <img
              src={IMAGES.heroLogo}
              alt="AutoEx"
              width={960}
              height={200}
              className="animate-slide-left h-auto w-full drop-shadow-[0_6px_10px_oklch(0_0_0/0.5)]"
            />
            <h1 className="animate-fade-up mt-3 text-[1.35rem] font-bold uppercase leading-tight [animation-delay:200ms] sm:text-2xl">
              Your Next Drive Starts Here
            </h1>
            <p className="animate-fade-up mt-1 text-[0.95rem] [animation-delay:350ms]">
              Quality Vehicles. Great Prices. Exceptional Service.
            </p>
            <div className="animate-fade-up mt-3 flex flex-wrap gap-2 [animation-delay:500ms]">
              <Button asChild variant="brand" className="px-4">
                <Link to="/inventory">View Inventory</Link>
              </Button>
              <Button asChild variant="brandDeep" className="px-4">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Angled orange / charcoal divider */}
        <div className="absolute inset-x-0 -bottom-px z-[1]">
          <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="block h-[min(8vw,100px)] w-full">
            <polygon points="0 0 500 90 1000 0 1000 99 0 99 0 0" className="fill-primary" />
            <polygon points="0 7 500 90 1000 7 1000 100 0 100 0 7" className="fill-ink" />
          </svg>
        </div>
      </div>
    </section>
  );
}
