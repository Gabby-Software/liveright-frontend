import useSWR from 'swr'

import { getTrainingPlans } from '../../../services/api/activities'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-plans', params)
}

interface UseTrainingPlans {
  isLoading: boolean
  trainingPlans: any[]
}

export default function useTrainingPlans(): UseTrainingPlans {
  const params = {}

  const { data, error } = useSWR(() => getKey(params), getTrainingPlans)

  const isLoading = !data && !error
  const trainingPlans = data?.data || []
  return {
    isLoading,
    trainingPlans
  }
}
