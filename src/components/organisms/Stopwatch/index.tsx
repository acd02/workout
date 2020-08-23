import cx from 'classcat'
import React, { useEffect, useState } from 'react'

import { toIntlNumberFormat } from './utils'

type Props = {
  limit?: number
}

export function Stopwatch({ limit = 60 }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0)

  function incrementElapsedTime() {
    setElapsedTime(t => (t > 999 ? 0 : t + 1))
  }

  useEffect(() => {
    const intervalId = setInterval(incrementElapsedTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const formattedElapsedTime =
    limit < elapsedTime ? (
      <>
        <span className="text-2xl">+</span> {toIntlNumberFormat(elapsedTime - limit)}
      </>
    ) : (
      toIntlNumberFormat(elapsedTime)
    )

  const classNames =
    'tabular-nums border-solid border-4 border-gray-700 rounded-full w-40 h-40 flex flex-wrap items-center justify-center text-6xl transition-colors duration-300'

  return (
    <div
      className={cx([classNames, limit < elapsedTime && 'border-red-400 text-red-400'])}
    >
      {formattedElapsedTime}
    </div>
  )
}
