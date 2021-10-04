import { EP_MEASUREMENTS } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function getHealthData(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function getHealthAverage(url: string) {
  const response = await api.get(url)
  return response.data.data
}

export async function addMeasurements(data: any) {
  const response = await api.post(EP_MEASUREMENTS, data)
  return response.data.data
}
