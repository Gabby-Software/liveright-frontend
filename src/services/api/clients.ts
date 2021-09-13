import { EP_UPDATE_PROFILE } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { stringifyQuery } from '../../utils/query'

export async function getClients(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function getClientsPaginate(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function updateClient(id: string, values: any) {
  const response = await api.put(
    EP_UPDATE_PROFILE,
    stringifyQuery({
      client_uuid: id,
      ...values
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return response.data
}
