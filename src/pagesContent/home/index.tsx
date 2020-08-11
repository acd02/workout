import { useMachine } from '@xstate/react'
import cx from 'classcat'
import { Button } from 'components/atoms/Button'
import { MainLayout } from 'components/layouts/Main'
import { Stopwatch } from 'components/organisms/Stopwatch'
import { WorkoutContext, WorkoutEvent, workoutMachine } from 'machines/workout'
import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { UndrawSvg } from './UndrawSvg'
import { getNextStepLabel } from './utils'

export function RenderHome() {
  const [state, send] = useMachine<WorkoutContext, WorkoutEvent>(workoutMachine)
  const { matches, context } = state

  const initButtons = matches('idle') && (
    <div>
      <Button
        label="START SINGLE SIDE SET"
        color="orange"
        className="mb-4"
        onClick={() => send({ type: 'START_SET', mode: 'single' })}
      />
      <br />
      <Button
        label="START BOTH SIDES SET"
        color="orange"
        onClick={() => send({ type: 'START_SET', mode: 'both sides' })}
      />
    </div>
  )

  const mainContent = !matches('idle') && (
    <div className="mb-2">
      {matches('onGoingSet') && (
        <UndrawSvg
          className={`mb-4 max-w-full ${
            context.speed === 'double time'
              ? 'animate-heartbeat-double-time'
              : 'animate-heartbeat'
          }`}
          width={500}
        />
      )}
      {matches('inBetweenSteps') && <Stopwatch />}
    </div>
  )

  const navigationButtons = !matches('idle') && (
    <div className="w-full flex flex-wrap justify-center mt-4">
      <Button
        disabled={matches('onGoingSet') && context.step === 1}
        className="w-full mb-8 md:w-auto md:mb-0 md:mr-8"
        innerBtnClassName="justify-center"
        label="PREVIOUS"
        color="orange"
        onClick={() => send('PREVIOUS')}
      />
      <Button
        className="w-full md:w-auto"
        innerBtnClassName="justify-center"
        label={getNextStepLabel(state)}
        color="orange"
        onClick={() => send('NEXT')}
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
        {initButtons}
        {mainContent}
        {navigationButtons}
      </div>
    </MainLayout>
  )
}
