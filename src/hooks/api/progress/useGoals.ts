import { useParams } from 'react-router'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_GOALS } from '../../../enums/api.enum'
import { addGoals, getGoals } from '../../../services/api/progress'
import { formatGoalsValues } from '../../../utils/api/progress'
import { stringifyURL } from '../../../utils/query'

type OnAdd = (values: any, onSuccess?: any) => void

interface GoalsFilters {
  account_id?: string
}

interface GoalsParams {
  filter?: GoalsFilters
}

interface UseGoalsConfig extends Partial<GoalsParams> {
  skip?: boolean
}

interface UseGoals {
  onAdd: OnAdd
  goals: any[]
  isLoading: boolean
}

function getKey(params: GoalsParams) {
  return stringifyURL(EP_GOALS, params)
}

export default function useGoals(config: UseGoalsConfig = {}): UseGoals {
  const params = useParams<any>()

  const apiParams: GoalsParams = {
    filter: config.filter
  }

  const { data, error } = useSWR(
    () => (config.skip ? null : getKey(apiParams)),
    getGoals
  )

  const isLoading = !data && !error

  const onAdd: OnAdd = async (values, onSuccess) => {
    try {
      const formattedData = formatGoalsValues(values, params.clientId)
      await addGoals(formattedData)
      toast.show({ type: 'success', msg: 'Goals successfully saved!' })
      onSuccess?.()
    } catch (e) {
      console.error(e)
    }
  }

  const goals = data || []
  return {
    onAdd,
    goals,
    isLoading
  }
}
