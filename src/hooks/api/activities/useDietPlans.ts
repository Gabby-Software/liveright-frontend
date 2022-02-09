import useSWR from 'swr'

import { getDietPlans } from '../../../services/api/activities'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import usePagination, { UsePagination } from '../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/diet-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseDietPlans {
  isLoading: boolean
  dietPlans: any[]
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  status?: string
}

export default function useDietPlans({
  clientId,
  status
}: IProps = {}): UseDietPlans & UsePagination {
  const pagination = usePagination()

  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      account_id: clientId,
      status
    }
  }

  const { data, error } = useSWR(() => getKey(params), getDietPlans)

  const isLoading = !data && !error
  const dietPlans = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    dietPlans,
    meta,
    ...pagination
  }
}
