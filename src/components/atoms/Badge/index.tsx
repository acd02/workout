import cx from 'classcat'
import React from 'react'
import { Colors } from 'theme'

type Props = { label: string; color: Colors; size?: 'xl' }

export function Badge({ label, color, size }: Props) {
  const sizeClassNames =
    size === 'xl' ? 'px-4 py-1 text-2xl leading-none' : 'px-3 py-0.5 text-lg leading-5'

  const colorMapper: Record<Colors, string> = {
    gray: 'text-gray-800 bg-gray-100',
    red: 'text-red-800 bg-red-100',
    orange: 'text-orange-800 bg-orange-100',
    yellow: 'text-yellow-800 bg-yellow-100',
    green: 'text-green-800 bg-green-100',
    teal: 'text-teal-800 bg-teal-100',
    blue: 'text-blue-800 bg-blue-100',
    indigo: 'text-indigo-800 bg-indigo-100',
    purple: 'text-purple-800 bg-purple-100',
    pink: 'text-pink-800 bg-pink-100',
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
