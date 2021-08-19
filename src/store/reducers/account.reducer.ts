import { ProfileDataType } from '../../types/profile-data.type'
import * as actions from '../action-types'
import { withStorage } from './storage.hook'

const initialState: ProfileDataType = {
  phone_number: '',
  address: '',
  dietary_restrictions: '',
  injuries: '',
  notes: '',
  custom_url: '',
  about: '',
  qualifications: '',
  additional_information: '',
  payment_info: {
    bank: '',
    branch_name: '',
    account_number: '',
    name_on_account: '',
    tax_id: ''
  },
  terms_and_conditions: {
    name: '',
    file_name: '',
    url: ''
  }
}

export const accountReducer = withStorage(
  (state = initialState, action: actions.ActionType<any>) => {
    switch (action.type) {
      case actions.ACTION_GET_ACCOUNT_SUCCESS:
      case actions.ACTION_UPDATE_ACCOUNT_SUCCESS:
      // return {
      //     ...state,
      //     ...action.payload
      // };
      // eslint-disable-next-line no-fallthrough
      case actions.ACTION_GET_ACCOUNT_ERROR:
      case actions.ACTION_UPDATE_ACCOUNT_ERROR:
      default:
        return state
    }
  },
  initialState,
  'account'
)
