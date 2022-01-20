import useSWR from 'swr'

import { getTemplatesWorkoutDays } from '../../../../services/api/templates'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/workout-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface useTemplateWorkoutDays {
  isLoading: boolean
  workoutDays: any[]
}

interface IProps {
  name?: string
  clientId?: string
}

export default function useTemplateWorkoutDays({
  name,
  clientId
}: IProps = {}): useTemplateWorkoutDays {
  const params = {
    filter: {
      name: name,
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesWorkoutDays)

  const isLoading = !data && !error
  const workoutDays = data?.data || []
  return {
    isLoading,
    workoutDays
  }
}
