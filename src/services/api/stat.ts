import { EP_STATISTIC_AR, EP_STATISTIC_LR } from '../../enums/api.enum'
import api from '../../managers/api.manager'

export async function getStatistic(url: string) {
  const params = JSON.parse(url)
  const response = await api.post(EP_STATISTIC_AR, params)
  return response.data.data
}

export async function getStatisticCount(url: string) {
  const params = JSON.parse(url)
  const response = await api.post(EP_STATISTIC_LR, params)
  return response.data.data
}
