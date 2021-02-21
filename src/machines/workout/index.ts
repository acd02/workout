import { createMachine, guard, immediate, reduce, state, transition } from 'robot3'

import { $events, $state } from './enums'
import { hasNotReachedLimit, hasReachedLimit, isNotFirstStep } from './guards'
import { reducers } from './reducers'
import type { Context, Events, Send, State } from './types'

const context = (): Context => ({
  step: 0,
  singleModeTotalSteps: 8,
  normalModeTotalSteps: 4,
  navigation: 'forwards',
})

const workoutMachine = createMachine<State, Context>(
  {
    idle: state(transition($events.START_SET, $state.initSet)),
    initSet: state(immediate($state.onGoingSet, reduce(reducers.initSet))),
    onGoingSet: state(
      transition(
        $events.PREVIOUS,
        $state.inBetweenSteps,
        guard(isNotFirstStep),
        reduce(reducers.decrementStep)
      ),
      transition(
        $events.NEXT,
        $state.inBetweenSteps,
        reduce<Context, Events>(ctx => reducers.updateDirectionStatus(ctx, 'forwards'))
      )
    ),
    inBetweenSteps: state(
      transition(
        $events.PREVIOUS,
        $state.onGoingSet,
        reduce<Context, Events>(ctx => reducers.updateDirectionStatus(ctx, 'backwards'))
      ),
      transition(
        $events.NEXT,
        $state.idle,
        guard(hasReachedLimit),
        reduce(reducers.finishSet)
      ),
      transition(
        $events.NEXT,
        $state.onGoingSet,
        guard(hasNotReachedLimit),
        reduce(reducers.incrementStep)
      )
    ),
  },
  context
)

export type { Context, State, Events, Send }
export { workoutMachine }
