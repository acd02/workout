import cx from 'classcat'
import React from 'react'

type Props = { label: string; color: 'orange' | 'yellow'; size?: 'xl' }

export function Badge({ label, color, size }: Props) {
  const sizeClassNames =
    size === 'xl' ? 'px-4 py-1 text-2xl leading-none' : 'px-3 py-0.5 text-lg leading-5'

  const colorMapper: Record<typeof color, string> = {
    orange: 'text-orange-800 bg-orange-100',
    yellow: 'text-yellow-800 bg-yellow-100',
  }

  return (
    <span
      className={cx([
        'inline-flex items-center font-medium rounded-full',
        sizeClassNames,
        colorMapper[color],
      ])}
    >
      {label}
    </span>
  )
}
