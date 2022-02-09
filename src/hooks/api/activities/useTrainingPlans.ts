import useSWR from 'swr'

import { getTrainingPlans } from '../../../services/api/activities'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import usePagination, { UsePagination } from '../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/training-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTrainingPlans {
  isLoading: boolean
  trainingPlans: any[]
  mutate: any
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  status?: string
}

export default function useTrainingPlans({
  clientId,
  status
}: IProps = {}): UseTrainingPlans & UsePagination {
  const pagination = usePagination()

  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      account_id: clientId || '',
      status
    }
  }

  const { data, error, mutate } = useSWR(
    () => getKey(omitEmpty(params)),
    getTrainingPlans
  )

  const isLoading = !data && !error
  const trainingPlans = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    trainingPlans,
    mutate,
    meta,
    ...pagination
  }
}
