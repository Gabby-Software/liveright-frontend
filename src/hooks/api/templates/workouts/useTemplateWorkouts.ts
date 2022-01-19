import useSWR from 'swr'

import { getTemplatesWorkouts } from '../../../../services/api/templates'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/workouts', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateWorkouts {
  isLoading: boolean
  workouts: any[]
}

interface IProps {
  clientId?: string
}

export default function useTemplateWorkouts({
  clientId
}: IProps = {}): UseTemplateWorkouts {
  const params = {
    filter: {
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesWorkouts)

  const isLoading = !data && !error
  const workouts = data?.data || []
  return {
    isLoading,
    workouts
  }
}
