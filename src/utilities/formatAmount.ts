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




export function wordsToNumbers(text: string): string {
  const numberWords: Record<string, number> = {
    "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4,
    "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
    "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13,
    "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17,
    "eighteen": 18, "nineteen": 19, "twenty": 20, "thirty": 30,
    "forty": 40, "fifty": 50, "sixty": 60, "seventy": 70,
    "eighty": 80, "ninety": 90, "hundred": 100
  };

  const regex = new RegExp("\\b(" + Object.keys(numberWords).join("|") + ")\\b", "gi");

  return text.replace(regex, (match) => numberWords[match.toLowerCase()].toString());
}
