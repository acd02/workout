import { Button } from 'components/atoms/Button'
import type { Send } from 'machines/workout'
import React from 'react'

type Props = {
  send: Send
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
