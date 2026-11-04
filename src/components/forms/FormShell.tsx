import type { FormEvent, ReactNode } from "react";
import { ConsentNote } from "@/components/common/ConsentNote";
import { Button } from "@/components/ui/button";

/** Wraps a long dealership form with the Send button, consent text and thank-you note. */
export function FormShell({
  onSubmit,
  status,
  children,
  submitLabel = "Send",
  consent = true,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  status: "idle" | "sending" | "sent";
  children: ReactNode;
  submitLabel?: string;
  consent?: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="animate-fade-up">
      {children}
      <div className="mt-8 flex justify-center">
        <Button type="submit" variant="brand" className="h-12 w-40 text-base" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : submitLabel}
        </Button>
      </div>
      {status === "sent" && (
        <p className="animate-fade-in mt-4 text-center font-semibold text-primary">Thanks! Your form has been sent.</p>
      )}
      {consent && <ConsentNote className="mt-4 text-center" />}
    </form>
  );
}
