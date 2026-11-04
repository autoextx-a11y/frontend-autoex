export const fmtNumber = (n: number | null | undefined) =>
  n == null ? "" : new Intl.NumberFormat("en-US").format(n);

export const fmtMoney = (n: number | null | undefined, digits = 0) =>
  n == null
    ? ""
    : new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(n);

/** Price split for the "$ superscript" look used across the site. */
export const priceDigits = (n: number | null | undefined) => (n == null ? "" : fmtNumber(n));
