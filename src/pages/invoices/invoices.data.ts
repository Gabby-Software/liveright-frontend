import { invoiceStatuses } from '../../enums/invoice-statuses'
import { TrainerInvoiceType } from '../../types/invoice.type'
import { OptionType } from '../../types/option.type'

export const invoices: TrainerInvoiceType[] = [
  {
    id: 1,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 160,
    currency: 'AED',
    status: invoiceStatuses.OUTSTANDING,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 2,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 120,
    currency: 'AED',
    status: invoiceStatuses.OUTSTANDING,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 3,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 240,
    currency: 'AED',
    status: invoiceStatuses.PAID,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 4,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 330.9,
    currency: 'AED',
    status: invoiceStatuses.OUTSTANDING,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 5,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 124,
    currency: 'AED',
    status: invoiceStatuses.CANCELLED,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 6,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 300,
    currency: 'USD',
    status: invoiceStatuses.OUTSTANDING,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 7,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 422,
    currency: 'AED',
    status: invoiceStatuses.PAID,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 8,
    client_name: 'Rosalin Franklin',
    invoice_number: 'UV-111-2009',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 500,
    currency: 'AED',
    status: invoiceStatuses.PAID,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 9,
    client_name: 'Stephen Hawking',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 808,
    currency: 'AED',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 10,
    client_name: 'Isaac Newton',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 600,
    currency: 'AED',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 11,
    client_name: 'Benjamin Netanyahu',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 120,
    currency: 'AED',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 12,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-999-212',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 120,
    currency: 'AED',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 13,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-133-843',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 300,
    currency: 'ILS',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 14,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-143-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 333,
    currency: 'MKD',
    status: invoiceStatuses.DUE_SOON,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  }
]
export const overdueInvoices = [
  {
    id: 11,
    client_name: 'Benjamin Netanyahu',
    invoice_number: 'UV-109-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 120,
    currency: 'AED',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 12,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-999-212',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 120,
    currency: 'AED',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 13,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-133-843',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 300,
    currency: 'ILS',
    status: invoiceStatuses.OVERDUE,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  },
  {
    id: 14,
    client_name: 'Gershon Shufman',
    invoice_number: 'UV-143-880',
    session_type: 'PT Session',
    description:
      '5 PT Sessions By Andy Bell more info here and some stuff and stuff',
    created_at: '2021-07-07',
    due_date: '2021-09-11',
    price: 333,
    currency: 'MKD',
    status: invoiceStatuses.DUE_SOON,
    url: 'http://www.africau.edu/images/default/sample.pdf'
  }
]
export const clients: { id: number; first_name: string; last_name: string }[] =
  [
    { id: 1, first_name: 'Marina', last_name: 'Gergel' },
    { id: 2, first_name: 'Vaibrhav', last_name: 'Raj' },
    { id: 3, first_name: 'Harry', last_name: 'Potter' },
    { id: 4, first_name: 'Chupma', last_name: 'Champa' },
    { id: 5, first_name: 'Albert', last_name: 'Einstain' },
    { id: 6, first_name: 'Leah', last_name: 'Goldberg' }
  ]

export const statuses: OptionType[] = [
  { label: 'Outstanding', value: invoiceStatuses.OUTSTANDING },
  { label: 'Paid', value: invoiceStatuses.PAID },
  { label: 'Cancelled', value: invoiceStatuses.CANCELLED },
  { label: 'Due soon', value: invoiceStatuses.DUE_SOON },
  { label: 'Overdue', value: invoiceStatuses.OVERDUE }
]
