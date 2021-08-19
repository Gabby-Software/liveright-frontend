import { CountryType } from './country.type'

export type AddressType = {
  id?: number
  address: string
  city: string
  country: CountryType
  is_default: boolean
  postal_code: string
  region: string
  _delete?: boolean
}
