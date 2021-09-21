import api from '../../managers/api.manager'

export async function getHealthData(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getHealthAverage(url: string) {
  const response = await api.get(url)
  return response.data.data
}
