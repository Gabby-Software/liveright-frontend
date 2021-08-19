import React, { createContext, FC, useContext, useState } from 'react'

import { AccountObjType } from '../../types/account.type'
import {
  createInvoiceInitialValues,
  createInvoiceSteps,
  InvoiceFormType
} from './create-invoice.data'

export type CreateInvoiceContextType = {
  values: InvoiceFormType
  setValues: (values: InvoiceFormType) => void
  step: number
  setStep: (step: number) => void
  client: AccountObjType | null
  setClient: (client: AccountObjType | null) => void
}
export const CreateInvoiceContext = createContext<CreateInvoiceContextType>({
  values: { ...createInvoiceInitialValues, items: [] },
  setValues: () => {},
  step: createInvoiceSteps.CLIENT,
  setStep: () => {},
  client: null,
  setClient: () => {}
})

export const useInvoiceForm = () => useContext(CreateInvoiceContext)
export const CreateInvoiceProvider: FC<{}> = ({ children }) => {
  const [values, setValues] = useState<InvoiceFormType>({
    ...createInvoiceInitialValues,
    items: []
  })
  const [step, setStep] = useState(createInvoiceSteps.CLIENT)
  const [client, setClient] = useState<AccountObjType | null>(null)
  return (
    <CreateInvoiceContext.Provider
      value={{
        values,
        setValues,
        step,
        setStep,
        client,
        setClient
      }}
    >
      {children}
    </CreateInvoiceContext.Provider>
  )
}
