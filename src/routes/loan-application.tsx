import { useEffect } from "react";
// import { useSuspenseQuery } from "@tanstack/react-query";
// import { inventoryQuery } from "@/lib/inventory.functions";
// import type { VehicleSummary } from "@/lib/vehicle-types";

import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, PlusCircle, X, Search } from "lucide-react";

import { PageTitle } from "@/components/common/PageTitle";
import { inventoryQuery } from "@/lib/inventory.functions";
import type { VehicleSummary } from "@/lib/vehicle-types";

// export const Route = createFileRoute("/loan-application")({
//   component: LoanApplicationPage,
// });

export const Route = createFileRoute("/loan-application")({
  validateSearch: (search: Record<string, unknown>) => ({
    vehicleId: typeof search["vehicleId"] === "string" ? search["vehicleId"] : undefined,
  }),
  component: LoanApplicationPage,
});

// const { data: vehicles } = useSuspenseQuery(inventoryQuery());

// const [selectedVehicle, setSelectedVehicle] =
//   useState<VehicleSummary | null>(null);

const inputClass =
  "mt-1 w-full rounded-sm border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-[#f15a22] focus:ring-1 focus:ring-[#f15a22]";

const readonlyClass =
  "mt-1 w-full rounded-sm border border-gray-200 bg-gray-100 px-3 py-3 text-sm text-gray-700 outline-none";

const labelClass = "block text-sm text-gray-700";

function SectionTitle({ children }: { children: string }) {
  return <h2 className="mb-5 mt-10 text-2xl font-bold text-[#333333]">{children}</h2>;
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
  value,
  onChange,
  readOnly = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      {required ? "*" : ""}
      <input
        className={readOnly ? readonlyClass : inputClass}
        name={name}
        type={type}
        placeholder={placeholder ?? label}
        required={required}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        readOnly={readOnly}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {label}
      {required ? "*" : ""}
      <select className={inputClass} name={name} required={required} defaultValue="">
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LoanApplicationPage() {
  const { vehicleId } = Route.useSearch();
  const { data: vehicles } = useSuspenseQuery(inventoryQuery());

  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSummary | null>(null);

  const [tradeIns, setTradeIns] = useState<number[]>([]);
  const [showCoBuyer, setShowCoBuyer] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!vehicleId) return;

    const vehicle = vehicles.find((v) => String(v.id) === String(vehicleId));

    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
  }, [vehicleId, vehicles]);

  // const filteredVehicles = useMemo(() => {
  //   const query = vehicleSearch.trim().toLowerCase();

  //   if (!query) return vehicles;

  const filteredVehicles = useMemo(() => {
    const normalize = (value: unknown) =>
      String(value ?? "")
        .toLowerCase()
        .replace(/[\s-]+/g, "");

    const query = normalize(vehicleSearch);

    if (!query) return vehicles;

    return vehicles.filter((vehicle) => {
      const searchableFields = [
        vehicle.year,
        vehicle.make,
        vehicle.model,
        vehicle.trim,
        vehicle.stock,
        vehicle.vin,
      ];

      return searchableFields.some((field) => normalize(field).includes(query));
    });
  }, [vehicles, vehicleSearch]);

  function selectVehicle(vehicle: VehicleSummary) {
    setSelectedVehicle(vehicle);
    setVehicleDropdownOpen(false);
    setVehicleSearch("");
  }

  function addTradeIn() {
    setTradeIns((current) => [...current, Date.now()]);
  }

  function removeTradeIn(id: number) {
    setTradeIns((current) => current.filter((item) => item !== id));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedVehicle) {
      setVehicleDropdownOpen(true);
      window.alert("Please select a vehicle before submitting.");
      return;
    }

    setSubmitted(true);

    // This currently validates the form in the browser.
    // Connect your loan-application API here when its endpoint is available.
  }

  return (
    <>
      <PageTitle title="Auto Loan Financing in Irving, TX" />

      <main className="container-site mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <form onSubmit={handleSubmit}>
          {/* VEHICLE INFORMATION */}
          <SectionTitle>Vehicle Information</SectionTitle>

          <div className="relative">
            <button
              type="button"
              onClick={() => setVehicleDropdownOpen((open) => !open)}
              className="flex w-full items-center justify-between border border-gray-200 bg-white px-4 py-4 text-left text-sm text-gray-700 transition hover:border-[#f15a22]"
              aria-expanded={vehicleDropdownOpen}
            >
              <span>
                {selectedVehicle
                  ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`
                  : "Select a Vehicle to Finance"}
              </span>
              {vehicleDropdownOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </button>

            {vehicleDropdownOpen && (
              <div className="absolute z-30 mt-1 max-h-[420px] w-full overflow-hidden border border-gray-200 bg-white shadow-xl">
                <div className="sticky top-0 border-b bg-white p-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="search"
                      value={vehicleSearch}
                      onChange={(event) => setVehicleSearch(event.target.value)}
                      placeholder="Search by make, model, or trim..."
                      className="w-full border border-gray-200 py-3 pl-9 pr-3 text-sm outline-none focus:border-[#f15a22]"
                    />
                  </div>
                </div>

                <div className="max-h-[340px] overflow-y-auto">
                  {filteredVehicles.length === 0 ? (
                    <p className="p-5 text-center text-sm text-gray-500">No vehicles found.</p>
                  ) : (
                    filteredVehicles.map((vehicle) => (
                      <button
                        type="button"
                        key={vehicle.id}
                        onClick={() => selectVehicle(vehicle)}
                        className="flex w-full items-center gap-3 border-b border-gray-100 p-3 text-left transition hover:bg-orange-50"
                      >
                        <img
                          src={vehicle.photos?.[0] || "/images/vehicle-placeholder.png"}
                          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          className="size-16 shrink-0 rounded-sm border border-gray-200 object-cover"
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-gray-800">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {vehicle.trim || vehicle.bodyType || "Vehicle"}
                          </span>
                          <span className="mt-1 block text-xs text-gray-600">
                            <strong className="text-[#f15a22]">
                              {vehicle.price != null
                                ? vehicle.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    maximumFractionDigits: 0,
                                  })
                                : "Price unavailable"}
                            </strong>
                            {vehicle.mileage != null
                              ? `  /  ${vehicle.mileage.toLocaleString("en-US")} miles`
                              : ""}
                          </span>
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {selectedVehicle && (
            <div className="mt-4 flex items-center gap-4 border border-gray-200 p-4">
              <img
                src={selectedVehicle.photos?.[0] || "/images/vehicle-placeholder.png"}
                alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                className="size-20 shrink-0 rounded-sm object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-800">
                  {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedVehicle.trim || selectedVehicle.bodyType}
                </p>
                <p className="mt-1 text-sm">
                  <strong className="text-[#f15a22]">
                    {selectedVehicle.price != null
                      ? selectedVehicle.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        })
                      : "Price unavailable"}
                  </strong>
                  {selectedVehicle.mileage != null
                    ? `  /  ${selectedVehicle.mileage.toLocaleString("en-US")} miles`
                    : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVehicle(null)}
                aria-label="Remove selected vehicle"
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-red-600"
              >
                <X className="size-4" />
              </button>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="VIN" name="vehicleVin" value={selectedVehicle?.vin ?? ""} readOnly />
            <Field
              label="Year"
              name="vehicleYear"
              value={selectedVehicle ? String(selectedVehicle.year) : ""}
              readOnly
            />
            <Field label="Make" name="vehicleMake" value={selectedVehicle?.make ?? ""} readOnly />
            <Field
              label="Model"
              name="vehicleModel"
              value={selectedVehicle?.model ?? ""}
              readOnly
            />
            <Field
              label="Vehicle Price"
              name="vehiclePrice"
              value={
                selectedVehicle?.price != null
                  ? selectedVehicle.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })
                  : ""
              }
              readOnly
            />
            <Field
              label="Mileage"
              name="vehicleMileage"
              value={
                selectedVehicle?.mileage != null
                  ? selectedVehicle.mileage.toLocaleString("en-US")
                  : ""
              }
              readOnly
            />
          </div>

          {/* TRADE IN */}
          <div className="mt-4">
            <button
              type="button"
              onClick={addTradeIn}
              className="inline-flex items-center gap-2 rounded-sm bg-[#f15a22] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d94b18]"
            >
              <PlusCircle className="size-4" />
              Add Trade-In
            </button>
          </div>

          {tradeIns.map((id, index) => (
            <div key={id} className="mt-4 border border-gray-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">Trade-In Vehicle {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeTradeIn(id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Year" name={`tradeIn${index}Year`} />
                <Field label="Make" name={`tradeIn${index}Make`} />
                <Field label="Model" name={`tradeIn${index}Model`} />
                <Field label="VIN" name={`tradeIn${index}Vin`} />
                <Field label="Mileage" name={`tradeIn${index}Mileage`} />
                <Field label="Estimated Value" name={`tradeIn${index}Value`} type="number" />
              </div>
            </div>
          ))}

          {/* PERSONAL INFORMATION */}
          <SectionTitle>Personal Information</SectionTitle>

          <h3 className="mb-5 text-xl font-bold text-[#333333]">Contact Information</h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Field label="First Name" name="firstName" required />
            </div>
            <div className="sm:col-span-1">
              <Field label="Middle Initial" name="middleInitial" />
            </div>
            <div className="sm:col-span-2">
              <Field label="Last Name" name="lastName" required />
            </div>
            <div className="sm:col-span-2">
              <Field label="Phone" name="phone" type="tel" required />
            </div>
            <div className="sm:col-span-2">
              <SelectField
                label="Phone Type"
                name="phoneType"
                options={["Mobile", "Home", "Work"]}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="sm:col-span-3">
              <Field
                label="Social Security Number"
                name="ssn"
                placeholder="Social Security Number"
              />
            </div>
            <div className="sm:col-span-3">
              <span className={labelClass}>
                Are you the primary driver for the vehicle you are applying for?
              </span>
              <div className="mt-3 flex gap-5 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <input type="radio" name="primaryDriver" value="Yes" />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="primaryDriver" value="No" />
                  No
                </label>
              </div>
            </div>
            <div className="sm:col-span-3">
              <Field label="Birthdate" name="birthdate" type="date" required />
            </div>
            <div className="sm:col-span-3">
              <Field label="Driver's License Number" name="licenseNumber" />
            </div>
            <div className="sm:col-span-2">
              <Field label="Issue Date" name="licenseIssueDate" type="date" />
            </div>
            <div className="sm:col-span-2">
              <Field label="Expiration Date" name="licenseExpirationDate" type="date" />
            </div>
            <div className="sm:col-span-2">
              <SelectField
                label="Driver's License State"
                name="licenseState"
                options={["Texas", "Oklahoma", "New Mexico", "Louisiana", "Arkansas", "Other"]}
              />
            </div>
            <div className="sm:col-span-3">
              <Field label="License County" name="licenseCounty" />
            </div>
          </div>

          {/* ADDRESS INFORMATION */}
          <SectionTitle>Address Information</SectionTitle>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Residence Type"
              name="residenceType"
              options={["Own", "Rent", "Live with family", "Other"]}
              required
            />
            <Field
              label="Monthly Rent/Mortgage"
              name="monthlyHousingPayment"
              type="number"
              placeholder="$ 0"
            />
            <Field label="Years at Residence" name="yearsAtResidence" type="number" required />
            <Field label="Months at Residence" name="monthsAtResidence" type="number" required />
            <div className="sm:col-span-2">
              <Field label="Address" name="address" required />
            </div>
            <div className="sm:col-span-2">
              <Field label="Address 2" name="address2" />
            </div>
            <Field label="City" name="city" required />
            <SelectField
              label="State"
              name="state"
              options={["Texas", "Oklahoma", "New Mexico", "Louisiana", "Arkansas", "Other"]}
              required
            />
            <Field label="Zip" name="zip" required />
          </div>

          {/* EMPLOYMENT */}
          <SectionTitle>Employment</SectionTitle>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SelectField
              label="Employment Status"
              name="employmentStatus"
              options={["Employed", "Self-Employed", "Unemployed", "Retired", "Student", "Other"]}
              required
            />
            <Field label="Income" name="income" type="number" placeholder="$ 0" required />
            <SelectField
              label="Income Interval"
              name="incomeInterval"
              options={["Weekly", "Biweekly", "Monthly", "Yearly"]}
              required
            />
            <div className="sm:col-span-1">
              <Field
                label="Other Monthly Income"
                name="otherMonthlyIncome"
                type="number"
                placeholder="$ 0"
              />
              <p className="mt-2 text-xs text-gray-400">
                Include other income you would like considered for this application.
              </p>
            </div>
          </div>

          {/* BANK ACCOUNTS */}
          <SectionTitle>Bank Accounts</SectionTitle>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 sm:grid-cols-4">
            {["Checking Account", "Savings Account", "Prepaid Debit Card", "None of the Above"].map(
              (account) => (
                <label key={account} className="flex items-center gap-2">
                  <input type="checkbox" name="bankAccounts" value={account} />
                  {account}
                </label>
              ),
            )}
          </div>

          {/* CO-BUYER */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowCoBuyer((show) => !show)}
              className="inline-flex items-center gap-2 rounded-sm bg-[#f15a22] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d94b18]"
            >
              <PlusCircle className="size-4" />
              {showCoBuyer ? "Remove Co-Buyer" : "Add Co-Buyer"}
            </button>
          </div>

          {showCoBuyer && (
            <div className="mt-5 border border-gray-200 p-5">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Co-Buyer Information</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="First Name" name="coBuyerFirstName" />
                <Field label="Middle Initial" name="coBuyerMiddleInitial" />
                <Field label="Last Name" name="coBuyerLastName" />
                <Field label="Phone" name="coBuyerPhone" type="tel" />
                <Field label="Email" name="coBuyerEmail" type="email" />
                <Field label="Birthdate" name="coBuyerBirthdate" type="date" />
                <Field label="Social Security Number" name="coBuyerSsn" />
                <Field label="Driver's License Number" name="coBuyerLicense" />
                <Field label="Employer" name="coBuyerEmployer" />
              </div>
            </div>
          )}

          {/* DESIRED LENDING TERMS */}
          <SectionTitle>Desired Lending Terms</SectionTitle>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Desired Amount" name="desiredAmount" type="number" placeholder="$ 0" />
            <SelectField
              label="Term - Length of Loan"
              name="loanTerm"
              options={[
                "24 Months",
                "36 Months",
                "48 Months",
                "60 Months",
                "72 Months",
                "84 Months",
              ]}
            />
            <Field
              label="Desired Monthly Payment"
              name="desiredMonthlyPayment"
              type="number"
              placeholder="$ 0"
            />
            <Field label="Down Payment" name="downPayment" type="number" placeholder="$ 0" />
          </div>

          {/* CONSENT */}
          <div className="mt-10 space-y-4 text-xs leading-6 text-gray-600">
            <p>
              I agree that by submitting this application, I authorize this dealership, as well as
              any potential financing source this dealership presents this application to, to obtain
              my credit report from any credit reporting agency used to complete an investigation of
              my credit.
            </p>
            <p>
              By submitting this application, I certify that all information herein is true and
              complete. I agree I am providing this information to the dealer identified in this
              application and acknowledge that my information may be shared pursuant to the dealer's
              privacy policy. I hereby authorize this dealer, and any financial institution engaged
              as a service provider by this dealer, to retain this application and to check and
              verify my credit, employment and salary history. By submitting this application, I
              authorize this dealer and/or financial institutions, as they consider necessary and
              appropriate, to obtain consumer credit reports on me periodically and to gather
              employment history in order to determine financing eligibility.
            </p>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="agreeTerms" required />I accept these terms.
          </label>

          {submitted && (
            <p className="mt-4 border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800">
              Your form passed browser validation. It has not been sent yet; the application
              submission API still needs to be connected.
            </p>
          )}

          <button
            type="submit"
            className="mt-6 rounded-sm bg-[#f15a22] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#d94b18]"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
