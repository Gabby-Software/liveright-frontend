import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import usePagination, { UsePagination } from '../../ui/usePagination'

function getKey(params: any) {
  return stringifyURL('/foods', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateFoods {
  isLoading: boolean
  foods: any[]
  meta: PaginationMetaType
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateFoods({
  name,
  clientId
}: IProps = {}): UseTemplateFoods & UsePagination {
  const pagination = usePagination()
  const params = {
    page: pagination.page,
    per_page: 10,
    filter: {
      name: name || '',
      account_id: clientId || ''
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const foods = data?.data || []
  const meta = data?.meta || {}

  return {
    isLoading,
    foods,
    meta,
    ...pagination
  }
}
