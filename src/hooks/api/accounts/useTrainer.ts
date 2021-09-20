import useSWR from 'swr'

import { EP_GET_TRAINER } from '../../../enums/api.enum'
import { getTrainer } from '../../../services/api/accounts'
import { isClient } from '../../../utils/api/auth'
import { useAuth } from '../../auth.hook'

interface UseTrainer {
  isLoading: boolean
  trainer: {
    id: number
  }
}

export default function useTrainer(): UseTrainer {
  const { type } = useAuth()

  const { data, error } = useSWR(
    isClient(type) ? EP_GET_TRAINER : null,
    getTrainer
  )
  const isLoading = !data && !error
  const trainer = data?.accounts?.[0] || {}
  return {
    isLoading,
    trainer
  }
}
