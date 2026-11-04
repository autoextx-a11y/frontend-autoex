
// Content sections of the car details page (left column).
import { Fuel } from "lucide-react";
import { CarfaxBadge } from "@/components/common/CarfaxBadge";
import { Reveal } from "@/components/common/Reveal";
import { Stars } from "@/components/common/Stars";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/site";
import type { Vehicle } from "@/lib/vehicle-types";
import { cn } from "@/lib/utils";
import { SectionTitle, ShowMore } from "./Collapsible";

export function VehicleInfo({ v }: { v: Vehicle }) {
  // Display only information available from the API.
  const rows = [
    { label: "Year", value: v.year },
    { label: "Make", value: v.make },
    { label: "Model", value: v.model },
    { label: "Trim", value: v.trim },
    { label: "Engine", value: v.engine },
    { label: "Transmission", value: v.transmission },
    { label: "Drivetrain", value: v.drivetrain },
    { label: "Fuel", value: v.fuel },
    { label: "Exterior Color", value: v.exteriorColor },
    { label: "Interior Color", value: v.interiorColor },
    { label: "Body Style", value: v.bodyType },
    { label: "VIN", value: v.vin },
  ].filter((r) => r.value != null && String(r.value).trim() !== "");

  return (
    <Reveal>
      <SectionTitle>Vehicle Info</SectionTitle>
      <dl>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={cn(
              "flex items-center justify-between gap-4 rounded-[4px] px-5 py-4 transition-colors hover:bg-accent",
              i % 2 === 0 && "bg-panel",
            )}
          >
            <dt>{r.label}</dt>
            <dd className="text-right font-bold">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export function Description({ v }: { v: Vehicle }) {
  const paragraphs: string[][] = [[]];

  for (const line of v.description) {
    if (line === "") paragraphs.push([]);
    else paragraphs[paragraphs.length - 1]?.push(line);
  }

  const content = paragraphs.filter((p) => p.length);

  return (
    <Reveal>
      <SectionTitle>Description</SectionTitle>
      {content.length > 0 && (
        <ShowMore>
          <div className="space-y-5 leading-relaxed">
            {content.map((p, i) => (
              <p key={i}>
                {p.map((l, j) => (
                  <span key={j} className="block">
                    {l}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </ShowMore>
      )}
    </Reveal>
  );
}

export function Features({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-6">
      <SectionTitle>Features</SectionTitle>
      {v.features.length > 0 && (
        <ShowMore>
          {v.features.map((g) => (
            <div key={g.title} className="mb-3">
              <p className="font-bold">{g.title}</p>
              <ul className="bullet-list space-y-2.5 pt-1">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </ShowMore>
      )}
    </Reveal>
  );
}

export function InfoStrip({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-4 grid grid-cols-1 items-center gap-6 border-t border-border py-6 text-center sm:grid-cols-3 sm:divide-x sm:divide-border">
      {v.mpg ? (
        <div>
          <p>Fuel Economy</p>
          <div className="mt-1 flex items-center justify-center gap-8">
            <div>
              <p className="text-xs underline">City</p>
              <p className="text-xl">{v.mpg.city}</p>
            </div>
            <Fuel className="size-9" />
            <div>
              <p className="text-xs underline">Hwy</p>
              <p className="text-xl">{v.mpg.hwy}</p>
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}

      <div>
        <p>Financing Available</p>
        <Button asChild variant="brand" className="mt-1 h-11 px-12 text-base">
          <a href={LINKS.loanApplication(v.id)}>Apply Now!</a>
        </Button>
      </div>

      <div className="mx-auto w-[190px]">
        <CarfaxBadge href={v.carfaxUrl} />
      </div>
    </Reveal>
  );
}

function ThreeColList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list grid gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((it, i) => (
        <li key={`${it}-${i}`}>{it}</li>
      ))}
    </ul>
  );
}

export function EngineSection({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-4">
      <SectionTitle>Engine</SectionTitle>
      {v.engine && <p>{v.engine}</p>}
    </Reveal>
  );
}

export function StandardSpecs({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-6">
      <SectionTitle>Standard Specifications</SectionTitle>
      {v.standardSpecs.length > 0 && (
        <ShowMore>
          {v.standardSpecs.map((g) => (
            <div key={g.title} className="mb-6">
              <p className="mb-2 font-bold">{g.title}</p>
              <ThreeColList items={g.items} />
            </div>
          ))}
        </ShowMore>
      )}
    </Reveal>
  );
}

export function CrashRatings({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-6">
      <SectionTitle>NHTSA Crash Test Ratings</SectionTitle>
      {v.crashRatings.length > 0 && (
        <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
          {v.crashRatings.map((r) => (
            <li key={r.label}>
              <p>{r.label}</p>
              <Stars count={r.stars} size={18} />
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

export function Awards({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-10">
      <SectionTitle>Awards</SectionTitle>
      {v.awards.length > 0 && (
        <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
          {v.awards.map((a, i) => (
            <li key={`${a.name}-${i}`}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary transition-colors hover:text-primary-deep hover:underline"
              >
                {a.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}

export function SafetyEquipment({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-10">
      <SectionTitle>Safety Equipment</SectionTitle>
      {v.safetyEquipment.length > 0 && (
        <ThreeColList items={v.safetyEquipment} />
      )}
    </Reveal>
  );
}

export function GreenScores({ v }: { v: Vehicle }) {
  return (
    <Reveal className="mt-10">
      <SectionTitle>EPA Green Scores</SectionTitle>
      {v.greenScores.length > 0 &&
        v.greenScores.map((g, i) => (
          <div key={`${g.title}-${i}`} className="mb-6">
            <p className="mb-2 font-bold">{g.title}</p>
            <ThreeColList items={g.items} />
          </div>
        ))}
    </Reveal>
  );
}
