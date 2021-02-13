import { useMachine } from '@xstate/react'
import cx from 'classcat'
import { AnimateSwitchList } from 'components/atoms/Animate'
import { MainLayout } from 'components/layouts/Main'
import { Timer } from 'components/organisms/Timer'
import { UndrawSvg } from 'illustrations/UndrawSvg'
import { WorkoutContext, WorkoutEvent, workoutMachine } from 'machines/workout'
import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { InitButtons } from './InitButtons'
import { NavigationButtons } from './NavigationButtons'

const ANIMATION_DURATION = 250

export function RenderHome() {
  const [state, send] = useMachine<WorkoutContext, WorkoutEvent>(workoutMachine)
  const { matches, context } = state

  const isGoingToPrevStep = state.event.type === 'PREVIOUS'
  const limit = (() => {
    if (context.mode === 'single' && context.step === context.singleModeTotalSteps)
      return 60

    return context.mode === 'normal' ? 60 : 30
  })()

  const mainContent = (
    <div className="md:h-auto flex items-center h-56 mt-auto mb-2">
      <AnimateSwitchList
        shouldAnimateOnMount={true}
        activeIndex={matches('inBetweenSteps') ? 1 : 0}
        enterClassName={
          isGoingToPrevStep ? 'animate-fade-in-right' : 'animate-fade-in-left'
        }
        exitClassName={
          isGoingToPrevStep ? 'animate-fade-out-left' : 'animate-fade-out-right'
        }
        duration={ANIMATION_DURATION}
        items={[
          <UndrawSvg
            className={`mb-4 max-w-full mx-auto w-4/5 md:w-full ${
              context.speed === 'double time'
                ? 'animate-heartbeat-double-time'
                : 'animate-heartbeat'
            }`}
            width={500}
          />,
          <Timer limit={limit} step={context.step} />,
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
