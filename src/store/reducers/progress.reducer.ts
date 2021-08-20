import { APIGetType } from '../../hoc/api-get'
import { HealthData } from '../../pages/progress/progress.types'
import { PaginatedDataType } from '../../types/paginated-data.type'
import {
  ACTION_GET_PROGRESS_ERROR,
  ACTION_GET_PROGRESS_LOAD,
  ACTION_GET_PROGRESS_SUCCESS,
  ACTION_SET_HEALTH_DATA_ERROR,
  ACTION_SET_HEALTH_DATA_LOAD,
  ACTION_SET_HEALTH_DATA_SUCCESS,
  ActionType
} from '../action-types'
import { withStorage } from './storage.hook'

const initialState: APIGetType<PaginatedDataType<HealthData>> = {
  error: '',
  loading: true,
  data: {
    data: [],
    meta: {
      current_page: 1,
      per_page: 10,
      total: 0
    }
  }
}

export const progressReducer = withStorage(
  (state = initialState, { type, payload }: ActionType<any>) => {
    switch (type) {
      case ACTION_GET_PROGRESS_LOAD:
      case ACTION_SET_HEALTH_DATA_LOAD:
        return {
          ...state,
          error: '',
          loading: true
        }
      case ACTION_GET_PROGRESS_ERROR:
      case ACTION_SET_HEALTH_DATA_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        }
      case ACTION_GET_PROGRESS_SUCCESS:
        return {
          ...state,
          data: payload,
          error: '',
          loading: false
        }
      case ACTION_SET_HEALTH_DATA_SUCCESS:
        return {
          ...state,
          error: '',
          loading: false
        }
    }
    return state
  },
  {},
  'progress'
)
