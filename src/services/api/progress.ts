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

export async function getMeasurements(url: string) {
  const response = await api.get(url)
  return response.data
}

export async function addMeasurements(data: any, id?: string) {
  const response = id
    ? await api.put(`${EP_MEASUREMENTS}/${id}`, data)
    : await api.post(EP_MEASUREMENTS, data)
  return response.data.data
}

export async function getGoals(url: string) {
  const response = await api.get(url)
  return response.data.data
}
