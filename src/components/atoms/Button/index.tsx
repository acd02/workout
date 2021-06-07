import cx from 'classcat'
import React, { ComponentPropsWithoutRef, forwardRef, Ref } from 'react'

type Props = {
  outline?: boolean
  className?: string
}

function _Button(
  {
    disabled,
    outline,
    className,
    children,
    ...rest
  }: Props & ComponentPropsWithoutRef<'button'>,
  ref: Ref<HTMLButtonElement>
) {
  const commonStyles =
    'focus:outline-none focus:ring-2 focus:ring-opacity-50 inline-flex justify-center items-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out border border-transparent rounded-md ring-offset-2'

  const solidStyles = 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500'

  const outlinedStyles =
    'hover:bg-orange-100 focus:ring-orange-500 text-orange-500 bg-transparent border-orange-500'

  return (
    <button
      ref={ref}
      {...rest}
      disabled={disabled}
      type="button"
      className={cx([
        commonStyles,
        outline ? outlinedStyles : solidStyles,
        className,
        disabled && 'opacity-50 cursor-not-allowed',
      ])}
    >
      {children}
    </button>
  )
}

const Button = forwardRef(_Button)

export { Button }
