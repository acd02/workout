import {
  createMachine,
  guard as untypedGuard,
  immediate,
  reduce as untypedReduce,
  state,
  transition,
} from 'robot3'
import type { Guard, Reducer, ReduceFunction, GuardFunction } from 'robot3'

import { EVENTS, STATE } from './constants'
import { hasReachedLimit, isNotFirstStep } from './guards'
import { reducers } from './reducers'
import type { Context, Events, Send, State } from './types'

const guard: (fn: GuardFunction<Context, Events>) => Guard<Context, Events> = untypedGuard
const reduce: (
  fn: ReduceFunction<Context, Events>
) => Reducer<Context, Events> = untypedReduce

const context = (): Context => ({
  step: 0,
  singleModeTotalSteps: 8,
  normalModeTotalSteps: 4,
  navigation: 'forwards',
})

const workoutMachine = createMachine<State, Context>(
  {
    idle: state(transition(EVENTS.START_SET, STATE.initSet)),
    initSet: state(immediate(STATE.onGoingSet, reduce(reducers.initSet))),
    onGoingSet: state(
      transition(
        EVENTS.PREVIOUS,
        STATE.inBetweenSteps,
        guard(isNotFirstStep),
        reduce(reducers.decrementStep)
      ),
      transition(
        EVENTS.NEXT,
        STATE.inBetweenSteps,
        reduce(ctx => reducers.updateDirectionStatus(ctx, 'forwards'))
      )
    ),
    inBetweenSteps: state(
      transition(
        EVENTS.PREVIOUS,
        STATE.onGoingSet,
        reduce(ctx => reducers.updateDirectionStatus(ctx, 'backwards'))
      ),
      transition(
        EVENTS.NEXT,
        STATE.idle,
        guard(hasReachedLimit),
        reduce(reducers.finishSet)
      ),
      transition(
        EVENTS.NEXT,
        STATE.onGoingSet,
        guard(ctx => !hasReachedLimit(ctx)),
        reduce(reducers.incrementStep)
      )
    ),
  },
  context
)

export type { Context, State, Events, Send }
export { workoutMachine }
