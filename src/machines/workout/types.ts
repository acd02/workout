import type { StateMachine } from '@xstate/fsm'

type WorkoutState =
  | {
      value: 'idle'
      context: WorkoutContext
    }
  | {
      value: 'onGoingSet'
      context: WorkoutContext
    }
  | {
      value: 'inBetweenSteps'
      context: WorkoutContext
    }

type Mode = 'normal' | 'single'
type Speed = 'normal' | 'double time'
type Navigation = 'forwards' | 'backwards'

// The events that the machine handles
type WorkoutEvents =
  | { type: 'START_SET'; mode: Mode }
  | { type: 'SET_SPEED'; speed: Speed }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }

// The context (extended state) of the machine
type WorkoutContext = {
  step: number
  mode?: Mode
  speed?: Speed
  singleModeTotalSteps: number
  normalModeTotalSteps: number
  navigation?: Navigation
}

type WorkoutMachineState = StateMachine.State<WorkoutContext, WorkoutEvents, WorkoutState>

export type { WorkoutState, WorkoutContext, WorkoutEvents, WorkoutMachineState }
