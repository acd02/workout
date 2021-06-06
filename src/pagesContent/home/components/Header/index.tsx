import { Badge } from 'components/atoms/Badge'
import type { WorkoutMachineState } from 'machines/workout/types'
import React from 'react'

type Props = {
  machineContext: WorkoutMachineState['context']
}

export function Header({ machineContext: { mode, speed } }: Props) {
  return (
    <div className="w-full text-center">
      <div className="text-xl font-medium leading-5 text-gray-900">
        <div className="flex flex-wrap items-center justify-center gap-1 mb-4">
          <Badge size="xl" label={mode ?? ''} color="orange" />
          {speed === 'double time' && <Badge size="xl" label={speed} color="yellow" />}
        </div>
        <div className="py">
          {mode === 'single' ? (
            <>💪</>
          ) : (
            <>
              💪 <span className="flip-x inline-block">💪</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
