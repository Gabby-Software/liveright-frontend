import { useContext } from 'react'
import { useSelector } from 'react-redux'

import userTypes from '../enums/user-types.enum'
import { APIGetType } from '../hoc/api-get'
import { TrainerContext } from '../pages/trainer/trainer.context'
import { RootState } from '../store/reducers'
import { AccountObjType, AccountType } from '../types/account.type'
import { AddressType } from '../types/address.type'
export const useTrainer = () => {
  const { data } = useContext(TrainerContext) as APIGetType<AccountObjType>
  const acc = data.accounts.find((acc) => acc.type === userTypes.TRAINER)
  const addr = acc?.addresses?.find((addr) => addr.is_default)
  return {
    ...data,
    ...acc,
    ...acc?.profile,
    ...addr
  } as AccountObjType & AccountType & AddressType
}

export const useTrainerSelector = () => {
  return useSelector((state: RootState) => state.trainer) as AccountObjType
}
