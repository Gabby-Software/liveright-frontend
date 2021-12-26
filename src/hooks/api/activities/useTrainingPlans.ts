import useSWR from 'swr'

import { getTrainingPlans } from '../../../services/api/activities'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-plans', params)
}

interface UseTrainingPlans {
  isLoading: boolean
  trainingPlans: any[]
}

export default function useTrainingPlans({
  clientId
}: {
  clientId?: string
} = {}): UseTrainingPlans {
  const params = {
    filter: {
      account_id: clientId || ''
    }
  }

  const { data, error } = useSWR(
    () => getKey(omitEmpty(params)),
    getTrainingPlans
  )

  const isLoading = !data && !error
  const trainingPlans = data?.data || []
  return {
    isLoading,
    trainingPlans
  }
}
