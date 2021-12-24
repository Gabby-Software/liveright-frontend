import useSWR from 'swr'

import { getDietPlans } from '../../../services/api/activities'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/diet-plans', params)
}

interface UseDietPlans {
  isLoading: boolean
  dietPlans: any[]
}

export default function useDietPlans(): UseDietPlans {
  const params = {}

  const { data, error } = useSWR(() => getKey(params), getDietPlans)

  const isLoading = !data && !error
  const dietPlans = data?.data || []
  return {
    isLoading,
    dietPlans
  }
}
