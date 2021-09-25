import useSWR from 'swr'

import { EP_CREDITS } from '../../../enums/api.enum'
import { getCredits } from '../../../services/api/credits'
import useTrainerAccount from '../accounts/useTrainerAccount'

interface UseCreditsWithTrainer {
  isLoading: boolean
  credits: number
}

export default function useCreditsWithTrainer(): UseCreditsWithTrainer {
  const { account } = useTrainerAccount()
  const id = account.id
  const { data, error } = useSWR(
    id ? EP_CREDITS + `?trainer_id=${id}` : null,
    getCredits
  )
  const isLoading = typeof data !== 'number' && !error
  const credits = data || 0
  return {
    isLoading,
    credits
  }
}
