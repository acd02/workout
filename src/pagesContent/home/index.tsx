import { useMachine } from '@xstate/react/fsm'
import cx from 'classcat'
import { MainLayout } from 'components/layouts/Main'
import { createWorkoutMachine } from 'machines/workout'
import type { WorkoutContext, WorkoutEvents, WorkoutState } from 'machines/workout/types'
import React, { useMemo } from 'react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InitButtons } from './components/InitButtons'
import { Main } from './components/Main'
import { NavigationButtons } from './components/NavigationButtons'

export function RenderHome() {
  const machine = useMemo(() => createWorkoutMachine(), [])
  const [machineState, send] = useMachine<WorkoutContext, WorkoutEvents, WorkoutState>(
    machine
  )

  const { context, matches } = machineState
  const events = {
    startSingleSet: () => send({ type: 'START_SET', mode: 'single' }),
    startSet: () => send({ type: 'START_SET', mode: 'normal' }),
    goToNextStep: () => send({ type: 'NEXT' }),
    goToPrevStep: () => send({ type: 'PREVIOUS' }),
  }

  const mainContent = (() => {
    switch (machineState.value) {
      case 'onGoingSet':
      case 'inBetweenSteps':
        return <Main machineState={machineState} />

      default:
        return (
          <InitButtons
            startSet={events.startSet}
            startSingleSet={events.startSingleSet}
          />
        )
    }
  })()

  const navigationButtons = !matches('idle') && (
    <NavigationButtons
      machineState={machineState}
      goToPrevStep={events.goToPrevStep}
      goToNextStep={events.goToNextStep}
    />
  )

  return (
    <MainLayout
      title="workout"
      description="workout"
      header={!matches('idle') && <Header machineContext={context} />}
      footer={!matches('idle') && <Footer machineState={machineState} />}
    >
      <div
        className={cx([
          'flex flex-col items-center justify-center px-6',
          matches('idle') && 'row-span-3',
        ])}
      >
        {mainContent}
        {navigationButtons}
      </div>
    </MainLayout>
  )
}
