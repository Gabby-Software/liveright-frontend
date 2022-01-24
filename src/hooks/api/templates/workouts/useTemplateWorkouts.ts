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
  name?: string
  clientId?: string
}

export default function useTemplateWorkouts({
  name,
  clientId
}: IProps = {}): UseTemplateWorkouts {
  const params = {
    filter: {
      account_id: clientId,
      name
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
