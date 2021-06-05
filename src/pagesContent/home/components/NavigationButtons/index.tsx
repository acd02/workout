import cx from 'classcat'
import { Button } from 'components/atoms/Button'
import type { WorkoutMachineSend, WorkoutMachineState } from 'machines/workout/types'
import React from 'react'

import styles from './styles.module.css'
import { getNextStepLabel } from './utils'

type Props = {
  machineState: WorkoutMachineState
  send: WorkoutMachineSend
}

export function NavigationButtons({ send, machineState }: Props) {
  const { context, matches } = machineState

  return (
    <div
      className={cx([
        styles.root,
        'flex-basis-full flex flex-wrap items-baseline self-end justify-center',
      ])}
    >
      <Button
        outline
        disabled={matches('onGoingSet') && context.step === 1}
        onClick={() => send({ type: 'PREVIOUS' })}
      >
        PREVIOUS
      </Button>
      <Button onClick={() => send({ type: 'NEXT' })}>
        {getNextStepLabel(machineState)}
      </Button>
    </div>
  )
}
