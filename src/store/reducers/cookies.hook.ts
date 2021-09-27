import cookieManager from '../../managers/cookie.manager'
import { isCookieBlocked } from '../../utils/cookie'
import { ActionType } from '../action-types'

export const withCookies =
  (
    // eslint-disable-next-line no-unused-vars
    reducer: (state: any, action: ActionType<any>) => {},
    initialState: any,
    key: string
  ) =>
  (state: any, action: any) => {
    if (!state) {
      const savedData = cookieManager.get(key)
      if (savedData) {
        state = JSON.parse(savedData)
      } else {
        state = initialState
      }
    }
    const newState = reducer(state, action)

    if (!action.type.startsWith('@@redux')) {
      if (!isCookieBlocked()) {
        cookieManager.set(key, JSON.stringify(newState), 60 * 60 * 24 * 7)
      }
    }
    return newState
  }
