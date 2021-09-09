import {
  EP_EDIT_INVOICE,
  EP_GET_INVOICES,
  EP_MARK_INVOICE_AS_PAID
} from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function sendInvoice(id: number) {
  const response = await api.put(`${EP_EDIT_INVOICE}/${id}`, {
    invoice: {
      send_to_client: true
    }
  })
  return response.data
}

export async function markPainInvoice(id: number) {
  const response = await api.post(EP_MARK_INVOICE_AS_PAID(id))
  return response.data
}

export async function getInvoices(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getInvoice(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function cancelInvoice(id: number) {
  const response = await api.delete(EP_GET_INVOICES + `/${id}`)
  return response.data
}
