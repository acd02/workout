import { useMachine } from '@xstate/react'
import { Button } from 'components/atoms/Button'
import { MainLayout } from 'components/layouts/Main'
import { Stopwatch } from 'components/organisms/Stopwatch'
import { WorkoutContext, WorkoutEvent, workoutMachine } from 'machines/workout'
import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import styles from './styles.module.css'
import { UndrawSvg } from './UndrawSvg'
import { getNextStepLabel } from './utils'

export function RenderHome() {
  const [state, send] = useMachine<WorkoutContext, WorkoutEvent>(workoutMachine)

  const initButtons = state.matches('idle') && (
    <div className="self-center">
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

  const mainContent = !state.matches('idle') && (
    <div className="mb-2">
      {state.matches('onGoingSet') && (
        <UndrawSvg className={`${styles.heartbeat} mb-4 max-w-full`} width={500} />
      )}
      {state.matches('inBetweenSteps') && <Stopwatch />}
    </div>
  )

  const navigationButtons = !state.matches('idle') && (
    <div className="w-full flex flex-wrap justify-center mt-4">
      <Button
        disabled={state.matches('onGoingSet') && state.context.step === 1}
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
      header={!state.matches('idle') && <Header context={state.context} />}
      footer={!state.matches('idle') && <Footer context={state.context} />}
    >
      <div className="flex flex-wrap h-full items-center justify-center">
        {initButtons}
        {mainContent}
        {navigationButtons}
      </div>
    </MainLayout>
  )
}
