import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import { PageTitle } from "@/components/common/PageTitle";
import { maskPhone, RadioGroup, SelectField, TextField } from "@/components/forms/Fields";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { Button } from "@/components/ui/button";
import { HOUSING_TYPES, INCOME_TYPES, MONTHS_0_11, RELATIONSHIPS, US_STATES, YEARS_0_100 } from "@/config/form-options";
import { inventoryQuery } from "@/lib/inventory.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loan-application")({
  validateSearch: z.object({ vehicleId: z.string().max(64).optional().catch(undefined) }),
  head: () => ({
    meta: [
      { title: "Auto Loan Financing in Irving, TX | AutoEx Credit Application" },
      { name: "description", content: "Apply for auto financing at AutoEx in Irving, TX. Fast, easy and simple secure credit application." },
      { property: "og:title", content: "Auto Loan Financing in Irving, TX | AutoEx" },
      { property: "og:description", content: "Fast, easy and simple financing available today at AutoEx." },
    ],
  }),
  component: LoanPage,
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-4 font-sans text-[15px] font-semibold">{title}</h3>
      <div className="px-2.5">{children}</div>
    </section>
  );
}

function Toggle({ label, name, children }: { label: string; name: string; children: ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <div className="mt-3">
      <label className="flex cursor-pointer items-center gap-2 text-xs text-link">
        <input type="checkbox" name={name} value="Yes" checked={on} onChange={(e) => setOn(e.target.checked)} className="accent-primary" />
        {label}
      </label>
      <div className={cn("grid transition-all duration-500", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="min-h-0 overflow-hidden">
          <fieldset disabled={!on} className="pt-3">
            {children}
          </fieldset>
        </div>
      </div>
    </div>
  );
}

function AddressFields({ p, required }: { p: string; required: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <TextField name={`${p}Street`} label="Street Address" required={required} className="sm:col-span-3" />
      <TextField name={`${p}City`} label="City" required={required} />
      <SelectField name={`${p}State`} label="State" required={required} options={US_STATES} placeholder="State" />
      <TextField name={`${p}Zip`} label="Zip Code" required={required} inputMode="numeric" maxLength={10} />
      <SelectField name={`${p}HousingType`} label="Housing Type" required={required} options={HOUSING_TYPES} placeholder="Housing Type" />
      <TextField name={`${p}Rent`} label="Monthly Rent/Mortgage Amount" required={required} inputMode="decimal" />
      <div>
        <p className="mb-1 text-[13px]">Years at Address{required && <span className="text-muted-foreground"> *</span>}</p>
        <div className="grid grid-cols-2 gap-2">
          <SelectField name={`${p}Years`} aria-label="Years at Address" required={required} options={YEARS_0_100} placeholder="Years" />
          <SelectField name={`${p}Months`} aria-label="Months at Address" options={MONTHS_0_11} placeholder="Months" />
        </div>
      </div>
    </div>
  );
}

function EmploymentFields({ p, required }: { p: string; required: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <TextField name={`${p}Employer`} label="Employer Name" required={required} />
      <TextField name={`${p}Title`} label="Title/Position" required={required} />
      <TextField name={`${p}EmployerPhone`} label="Employer Phone Number" required={required} maxLength={14} onInput={maskPhone} />
      <TextField name={`${p}Income`} label="Monthly Gross Income" required={required} inputMode="decimal" className="sm:col-span-1" />
      <div className="sm:col-span-2">
        <p className="mb-1 text-[13px]">Years at Job{required && <span className="text-muted-foreground"> *</span>}</p>
        <div className="grid grid-cols-2 gap-2">
          <SelectField name={`${p}JobYears`} aria-label="Years at Job" required={required} options={YEARS_0_100} placeholder="Years" />
          <SelectField name={`${p}JobMonths`} aria-label="Months at Job" options={MONTHS_0_11} placeholder="Months" />
        </div>
      </div>
    </div>
  );
}

function ApplicantFields({ p, active }: { p: string; active: boolean }) {
  return (
    <>
      <Section title="Personal Information">
        <div className="grid gap-3 sm:grid-cols-3">
          <TextField name={`${p}FirstName`} label="First Name" required={active} />
          <TextField name={`${p}MiddleInitial`} label="Middle Initial" maxLength={1} />
          <TextField name={`${p}LastName`} label="Last Name" required={active} />
          <TextField name={p === "buyer" ? "email" : `${p}Email`} type="email" label="Email" required={active && p !== "buyer"} />
          <TextField name={`${p}CellPhone`} label="Cell Phone" maxLength={14} onInput={maskPhone} />
          <TextField name={`${p}HomePhone`} label="Home Phone (Optional)" maxLength={14} onInput={maskPhone} />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <TextField name={`${p}Dob`} type="date" label="Date of Birth" required={active} />
          <TextField name={`${p}Ssn`} label="SSN" required={active} placeholder="___-__-____" maxLength={11} autoComplete="off" />
          <TextField name={`${p}License`} label="Driver's License Number" />
          <SelectField name={`${p}LicenseState`} label="Driver's License State" options={US_STATES} placeholder="State" />
          <TextField name={`${p}LicenseIssued`} type="date" label="Driver's License Issue Date" />
          <TextField name={`${p}LicenseExpires`} type="date" label="Driver's License Expiry Date" />
        </div>
      </Section>
      <Section title="Residential Information">
        <AddressFields p={`${p}Address`} required={active} />
        <Toggle label="Add Previous Address" name={`${p}HasPrevAddress`}>
          <AddressFields p={`${p}PrevAddress`} required={false} />
        </Toggle>
        <p className="mt-2 text-[11px] text-muted-foreground">Minimum 12 months of address history is required.</p>
      </Section>
      <Section title="Employment Information">
        <EmploymentFields p={`${p}Job`} required={active} />
        <SelectField name={`${p}IncomeType`} label="Income Type" options={INCOME_TYPES} placeholder="Income Type" className="mt-3 sm:w-1/2" />
        <Toggle label="Add Previous Employment" name={`${p}HasPrevJob`}>
          <EmploymentFields p={`${p}PrevJob`} required={false} />
        </Toggle>
      </Section>
    </>
  );
}

function LoanPage() {
  const { vehicleId } = Route.useSearch();
  const { data: inventory } = useQuery(inventoryQuery());
  const v = vehicleId ? inventory?.find((x) => x.id === vehicleId) : undefined;
  const [tab, setTab] = useState<"buyer" | "cobuyer">("buyer");
  const [hasCo, setHasCo] = useState(false);
  const { onSubmit, status } = useLeadSubmit("loan-application", vehicleId);

  return (
    <>
      <PageTitle title="Auto Loan Financing in Irving, TX" />
      <div className="container-site max-w-[660px] pb-20 pt-6">
        <form onSubmit={onSubmit} className="animate-fade-up">
          <div className="flex border-b border-border">
            {(["buyer", "cobuyer"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "px-4 py-2.5 text-[13px] font-semibold transition-colors",
                  tab === t ? "bg-ink-soft/60 text-ink-foreground" : "bg-muted hover:bg-accent",
                )}
              >
                {t === "buyer" ? "Buyer" : "Co-Buyer"}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">All fields marked with an asterisk (*) are required</p>

          <div className={tab === "buyer" ? "animate-fade-in" : "hidden"}>
            <ApplicantFields p="buyer" active />
            <Section title="Interested Vehicle">
              <div key={v?.id ?? "none"} className="grid gap-3 sm:grid-cols-4">
                <TextField name="vehicleStock" label="Stock Number" defaultValue={v?.stock ?? ""} />
                <TextField name="vehicleYear" label="Year" defaultValue={v ? String(v.year) : ""} />
                <TextField name="vehicleMake" label="Make" defaultValue={v?.make ?? ""} />
                <TextField name="vehicleModel" label="Model" defaultValue={v?.model ?? ""} />
                <TextField name="vehiclePrice" label="Vehicle Price" defaultValue={v?.price != null ? String(v.price) : ""} />
                <TextField name="downPayment" label="Down Payment" />
                <TextField name="vehicleExtColor" label="Exterior Color" defaultValue={v?.exteriorColor ?? ""} />
                <TextField name="vehicleIntColor" label="Interior Color" defaultValue={v?.interiorColor ?? ""} />
                <TextField name="vehicleVin" label="VIN" defaultValue={v?.vin ?? ""} />
              </div>
              <Toggle label="Add Trade-in?" name="hasTradeIn">
                <div className="grid gap-3 sm:grid-cols-3">
                  <TextField name="tradeVin" label="VIN" />
                  <TextField name="tradeMileage" label="Mileage" />
                  <TextField name="tradeYear" label="Year" />
                  <TextField name="tradeMake" label="Make" />
                  <TextField name="tradeModel" label="Model" />
                  <TextField name="tradeOwed" label="Amount Owed" />
                </div>
                <RadioGroup label="Do you owe money on your trade-in?" name="tradeOwes" items={["Yes", "No"]} className="mt-3" />
              </Toggle>
            </Section>
          </div>

          <div className={tab === "cobuyer" ? "animate-fade-in" : "hidden"}>
            <label className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <input type="checkbox" name="hasCoBuyer" value="Yes" checked={hasCo} onChange={(e) => setHasCo(e.target.checked)} className="size-4 accent-primary" />
              Has Co-Buyer?
            </label>
            <fieldset disabled={!hasCo} className={cn("transition-opacity", !hasCo && "opacity-50")}>
              <SelectField name="coRelationship" label="Relationship to Buyer" required={hasCo} options={RELATIONSHIPS} placeholder="Relationship Type" className="mt-4 sm:w-1/2" />
              <ApplicantFields p="co" active={hasCo} />
            </fieldset>
          </div>

          <div className="mt-8 space-y-2 border-t border-border pt-5 text-xs">
            <label className="flex items-start gap-2">
              <input type="checkbox" name="smsMarketing" value="Yes" className="mt-0.5 accent-primary" />I want to receive marketing text messages on the phone number provided.
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" name="smsService" value="Yes" className="mt-0.5 accent-primary" />I want to receive non marketing messages, including updates and news, on the phone number provided.
            </label>
            <p className="text-muted-foreground">
              By checking the boxes above, I consent to receive marketing and/or non-marketing text messages at the phone number provided. Message
              frequency may vary. Message and data rates may apply. Reply HELP for help or STOP to opt-out.
            </p>
            <p className="text-muted-foreground">
              I, the undersigned, (a) for the purpose of securing credit, certify that the above representations are correct; (b) authorize
              financial institutions, as they consider necessary and appropriate, to obtain consumer credit reports on me periodically and to
              gather employment history, and (c) understand that we, or any financial institution to whom this application is submitted, will
              retain this application whether or not it is approved, and that it is the applicant's responsibility to notify the creditor of any
              change of name, address, or employment.
            </p>
          </div>

          <Button type="submit" variant="brand" className="mt-6 h-11 w-full text-base" disabled={status === "sending"}>
            {status === "sending" ? "Submitting..." : "Submit"}
          </Button>
          {status === "sent" && (
            <div className="animate-fade-in mt-5 border border-primary/40 bg-primary/5 p-5 text-center">
              <p className="text-lg font-bold">Thank You!</p>
              <p>The form has been submitted successfully.</p>
              <p>A representative from the dealership will contact you shortly.</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
