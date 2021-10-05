import useSWR from 'swr'

import { EP_UPDATE_GOALS_TARGET } from '../../../enums/api.enum'
import api from '../../../managers/api.manager'
import { TargetDataType } from '../../../types/goals-api-data.type'

export default function useGoals(): { data: TargetDataType[] | null } {
  const { data, error } = useSWR<any, any>(EP_UPDATE_GOALS_TARGET, api.get)
  const apiData = data?.data
  return { data: error ? null : apiData?.data }
}
