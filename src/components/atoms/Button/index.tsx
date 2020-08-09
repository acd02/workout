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
  return (
    <span className={cx(['inline-flex rounded-md shadow-sm', className])}>
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={cx([
          `inline-flex items-center w-full  px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-${color}-500 hover:bg-${color}-400 focus:outline-none focus:border-${color}-600 focus:shadow-outline-${color} active:bg-${color}-600 transition ease-in-out duration-150`,
          innerBtnClassName,
          disabled && 'opacity-50 cursor-not-allowed',
        ])}
      >
        {label}
      </button>
    </span>
  )
}
