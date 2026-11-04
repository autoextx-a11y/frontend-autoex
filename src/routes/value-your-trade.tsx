import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useState } from "react";
import { PageTitle } from "@/components/common/PageTitle";
import { CheckGroup, FormSection, maskPhone, RadioGroup, SelectField, TextArea, TextField } from "@/components/forms/Fields";
import { FormShell } from "@/components/forms/FormShell";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import {
  ALL_MAKES,
  COLORS,
  EXTERIOR_ISSUES,
  INTERIOR_ISSUES,
  MECHANICAL_CHECKLIST,
  TRADE_CONDITIONS,
  TRADE_DRIVETRAINS,
  TRADE_FEATURES,
  TRADE_FUELS,
  TRADE_PHOTOS,
  TRADE_YEARS,
  TRANSMISSIONS,
} from "@/config/form-options";

export const Route = createFileRoute("/value-your-trade")({
  head: () => ({
    meta: [
      { title: "Value My Trade | AutoEx in Irving, TX" },
      { name: "description", content: "Tell us about your trade-in and AutoEx will provide an estimated value. Irving, TX." },
      { property: "og:title", content: "Trade-In Offer at AutoEx" },
      { property: "og:description", content: "Get an estimated value for your trade-in at AutoEx in Irving, TX." },
    ],
  }),
  component: TradePage,
});

function PhotoDrop({ label }: { label: string }) {
  const [name, setName] = useState("");
  const [over, setOver] = useState(false);
  return (
    <div>
      <p className="mb-1 text-[13px]">{label}</p>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          setName(e.dataTransfer.files[0]?.name ?? "");
        }}
        className={`flex h-14 cursor-pointer items-center justify-center gap-2 border border-dashed text-xs transition-colors ${over ? "border-primary bg-primary/5" : "border-border bg-panel"}`}
      >
        <span className="inline-flex items-center gap-1 rounded-[2px] bg-primary px-2.5 py-1 font-semibold text-primary-foreground">
          <Upload className="size-3" /> Upload
        </span>
        <span className="text-muted-foreground">{name || "or Drag and Drop a File"}</span>
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => setName(e.target.files?.[0]?.name ?? "")} />
      </label>
    </div>
  );
}

function TradePage() {
  const { onSubmit, status } = useLeadSubmit("value-your-trade");
  return (
    <>
      <PageTitle title="Trade-In Offer at AutoEx" />
      <div className="container-site pb-20 pt-6">
        <h2 className="text-xl font-bold">Value My Trade | AutoEx in Irving, TX</h2>
        <h2 className="mt-8 text-xl font-bold">Value My Trade-In</h2>
        <p className="mb-6 text-sm">Tell us about your trade-in, and we will provide an estimated value.</p>

        <FormShell onSubmit={onSubmit} status={status}>
          <FormSection title="Contact Info">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="firstName" label="First Name" required />
              <TextField name="lastName" label="Last Name" required />
              <TextField name="email" type="email" label="Email" required />
              <TextField name="phone" label="Phone" required placeholder="(___) ___-____" maxLength={14} onInput={maskPhone} />
            </div>
          </FormSection>

          <FormSection title="Vehicle Info">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SelectField name="condition" label="Condition" required options={TRADE_CONDITIONS} />
              <SelectField name="year" label="Year" required options={TRADE_YEARS} />
              <SelectField name="make" label="Make" required options={ALL_MAKES} />
              <TextField name="model" label="Model" required />
              <TextField name="trim" label="Trim/Package" />
              <TextField name="vin" label="VIN" maxLength={17} />
              <TextField name="mileage" label="Mileage" required inputMode="numeric" />
              <TextField name="engine" label="Engine" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <SelectField name="exteriorColor" label="Exterior Color" options={COLORS} />
              <SelectField name="interiorColor" label="Interior Color" options={COLORS} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <SelectField name="transmission" label="Transmission" options={TRANSMISSIONS} />
              <SelectField name="drivetrain" label="Drivetrain" options={TRADE_DRIVETRAINS} />
              <SelectField name="fuel" label="Fuel Type" options={TRADE_FUELS} />
            </div>
          </FormSection>

          <FormSection title="Features">
            <div className="grid items-end gap-6 sm:grid-cols-3">
              <CheckGroup title="Safety Features" name="safetyFeatures" items={TRADE_FEATURES.safety} />
              <CheckGroup title="Exterior Features" name="exteriorFeatures" items={TRADE_FEATURES.exterior} />
              <CheckGroup title="Basic Features" name="basicFeatures" items={TRADE_FEATURES.basic} />
              <CheckGroup title="Interior Features" name="interiorFeatures" items={TRADE_FEATURES.interior} />
              <CheckGroup title="Infotainment" name="infotainment" items={TRADE_FEATURES.infotainment} />
            </div>
            <TextArea name="additionalFeatures" label="Additional Features" className="mt-5" />
          </FormSection>

          <FormSection title="Ownership & Condition">
            <div className="grid gap-6 sm:grid-cols-2">
              <RadioGroup label="Do you own this vehicle?" name="ownership" items={["Owned", "Loan", "Lease"]} />
              <TextField name="amountOwed" label="How much do you owe on this vehicle?" placeholder="$" />
              <RadioGroup label="Did you purchase this vehicle new?" name="boughtNew" items={["Yes", "No"]} />
              <RadioGroup label="Does your vehicle have a salvage or junk title?" name="salvageTitle" items={["Yes", "No"]} />
              <CheckGroup title="Does your vehicle have any of the issues below?" subtitle="" name="exteriorIssues" items={EXTERIOR_ISSUES} />
              <TextArea name="exteriorDamage" label="Exterior Damage Summary — share details about any vehicle damage to the exterior" />
              <CheckGroup title="Does your vehicle have any of the issues below?" subtitle="" name="interiorIssues" items={INTERIOR_ISSUES} />
              <TextArea name="interiorDamage" label="Interior Damage Summary — share details about any vehicle damage to the interior" />
            </div>
            <CheckGroup title="Mechanical Checklist" subtitle="Check all that apply" name="mechanical" items={MECHANICAL_CHECKLIST} className="mt-6" />
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              <RadioGroup label="Has the engine ever been replaced?" name="engineReplaced" items={["Yes", "No"]} />
              <RadioGroup label="Has the transmission ever been replaced?" name="transmissionReplaced" items={["Yes", "No"]} />
              <TextField name="treadDepth" label="What is the remaining tread depth on the tires? (% Remaining)" inputMode="numeric" />
            </div>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <TextArea name="mechanicalSummary" label="Mechanical Summary — share details about any mechanical issues" />
              <TextArea name="modificationSummary" label="Modification Summary — share details about any modifications" />
            </div>
            <TextArea name="additionalComments" label="Additional Comments" className="mt-5" />
          </FormSection>

          <FormSection title="Provide Photos of Your Trade-In">
            <div className="grid gap-4 sm:grid-cols-2">
              {TRADE_PHOTOS.map((p) => (
                <PhotoDrop key={p} label={p} />
              ))}
            </div>
            <TextArea name="photoComments" label="Additional Comments" className="mt-5" />
          </FormSection>
        </FormShell>
      </div>
    </>
  );
}
