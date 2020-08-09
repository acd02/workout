export function toIntlNumberFormat(value: number): string {
  return new Intl.NumberFormat('en-EN', {
    style: 'decimal',
    minimumIntegerDigits: 2,
  }).format(value)
}
