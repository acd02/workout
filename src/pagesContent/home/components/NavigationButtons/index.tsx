import cx from 'classcat'
import { Button } from 'components/atoms/Button'
import type { Context, Send, State } from 'machines/workout'
import React from 'react'

import styles from './styles.module.css'
import { getNextStepLabel } from './utils'

type Props = {
  context: Context
  currentState: keyof State
  send: Send
}

export function NavigationButtons({ send, context, currentState }: Props) {
  return (
    <div
      className={cx([
        styles.root,
        'flex-basis-full flex flex-wrap items-baseline self-end justify-center',
      ])}
    >
      <Button
        outline
        disabled={currentState === 'onGoingSet' && context.step === 1}
        innerBtnClassName="justify-center"
        label="PREVIOUS"
        onClick={() => send({ type: 'PREVIOUS' })}
      />
      <Button
        innerBtnClassName="justify-center"
        label={getNextStepLabel({ currentState, context })}
        onClick={() => send({ type: 'NEXT' })}
      />
    </div>
  )
}
