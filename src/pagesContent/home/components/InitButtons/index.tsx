import { Button } from 'components/atoms/Button'
import type { WorkoutMachineSend } from 'machines/workout/types'
import React from 'react'

type Props = {
  send: WorkoutMachineSend
}

export function InitButtons({ send }: Props) {
  return (
    <div className="animate-fade-in">
      <Button
        className="mb-4"
        onClick={() => send({ type: 'START_SET', mode: 'single' })}
      >
        START SINGLE SIDE SET
      </Button>
      <br />
      <Button
        className="w-full"
        onClick={() => send({ type: 'START_SET', mode: 'normal' })}
      >
        START SET
      </Button>
    </div>
  )
}
