import useSWR from 'swr'

import { getTemplatesTrainingPlans } from '../../../../services/api/templates'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'
import usePagination, { UsePagination } from '../../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/training-plan-templates', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface useTemplateTrainingPlans {
  isLoading: boolean
  trainingPlans: any[]
  meta: PaginationMetaType
}

interface IProps {
  name?: string
  clientId?: string
}

export default function useTemplateTrainingPlans({
  name,
  clientId
}: IProps = {}): useTemplateTrainingPlans & UsePagination {
  const pagination = usePagination()
  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      name: name,
      account_id: clientId
    }
  }

  const { data, error } = useSWR(
    () => getKey(params),
    getTemplatesTrainingPlans
  )

  const isLoading = !data && !error
  const trainingPlans = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    trainingPlans,
    meta,
    ...pagination
  }
}
