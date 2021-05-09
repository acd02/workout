function toIntlNumberFormat(value: number): string {
  return new Intl.NumberFormat('en-EN', {
    style: 'decimal',
    minimumIntegerDigits: 2,
  }).format(value)
}

type GetOffsetValueArgs = {
  percent: number
  circumference: number
}

function getOffsetValue({ percent, circumference }: GetOffsetValueArgs): string {
  const offset = circumference - (percent / 100) * circumference

  return `${circumference - offset}`
}

export { toIntlNumberFormat, getOffsetValue }
