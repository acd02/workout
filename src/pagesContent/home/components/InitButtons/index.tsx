import { Button } from 'components/atoms/Button'
import React from 'react'

type Props = {
  startSingleSet: () => void
  startSet: () => void
}

export function InitButtons({ startSet, startSingleSet }: Props) {
  return (
    <div className="animate-fade-in">
      <Button className="mb-4" onClick={startSingleSet}>
        START SINGLE SIDE SET
      </Button>
      <br />
      <Button className="w-full" onClick={startSet}>
        START SET
      </Button>
    </div>
  )
}
