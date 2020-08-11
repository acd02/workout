import { assign, Machine } from 'xstate'

/* eslint-disable */
type WorkoutStateSchema = {
  states: {
    idle: {}
    onGoingSet: {}
    inBetweenSteps: {}
  }
}
/* eslint-enable */

// The events that the machine handles
export type WorkoutEvent =
  | { type: 'START_SET'; mode: Mode }
  | { type: 'SET_SPEED'; speed: Speed }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }

type Mode = 'single' | 'both sides'
type Speed = 'normal' | 'double time'

// The context (extended state) of the machine
export type WorkoutContext = {
  step: number
  mode?: Mode
  speed?: Speed
}

enum Actions {
  incrementStep = 'incrementStep',
  decrementStep = 'decrementStep',
  setMode = 'setMode',
  setSpeed = 'setSpeed',
  resetContext = 'resetContext',
}

enum Guards {
  hasNotReachedLimit = 'hasNotReachedLimit',
  hasReachedLimit = 'hasReachedLimit',
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
          START_SET: {
            actions: [Actions.setMode, Actions.setSpeed, Actions.resetContext],
            target: 'onGoingSet',
          },
        },
      },
      onGoingSet: {
        entry: [Actions.incrementStep, Actions.setSpeed],
        on: {
          NEXT: 'inBetweenSteps',
          PREVIOUS: {
            actions: [Actions.decrementStep],
            target: 'inBetweenSteps',
            cond: Guards.isNotFirstStep,
          },
        },
      },
      inBetweenSteps: {
        on: {
          PREVIOUS: {
            actions: [Actions.decrementStep],
            target: 'onGoingSet',
          },
          NEXT: [
            { target: 'idle', cond: Guards.hasReachedLimit },
            { target: 'onGoingSet', cond: Guards.hasNotReachedLimit },
          ],
        },
      },
    },
  },
  {
    actions: {
      [Actions.resetContext]: assign<WorkoutContext, WorkoutEvent>({
        step: 0,
        speed: 'normal',
      }),
      [Actions.setSpeed]: assign({
        speed: (context, e) => {
          const isLastStep =
            context.mode === 'single' ? context.step >= 7 : context.step === 4

          if (isLastStep) return 'double time'
          if (e.type === 'SET_SPEED') return e.speed
          else return context.speed
        },
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
