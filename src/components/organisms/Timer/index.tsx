import cx from 'classcat'
import { useEffectAfterMount } from 'hooks/useEffectAfterMount'
import React, { Dispatch, ReactElement, useEffect, useRef } from 'react'

import type { Action, State } from './reducer/types'
import { getOffsetValue, toIntlNumberFormat } from './utils'

type Props = {
  state: State
  dispatch: Dispatch<Action>
  limit?: number
}

export { reducer as timerReducer, initialState as initialTimerState } from './reducer'

export function Timer({ limit = 60, state, dispatch }: Props): ReactElement {
  const { elapsedTime } = state
  const circleRef = useRef<SVGCircleElement>(null)
  const circumferenceRef = useRef(0)
  const timeoutIdRef = useRef<NodeJS.Timeout>()

  function incrementElapsedTime() {
    timeoutIdRef.current = setTimeout(() => {
      dispatch({ type: 'INCREMENT_ELAPSED_TIME' })
      incrementElapsedTime()
    }, 1000)
  }

  useEffect(() => {
    if (!circleRef.current) return

    const radius = circleRef.current.r.baseVal.value
    circumferenceRef.current = radius * 2 * Math.PI

    circleRef.current.style.strokeDasharray = `${circumferenceRef.current} ${circumferenceRef.current}`

    incrementElapsedTime()

    return () => clearTimeout(timeoutIdRef.current!)
  }, [])

  useEffectAfterMount(() => {
    if (!circleRef.current || elapsedTime > limit) return

    circleRef.current.style.strokeDashoffset = getOffsetValue({
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

  const circleAttrs = {
    fill: 'transparent',
    r: '48',
    cx: '50',
    cy: '50',
    strokeWidth: 2,
  }

  const backgroundCircle = (
    <circle
      className={cx([
        'stroke-current ',
        elapsedTime > limit ? 'text-red-400' : 'text-gray-200',
      ])}
      {...circleAttrs}
    />
  )

  const foregroundCircle = (
    <circle
      ref={circleRef}
      className={
        'duration-1000 ease-linear transition-all stroke-current text-orange-500'
      }
      strokeLinecap="round"
      {...circleAttrs}
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
          'flex items-center absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 tabular-nums text-6xl transition-colors duration-300',
          limit < elapsedTime && 'text-red-400',
        ])}
      >
        {formattedElapsedTime}
      </span>
    </div>
  )
}
