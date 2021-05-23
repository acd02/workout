import cx from 'classcat'
import { MainLayout } from 'components/layouts/Main'
import type { Send } from 'machines/workout'
import { workoutMachine } from 'machines/workout'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { createUseMachine } from 'robot-hooks'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { InitButtons } from './components/InitButtons'
import type { Props as MainProps } from './components/Main'
import { NavigationButtons } from './components/NavigationButtons'

const DynamicMain = dynamic<MainProps>(() =>
  import('./components/Main').then(mod => mod.Main)
)

const useMachine = createUseMachine(useEffect, useState)

export function RenderHome() {
  const [state, untypedSend] = useMachine(workoutMachine)
  const send: Send = untypedSend
  const { context, name: currentState } = state

  return (
    <MainLayout
      title="workout"
      description="workout"
      header={currentState !== 'idle' && <Header context={context} />}
      footer={
        currentState !== 'idle' && (
          <Footer context={context} currentState={currentState} />
        )
      }
    >
      <div
        className={cx([
          'flex flex-wrap items-center justify-center px-6',
          currentState === 'idle' && 'row-span-3',
        ])}
      >
        {currentState === 'idle' ? (
          <InitButtons send={send} />
        ) : (
          <DynamicMain context={context} currentState={currentState} />
        )}
        {currentState !== 'idle' && (
          <NavigationButtons context={context} send={send} currentState={currentState} />
        )}
      </div>
    </MainLayout>
  )
}
