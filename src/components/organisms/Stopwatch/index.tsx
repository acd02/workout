import cx from 'classcat'
import { useEffectAfterMount } from 'hooks/useEffectAfterMount'
import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { toIntlNumberFormat } from './utils'

type Props = {
  shouldReset?: boolean
  limit?: number
}

export function Stopwatch({ shouldReset, limit = 60 }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(t => (t > 999 ? 0 : t + 1))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffectAfterMount({
    func: () => {
      !!shouldReset && setElapsedTime(0)
    },
    deps: [shouldReset],
  })

  const formattedElapsedTime =
    limit < elapsedTime ? (
      <>
        <span className="text-2xl">+</span> {toIntlNumberFormat(elapsedTime - limit)}
      </>
    ) : (
      toIntlNumberFormat(elapsedTime)
    )

  const classNames =
    'border-solid border-4 border-gray-700 rounded-full w-40 h-40 flex flex-wrap items-center justify-center text-6xl transition-colors duration-300'

  return (
    <div
      className={cx([
        classNames,
        styles.elapsedTime,
        limit < elapsedTime && 'border-red-400 text-red-400',
      ])}
    >
      {formattedElapsedTime}
    </div>
  )
}
