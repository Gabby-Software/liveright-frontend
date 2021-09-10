import moment from 'moment'

import { paymentMethods } from '../../enums/payment-method.enum'

export type InvoiceItemType = {
  name: string
  description: string
  type: string
  is_taxable: boolean
  quantity: number
  unit_price: string
  tax_rate: number
  tax_value: number
  total: number
  discount_percent: number
  extras: {
    session_expires_on: string
  }
}
export type InvoiceFormType = {
  invoice: {
    type: string
    invoice_to: string
    currency_code: string
    due_on: string
    is_taxable: boolean
    payment_method: string
    send_to_client: boolean
    issuance_date?: string
    description?: string
  }
  items: InvoiceItemType[]
}
export const defaultInvoiceItem: InvoiceItemType = {
  type: 'PT session',
  description: '',
  name: '',
  is_taxable: true,
  quantity: 1,
  unit_price: '',
  total: 0,
  tax_rate: 0,
  tax_value: 0,
  discount_percent: 0,
  extras: {
    session_expires_on: ''
  }
}
export const createInvoiceInitialValues: InvoiceFormType = {
  invoice: {
    type: 'Trainer Invoice',
    invoice_to: '',
    currency_code: 'AED',
    due_on: '',
    issuance_date: moment().format('YYYY-MM-DD'),
    is_taxable: true,
    payment_method: paymentMethods.CREDIT_CARD,
    send_to_client: false,
    description: ''
  },
  items: [{ ...defaultInvoiceItem }]
}

export enum createInvoiceSteps {
  CLIENT,
  DETAILS,
  ITEMS,
  NOTES
}
