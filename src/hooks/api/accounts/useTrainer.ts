import useSWR from 'swr'

import { EP_GET_TRAINER } from '../../../enums/api.enum'
import { getTrainer } from '../../../services/api/accounts'

interface UseTrainer {
  isLoading: boolean
  trainer: {
    id: number
  }
}

export default function useTrainer(): UseTrainer {
  const { data, error } = useSWR(EP_GET_TRAINER, getTrainer)
  const isLoading = !data && !error
  const trainer = data?.accounts?.[0] || {}
  return {
    isLoading,
    trainer
  }
}
