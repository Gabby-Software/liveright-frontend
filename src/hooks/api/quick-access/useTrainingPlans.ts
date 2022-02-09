import useSWR from 'swr'

import { getTrainingPlans } from '../../../services/api/activities'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTrainingPlans {
  isLoading: boolean
  trainingPlans: any[]
  mutate: any
}

interface IProps {
  clientId?: string | number
  status?: string
}

export default function useTrainingPlans({
  clientId,
  status
}: IProps = {}): UseTrainingPlans {
  const params = {
    filter: {
      account_id: clientId || '',
      status
    }
  }

  const { data, error, mutate } = useSWR(
    () => getKey(omitEmpty(params)),
    getTrainingPlans
  )

  const isLoading = !data && !error
  const trainingPlans = data?.data || []
  return {
    isLoading,
    trainingPlans,
    mutate
  }
}
