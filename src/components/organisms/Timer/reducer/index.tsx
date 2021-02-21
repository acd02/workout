import type { Action, State } from './types'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT_ELAPSED_TIME': {
      const updatedElapsedTime = state.elapsedTime > 999 ? 0 : state.elapsedTime + 1

      return {
        ...state,
        elapsedTime: updatedElapsedTime,
      }
    }

    case 'RESET_ELAPSED_TIME':
      return {
        ...state,
        elapsedTime: 0,
      }

    default:
      return state
  }
}

const initialState: State = {
  elapsedTime: 0,
}

export { reducer, initialState }
