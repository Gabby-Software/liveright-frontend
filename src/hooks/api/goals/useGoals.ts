import useSWR from 'swr'

import { EP_UPDATE_GOALS_TARGET } from '../../../enums/api.enum'
import { getGoals } from '../../../services/api/goals'
import { TargetDataType } from '../../../types/goals-api-data.type'

interface useGoalsConfig {
  filter?: {
    account_id: string
  }
}

interface UseGoals {
  data: TargetDataType[] | null
  mutate: any
  getGoalsTargetByType: (
    type: string,
    goalsData?: TargetDataType[] | null
  ) => number | undefined
  getTargetMonthlyIncome: (target: string[]) => number
}

export default function useGoals(config?: useGoalsConfig): UseGoals {
  // const url = stringifyURL(EP_UPDATE_GOALS_TARGET, omitEmpty(config || {}))
  const { data, error, mutate } = useSWR<any, any>(
    EP_UPDATE_GOALS_TARGET,
    getGoals
  )

  const userGoals =
    data?.data?.filter((g: any) => {
      if (config?.filter?.account_id)
        return g.created_by.uuid === config?.filter?.account_id
      else return true
    }) || null

  const getGoalsTargetByType = (
    type: string,
    goalsData: TargetDataType[] | null = userGoals
  ): number | undefined => {
    const filteredGoals = goalsData?.filter((goal) => goal.type === type)
    return filteredGoals?.[filteredGoals?.length - 1]?.goal
  }

  const getTargetMonthlyIncome = (targets: string[]) => {
    return targets.reduce((acc, t) => acc + (getGoalsTargetByType(t) || 0), 0)
  }

  return {
    data: error ? null : data?.data,
    mutate,
    getGoalsTargetByType,
    getTargetMonthlyIncome
  }
}
