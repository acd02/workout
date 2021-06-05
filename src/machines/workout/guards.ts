import { WorkoutContext } from './types'

function hasReachedLimit({
  mode,
  singleModeTotalSteps,
  normalModeTotalSteps,
  step,
}: WorkoutContext) {
  const limit = mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps

  return step >= limit
}

const guards = {
  hasReachedLimit,
}

export { guards }
