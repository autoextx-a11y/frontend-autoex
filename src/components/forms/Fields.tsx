// Small form building blocks shared by every dealership form.
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const chevron = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3e%3cpath fill='%23666' d='M0 0h10L5 6z'/%3e%3c/svg%3e\")",
};

export function Label({ children, required, htmlFor, className }: { children: ReactNode; required?: boolean | undefined; htmlFor?: string | undefined; className?: string | undefined }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1 block text-[13px] text-foreground", className)}>
      {children}
      {required && <span className="text-muted-foreground"> *</span>}
    </label>
  );
}

type Base = { label?: string; required?: boolean; className?: string; hint?: string };

export function TextField({ label, required, className, hint, id, name, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const fid = id ?? name;
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={fid} required={required}>
          {label}
        </Label>
      )}
      <input id={fid} name={name} required={required} className="field h-[38px]" {...rest} />
      {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SelectField({
  label,
  required,
  className,
  options,
  placeholder = "Select One",
  id,
  name,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly (string | { value: string; label: string })[]; placeholder?: string }) {
  const fid = id ?? name;
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={fid} required={required}>
          {label}
        </Label>
      )}
      <select
        id={fid}
        name={name}
        required={required}
        defaultValue=""
        className="field h-[38px] cursor-pointer appearance-none bg-[length:9px] bg-[right_0.8rem_center] bg-no-repeat pr-8 invalid:text-muted-foreground"
        style={chevron}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
    </div>
  );
}

export function TextArea({ label, required, className, id, name, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const fid = id ?? name;
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={fid} required={required}>
          {label}
        </Label>
      )}
      <textarea id={fid} name={name} required={required} rows={5} className="field min-h-[120px] resize-y" {...rest} />
    </div>
  );
}

export function CheckGroup({ title, subtitle = "Select all that apply", name, items, className }: { title: string; subtitle?: string; name: string; items: readonly string[]; className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="text-[13px] font-bold">{title}</legend>
      {subtitle && <p className="mb-2 text-[11px] text-muted-foreground">{subtitle}</p>}
      <div className="space-y-1">
        {items.map((it) => (
          <label key={it} className="group flex cursor-pointer items-center gap-2 text-[13px]">
            <input type="checkbox" name={name} value={it} className="size-4 cursor-pointer accent-primary" />
            <span className="transition-colors group-hover:text-primary">{it}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function RadioGroup({ label, name, items, className }: { label: string; name: string; items: readonly string[]; className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="mb-1 text-[13px]">{label}</legend>
      <div className="space-y-1">
        {items.map((it) => (
          <label key={it} className="flex cursor-pointer items-center gap-2 text-[13px]">
            <input type="radio" name={name} value={it} className="size-4 cursor-pointer accent-primary" />
            {it}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FormSection({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("mt-8", className)}>
      <h3 className="mb-3 font-sans text-sm font-bold">{title}</h3>
      {children}
    </section>
  );
}

/** Formats a US phone number as (xxx) xxx-xxxx while typing. */
export function maskPhone(e: React.FormEvent<HTMLInputElement>) {
  const el = e.currentTarget;
  const d = el.value.replace(/\D/g, "").slice(0, 10);
  let out = d;
  if (d.length > 6) out = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  else if (d.length > 3) out = `(${d.slice(0, 3)}) ${d.slice(3)}`;
  else if (d.length > 0) out = `(${d}`;
  el.value = out;
}
