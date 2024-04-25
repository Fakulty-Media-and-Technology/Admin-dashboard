export function abbreviateNumber(number: number) {
  // Array of suffixes for different magnitudes
  const suffixes = ["", "k", "M", "B", "T"];

  // Determine the magnitude of the number (e.g., 3600 -> 3k, 36000 -> 36k)
  const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);

  // Calculate the abbreviated value
  const abbreviatedValue = number / Math.pow(10, magnitude * 3);

  // Format the result with the appropriate suffix
  let formattedValue = abbreviatedValue + suffixes[magnitude];

  formattedValue = formattedValue.replace(/\.0$/, "");

  return number > 0 ? formattedValue : number;
}
