import useSWR from 'swr'

import { getTemplatesData } from '../../../../services/api/templates'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'
import usePagination, { UsePagination } from '../../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/meals', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateMeals {
  isLoading: boolean
  meals: any[]
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateMeals({
  clientId,
  name
}: IProps = {}): UseTemplateMeals & UsePagination {
  const pagination = usePagination()
  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      account_id: clientId,
      name
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const meals = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    meals,
    meta,
    ...pagination
  }
}
