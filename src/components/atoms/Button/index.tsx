import cx from 'classcat'
import React from 'react'
import { Colors } from 'theme'

type Props = {
  label: string
  color: Colors
  onClick: () => void
  disabled?: boolean
  outline?: boolean
  className?: string
  innerBtnClassName?: string
}

export function Button({
  label,
  color,
  disabled,
  outline,
  onClick,
  className,
  innerBtnClassName,
}: Props) {
  const commonBtnClassNames =
    'focus:outline-none focus:ring-2 focus:ring-opacity-50 inline-flex items-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md'

  const colorMapper: Record<Colors, string> = {
    gray: 'hover:bg-gray-400 focus:ring-gray-600 active:bg-gray-600 bg-gray-500',
    red: 'hover:bg-red-400 focus:ring-red-600 active:bg-red-600 bg-red-500',
    orange:
      'hover:bg-orange-400 focus:ring-orange-600 active:bg-orange-600 bg-orange-500',
    yellow:
      'hover:bg-yellow-400 focus:ring-yellow-600 active:bg-yellow-600 bg-yellow-500',
    green: 'hover:bg-green-400 focus:ring-green-600 active:bg-green-600 bg-green-500',
    teal: 'hover:bg-teal-400 focus:ring-teal-600 active:bg-teal-600 bg-teal-500',
    blue: 'hover:bg-blue-400 focus:ring-blue-600 active:bg-blue-600 bg-blue-500',
    indigo:
      'hover:bg-indigo-400 focus:ring-indigo-600 active:bg-indigo-600 bg-indigo-500',
    purple:
      'hover:bg-purple-400 focus:ring-purple-600 active:bg-purple-600 bg-purple-500',
    pink: 'hover:bg-pink-400 focus:ring-pink-600 active:bg-pink-600 bg-pink-500',
  }

  const outlineColorMapper: Record<Colors, string> = {
    gray:
      'hover:bg-gray-100 focus:ring-gray-600 active:bg-gray-600 text-gray-500 bg-transparent border-gray-500',
    red:
      'hover:bg-red-100 focus:ring-red-600 active:bg-red-600 text-red-500 bg-transparent border-red-500',
    orange:
      'hover:bg-orange-100 focus:ring-orange-600 active:bg-orange-600 text-orange-500 bg-transparent border-orange-500',
    yellow:
      'hover:bg-yellow-100 focus:ring-yellow-600 active:bg-yellow-600 text-yellow-500 bg-transparent border-yellow-500',
    green:
      'hover:bg-green-100 focus:ring-green-600 active:bg-green-600 text-green-500 bg-transparent border-green-500',
    teal:
      'hover:bg-teal-100 focus:ring-teal-600 active:bg-teal-600 text-teal-500 bg-transparent border-teal-500',
    blue:
      'hover:bg-blue-100 focus:ring-blue-600 active:bg-blue-600 text-blue-500 bg-transparent border-blue-500',
    indigo:
      'hover:bg-indigo-100 focus:ring-indigo-600 active:bg-indigo-600 text-indigo-500 bg-transparent border-indigo-500',
    purple:
      'hover:bg-purple-100 focus:ring-purple-600 active:bg-purple-600 text-purple-500 bg-transparent border-purple-500',
    pink:
      'hover:bg-pink-100 focus:ring-pink-600 active:bg-pink-600 text-pink-500 bg-transparent border-pink-500',
  }

  return (
    <span className={cx(['inline-flex rounded-md shadow-sm', className])}>
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={cx([
          commonBtnClassNames,
          outline ? outlineColorMapper[color] : colorMapper[color],
          innerBtnClassName,
          disabled && 'opacity-50 cursor-not-allowed',
        ])}
      >
        {label}
      </button>
    </span>
  )
}
