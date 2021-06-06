import cx from 'classcat'
import { Button } from 'components/atoms/Button'
import type { WorkoutMachineState } from 'machines/workout/types'
import React from 'react'

import styles from './styles.module.css'
import { getNextStepLabel } from './utils'

type Props = {
  machineState: WorkoutMachineState
  goToPrevStep: () => void
  goToNextStep: () => void
}

export function NavigationButtons({ goToNextStep, goToPrevStep, machineState }: Props) {
  const { context, matches } = machineState

  return (
    <div
      className={cx([styles.root, 'flex flex-wrap items-baseline justify-center w-full'])}
    >
      <Button
        outline
        disabled={matches('onGoingSet') && context.step === 1}
        onClick={goToPrevStep}
      >
        PREVIOUS
      </Button>
      <Button onClick={goToNextStep}>{getNextStepLabel(machineState)}</Button>
    </div>
  )
}
