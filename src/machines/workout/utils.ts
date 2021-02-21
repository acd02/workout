import { Context } from './types'

function getSpeed(context: Context, type: 'increment' | 'decrement') {
  const { mode, step: contextStep, singleModeTotalSteps, normalModeTotalSteps } = context

  const step = type === 'increment' ? contextStep + 1 : contextStep - 1

  const isLastStep =
    mode === 'single' ? step >= singleModeTotalSteps - 1 : step === normalModeTotalSteps

  return isLastStep ? 'double time' : 'normal'
}

export { getSpeed }
