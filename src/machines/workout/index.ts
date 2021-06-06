import { createMachine } from '@xstate/fsm'

import { Actions, actions } from './actions'
import { guards } from './guards'
import type { WorkoutContext, WorkoutEvents, WorkoutState } from './types'

const Targets: Record<WorkoutState['value'], string> = {
  idle: 'idle',
  inBetweenSteps: 'inBetweenSteps',
  onGoingSet: 'onGoingSet',
} as const

const defaultContext = { step: 0, singleModeTotalSteps: 8, normalModeTotalSteps: 4 }

const createWorkoutMachine = (initialContext?: Partial<WorkoutContext>) =>
  createMachine<WorkoutContext, WorkoutEvents, WorkoutState>(
    {
      initial: Targets.idle,
      context: { ...defaultContext, ...initialContext },
      states: {
        idle: {
          on: {
            START_SET: {
              actions: [Actions.setMode, Actions.setSpeed],
              target: Targets.onGoingSet,
            },
          },
        },
        onGoingSet: {
          entry: [Actions.incrementStep, Actions.setSpeed, Actions.setNavigation],
          on: {
            NEXT: Targets.inBetweenSteps,
            PREVIOUS: {
              actions: [Actions.decrementStep],
              target: Targets.inBetweenSteps,
              cond: ({ step }) => step > 1,
            },
          },
        },
        inBetweenSteps: {
          entry: [Actions.setNavigation],
          on: {
            PREVIOUS: {
              actions: [Actions.decrementStep, Actions.setNavigation],
              target: Targets.onGoingSet,
            },
            NEXT: [
              {
                target: Targets.idle,
                cond: guards.hasReachedLastStep,
                actions: [Actions.resetContext],
              },
              {
                target: Targets.onGoingSet,
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

export { createWorkoutMachine }
