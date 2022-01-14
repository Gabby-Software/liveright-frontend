import useSWR from 'swr'

import { getTrainingSplits } from '../../../services/api/activities'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-splits', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTrainingSplits {
  isLoading: boolean
  trainingSplits: any[]
  mutate: any
}

interface IProps {
  clientId?: string
  status?: string
}

export default function useTrainingSplits({
  clientId,
  status
}: IProps = {}): UseTrainingSplits {
  const params = {
    filter: {
      account_id: clientId || '',
      status
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
