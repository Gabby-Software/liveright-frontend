import { EP_GET_SESSIONS } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function getSessions(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function cancelSession(id: number) {
  const response = await api.delete(EP_GET_SESSIONS + `/${id}`)
  return response.data
}
