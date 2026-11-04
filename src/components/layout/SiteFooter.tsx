import { Link } from "@tanstack/react-router";
import { MapPin, PhoneCall } from "lucide-react";
import { MapEmbed } from "@/components/common/MapEmbed";
import { Reveal } from "@/components/common/Reveal";
import { FOOTER_LINKS, IMAGES, SITE } from "@/config/site";
import { BusinessHoursList } from "./BusinessHoursList";

function FooterMain() {
  return (
    <section className="bg-footer py-16 text-ink-foreground">
      <div className="container-site grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5 lg:col-span-4">
          <img src={IMAGES.logo} alt="AutoEx" width={240} height={80} loading="lazy" className="mb-4 ml-2 w-[240px]" />
          <p className="mb-3 flex items-center gap-1.5 text-lg leading-snug">
            <MapPin className="size-4 shrink-0 fill-ink-foreground text-ink-soft" />
            {SITE.address.street} | {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
          </p>
          <a href={SITE.phoneHref} className="mb-4 flex items-center gap-1.5 text-lg transition-colors hover:text-highlight">
            <PhoneCall className="size-4 shrink-0" />
            {SITE.phone}
          </a>
          <h2 className="mb-3 border-l-4 border-highlight pl-2 text-3xl font-bold">Business Hours</h2>
          <BusinessHoursList />
        </Reveal>

        <Reveal className="md:col-span-3 lg:col-span-3 lg:col-start-6" delay={120}>
          <h5 className="mb-4 text-xl font-bold uppercase">Useful Links</h5>
          <nav aria-label="Footer">
            {FOOTER_LINKS.map((l) => {
              const cls = "mb-2.5 block w-fit font-bold transition-all duration-300 hover:translate-x-1 hover:text-highlight";
              return (
                <Link key={l.label} to={l.to} className={cls}>
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </Reveal>

        <Reveal className="md:col-span-4 lg:col-span-4" delay={240}>
          <h5 className="mb-4 text-xl font-bold uppercase">Find Us</h5>
          <MapEmbed className="h-[250px] w-full" />
        </Reveal>
      </div>
    </section>
  );
}

function FooterBottom() {
  const year = new Date().getFullYear();
  return (
    <section className="border-t border-ink-foreground/30 bg-primary py-5 text-primary-foreground">
      <div className="container-site flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          {/* <p className="text-[13px] font-bold">
            © {year} Powered by Carsforsale.com<sup>™</sup>
          </p> */}
          <p className="mt-3 text-[9px]">
            By placing calls, you agree to the{" "}
            <Link to="/terms-and-conditions" className="underline">
              Terms and Conditions of Use
            </Link>
            .
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] font-bold" aria-label="Legal">
          <Link to="/sitemap" className="hover:underline">
            Sitemap
          </Link>
          <Link to="/terms-and-conditions" className="hover:underline">
            Terms &amp; Conditions
          </Link>
          <a href={SITE.accountLoginUrl} target="_blank" rel="nofollow noreferrer" className="hover:underline">
            Account Login
          </a>
        </nav>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <FooterMain />
      <FooterBottom />
    </footer>
  );
}
