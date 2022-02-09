import useSWR from 'swr'

import { getTrainingSplits } from '../../../services/api/activities'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import usePagination, { UsePagination } from '../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/training-splits', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTrainingSplits {
  isLoading: boolean
  trainingSplits: any[]
  mutate: any
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  status?: string
}

export default function useTrainingSplits({
  clientId,
  status
}: IProps = {}): UseTrainingSplits & UsePagination {
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
    getTrainingSplits
  )

  const isLoading = !data && !error
  const trainingSplits = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    trainingSplits,
    mutate,
    meta,
    ...pagination
  }
}
