import { ConsentNote } from "@/components/common/ConsentNote";
import { Button } from "@/components/ui/button";
import { maskPhone } from "@/components/forms/Fields";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";

/** "Contact Us" box under the inventory filters. */
export function InventoryContactForm() {
  const { onSubmit, status } = useLeadSubmit("inventory-contact");
  const input = "field h-14 text-base";
  return (
    <div className="mt-8 overflow-hidden border border-border bg-card">
      <h2 className="bg-primary-deep px-4 py-5 font-sans text-lg font-bold text-primary-foreground">Contact Us</h2>
      <form onSubmit={onSubmit} className="space-y-4 p-4">
        <input name="firstName" required placeholder="First Name*" aria-label="First Name" className={input} />
        <input name="lastName" required placeholder="Last Name*" aria-label="Last Name" className={input} />
        <input name="email" type="email" required placeholder="Email Address*" aria-label="Email Address" className={input} />
        <input name="phone" placeholder="Phone Number" aria-label="Phone Number" maxLength={14} onInput={maskPhone} className={input} />
        <textarea name="comments" placeholder="Comments" aria-label="Comments" rows={4} className="field resize-y text-base" />
        <ConsentNote />
        <Button type="submit" variant="brand" className="h-11 w-full text-base" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </Button>
        {status === "sent" && (
          <p className="animate-fade-in text-sm text-primary">
            Thank you for reaching out to us! We appreciate your inquiry and will get back to you as soon as possible.
          </p>
        )}
      </form>
    </div>
  );
}
