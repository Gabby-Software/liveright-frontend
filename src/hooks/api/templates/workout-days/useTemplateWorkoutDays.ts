import useSWR from 'swr'

import { getTemplatesWorkoutDays } from '../../../../services/api/templates'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'
import usePagination, { UsePagination } from '../../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/workout-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface useTemplateWorkoutDays {
  isLoading: boolean
  workoutDays: any[]
  meta: PaginationMetaType
}

interface IProps {
  name?: string
  clientId?: string
}

export default function useTemplateWorkoutDays({
  name,
  clientId
}: IProps = {}): useTemplateWorkoutDays & UsePagination {
  const pagination = usePagination()
  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      name: name,
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesWorkoutDays)

  const isLoading = !data && !error
  const workoutDays = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    workoutDays,
    meta,
    ...pagination
  }
}
