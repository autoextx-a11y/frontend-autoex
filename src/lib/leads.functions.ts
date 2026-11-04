// Receives every website form (contact, vehicle message, trade-in, finder, credit app).
// Validates on the server; delivery (email / CRM) can be plugged in here later.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  form: z.enum([
    "contact",
    "vehicle-message",
    "inventory-contact",
    "value-your-trade",
    "shopping-request",
    "loan-application",
    "quick-connect",
  ]),
  vehicleId: z.string().max(64).optional(),
  fields: z
    .record(z.string().max(80), z.union([z.string().max(5000), z.array(z.string().max(200)).max(100), z.boolean()]))
    .refine((f) => Object.keys(f).length <= 300, "Too many fields"),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const rawEmail = data.fields["email"];
    const email = typeof rawEmail === "string" ? rawEmail : "";
    if (email && !z.string().email().safeParse(email).success) {
      return { ok: false as const, error: "Please enter a valid email address." };
    }
    console.log(`[lead] ${data.form}`, {
      vehicleId: data.vehicleId,
      fieldCount: Object.keys(data.fields).length,
    });
    return { ok: true as const };
  });
