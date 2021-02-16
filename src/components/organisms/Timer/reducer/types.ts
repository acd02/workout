type State = {
  elapsedTime: number
}

type Action = { type: 'INCREMENT_ELAPSED_TIME' } | { type: 'RESET_ELAPSED_TIME' }

export type { State, Action }
