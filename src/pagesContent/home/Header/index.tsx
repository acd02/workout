import { Badge } from 'components/atoms/Badge'
import { WorkoutContext } from 'machines/workout'
import React from 'react'

type Props = {
  context: WorkoutContext
}

export function Header({ context }: Props) {
  return (
    <div className="w-full text-center">
      <div className="text-xl font-medium leading-5 text-gray-900">
        <div className="flex flex-wrap items-center justify-center gap-1 mb-4">
          <Badge size="xl" label={context.mode ?? ''} color="orange" />
          {context.speed === 'double time' && (
            <Badge size="xl" label={context.speed} color="yellow" />
          )}
        </div>
        <div className="py">
          {context.mode === 'single' ? (
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
