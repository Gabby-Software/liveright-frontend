import { APIGetType } from '../../hoc/api-get'
import { AccountObjType, AccountType } from '../../types/account.type'
import { PaginatedDataType } from '../../types/paginated-data.type'
import { ProfileDataType } from '../../types/profile-data.type'
import {
  ACTION_GET_CLIENTS_ERROR,
  ACTION_GET_CLIENTS_LOAD,
  ACTION_GET_CLIENTS_SUCCESS,
  ACTION_UPDATE_CLIENTS_FILTERS,
  ActionType
} from '../action-types'
import { withStorage } from './storage.hook'

const initialState: APIGetType<
  PaginatedDataType<
    AccountObjType & AccountType & ProfileDataType & { status: string }
  >
> & {
  filters: {
    query: string
    type: string
    status: string
  }
} = {
  error: '',
  loading: true,
  data: {
    data: [],
    meta: {
      current_page: 1,
      per_page: 10,
      total: 0
    }
  },
  filters: {
    query: '',
    type: '',
    status: ''
  }
}

export const clientsReducer = withStorage(
  (state = initialState, { type, payload }: ActionType<any>) => {
    switch (type) {
      case ACTION_GET_CLIENTS_SUCCESS:
        return {
          ...state,
          data: payload,
          error: '',
          loading: false
        }
      case ACTION_GET_CLIENTS_LOAD:
        return {
          ...state,
          error: '',
          loading: true
        }
      case ACTION_GET_CLIENTS_ERROR:
        return {
          ...state,
          error: payload || 'some error occur',
          loading: false
        }
      case ACTION_UPDATE_CLIENTS_FILTERS:
        return {
          ...state,
          filters: payload
        }
    }
    return state
  },
  {},
  'clients'
)
