import { EP_HEALTH_DATA_LOGS } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { queryFiltersPipe } from '../../pipes/query-filters.pipe'
import { GetHealthDataPayload, HealthData } from './progress.types'

export const getHealthDataAsync = async (payload: GetHealthDataPayload) => {
  const { only_include, id, page = 1, ...filters } = payload
  const filtersQuery = queryFiltersPipe(filters)
  const params = new URLSearchParams(filtersQuery).toString()
  const includeParam = only_include ? `&only_include=${only_include}` : ''

  try {
    const { data } = await api.get(
      EP_HEALTH_DATA_LOGS + `?${params}${includeParam}&page=${page}`
    )

    return data
  } catch (e) {
    console.log(e)
  }
}

export const getAverageHealthDataAsync = async () => {
  try {
    const { data } = await api.get(EP_HEALTH_DATA_LOGS + `/averages`)

    return data
  } catch (e) {
    console.log(e)
  }
}

export const logHealthDataAsync = async (
  payload: HealthData & { edit?: boolean }
) => {
  const { edit, id, ...body } = payload

  try {
    if (edit) {
      await api.put(EP_HEALTH_DATA_LOGS + `/${id}`, body)
    } else {
      await api.post(EP_HEALTH_DATA_LOGS, body)
    }
  } catch (e) {
    console.log(e)
  }
}
