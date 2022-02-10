import useSWR from 'swr'

import { getTemplatesWorkouts } from '../../../../services/api/templates'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'
import usePagination, { UsePagination } from '../../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/workouts', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateWorkouts {
  isLoading: boolean
  workouts: any[]
  meta: PaginationMetaType
}

interface IProps {
  name?: string
  clientId?: string
}

export default function useTemplateWorkouts({
  name,
  clientId
}: IProps = {}): UseTemplateWorkouts & UsePagination {
  const pagination = usePagination()
  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      account_id: clientId,
      name
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesWorkouts)

  const isLoading = !data && !error
  const workouts = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    workouts,
    meta,
    ...pagination
  }
}
