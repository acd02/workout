import { assign, StateMachine } from '@xstate/fsm'

import type { WorkoutContext, WorkoutEvent } from './types'

const Actions = {
  incrementStep: 'incrementStep',
  decrementStep: 'decrementStep',
  setMode: 'setMode',
  setNavigation: 'setNavigation',
  setSpeed: 'setSpeed',
  resetContext: 'resetContext',
} as const

const actions: StateMachine.ActionMap<WorkoutContext, WorkoutEvent> = {
  [Actions.resetContext]: assign<WorkoutContext, WorkoutEvent>({
    step: 0,
    speed: 'normal',
  }),
  [Actions.setSpeed]: assign({
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
  [Actions.setMode]: assign({
    mode: (context, evt) => {
      if (evt.type === 'START_SET') return evt.mode
      else return context.mode
    },
  }),
  [Actions.setNavigation]: assign({
    navigation: ({ navigation }, { type }) => {
      if (type === 'NEXT') return 'forwards'
      if (type === 'PREVIOUS') return 'backwards'
      else return navigation
    },
  }),
  [Actions.incrementStep]: assign({
    step: context => context.step + 1,
  }),
  [Actions.decrementStep]: assign({
    step: context => context.step - 1,
  }),
}

export { actions, Actions }
