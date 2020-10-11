import cx from 'classcat'
import { Button } from 'components/atoms/Button'
import { WorkoutContext, WorkoutEvent } from 'machines/workout'
import React from 'react'
import { Interpreter, State } from 'xstate'

import { getNextStepLabel } from '../utils'
import styles from './styles.module.css'

type Props = {
  state: State<WorkoutContext, WorkoutEvent>
  send: Interpreter<WorkoutContext, UnknownObj, WorkoutEvent>['send']
}
export function NavigationButtons({ send, state }: Props) {
  const { matches, context } = state

  return (
    <div
      className={cx([
        styles.root,
        'flex flex-wrap items-baseline justify-center flex-basis-full',
      ])}
    >
      <Button
        outline
        disabled={matches('onGoingSet') && context.step === 1}
        innerBtnClassName="justify-center"
        label="PREVIOUS"
        color="orange"
        onClick={() => send('PREVIOUS')}
      />
      <Button
        innerBtnClassName="justify-center"
        label={getNextStepLabel(state)}
        color="orange"
        onClick={() => send('NEXT')}
      />
    </div>
  )
}
