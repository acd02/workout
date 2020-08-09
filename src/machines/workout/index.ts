import { assign, Machine } from 'xstate'

/* eslint-disable */
type WorkoutStateSchema = {
  states: {
    idle: {}
    initSet: {}
    onGoingSet: {}
    inBetweenSteps: {}
    previousFromInBetween: {}
    previousFromOnGoing: {}
  }
}
/* eslint-enable */

// The events that the machine handles
export type WorkoutEvent =
  | { type: 'START_SET'; mode: Mode }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }

type Mode = 'single' | 'both sides'

// The context (extended state) of the machine
export type WorkoutContext = {
  step: number
  mode?: Mode
}

enum Actions {
  incrementStep = 'incrementStep',
  decrementStep = 'decrementStep',
  setMode = 'setMode',
  resetSteps = 'resetSteps',
}

enum Guards {
  hasNotReachedLimit = 'hasNotReachedLimit',
  hasReachedLimit = 'hasReachedLimit',
  isFirstStep = 'isFirstStep',
  isNotFirstStep = 'isNotFirstStep',
}

export const workoutMachine = Machine<WorkoutContext, WorkoutStateSchema, WorkoutEvent>(
  {
    key: 'workout',
    initial: 'idle',
    context: { step: 0 },
    states: {
      idle: {
        on: {
          START_SET: 'initSet',
        },
      },
      initSet: {
        entry: [Actions.setMode, Actions.resetSteps],
        on: {
          '': [{ target: 'onGoingSet' }],
        },
      },
      onGoingSet: {
        entry: [Actions.incrementStep],
        on: {
          NEXT: 'inBetweenSteps',
          PREVIOUS: [{ target: 'previousFromOnGoing', cond: Guards.isNotFirstStep }],
        },
      },
      inBetweenSteps: {
        on: {
          PREVIOUS: 'previousFromInBetween',
          NEXT: [
            { target: 'idle', cond: Guards.hasReachedLimit },
            { target: 'onGoingSet', cond: Guards.hasNotReachedLimit },
          ],
        },
      },
      previousFromOnGoing: {
        entry: [Actions.decrementStep],
        on: {
          '': [{ target: 'inBetweenSteps' }],
        },
      },
      previousFromInBetween: {
        entry: [Actions.decrementStep],
        on: {
          '': [{ target: 'onGoingSet' }],
        },
      },
    },
  },
  {
    actions: {
      [Actions.resetSteps]: assign({
        step: 0,
      }),
      [Actions.setMode]: assign({
        mode: (context, e) => {
          if (e.type === 'START_SET') return e.mode
          else return context.mode
        },
      }),
      [Actions.incrementStep]: assign({
        step: context => context.step + 1,
      }),
      [Actions.decrementStep]: assign({
        step: context => context.step - 1,
      }),
    },
    guards: {
      [Guards.isFirstStep]: context => context.step === 1,
      [Guards.isNotFirstStep]: context => context.step > 1,
      [Guards.hasReachedLimit]: context => {
        const limit = context.mode === 'single' ? 8 : 4

        return context.step >= limit
      },
      [Guards.hasNotReachedLimit]: context => {
        const limit = context.mode === 'single' ? 8 : 4

        return context.step < limit
      },
    },
  }
)
