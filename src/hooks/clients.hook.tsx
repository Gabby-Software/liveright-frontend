import { useSelector } from 'react-redux'

import { APIGetType } from '../hoc/api-get'
import { RootState } from '../store/reducers'
import { AccountObjType, AccountType } from '../types/account.type'
import { PaginatedDataType } from '../types/paginated-data.type'
import { ProfileDataType } from '../types/profile-data.type'
export const useClients = () => {
  return useSelector((state: RootState) => state.clients) as APIGetType<
    PaginatedDataType<
      AccountObjType &
        ProfileDataType &
        AccountType & { sessions: number; user_uuid: string; status: string }
    >
  > & {
    filters: {
      query: string
      type: string
      status: string
    }
  }
}
