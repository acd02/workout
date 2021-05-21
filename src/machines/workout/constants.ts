import type { Events, State } from './types'

const STATE: Record<keyof State, keyof State> = {
  idle: 'idle',
  initSet: 'initSet',
  onGoingSet: 'onGoingSet',
  inBetweenSteps: 'inBetweenSteps',
}

const EVENTS: Record<Events['type'], Events['type']> = {
  START_SET: 'START_SET',
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT',
}

export { STATE, EVENTS }
