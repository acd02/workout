import { Button } from 'components/atoms/Button'
import { WorkoutContext, WorkoutEvent } from 'machines/workout'
import React from 'react'
import { Interpreter } from 'xstate'

type Props = {
  send: Interpreter<WorkoutContext, UnknownObj, WorkoutEvent>['send']
}

export function InitButtons({ send }: Props) {
  return (
    <div className="animate-fade-in">
      <Button
        label="START SINGLE SIDE SET"
        color="orange"
        className="mb-4"
        onClick={() => send({ type: 'START_SET', mode: 'single' })}
      />
      <br />
      <Button
        label="START BOTH SIDES SET"
        color="orange"
        onClick={() => send({ type: 'START_SET', mode: 'both sides' })}
      />
    </div>
  )
}
