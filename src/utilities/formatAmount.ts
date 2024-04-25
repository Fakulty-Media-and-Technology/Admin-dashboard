export function formatAmount(amount: string) {
  return amount.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const { format: formatWithoutDecimals } = new Intl.NumberFormat(
  "en-NG",
  {
    style: "currency",
    currency: "NGN",
  }
);
