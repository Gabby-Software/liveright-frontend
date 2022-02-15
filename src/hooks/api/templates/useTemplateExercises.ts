import useSWR from 'swr'

import { getTemplatesExercises } from '../../../services/api/templates'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import usePagination, { UsePagination } from '../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/exercises', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface useTemplateExercises {
  isLoading: boolean
  exercises: any[]
  meta: PaginationMetaType
}

interface IProps {
  name?: string
  clientId?: string
  type?: string
}

export default function useTemplateExercises({
  name,
  clientId,
  type
}: IProps = {}): useTemplateExercises & UsePagination {
  const pagination = usePagination()
  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      name: name,
      account_id: clientId,
      'info.type': type
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesExercises)

  const isLoading = !data && !error
  const exercises = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    exercises,
    meta,
    ...pagination
  }
}
