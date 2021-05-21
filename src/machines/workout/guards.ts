import { Context } from './types'
function isNotFirstStep({ step }: Context) {
  return step > 1
}

function hasReachedLimit({
  mode,
  singleModeTotalSteps,
  normalModeTotalSteps,
  step,
}: Context) {
  const limit = mode === 'single' ? singleModeTotalSteps : normalModeTotalSteps

  return step >= limit
}

export { isNotFirstStep, hasReachedLimit }
