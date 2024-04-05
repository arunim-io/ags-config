/** Convert a number to a percentage. */
export function toPercentage(value?: number | string): string {
  let number = 0;

  if (typeof value !== "undefined") {
    number = typeof value === "string" ? Number.parseInt(value) : value;
  }

  const percent = Math.round(number * 100);

  return `${percent}%`;
}
