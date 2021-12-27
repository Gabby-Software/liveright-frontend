import { useState } from 'react'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_ACCOUNT_BY_ID } from '../../../enums/api.enum'
import userTypes from '../../../enums/user-types.enum'
import { getAccountById } from '../../../services/api/accounts'
import { updateClient } from '../../../services/api/clients'
import {
  AccountObjType,
  AccountType,
  ProfileType
} from '../../../types/account.type'
import { AddressType } from '../../../types/address.type'

interface UseClientAccount {
  isLoading: boolean
  user: AccountObjType
  account: AccountType
  profile: ProfileType
  address: AddressType
  error: any
  onUpdate: (id: string, values: any, onSuccess?: any) => void
  isUpdateLoading: boolean
}

export default function useClientAccount(id: number): UseClientAccount {
  const [isUpdateLoading, setUpdateLoading] = useState(false)

  const { data, error, mutate } = useSWR(
    id ? EP_ACCOUNT_BY_ID + `/${id}` : null,
    getAccountById
  )

  const onUpdate = async (id: string, values: any, onSuccess?: any) => {
    try {
      setUpdateLoading(true)
      await updateClient(id, values)
      setUpdateLoading(false)
      toast.show({ type: 'success', msg: 'Client updated successfully' })
      mutate()
      onSuccess?.()
    } catch (e: any) {
      setUpdateLoading(false)
      toast.show({ type: 'error', msg: e.response?.data?.message || 'Error' })
      console.error(e)
    }
  }

  const isLoading = id ? !data && !error : false
  const user = data?.user || {}
  const profile = data?.profile || {}
  const account = data?.user?.accounts?.find(
    (a: AccountType) => a.type === userTypes.CLIENT
  )
  const address = data?.addresses?.find((a: AddressType) => a.is_default) || {}

  return {
    isLoading,
    user,
    profile,
    address,
    error,
    onUpdate,
    isUpdateLoading,
    account
  }
}
