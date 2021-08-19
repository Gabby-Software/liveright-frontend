import { useSelector } from 'react-redux'

import { APIGetType } from '../hoc/api-get'
import { RootState } from '../store/reducers'
import { AccountObjType } from '../types/account.type'
export const useClient = () => {
  return useSelector(
    (state: RootState) => state.client
  ) as APIGetType<AccountObjType | null>
}
