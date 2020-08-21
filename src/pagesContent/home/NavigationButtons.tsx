import { Button } from 'components/atoms/Button'
import { WorkoutContext, WorkoutEvent } from 'machines/workout'
import React from 'react'
import { Interpreter, State } from 'xstate'

import { getNextStepLabel } from './utils'

type Props = {
  state: State<WorkoutContext, WorkoutEvent>
  send: Interpreter<WorkoutContext, UnknownObj, WorkoutEvent>['send']
}
export function NavigationButtons({ send, state }: Props) {
  const { matches, context } = state

  return (
    <div className="w-full flex flex-wrap justify-center mt-4">
      <Button
        disabled={matches('onGoingSet') && context.step === 1}
        className="w-full mb-8 md:w-auto md:mb-0 md:mr-8"
        innerBtnClassName="justify-center"
        label="PREVIOUS"
        color="orange"
        onClick={() => send('PREVIOUS')}
      />
      <Button
        className="w-full md:w-auto"
        innerBtnClassName="justify-center"
        label={getNextStepLabel(state)}
        color="orange"
        onClick={() => send('NEXT')}
      />
    </div>
  )
}
