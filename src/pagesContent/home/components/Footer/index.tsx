import type { WorkoutMachineState } from 'machines/workout/types'
import React from 'react'

type Props = {
  machineState: WorkoutMachineState
}

export function Footer({ machineState: { context, matches } }: Props) {
  const { mode, step, singleModeTotalSteps, normalModeTotalSteps } = context
  const totalStep = mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps
  const progress = 100 * ((matches('onGoingSet') ? step - 1 : step) / totalStep)

  const progressBar = (
    <div className="md:mb-8 flex w-1/2 h-2 mx-auto mb-4 overflow-hidden text-xs bg-orange-200 rounded">
      <div
        style={{ width: `${progress}%` }}
        className="whitespace-nowrap flex flex-col justify-center text-center text-white transition-all duration-75 bg-orange-500 shadow-none"
      />
    </div>
  )
  const content =
    step === totalStep ? (
      <>LAST STEP</>
    ) : (
      <>
        STEP: <span className="font-semibold text-orange-400">{step}</span> /{' '}
        {mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps}
      </>
    )

  return (
    <div className="w-full text-center">
      <div className="text-2xl font-medium leading-5 text-gray-900">
        {progressBar}
        {content}
      </div>
    </div>
  )
}
