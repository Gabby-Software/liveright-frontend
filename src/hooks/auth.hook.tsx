import { useSelector } from 'react-redux'

import { RootState } from '../store/reducers'
import { AccountObjType, AccountType } from '../types/account.type'

export const useAuth = () => {
  return useSelector(
    (state: RootState) =>
      ({
        ...(state.auth as AccountObjType),
        ...(state.auth as AccountObjType)?.accounts?.find((a) => a.is_current)
      } as AccountObjType & AccountType)
  )
}
