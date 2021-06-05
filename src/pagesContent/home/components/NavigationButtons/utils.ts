import type { WorkoutMachineState } from 'machines/workout/types'

export function getNextStepLabel({ matches, context }: WorkoutMachineState) {
  const { mode, singleModeTotalSteps, normalModeTotalSteps, step } = context
  const limit = mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps

  const isOngoingSet = matches('onGoingSet')

  if (isOngoingSet) return `COMPLETE STEP ${step}`
  else return step + 1 > limit ? 'COMPLETE LAST STEP!' : `START SET ${step + 1}!`
}
