import { EP_HEALTH_DATA_LOGS } from '../../enums/api.enum'
import api from '../../managers/api.manager'
import { queryFiltersPipe } from '../../pipes/query-filters.pipe'
import { OverTimeType, ProgressLogType } from './progress.types'

export const getHealthDataAsync = async (payload: {
  id?: string
  only_include?: ProgressLogType
  date?: string
  account_id?: number
  range?: OverTimeType
  from_date?: string
  to_date?: string
}) => {
  const { only_include, id, ...filters } = payload
  const filtersQuery = queryFiltersPipe(filters)
  const params = new URLSearchParams({
    ...filtersQuery
  } as any).toString()

  try {
    const { data } = await api.get(EP_HEALTH_DATA_LOGS + `?${params}`)

    return data
  } catch (e) {
    console.log(e)
  }
}
