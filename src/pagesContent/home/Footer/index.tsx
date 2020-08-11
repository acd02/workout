import { WorkoutContext, WorkoutEvent } from 'machines/workout'
import React from 'react'
import { State } from 'xstate'

type DisplayBottomInfoProps = {
  state: State<WorkoutContext, WorkoutEvent>
}

export function Footer({ state }: DisplayBottomInfoProps) {
  const { mode, step } = state.context
  const totalStep = mode === 'single' ? 8 : 4
  const progress = 100 * ((state.matches('onGoingSet') ? step - 1 : step) / totalStep)

  const progressBar = (
    <div className="overflow-hidden mx-auto h-2 mb-4 md:mb-8 text-xs flex rounded bg-orange-200 w-1/2">
      <div
        style={{ width: `${progress}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-75"
      />
    </div>
  )
  const content =
    step === totalStep ? (
      <>LAST STEP</>
    ) : (
      <>
        STEP: <span className="text-orange-400 font-semibold">{step}</span> /{' '}
        {mode === 'single' ? '8' : '4'}
      </>
    )

  return (
    <div className="w-full text-center">
      <div className="text-gray-900 text-2xl leading-5 font-medium">
        {progressBar}
        {content}
      </div>
    </div>
  )
}
