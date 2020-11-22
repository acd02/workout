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
        {mode === 'single' ? '8' : '4'}
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
