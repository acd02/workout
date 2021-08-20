import { Button } from 'components/atoms/Button'
import type { WorkoutMachineState } from 'machines/workout/types'
import React, { useEffect, useRef } from 'react'

import { getNextStepLabel } from './utils'

type Props = {
  machineState: WorkoutMachineState
  goToPrevStep: () => void
  goToNextStep: () => void
}

export function NavigationButtons({ goToNextStep, goToPrevStep, machineState }: Props) {
  const { context, matches } = machineState

  useEffect(() => {
    nextBtnRef.current?.focus()
  }, [])

  const nextBtnRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex flex-wrap items-baseline justify-center w-full gap-4">
      <Button
        className="flex-grow-0 !w-[clamp(230px,50%,275px)]"
        outline
        disabled={matches('onGoingSet') && context.step === 1}
        onClick={goToPrevStep}
      >
        PREVIOUS
      </Button>
      <Button
        className="flex-grow-0 !w-[clamp(230px,50%,275px)]"
        ref={nextBtnRef}
        onClick={goToNextStep}
      >
        {getNextStepLabel(machineState)}
      </Button>
    </div>
  )
}
