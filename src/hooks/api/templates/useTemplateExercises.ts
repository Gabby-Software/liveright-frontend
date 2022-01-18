import useSWR from 'swr'

import { getTemplatesExercises } from '../../../services/api/templates'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/exercises', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface useTemplateExercises {
  isLoading: boolean
  exercises: any[]
}

interface IProps {
  name?: string
  clientId?: string
}

export default function useTemplateExercises({
  name,
  clientId
}: IProps = {}): useTemplateExercises {
  const params = {
    filter: {
      name: name,
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesExercises)

  const isLoading = !data && !error
  const exercises = data?.data || []
  return {
    isLoading,
    exercises
  }
}
