import useSWR from 'swr'

import { EP_CREDITS } from '../../../enums/api.enum'
import { getCredits } from '../../../services/api/credits'

interface UseClientCredits {
  isLoading: boolean
  credits: number
}

export default function useClientCredits(id?: number): UseClientCredits {
  const { data, error } = useSWR(
    id ? EP_CREDITS + `?client_id=${id}` : null,
    getCredits
  )
  const isLoading = typeof data !== 'number' && !error
  const credits = data || 0
  return {
    isLoading,
    credits
  }
}
