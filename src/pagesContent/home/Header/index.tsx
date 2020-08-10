import { Badge } from 'components/atoms/Badge'
import { WorkoutContext } from 'machines/workout'
import React from 'react'

type Props = {
  context: WorkoutContext
}

export function Header({ context }: Props) {
  return (
    <div className="w-full text-center">
      <div className="text-gray-900 text-xl leading-5 font-medium">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-1">
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
