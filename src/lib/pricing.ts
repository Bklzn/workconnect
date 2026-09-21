export function parsePrice(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (normalized === "") return null;

  const num = Number(normalized);
  return Number.isFinite(num) && num >= 0 ? num : null;
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function formatPrice(value: number | null): string {
  return value == null ? "" : round2(value).toFixed(2);
}

export function computeGross(netPrice: number, vatRate: number): number {
  return netPrice * (1 + vatRate / 100);
}

export function computeNet(grossPrice: number, vatRate: number): number {
  return grossPrice / (1 + vatRate / 100);
}
