import { assign, StateMachine } from '@xstate/fsm'

import type { WorkoutContext, WorkoutEvents } from './types'

const ACTIONS = {
  incrementStep: 'incrementStep',
  decrementStep: 'decrementStep',
  setMode: 'setMode',
  setNavigation: 'setNavigation',
  setSpeed: 'setSpeed',
  resetContext: 'resetContext',
} as const

const actions: StateMachine.ActionMap<WorkoutContext, WorkoutEvents> = {
  [ACTIONS.resetContext]: assign<WorkoutContext, WorkoutEvents>({
    step: 0,
    speed: 'normal',
  }),
  [ACTIONS.setSpeed]: assign({
    speed: (context, evt) => {
      const { mode, step, singleModeTotalSteps, normalModeTotalSteps } = context
      const isLastStep =
        mode === 'single'
          ? step >= singleModeTotalSteps - 1
          : step === normalModeTotalSteps

      if (evt.type === 'SET_SPEED') return evt.speed
      if (isLastStep) return 'double time'
      else return 'normal'
    },
  }),
  [ACTIONS.setMode]: assign({
    mode: ({ mode }, evt) => {
      if (evt.type === 'START_SET') return evt.mode
      else return mode
    },
  }),
  [ACTIONS.setNavigation]: assign({
    navigation: ({ navigation }, { type }) => {
      if (type === 'NEXT') return 'forwards'
      if (type === 'PREVIOUS') return 'backwards'
      else return navigation
    },
  }),
  [ACTIONS.incrementStep]: assign({
    step: ({ step }) => step + 1,
  }),
  [ACTIONS.decrementStep]: assign({
    step: ({ step }) => step - 1,
  }),
}

export { actions, ACTIONS }
