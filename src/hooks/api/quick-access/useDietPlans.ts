import useSWR from 'swr'

import { getDietPlans } from '../../../services/api/activities'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/diet-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseDietPlans {
  isLoading: boolean
  dietPlans: any[]
}

interface IProps {
  clientId?: string | number
  status?: string
}

export default function useDietPlans({
  clientId,
  status
}: IProps = {}): UseDietPlans {
  const params = {
    filter: {
      account_id: clientId,
      status
    }
  }

  const { data, error } = useSWR(() => getKey(params), getDietPlans)

  const isLoading = !data && !error
  const dietPlans = data?.data || []
  return {
    isLoading,
    dietPlans
  }
}
