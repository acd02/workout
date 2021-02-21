import type { SendFunction } from 'robot3'

/* eslint-disable */
type State = { idle: {}; initSet: {}; onGoingSet: {}; inBetweenSteps: {} }
/* eslint-enable */

type Mode = 'normal' | 'single'
type Speed = 'normal' | 'double time'
type Navigation = 'forwards' | 'backwards'

type Context = {
  step: number
  mode?: Mode
  speed?: Speed
  navigation?: Navigation
  singleModeTotalSteps: number
  normalModeTotalSteps: number
}

type Events = { type: 'START_SET'; mode: Mode } | { type: 'NEXT' } | { type: 'PREVIOUS' }

type Send = SendFunction<Events>

export type { State, Context, Events, Mode, Speed, Navigation, Send }
