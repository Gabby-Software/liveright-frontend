import api from '../../managers/api.manager'

export async function getClients(url: string) {
  const response = await api.get(url)
  return response.data.data
}
