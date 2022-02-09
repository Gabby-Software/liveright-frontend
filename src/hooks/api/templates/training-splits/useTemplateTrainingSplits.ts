import useSWR from 'swr'

import { getTemplatesData } from '../../../../services/api/templates'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'
import usePagination, { UsePagination } from '../../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/training-split-templates', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateTrainingSplits {
  isLoading: boolean
  trainingSplits: any[]
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateTrainingSplits({
  clientId,
  name
}: IProps = {}): UseTemplateTrainingSplits & UsePagination {
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
  const trainingSplits = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    trainingSplits,
    meta,
    ...pagination
  }
}
