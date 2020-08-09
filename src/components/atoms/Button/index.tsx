import cx from 'classcat'
import React from 'react'
import { Colors } from 'theme'

type Props = {
  label: string
  color: Colors
  onClick: () => void
  disabled?: boolean
  className?: string
  innerBtnClassName?: string
}

export function Button({
  label,
  color,
  disabled,
  onClick,
  className,
  innerBtnClassName,
}: Props) {
  const commonBtnClassNames =
    'inline-flex items-center w-full  px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white transition ease-in-out duration-150 focus:outline-none'

  const colorMapper: Record<Colors, string> = {
    gray:
      'bg-gray-500 hover:bg-gray-400 focus:border-gray-600 focus:shadow-outline-gray active:bg-gray-600',
    red:
      'bg-red-500 hover:bg-red-400 focus:border-red-600 focus:shadow-outline-red active:bg-red-600',
    orange:
      'bg-orange-500 hover:bg-orange-400 focus:border-orange-600 focus:shadow-outline-orange active:bg-orange-600',
    yellow:
      'bg-yellow-500 hover:bg-yellow-400 focus:border-yellow-600 focus:shadow-outline-yellow active:bg-yellow-600',
    green:
      'bg-green-500 hover:bg-green-400 focus:border-green-600 focus:shadow-outline-green active:bg-green-600',
    teal:
      'bg-teal-500 hover:bg-teal-400 focus:border-teal-600 focus:shadow-outline-teal active:bg-teal-600',
    blue:
      'bg-blue-500 hover:bg-blue-400 focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600',
    indigo:
      'bg-indigo-500 hover:bg-indigo-400 focus:border-indigo-600 focus:shadow-outline-indigo active:bg-indigo-600',
    purple:
      'bg-purple-500 hover:bg-purple-400 focus:border-purple-600 focus:shadow-outline-purple active:bg-purple-600',
    pink:
      'bg-pink-500 hover:bg-pink-400 focus:border-pink-600 focus:shadow-outline-pink active:bg-pink-600',
  }

  return (
    <span className={cx(['inline-flex rounded-md shadow-sm', className])}>
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={cx([
          commonBtnClassNames,
          colorMapper[color],
          innerBtnClassName,
          disabled && 'opacity-50 cursor-not-allowed',
        ])}
      >
        {label}
      </button>
    </span>
  )
}
