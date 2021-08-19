import { InvoiceItemType } from '../pages/create-invoice/create-invoice.data'
import { AddressType } from './address.type'
import { CurrencyType } from './currency.type'
import { FileType } from './file.type'

export type InvoiceAttendeeType = {
  id: number
  type: string
  uuid: string
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar?: FileType
  }
  address?: AddressType
}
export type InvoiceType = {
  id: number
  created_at: string
  currency: CurrencyType
  discount_amount: number
  discount_percent: number
  description?: string
  payment_method: string
  due_on: string
  invoice_number: string
  is_taxable: boolean
  status: string
  subtotal: number
  tax_rate: number
  tax_value: number
  total: number
  type: string
  pdf: null | FileType
  invoice_to: InvoiceAttendeeType
  invoice_from: InvoiceAttendeeType
}
export type InvoiceFullType = InvoiceType & {
  items: InvoiceItemType[]
}
type InvoiceTypeProt = {
  id?: number
  invoice_number: string
  session_type: string
  description: string
  created_at: string
  due_date: string
  price: number
  currency: string
  status: string
  url: string
  tax?: number
  quantity?: number
}
export type TrainerInvoiceType = InvoiceTypeProt & {
  client_name: string
}
export type ClientInvoiceType = InvoiceTypeProt & {
  client_name: string
}
