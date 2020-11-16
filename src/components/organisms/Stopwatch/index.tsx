import { when } from 'acd-utils'
import cx from 'classcat'
import { useEffectAfterMount } from 'hooks/useEffectAfterMount'
import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.css'
import { setProgress, toIntlNumberFormat } from './utils'

type Props = {
  limit?: number
}

export function Stopwatch({ limit = 60 }: Props) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const circleRef = useRef<SVGCircleElement>(null)
  const circumferenceRef = useRef(0)

  function incrementElapsedTime() {
    setElapsedTime(t => (t > 999 ? 0 : t + 1))
  }

  useEffect(() => {
    when(circleRef.current).map(circle => {
      const radius = circle.r.baseVal.value
      circumferenceRef.current = radius * 2 * Math.PI

      /* eslint-disable-next-line fp/no-mutation */
      circle.style.strokeDasharray = `${circumferenceRef.current} ${circumferenceRef.current}`
      /* eslint-disable-next-line fp/no-mutation */
      circle.style.strokeDashoffset = `${circumferenceRef.current}`
    })

    const intervalId = setInterval(incrementElapsedTime, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffectAfterMount(() => {
    elapsedTime <= limit &&
      setProgress({
        circle: circleRef.current,
        circumference: circumferenceRef.current,
        percent: (elapsedTime / limit) * 100,
      })
  }, [elapsedTime])

  const formattedElapsedTime =
    limit < elapsedTime ? (
      <>
        <span className="text-2xl">+</span> {toIntlNumberFormat(elapsedTime - limit)}
      </>
    ) : (
      toIntlNumberFormat(elapsedTime)
    )

  const backgroundCircle = (
    <circle
      className={styles.backgroundCircle}
      strokeWidth="2"
      fill="transparent"
      r="48"
      cx="50"
      cy="50"
    />
  )

  const foregroundCircle = (
    <circle
      ref={circleRef}
      className={cx([
        elapsedTime > 0 && styles.circle,
        elapsedTime > limit ? styles.strokeIsOverLimit : styles.stroke,
      ])}
      strokeWidth="2"
      strokeLinecap="round"
      fill="transparent"
      r="48"
      cx="50"
      cy="50"
    />
  )

  return (
    <div className="relative mx-auto w-64">
      <svg viewBox="0 0 100 100" className="transform -rotate-90">
        {backgroundCircle}
        {foregroundCircle}
      </svg>
      <span
        className={cx([
          'flex items-center absolute top-50 left-50 transform -translate-y-1/2 -translate-x-1/2 tabular-nums text-6xl transition-colors duration-300',
          limit < elapsedTime && 'text-red-400',
        ])}
      >
        {formattedElapsedTime}
      </span>
    </div>
  )
}
