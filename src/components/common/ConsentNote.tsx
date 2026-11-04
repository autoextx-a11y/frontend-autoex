import { Link } from "@tanstack/react-router";
import { CONSENT_TEXT, CONSENT_TEXT_MESSAGE } from "@/config/site";
import { cn } from "@/lib/utils";

export function ConsentNote({ variant = "send", className }: { variant?: "send" | "message"; className?: string }) {
  return (
    <p className={cn("text-[10px] leading-snug text-muted-foreground", className)}>
      {variant === "send" ? CONSENT_TEXT : CONSENT_TEXT_MESSAGE}{" "}
      <Link to="/terms-and-conditions" className="font-semibold underline hover:text-primary">
        Terms and Conditions of Use
      </Link>{" "}
      of AutoEx.
    </p>
  );
}
