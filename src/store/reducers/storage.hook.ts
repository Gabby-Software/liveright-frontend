/* eslint-disable no-unused-vars */
import { ACTION_INIT, ActionType } from '../action-types'

export const withStorage =
  (
    reducer: (state: any, action: ActionType<any>) => {},
    initialState: any,
    key: string
  ) =>
  (state: any, action: any) => {
    if (action.type.startsWith(ACTION_INIT)) {
      const savedState = localStorage.getItem(key)
      if (savedState) {
        return JSON.parse(savedState)
      }
    }
    const newState = reducer(state, action)
    if (!action.type.startsWith('@@redux'))
      localStorage.setItem(key, JSON.stringify(newState))
    return newState
  }
