import { WorkoutContext } from './types'

function hasReachedLastStep({
  mode,
  singleModeTotalSteps,
  normalModeTotalSteps,
  step,
}: WorkoutContext) {
  const limit = mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps

  return step >= limit
}

const guards = {
  hasReachedLastStep,
}

export { guards }
