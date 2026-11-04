import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/common/PageTitle";
import { CheckGroup, FormSection, maskPhone, SelectField, TextArea, TextField } from "@/components/forms/Fields";
import { FormShell } from "@/components/forms/FormShell";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";
import { ALL_MAKES, FINDER } from "@/config/form-options";

export const Route = createFileRoute("/shopping-request")({
  head: () => ({
    meta: [
      { title: "Car Finder | AutoEx in Irving, TX" },
      { name: "description", content: "Tell AutoEx what you're looking for and we'll find your perfect fit. Shopping request for Irving, TX." },
      { property: "og:title", content: "AutoEx - Your Vehicle Finding Partner" },
      { property: "og:description", content: "We're ready to take the work out of car shopping." },
    ],
  }),
  component: ShoppingPage,
});

function ShoppingPage() {
  const { onSubmit, status } = useLeadSubmit("shopping-request");
  return (
    <>
      <PageTitle title="AutoEx - Your Vehicle Finding Partner" />
      <div className="container-site pb-20 pt-6">
        <h2 className="text-xl font-bold">Car Finder | AutoEx in Irving, TX</h2>
        <h2 className="mt-8 text-xl font-bold">Shopping Request</h2>
        <p className="mb-6 text-sm">
          We're ready to take the work out of car shopping! Simply tell us what you're looking for and we'll find your perfect fit.
        </p>
        <FormShell onSubmit={onSubmit} status={status}>
          <FormSection title="Tell Us About You">
            <div className="grid gap-1 sm:grid-cols-2">
              <TextField name="firstName" label="First Name" required className="[&_input]:h-10" />
              <TextField name="lastName" label="Last Name" required className="[&_input]:h-10" />
            </div>
            <div className="mt-3 grid gap-1 sm:grid-cols-3">
              <TextField name="email" type="email" label="Email" required />
              <TextField name="phone" label="Phone" required placeholder="(___) ___-____" maxLength={14} onInput={maskPhone} />
              <TextField name="zip" label="Zip" required inputMode="numeric" maxLength={10} />
            </div>
          </FormSection>

          <FormSection title="Tell us what you're looking for">
            <div className="grid gap-1 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              <SelectField name="condition" label="Condition" required options={FINDER.conditions} />
              <SelectField name="bodyStyle" label="Body Style" options={FINDER.bodyStyles} />
              <SelectField name="make" label="Make" options={["Any", ...ALL_MAKES]} />
              <TextField name="model" label="Model" />
              <TextField name="trim" label="Trim / Package" />
              <SelectField name="transmission" label="Transmission" options={FINDER.transmissions} />
              <SelectField name="minMpg" label="Min Highway MPG" options={FINDER.mpg} />
              <SelectField name="maxMileage" label="Max Mileage" options={FINDER.mileage} />
              <TextField name="yearMin" label="Year Min" inputMode="numeric" maxLength={4} />
              <TextField name="yearMax" label="Year Max" inputMode="numeric" maxLength={4} />
              <TextField name="extColor" label="Preferred Exterior Color" />
              <TextField name="intColor" label="Preferred Interior Color" />
            </div>
            <div className="mt-3 grid gap-1 gap-y-3 sm:grid-cols-3">
              <SelectField name="minPrice" label="Min Price" options={FINDER.prices} />
              <SelectField name="maxPrice" label="Max Price" options={FINDER.prices} />
              <SelectField name="maxMonthly" label="Max Monthly Payment" options={FINDER.monthly} />
              <TextField name="engine" label="Engine" />
              <SelectField name="drivetrain" label="Drivetrain" options={FINDER.drivetrains} />
              <SelectField name="fuel" label="Fuel Type" options={FINDER.fuels} />
              <SelectField name="seats" label="Seats" options={FINDER.seats} />
              <SelectField name="rows" label="Seating Rows" options={FINDER.rows} />
              <SelectField name="doors" label="Doors" options={FINDER.doors} />
            </div>
          </FormSection>

          <FormSection title="Which of the following features are you looking for?">
            <div className="grid items-end gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <CheckGroup title="Interior Features" name="interiorFeatures" items={FINDER.interior} />
              <CheckGroup title="Exterior Features" name="exteriorFeatures" items={FINDER.exterior} />
              <CheckGroup title="Infotainment Features" name="infotainmentFeatures" items={FINDER.infotainment} />
              <CheckGroup title="Safety Features" name="safetyFeatures" items={FINDER.safety} />
            </div>
          </FormSection>

          <TextArea name="comments" label="Comments" className="mt-8" />
          <SelectField name="timeline" label="When do you plan to purchase this vehicle?" options={FINDER.timeline} className="mt-4" />
        </FormShell>
      </div>
    </>
  );
}
