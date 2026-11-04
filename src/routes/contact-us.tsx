import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { PageTitle } from "@/components/common/PageTitle";
import { Reveal } from "@/components/common/Reveal";
import { maskPhone, TextArea, TextField } from "@/components/forms/Fields";
import { FormShell } from "@/components/forms/FormShell";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { BUSINESS_HOURS, SITE } from "@/config/site";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact AutoEx | Irving, TX Car Dealer" },
      { name: "description", content: "Contact AutoEx at 1425 N LOOP 12, Irving, TX 75061. Call (214) 764-9566 or send us a message." },
      { property: "og:title", content: "Contact AutoEx" },
      { property: "og:description", content: "Call, email or visit AutoEx in Irving, TX." },
    ],
  }),
  component: ContactPage,
});

function IconRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-[0_0_0_3px_var(--background),0_0_0_4px_var(--primary)]">
        {icon}
      </span>
      <div>{children}</div>
    </div>
  );
}

function ContactPage() {
  const { onSubmit, status } = useLeadSubmit("contact");
  return (
    <>
      <PageTitle title="Contact AutoEx" />
      <div className="container-site grid gap-12 pb-20 pt-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="pt-10">
          <FormShell onSubmit={onSubmit} status={status}>
            <div className="grid gap-x-2 gap-y-5 sm:grid-cols-2">
              <TextField name="firstName" label="First Name" required className="[&_input]:h-14" />
              <TextField name="lastName" label="Last Name" required className="[&_input]:h-14" />
              <TextField name="email" type="email" label="Email" required className="[&_input]:h-14" />
              <TextField name="phone" label="Phone" required placeholder="(___) ___-____" maxLength={14} onInput={maskPhone} className="[&_input]:h-14" />
              <TextArea name="comments" label="Comments" className="sm:col-span-2 [&_textarea]:min-h-[170px]" />
            </div>
          </FormShell>
        </div>
        <Reveal>
          <h2 className="mb-6 w-fit border-b-2 border-ink pb-2 font-display text-lg font-bold uppercase">AutoEx</h2>
          <div className="space-y-5">
            <IconRow icon={<MapPin className="size-4" />}>
              <p>{SITE.address.street}</p>
              <p>
                {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
              </p>
            </IconRow>
            <IconRow icon={<Mail className="size-4" />}>
              <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                {SITE.email}
              </a>
            </IconRow>
            <IconRow icon={<Phone className="size-4" />}>
              <a href={SITE.phoneHref} className="hover:text-primary">
                {SITE.phone}
              </a>
            </IconRow>
          </div>
          <h2 className="mb-2 mt-10 w-fit border-b-2 border-ink pb-2 font-display text-lg font-bold uppercase">Hours</h2>
          <ul>
            {BUSINESS_HOURS.map((h) => (
              <li key={h.day} className="flex justify-between border-b border-border py-2.5">
                <span className="font-bold">{h.day}</span>
                <span>{h.open ? `${h.open} - ${h.close} CDT` : "Closed"}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  );
}
