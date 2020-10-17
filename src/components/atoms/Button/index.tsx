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
    'inline-flex items-center w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white transition ease-in-out duration-150 focus:outline-none focus:shadow-outline'

  const colorMapper: Record<Colors, string> = {
    gray: 'bg-gray-500 hover:bg-gray-400 focus:border-gray-600 active:bg-gray-600',
    red: 'bg-red-500 hover:bg-red-400 focus:border-red-600 active:bg-red-600',
    orange:
      'bg-orange-500 hover:bg-orange-400 focus:border-orange-600 active:bg-orange-600',
    yellow:
      'bg-yellow-500 hover:bg-yellow-400 focus:border-yellow-600 active:bg-yellow-600',
    green: 'bg-green-500 hover:bg-green-400 focus:border-green-600 active:bg-green-600',
    teal: 'bg-teal-500 hover:bg-teal-400 focus:border-teal-600 active:bg-teal-600',
    blue: 'bg-blue-500 hover:bg-blue-400 focus:border-blue-600 active:bg-blue-600',
    indigo:
      'bg-indigo-500 hover:bg-indigo-400 focus:border-indigo-600 active:bg-indigo-600',
    purple:
      'bg-purple-500 hover:bg-purple-400 focus:border-purple-600 active:bg-purple-600',
    pink: 'bg-pink-500 hover:bg-pink-400 focus:border-pink-600 active:bg-pink-600',
  }

  const outlineColorMapper: Record<Colors, string> = {
    gray:
      'bg-gray-200 hover:bg-gray-100 focus:border-gray-600 active:bg-gray-600 text-gray-500',
    red:
      'bg-red-200 hover:bg-red-100 focus:border-red-600 active:bg-red-600 text-red-500',
    orange:
      'bg-transparent hover:bg-orange-100 focus:border-orange-600 active:bg-orange-600 text-orange-500 border-orange-500',
    yellow:
      'bg-transparent hover:bg-yellow-100 focus:border-yellow-600 active:bg-yellow-600 text-yellow-500 border-yellow-500',
    green:
      'bg-transparent hover:bg-green-100 focus:border-green-600 active:bg-green-600 text-green-500 border-green-500',
    teal:
      'bg-transparent hover:bg-teal-100 focus:border-teal-600 active:bg-teal-600 text-teal-500 border-teal-500',
    blue:
      'bg-transparent hover:bg-blue-100 focus:border-blue-600 active:bg-blue-600 text-blue-500 border-blue-500',
    indigo:
      'bg-transparent hover:bg-indigo-100 focus:border-indigo-600 active:bg-indigo-600 text-indigo-500 border-indigo-500',
    purple:
      'bg-transparent hover:bg-purple-100 focus:border-purple-600 active:bg-purple-600 text-purple-500 border-purple-500',
    pink:
      'bg-transparent hover:bg-pink-100 focus:border-pink-600 active:bg-pink-600 text-pink-500 border-pink-500',
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
