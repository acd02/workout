import { when } from 'acd-utils'
import cx from 'classcat'
import { useEffectAfterMount } from 'hooks/useEffectAfterMount'
import React, { Dispatch, ReactElement, useEffect, useRef } from 'react'

import type { Action, State } from './reducer/types'
import styles from './styles.module.css'
import { setProgress, toIntlNumberFormat } from './utils'

type Props = {
  state: State
  dispatch: Dispatch<Action>
  limit?: number
}

export { reducer as timerReducer, initialState as initialTimerState } from './reducer'

export const Timer = ({ limit = 60, state, dispatch }: Props): ReactElement => {
  const { elapsedTime } = state
  const circleRef = useRef<SVGCircleElement>(null)
  const circumferenceRef = useRef(0)

  function incrementElapsedTime() {
    dispatch({ type: 'INCREMENT_ELAPSED_TIME' })
  }

  useEffect(() => {
    when(circleRef.current).map(circle => {
      const radius = circle.r.baseVal.value
      circumferenceRef.current = radius * 2 * Math.PI

      /* eslint-disable-next-line fp/no-mutation */
      circle.style.strokeDasharray = `${circumferenceRef.current} ${circumferenceRef.current}`
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
      toIntlNumberFormat(limit - elapsedTime)
    )

  const backgroundCircle = (
    <circle
      className={cx([styles.backgroundCircle, elapsedTime > limit && styles.isOverLimit])}
      strokeWidth="2"
      stroke="blue"
      fill="transparent"
      r="48"
      cx="50"
      cy="50"
    />
  )

  const foregroundCircle = (
    <circle
      ref={circleRef}
      className={styles.foregroundCircle}
      strokeWidth="2"
      strokeLinecap="round"
      fill="transparent"
      r="48"
      cx="50"
      cy="50"
    />
  )

  return (
    <div className="md:w-64 relative w-48 mx-auto">
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
