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
        label="START SINGLE SIDE SET"
        color="orange"
        className="mb-4"
        onClick={() => send({ type: 'START_SET', mode: 'single' })}
      />
      <br />
      <Button
        className="w-full"
        innerBtnClassName="justify-center"
        label="START SET"
        color="orange"
        onClick={() => send({ type: 'START_SET', mode: 'normal' })}
      />
    </div>
  )
}
