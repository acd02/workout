import { useMachine } from '@xstate/react'
import cx from 'classcat'
import { AnimateSwitchList } from 'components/atoms/Animate'
import { MainLayout } from 'components/layouts/Main'
import { Timer } from 'components/organisms/Timer'
import { useEffectAfterMount } from 'hooks/useEffectAfterMount'
import { UndrawSvg } from 'illustrations/UndrawSvg'
import { WorkoutContext, WorkoutEvent, workoutMachine } from 'machines/workout'
import React, { useRef } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { InitButtons } from './InitButtons'
import { NavigationButtons } from './NavigationButtons'

const ANIMATION_DURATION = 250

export function RenderHome() {
  const [state, send] = useMachine<WorkoutContext, WorkoutEvent>(workoutMachine)
  const { matches, context } = state

  const handleResetRef = useRef<() => void>()
  const isGoingToPrevStep = state.event.type === 'PREVIOUS'
  const limit = (() => {
    if (context.mode === 'single' && context.step === context.singleModeTotalSteps)
      return 60

    return context.mode === 'normal' ? 60 : 30
  })()

  useEffectAfterMount(() => {
    handleResetRef.current?.()
  }, [context.step])

  const mainContent = (
    <div className=" flex items-center justify-center mt-auto mb-2">
      <AnimateSwitchList
        shouldAnimateOnMount={true}
        activeIndex={matches('inBetweenSteps') ? 1 : 0}
        className="md:h-auto md:w-full w-4/5 h-48"
        enterClassName={
          isGoingToPrevStep ? 'animate-fade-in-right' : 'animate-fade-in-left'
        }
        exitClassName={
          isGoingToPrevStep ? 'animate-fade-out-left' : 'animate-fade-out-right'
        }
        duration={ANIMATION_DURATION}
        items={[
          <UndrawSvg
            className={`mb-4 max-w-full mx-auto ${
              context.speed === 'double time'
                ? 'animate-heartbeat-double-time'
                : 'animate-heartbeat'
            }`}
            width={500}
            height="inherit"
          />,
          <Timer limit={limit} handleResetRef={handleResetRef} />,
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
