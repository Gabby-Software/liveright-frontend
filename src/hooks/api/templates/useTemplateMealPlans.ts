import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import usePagination, { UsePagination } from '../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/meal-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateMealPlans {
  isLoading: boolean
  mealPlans: any[]
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateMealPlans({
  clientId,
  name
}: IProps = {}): UseTemplateMealPlans & UsePagination {
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
  const mealPlans = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    mealPlans,
    meta,
    ...pagination
  }
}
