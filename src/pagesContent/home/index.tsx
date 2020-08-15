import { useMachine } from '@xstate/react'
import cx from 'classcat'
import { AnimateSwitch } from 'components/atoms/Animate'
import { MainLayout } from 'components/layouts/Main'
import { Stopwatch } from 'components/organisms/Stopwatch'
import { UndrawSvg } from 'illustrations/UndrawSvg'
import { WorkoutContext, WorkoutEvent, workoutMachine } from 'machines/workout'
import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { InitButtons } from './InitButtons'
import { NavigationButtons } from './NavigationButtons'

const ANIMATION_DURATION = 500

export function RenderHome() {
  const [state, send] = useMachine<WorkoutContext, WorkoutEvent>(workoutMachine)
  const { matches, context } = state

  const mainContent = (
    <div className="mb-2">
      <AnimateSwitch
        activeKey={matches('inBetweenSteps') ? 1 : 0}
        enterClassName="animate-fade-in"
        exitClassName="animate-fade-out"
        timeout={ANIMATION_DURATION}
        elementsTuple={[
          <UndrawSvg
            className={`mb-4 max-w-full ${
              context.speed === 'double time'
                ? 'animate-heartbeat-double-time'
                : 'animate-heartbeat'
            }`}
            width={500}
          />,
          <Stopwatch />,
        ]}
      />
    </div>
  )

  return (
    <MainLayout
      title="workout"
      description="workout"
      header={!matches('idle') && <Header context={context} />}
      footer={!matches('idle') && <Footer state={state} />}
    >
      <div
        className={cx([
          'flex flex-wrap items-center justify-center px-6',
          matches('idle') && 'row-span-3',
        ])}
      >
        {state.matches('idle') ? <InitButtons send={send} /> : mainContent}
        {!matches('idle') && <NavigationButtons send={send} state={state} />}
      </div>
    </MainLayout>
  )
}
