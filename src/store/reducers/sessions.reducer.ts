/* eslint-disable no-case-declarations */
import { APIGetType } from '../../hoc/api-get'
import { PaginatedDataType } from '../../types/paginated-data.type'
import { SessionType } from '../../types/session.type'
import {
  ACTION_CLIENT_REQUEST_SESSION_ERROR,
  ACTION_CLIENT_REQUEST_SESSION_LOAD,
  ACTION_CLIENT_REQUEST_SESSION_SUCCESS,
  ACTION_CLIENT_RESCHEDULE_SESSION_ERROR,
  ACTION_CLIENT_RESCHEDULE_SESSION_LOAD,
  ACTION_CLIENT_RESCHEDULE_SESSION_SUCCESS,
  ACTION_EDIT_SESSIONS_ERROR,
  ACTION_EDIT_SESSIONS_LOAD,
  ACTION_EDIT_SESSIONS_SUCCESS,
  ACTION_GET_SESSIONS_ERROR,
  ACTION_GET_SESSIONS_LOAD,
  ACTION_GET_SESSIONS_SUCCESS,
  ACTION_SWITCH_ACCOUNT_SUCCESS,
  ACTION_TRAINER_CREATE_SESSION_ERROR,
  ACTION_TRAINER_CREATE_SESSION_LOAD,
  ACTION_TRAINER_CREATE_SESSION_SUCCESS,
  ACTION_TRAINER_REMOVE_SESSION_ERROR,
  ACTION_TRAINER_REMOVE_SESSION_LOAD,
  ACTION_TRAINER_REMOVE_SESSION_SUCCESS,
  ActionType
} from '../action-types'
import { withStorage } from './storage.hook'

export interface SessionsState {
  upcoming: PaginatedDataType<SessionType>
  awaiting_scheduling: PaginatedDataType<SessionType>
  past: PaginatedDataType<SessionType>
}

const initialValues: APIGetType<SessionsState> = {
  data: {
    upcoming: {
      data: [],
      meta: {
        current_page: 1,
        total: 0,
        per_page: 10
      }
    },
    awaiting_scheduling: {
      data: [],
      meta: {
        current_page: 1,
        total: 0,
        per_page: 10
      }
    },
    past: {
      data: [],
      meta: {
        current_page: 1,
        total: 0,
        per_page: 10
      }
    }
  },
  loading: true,
  error: ''
}

export const sessionsReducer = withStorage(
  (state = initialValues, { type, payload }: ActionType<any>) => {
    const { data } = state
    const { upcoming, awaiting_scheduling } = data

    switch (type) {
      case ACTION_TRAINER_CREATE_SESSION_SUCCESS:
        const { session } = payload
        const nextData = [session, ...upcoming.data].slice(0, 10)

        return {
          data: {
            ...data,
            upcoming: {
              ...upcoming,
              data: nextData
            }
          },
          loading: false,
          error: null
        }
      case ACTION_CLIENT_REQUEST_SESSION_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        }
      case ACTION_TRAINER_CREATE_SESSION_LOAD:
      case ACTION_CLIENT_REQUEST_SESSION_LOAD:
      case ACTION_TRAINER_REMOVE_SESSION_LOAD:
        return {
          ...state,
          loading: true,
          error: false
        }
      case ACTION_TRAINER_CREATE_SESSION_ERROR:
      case ACTION_CLIENT_REQUEST_SESSION_ERROR:
      case ACTION_TRAINER_REMOVE_SESSION_ERROR:
        return {
          ...state,
          loading: false,
          error: true
        }
      case ACTION_TRAINER_REMOVE_SESSION_SUCCESS: {
        const index = upcoming.data.findIndex(
          (it: SessionType) => it.id === payload.id
        )
        const nextUpcomingData = [...upcoming.data]
        nextUpcomingData.splice(index, 1)
        return {
          data: {
            ...data,
            upcoming: {
              ...upcoming,
              data: nextUpcomingData
            }
          },
          loading: false,
          error: null
        }
      }
      case ACTION_GET_SESSIONS_LOAD:
        return {
          ...state,
          loading: true,
          error: false
        }
      case ACTION_GET_SESSIONS_ERROR:
        return {
          ...state,
          loading: false,
          error: true
        }
      case ACTION_GET_SESSIONS_SUCCESS:
        return {
          data: {
            ...data,
            ...payload
          },
          loading: false,
          error: null
        }
      case ACTION_EDIT_SESSIONS_LOAD:
        return {
          ...state,
          loading: true,
          error: false
        }
      case ACTION_EDIT_SESSIONS_ERROR:
        return {
          ...state,
          loading: false,
          error: true
        }
      case ACTION_EDIT_SESSIONS_SUCCESS: {
        const { session, isAwaiting } = payload

        if (isAwaiting) {
          const index = awaiting_scheduling.data.findIndex(
            (it: SessionType) => it.id === session.id
          )
          const nextAwaitingData = [...awaiting_scheduling.data]
          nextAwaitingData.splice(index, 1)

          return {
            data: {
              ...data,
              awaiting_scheduling: {
                ...awaiting_scheduling,
                data: nextAwaitingData
              }
            },
            loading: false,
            error: null
          }
        }

        const index = upcoming.data.findIndex(
          (it: SessionType) => it.id === session.id
        )
        const nextUpcomingData = [...upcoming.data]
        nextUpcomingData[index] = {
          ...nextUpcomingData[index],
          ...session
        }
        return {
          data: {
            ...data,
            upcoming: {
              ...upcoming,
              data: nextUpcomingData
            }
          },
          loading: false,
          error: null
        }
      }
      case ACTION_CLIENT_RESCHEDULE_SESSION_LOAD:
        return {
          ...state,
          loading: true,
          error: false
        }
      case ACTION_CLIENT_RESCHEDULE_SESSION_ERROR:
        return {
          ...state,
          loading: false,
          error: true
        }
      case ACTION_CLIENT_RESCHEDULE_SESSION_SUCCESS: {
        const { session } = payload
        const index = upcoming.data.findIndex(
          (it: SessionType) => it.id === session.id
        )
        const nextUpcomingData = [...upcoming.data]
        nextUpcomingData.splice(index, 1)
        return {
          data: {
            ...data,
            upcoming: {
              ...upcoming,
              data: nextUpcomingData
            }
          },
          loading: false,
          error: null
        }
      }
      case ACTION_SWITCH_ACCOUNT_SUCCESS:
        return initialValues
      default:
        return state
    }
  },
  initialValues,
  'sessions'
)
