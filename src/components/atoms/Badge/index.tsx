import React from 'react'
import { Colors } from 'theme'

type Props = { label: string; color: Colors }

export function Badge({ label, color }: Props) {
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-lg font-medium leading-5 bg-${color}-100 text-${color}-800`}
    >
      {label}
    </span>
  )
}
