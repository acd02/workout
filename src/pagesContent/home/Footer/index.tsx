import { WorkoutContext } from 'machines/workout'
import React from 'react'

type DisplayBottomInfoProps = {
  context: WorkoutContext
}

export function Footer({ context }: DisplayBottomInfoProps) {
  const limit = context.mode === 'single' ? 8 : 4

  const content =
    context.step === limit ? (
      <>LAST STEP</>
    ) : (
      <>
        STEP: <span className="text-orange-400 font-semibold">{context.step}</span> /{' '}
        {context.mode === 'single' ? '8' : '4'}
      </>
    )

  return (
    <div className="w-full text-center">
      <div className="text-gray-900 text-2xl leading-5 font-medium">{content}</div>
    </div>
  )
}
