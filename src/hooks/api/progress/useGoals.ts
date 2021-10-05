import useSWR from 'swr'

import { EP_GOALS } from '../../../enums/api.enum'
import { getGoals } from '../../../services/api/progress'

export default function useGoals() {
  const { data, error } = useSWR(EP_GOALS, getGoals)
  const isLoading = !data && !error

  console.log('goals', { data, isLoading })
  return {}
}
