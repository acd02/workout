import type { Context, State } from 'machines/workout'

export function getNextStepLabel({
  currentState,
  context,
}: {
  currentState: keyof State
  context: Context
}) {
  const { mode, singleModeTotalSteps, normalModeTotalSteps, step } = context
  const limit = mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps

  const isOngoingSet = currentState === 'onGoingSet'

  if (isOngoingSet) return `COMPLETE STEP ${step}`
  else return step + 1 > limit ? 'COMPLETE LAST STEP!' : `START SET ${step + 1}!`
}
