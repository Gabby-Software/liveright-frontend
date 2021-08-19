import { AccountObjType } from '../../types/account.type'
import { ACTION_GET_TRAINER_SUCCESS, ActionType } from '../action-types'
import { withStorage } from './storage.hook'

const initialValues: AccountObjType | null = null

export const trainerReducer = withStorage(
  (state = initialValues, { type, payload }: ActionType<any>) => {
    switch (type) {
      case ACTION_GET_TRAINER_SUCCESS:
        return payload
      default:
        return state
    }
  },
  initialValues,
  'trainer'
)
