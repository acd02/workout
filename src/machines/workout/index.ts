import { createMachine } from '@xstate/fsm'

import { Actions, actions } from './actions'
import { guards } from './guards'
import type { WorkoutContext, WorkoutEvent, WorkoutState } from './types'

const workoutMachine = createMachine<WorkoutContext, WorkoutEvent, WorkoutState>(
  {
    initial: 'idle',
    context: { step: 0, singleModeTotalSteps: 8, normalModeTotalSteps: 4 },
    states: {
      idle: {
        on: {
          START_SET: {
            actions: [Actions.setMode, Actions.setSpeed],
            target: 'onGoingSet',
          },
        },
      },
      onGoingSet: {
        entry: [Actions.incrementStep, Actions.setSpeed, Actions.setNavigation],
        on: {
          NEXT: 'inBetweenSteps',
          PREVIOUS: {
            actions: [Actions.decrementStep],
            target: 'inBetweenSteps',
            cond: ({ step }) => step > 1,
          },
        },
      },
      inBetweenSteps: {
        entry: [Actions.setNavigation],
        on: {
          PREVIOUS: {
            actions: [Actions.decrementStep, Actions.setNavigation],
            target: 'onGoingSet',
          },
          NEXT: [
            {
              target: 'idle',
              cond: guards.hasReachedLimit,
              actions: [Actions.resetContext],
            },
            {
              target: 'onGoingSet',
            },
          ],
        },
      },
    },
  },
  {
    actions,
  }
)

export type { WorkoutEvent, WorkoutContext }
export { workoutMachine }
