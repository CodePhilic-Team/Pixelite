/**
 * Format a price in cents to a localized currency string.
 * @example formatPrice(14900) → "$149"
 * @example formatPrice(14950) → "$149.50"
 */
export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
