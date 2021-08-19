import { createContext } from 'react'

import { genderTypes } from '../../../enums/gender-types'

export type ClientFormType = {
  email: string
  message: string
  first_name: string
  last_name: string
  birthday: string
  gender: string
  phone_number: string
  created_at: string
  city: string
  country: string
  address: string
  injuries: string
  dietary_restrictions: string
  postal_code: string
}
export enum clientFormSteps {
  EMAIL,
  MESSAGE,
  FORM
}
export const defaultValues: ClientFormType = {
  email: '',
  message: '',
  first_name: '',
  last_name: '',
  birthday: '',
  gender: genderTypes.MALE,
  phone_number: '',
  created_at: '',
  city: '',
  country: '',
  address: '',
  injuries: '',
  dietary_restrictions: '',
  postal_code: ''
}
export const ClientFormContext = createContext<{
  form: ClientFormType
  update: (name: string, value: any) => void
  step: number
  setStep: (step: number) => void
  onClose: () => void
}>({
  form: defaultValues,
  update: () => {},
  step: clientFormSteps.EMAIL,
  setStep: () => {},
  onClose: () => {}
})
