import { FileType } from './file.type'

export type TrainerType = {
  phone_number: string
  address: string
  city: string
  country: string
  about: string
  qualifications: string
  additional_information: string
  terms_and_conditions: FileType
  avatar: string | null
  avatar_thumb: string | null
  birthday: string | null
  created_at: string
  email: string
  first_name: string
  last_name: string
  gender: string | null
}
