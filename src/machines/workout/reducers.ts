import { Context, Events, Navigation } from './types'
import { getSpeed } from './utils'

function initSet(ctx: Context, evt: Events): Context {
  const mode = evt.type === 'START_SET' ? evt.mode : ctx.mode

  return {
    ...ctx,
    mode,
    speed: 'normal',
    step: ctx.step + 1,
  }
}

function finishSet(ctx: Context): Context {
  return {
    ...ctx,
    step: 0,
  }
}

function incrementStep(ctx: Context): Context {
  return {
    ...ctx,
    step: ctx.step + 1,
    speed: getSpeed(ctx, 'increment'),
    navigation: 'forwards',
  }
}

function decrementStep(ctx: Context): Context {
  return {
    ...ctx,
    step: ctx.step - 1,
    speed: getSpeed(ctx, 'decrement'),
    navigation: 'backwards',
  }
}

function updateDirectionStatus(ctx: Context, navigation: Navigation): Context {
  return {
    ...ctx,
    navigation,
  }
}

export const reducers = {
  initSet,
  finishSet,
  incrementStep,
  decrementStep,
  updateDirectionStatus,
}
