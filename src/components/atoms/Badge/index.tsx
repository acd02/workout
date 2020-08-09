import React from 'react'
import { Colors } from 'theme'

type Props = { label: string; color: Colors }

export function Badge({ label, color }: Props) {
  const commonClassNames =
    'inline-flex items-center px-3 py-0.5 rounded-full text-lg font-medium leading-5'

  const colorMapper: Record<Colors, string> = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    teal: 'bg-teal-100 text-teal-800',
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  }

  return <span className={`${commonClassNames} ${colorMapper[color]}`}>{label}</span>
}
