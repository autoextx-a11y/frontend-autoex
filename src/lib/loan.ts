// Payment calculator rules mirrored from the dealership's vehicle pages.

export const CREDIT_TIERS = [
  { key: "rebuilding", name: "Rebuilding", range: "0 - 620", apr: 11.0 },
  { key: "fair", name: "Fair", range: "621 - 699", apr: 6.85 },
  { key: "good", name: "Good", range: "700 - 759", apr: 5.85 },
  { key: "excellent", name: "Excellent", range: "760 +", apr: 4.0 },
] as const;

export type CreditKey = (typeof CREDIT_TIERS)[number]["key"];

export const TERMS = [36, 48, 60, 72, 84] as const;
export const DEFAULT_TERM = 60;
export const DEFAULT_CREDIT: CreditKey = "good";
/** Default down payment is 10% of the vehicle price. */
export const DEFAULT_DOWN_RATE = 0.1;

export function monthlyPayment(principal: number, aprPercent: number, months: number) {
  if (principal <= 0 || months <= 0) return 0;
  const r = aprPercent / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function estimateLoan(input: {
  price: number;
  tradeIn: number;
  down: number;
  apr: number;
  months: number;
}) {
  const principal = Math.max(0, input.price - input.tradeIn - input.down);
  const raw = monthlyPayment(principal, input.apr, input.months);
  const payment = Math.round(raw * 100) / 100;
  const total = Math.round((payment * input.months + input.down + input.tradeIn) * 100) / 100;
  return { principal, payment, total };
}
