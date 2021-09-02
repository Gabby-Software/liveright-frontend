import { EP_EDIT_INVOICE } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function sendInvoice(id: number) {
  const response = await api.put(`${EP_EDIT_INVOICE}/${id}`, {
    invoice: {
      send_to_client: true
    }
  })
  return response.data
}
