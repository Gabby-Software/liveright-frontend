/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import React, { createContext, ReactNode } from 'react'

import { EP_GET_TRAINER } from '../../enums/api.enum'
import userTypes from '../../enums/user-types.enum'
import APIGet, { APIGetType } from '../../hoc/api-get'
import { AccountObjType } from '../../types/account.type'

export type TrainerContextType = APIGetType<AccountObjType | null> & {
  sessions: number
  invoices: number
  editMode: boolean
  setEditMode: (mode: boolean) => void
}
export const TrainerContext = createContext<TrainerContextType>({
  loading: true,
  data: null,
  error: '',
  sessions: 0,
  invoices: 0,
  editMode: false,
  setEditMode: () => {}
})
export const TrainerProvider = ({ children }: { children: ReactNode }) => {
  return (
    <APIGet url={EP_GET_TRAINER}>
      {(data: APIGetType<AccountObjType | null>) => {
        const account = data?.data?.accounts.find(
          (acc) => acc.type === userTypes.TRAINER
        )
        const val = {
          ...data,
          data: data.data
            ? {
                ...data.data,
                ...account?.profile,
                ...account?.addresses
              }
            : null,
          sessions: 0,
          invoices: 0,
          editMode: false,
          setEditMode: () => {}
        }
        return (
          <TrainerContext.Provider value={val}>
            {children}
          </TrainerContext.Provider>
        )
      }}
    </APIGet>
  )
}
