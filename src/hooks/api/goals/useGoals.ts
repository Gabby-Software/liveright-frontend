import useSWR from 'swr'

import { EP_UPDATE_GOALS_TARGET } from '../../../enums/api.enum'
import api from '../../../managers/api.manager'
import { TargetDataType } from '../../../types/goals-api-data.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

interface useGoalsConfig {
  filter?: {
    account_id: string
  }
}

export default function useGoals(config?: useGoalsConfig): {
  data: TargetDataType[] | null
  mutate: any
} {
  const url = stringifyURL(EP_UPDATE_GOALS_TARGET, omitEmpty(config || {}))
  const { data, error, mutate } = useSWR<any, any>(url, api.get)
  const apiData = data?.data
  return { data: error ? null : apiData?.data, mutate }
}
