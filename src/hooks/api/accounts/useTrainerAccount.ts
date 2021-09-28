import useSWR from 'swr'

import { EP_ACCOUNT_BY_ID } from '../../../enums/api.enum'
import userTypes from '../../../enums/user-types.enum'
import { getAccountById } from '../../../services/api/accounts'
import {
  AccountObjType,
  AccountType,
  ProfileType
} from '../../../types/account.type'
import { AddressType } from '../../../types/address.type'
import useTrainer from './useTrainer'

interface UseTrainerAccount {
  isLoading: boolean
  user: AccountObjType
  profile: ProfileType
  address: AddressType
  error: any
  account: AccountType
  noTrainer: boolean
}

export default function useTrainerAccount(): UseTrainerAccount {
  const { trainer, noTrainer } = useTrainer()

  const { data, error } = useSWR(
    trainer.id ? EP_ACCOUNT_BY_ID + `/${trainer.id}` : null,
    getAccountById
  )

  const isLoading = !data && !error
  const user = data?.user || {}
  const profile = data?.profile || {}
  const address = data?.addresses?.find((a: AddressType) => a.is_default) || {}
  const account = user?.accounts?.find(
    (a: AccountType) => a.type === userTypes.TRAINER
  )

  return {
    isLoading,
    user,
    profile,
    address,
    account,
    error,
    noTrainer
  }
}
