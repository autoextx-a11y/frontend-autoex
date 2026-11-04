import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitLead, type LeadInput } from "@/lib/leads.functions";

/** Collects a form's fields (checkbox groups become arrays) and sends them to the server. */
export function useLeadSubmit(form: LeadInput["form"], vehicleId?: string | undefined) {
  const send = useServerFn(submitLead);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    if (!el.reportValidity()) return;
    const fd = new FormData(el);
    const fields: Record<string, string | string[]> = {};
    for (const [k, v] of fd.entries()) {
      if (typeof v !== "string") continue;
      const prev = fields[k];
      if (prev === undefined) fields[k] = v;
      else fields[k] = Array.isArray(prev) ? [...prev, v] : [prev, v];
    }
    setStatus("sending");
    try {
      const res = await send({ data: { form, fields, ...(vehicleId ? { vehicleId } : {}) } });
      if (!res.ok) {
        toast.error(res.error);
        setStatus("idle");
        return;
      }
      setStatus("sent");
      el.reset();
      toast.success("Thank you! We will get back to you as soon as possible.");
    } catch {
      toast.error("There was an error submitting the form. Please try again in a few minutes.");
      setStatus("idle");
    }
  }

  return { onSubmit, status, reset: () => setStatus("idle") };
}
