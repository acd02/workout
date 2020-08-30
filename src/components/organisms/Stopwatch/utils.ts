export function toIntlNumberFormat(value: number): string {
  return new Intl.NumberFormat('en-EN', {
    style: 'decimal',
    minimumIntegerDigits: 2,
  }).format(value)
}

type SetProgressArgs = {
  percent: number
  circumference: number
  circle: SVGCircleElement | null
}

export function setProgress({ percent, circumference, circle }: SetProgressArgs) {
  const offset = circumference - (percent / 100) * circumference
  /* eslint-disable-next-line fp/no-mutation */
  if (circle) circle.style.strokeDashoffset = `${offset}`
}
