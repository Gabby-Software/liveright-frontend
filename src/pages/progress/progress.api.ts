import { toast } from '../../components/toast/toast.component'
import { EP_HEALTH_DATA_LOGS } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { queryFiltersPipe } from '../../pipes/query-filters.pipe'
import { serverError } from '../../pipes/server-error.pipe'
import { GetHealthDataPayload, HealthData } from './progress.types'

export const getHealthDataAsync = async (payload: GetHealthDataPayload) => {
  const { only_include, page = 1, ...filters } = payload
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
  payload: HealthData & { edit?: boolean; account_id?: number }
) => {
  const { id, ...body } = payload

  const params = { ...body }

  if (!params.account_id) {
    delete params.account_id
  }

  try {
    if (id) {
      await api.put(EP_HEALTH_DATA_LOGS + `/${id}`, body)
    } else {
      await api.post(EP_HEALTH_DATA_LOGS, body)
    }
    return
  } catch (e) {
    console.log(e)
    toast.show({ type: 'error', msg: serverError(e) })
  }
}
