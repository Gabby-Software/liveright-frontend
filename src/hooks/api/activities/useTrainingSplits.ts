import useSWR from 'swr'

import { getTrainingSplits } from '../../../services/api/activities'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-splits', params)
}

interface UseTrainingSplits {
  isLoading: boolean
  trainingSplits: any[]
  mutate: any
}

export default function useTrainingSplits({
  clientId
}: {
  clientId?: string
} = {}): UseTrainingSplits {
  const params = {
    filter: {
      account_id: clientId || ''
    }
  }

  const { data, error, mutate } = useSWR(
    () => getKey(omitEmpty(params)),
    getTrainingSplits
  )

  const isLoading = !data && !error
  const trainingSplits = data?.data || []
  return {
    isLoading,
    trainingSplits,
    mutate
  }
}
