import { useMemo, useState } from "react";
import { CREDIT_TIERS, DEFAULT_CREDIT, DEFAULT_DOWN_RATE, DEFAULT_TERM, TERMS, estimateLoan, type CreditKey } from "@/lib/loan";
import { LINKS } from "@/config/site";
import { fmtMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

function MoneyInput({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm">{label}</span>
      <span className="field flex h-14 items-center gap-1">
        {!suffix && <span>$</span>}
        <input
          inputMode="decimal"
          value={Number.isFinite(value) ? (suffix ? String(value) : value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : ""}
          onChange={(e) => onChange(Number(e.target.value.replace(/[^\d.]/g, "")) || 0)}
          className={cn("min-w-0 bg-transparent outline-none", suffix ? "w-12" : "w-full")}
          aria-label={label}
        />
        {suffix && <span>{suffix}</span>}
      </span>
    </label>
  );
}

export function LoanCalculator({ price, vehicleId }: { price: number | null; vehicleId: string }) {
  const base = price ?? 0;
  const [vehiclePrice, setVehiclePrice] = useState(base);
  const [tradeIn, setTradeIn] = useState(0);
  const [down, setDown] = useState(Math.round(base * DEFAULT_DOWN_RATE));
  const [credit, setCredit] = useState<CreditKey>(DEFAULT_CREDIT);
  const tier = CREDIT_TIERS.find((t) => t.key === credit) ?? CREDIT_TIERS[2];
  const [apr, setApr] = useState<number>(tier.apr);
  const [term, setTerm] = useState(DEFAULT_TERM);

  const est = useMemo(() => estimateLoan({ price: vehiclePrice, tradeIn, down, apr, months: term }), [vehiclePrice, tradeIn, down, apr, term]);

  return (
    <section className="mt-8">
      <h2 className="font-sans text-[1.85rem] font-bold leading-tight">Estimate Loan &amp; Payment Calculator</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <MoneyInput label="Vehicle Price" value={vehiclePrice} onChange={setVehiclePrice} />
        <MoneyInput label="Trade-In Value" value={tradeIn} onChange={setTradeIn} />
        <MoneyInput label="Interest Rate (APR)" value={apr} onChange={setApr} suffix="%" />
        <MoneyInput label="Down Payment" value={down} onChange={setDown} />
      </div>

      <div className="mt-4 border border-border px-5 py-6 text-center">
        <p className="text-xs">Est. Monthly Payment</p>
        <p key={est.payment} className="animate-fade-in font-sans text-3xl font-bold">
          <sup className="text-sm">$</sup>
          {est.payment.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-sm font-normal">/mo</span>
        </p>
        <hr className="my-3" />
        <p className="text-xs">Estimated Total Loan Amount</p>
        <p className="text-2xl font-bold">
          <sup className="text-sm">$</sup>
          {est.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="mt-1 text-xs">
          After all {term} payments, including {fmtMoney(down, 2)} down and {fmtMoney(tradeIn, 2)} trade-in.
        </p>
        <p className="mt-3 text-[11px]">
          Estimated finance terms: {apr.toFixed(2)}% APR · {term} months
        </p>
        <p className="mt-1 text-[11px] italic text-muted-foreground">
          *Estimate assumes {tier.name} credit ({tier.range.replace(" - ", "–")}).
          <br />
          Excludes taxes, title, registration, and fees.
        </p>
      </div>

      <p className="mb-1.5 mt-5 text-sm">Estimated Credit Score</p>
      <div className="grid grid-cols-4 border border-primary">
        {CREDIT_TIERS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={credit === t.key}
            onClick={() => {
              setCredit(t.key);
              setApr(t.apr);
            }}
            className={cn(
              "border-r border-primary py-1.5 text-center text-[11px] text-primary transition-colors duration-300 last:border-r-0",
              credit === t.key ? "bg-primary text-primary-foreground" : "hover:bg-primary/10",
            )}
          >
            <span className="block">{t.name}</span>
            <span className="block text-xs">{t.range}</span>
          </button>
        ))}
      </div>

      <p className="mb-1.5 mt-5 text-sm">Term Length (months)</p>
      <div className="grid grid-cols-5 border border-primary">
        {TERMS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={term === t}
            aria-label={`${t} months`}
            onClick={() => setTerm(t)}
            className={cn(
              "border-r border-primary py-2.5 text-sm text-primary transition-colors duration-300 last:border-r-0",
              term === t ? "bg-primary text-primary-foreground" : "hover:bg-primary/10",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <a
        href={LINKS.loanApplication(vehicleId)}
        className="btn-shine mt-5 block bg-primary py-3 text-center text-primary-foreground transition-all duration-300 hover:bg-primary-deep hover:shadow-[var(--shadow-glow)]"
      >
        Apply for Financing
      </a>
      <p className="mt-5 text-[11px] leading-relaxed">
        Disclaimer: This interactive calculator is provided for illustrative purposes only and is not an offer or guarantee of credit. Your
        actual APR, payment, and total cost depend on your credit history, lender approval, and the final vehicle price. Estimated total loan
        amount includes your down payment and trade-in value. Figures exclude taxes, title, registration, and dealer fees unless otherwise
        noted.
      </p>
    </section>
  );
}
