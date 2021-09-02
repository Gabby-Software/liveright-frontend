import useSWR from 'swr'

import { EP_ACCOUNT_BY_ID } from '../../../enums/api.enum'
import { getAccountById } from '../../../services/api/accounts'
import { AccountObjType, ProfileType } from '../../../types/account.type'
import { AddressType } from '../../../types/address.type'

interface UseClientAccount {
  isLoading: boolean
  user: AccountObjType
  profile: ProfileType
  address: AddressType
  error: any
}

export default function useClientAccount(id: number): UseClientAccount {
  const { data, error } = useSWR(
    id ? EP_ACCOUNT_BY_ID + `/${id}` : null,
    getAccountById
  )

  const isLoading = !data && !error
  const user = data?.user || {}
  const profile = data?.profile || {}
  const address = data?.addresses?.find((a: AddressType) => a.is_default) || {}

  return {
    isLoading,
    user,
    profile,
    address,
    error
  }
}
