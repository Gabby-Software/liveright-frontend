import { AddressType } from '../types/address.type'

export const addressLine = (addr?: AddressType) => {
  return `${addr?.address ? addr?.address + ', ' : ''}${
    addr?.city ? addr?.city + ', ' : ''
  }${addr?.country?.name_english || ''}`
}
