import { AnimateSwitch } from 'components/atoms/Animate'
import { initialTimerState, Timer, timerReducer } from 'components/organisms/Timer'
import { useEffectAfterMount } from 'hooks/useEffectAfterMount'
import { UndrawSvg } from 'illustrations/UndrawSvg'
import type { WorkoutMachineState } from 'machines/workout/types'
import React, { useReducer } from 'react'

const ANIMATION_DURATION = 250

type Props = {
  machineState: WorkoutMachineState
}

export function Main({ machineState }: Props) {
  const { context, matches } = machineState
  const { mode, navigation, step, singleModeTotalSteps, speed } = context
  const [timerState, timerDispatch] = useReducer(timerReducer, initialTimerState)

  const isGoingBackwards = navigation === 'backwards'
  const limit = (() => {
    if (mode === 'single' && step === singleModeTotalSteps) return 60

    return mode === 'normal' ? 60 : 30
  })()

  useEffectAfterMount(() => {
    timerDispatch({ type: 'RESET_ELAPSED_TIME' })
  }, [machineState.value])

  return (
    <div className=" flex items-center justify-center py-1 my-auto">
      <AnimateSwitch
        shouldAnimateOnMount={true}
        activeIndex={matches('inBetweenSteps') ? 1 : 0}
        className="md:h-auto h-48"
        enterClassName={
          isGoingBackwards ? 'animate-fade-in-left' : 'animate-fade-in-right'
        }
        exitClassName={
          isGoingBackwards ? 'animate-fade-out-right' : 'animate-fade-out-left'
        }
        duration={ANIMATION_DURATION}
      >
        <UndrawSvg
          className={`mb-4 max-w-full mx-auto ${
            speed === 'double time'
              ? 'animate-heartbeat-double-time'
              : 'animate-heartbeat'
          }`}
          width={500}
          height="inherit"
        />
        <Timer limit={limit} state={timerState} dispatch={timerDispatch} />
      </AnimateSwitch>
    </div>
  )
}
