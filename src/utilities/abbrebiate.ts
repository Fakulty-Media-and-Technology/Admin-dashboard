export function abbreviateNumber(number: number) {
  if (number <= 0) return number;

  const suffixes = ["", "K", "M", "B", "T"]; // Suffixes for thousands, millions, etc.

  // Determine the magnitude of the number (e.g., 3600 -> 3k, 36000 -> 36k)
  const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);

  // Calculate the abbreviated value, always rounded down to the nearest integer
  const abbreviatedValue = Math.floor(number / Math.pow(10, magnitude * 3));

  // Check if there's any remainder and add '+' for non-exact multiples of the magnitude
  const isExact = number % Math.pow(10, magnitude * 3) === 0;
  const suffix = suffixes[magnitude] + (isExact ? "" : "+");

  return abbreviatedValue + suffix;
}
