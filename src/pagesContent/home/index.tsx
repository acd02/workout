import { useMachine } from '@xstate/react/fsm'
import cx from 'classcat'
import { MainLayout } from 'components/layouts/Main'
import { workoutMachine } from 'machines/workout'
import type { WorkoutContext, WorkoutEvent, WorkoutState } from 'machines/workout/types'
import dynamic from 'next/dynamic'
import React from 'react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InitButtons } from './components/InitButtons'
import type { Props as MainProps } from './components/Main'
import { NavigationButtons } from './components/NavigationButtons'

const DynamicMain = dynamic<MainProps>(() =>
  import('./components/Main').then(mod => mod.Main)
)

export function RenderHome() {
  const [machineState, send] = useMachine<WorkoutContext, WorkoutEvent, WorkoutState>(
    workoutMachine
  )

  const { context } = machineState

  return (
    <MainLayout
      title="workout"
      description="workout"
      header={!machineState.matches('idle') && <Header context={context} />}
      footer={!machineState.matches('idle') && <Footer machineState={machineState} />}
    >
      <div
        className={cx([
          'flex flex-wrap items-center justify-center px-6',
          machineState.matches('idle') && 'row-span-3',
        ])}
      >
        {machineState.matches('idle') ? (
          <InitButtons send={send} />
        ) : (
          <DynamicMain machineState={machineState} />
        )}
        {!machineState.matches('idle') && (
          <NavigationButtons machineState={machineState} send={send} />
        )}
      </div>
    </MainLayout>
  )
}
