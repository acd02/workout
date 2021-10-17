import { createMachine } from '@xstate/fsm'

import { ACTIONS, actions } from './actions'
import { guards } from './guards'
import type { WorkoutContext, WorkoutEvents, WorkoutState } from './types'

const TARGETS: Record<WorkoutState['value'], string> = {
  idle: 'idle',
  inBetweenSteps: 'inBetweenSteps',
  onGoingSet: 'onGoingSet',
} as const

const defaultContext = { step: 0, singleModeTotalSteps: 8, normalModeTotalSteps: 4 }

const createWorkoutMachine = (initialContext?: Partial<WorkoutContext>) =>
  createMachine<WorkoutContext, WorkoutEvents, WorkoutState>(
    {
      initial: TARGETS.idle,
      context: { ...defaultContext, ...initialContext },
      states: {
        idle: {
          on: {
            START_SET: {
              actions: [ACTIONS.setMode, ACTIONS.setSpeed],
              target: TARGETS.onGoingSet,
            },
          },
        },
        onGoingSet: {
          entry: [ACTIONS.incrementStep, ACTIONS.setSpeed, ACTIONS.setNavigation],
          on: {
            NEXT: TARGETS.inBetweenSteps,
            PREVIOUS: {
              actions: [ACTIONS.decrementStep],
              target: TARGETS.inBetweenSteps,
              cond: ({ step }) => step > 1,
            },
          },
        },
        inBetweenSteps: {
          entry: [ACTIONS.setNavigation],
          on: {
            PREVIOUS: {
              actions: [ACTIONS.decrementStep, ACTIONS.setNavigation],
              target: TARGETS.onGoingSet,
            },
            NEXT: [
              {
                target: TARGETS.idle,
                cond: guards.hasReachedLastStep,
                actions: [ACTIONS.resetContext],
              },
              {
                target: TARGETS.onGoingSet,
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
