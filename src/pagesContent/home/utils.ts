import { WorkoutContext, WorkoutEvent } from 'machines/workout'
import { State } from 'xstate'

export function getNextStepLabel({
  matches,
  context,
}: State<WorkoutContext, WorkoutEvent>) {
  const limit = context.mode === 'single' ? 8 : 4

  const isOngoingSet = matches('onGoingSet')

  if (isOngoingSet) return `COMPLETE STEP ${context.step}`
  else
    return context.step + 1 > limit
      ? 'COMPLETE LAST STEP!'
      : `START SET ${context.step + 1}!`
}
