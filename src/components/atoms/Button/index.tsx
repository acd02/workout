import cx from 'classcat'
import React from 'react'

type Props = {
  label: string
  onClick: () => void
  disabled?: boolean
  outline?: boolean
  className?: string
  innerBtnClassName?: string
}

export function Button({
  label,
  disabled,
  outline,
  onClick,
  className,
  innerBtnClassName,
}: Props) {
  const commonStyles =
    'focus:outline-none focus:ring-2 focus:ring-opacity-50 inline-flex items-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md ring-offset-2'

  const colorStyles = 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500'

  const outlinedStyles =
    'hover:bg-orange-100 focus:ring-orange-500 text-orange-500 bg-transparent border-orange-500'

  return (
    <span className={cx(['inline-flex rounded-md shadow-sm', className])}>
      <button
        disabled={disabled}
        onClick={onClick}
        type="button"
        className={cx([
          commonStyles,
          outline ? outlinedStyles : colorStyles,
          innerBtnClassName,
          disabled && 'opacity-50 cursor-not-allowed',
        ])}
      >
        {label}
      </button>
    </span>
  )
}
