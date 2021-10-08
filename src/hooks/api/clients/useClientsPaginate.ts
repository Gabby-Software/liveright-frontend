import debounce from 'lodash.debounce'
import { useState } from 'react'
import useSWR from 'swr'

import { EP_GET_CLIENTS } from '../../../enums/api.enum'
import { getClientsPaginate } from '../../../services/api/clients'
import { AccountObjType } from '../../../types/account.type'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { formatClients } from '../../../utils/api/clients'
import { stringifyURL } from '../../../utils/query'

interface UseClientsPaginate {
  isLoading: boolean
  clients: AccountObjType[]
  meta: PaginationMetaType
  onPage: (page: number) => void
  onSearch: (e: any) => void
}

interface UseClientsParams {
  page: number
  per_page: number
  query: string
  status?: 'active' | 'past' | 'awaiting'
}

interface UseClientsPaginateConfig extends Partial<UseClientsParams> {}

function getKey(params: Record<string, any>) {
  return stringifyURL(EP_GET_CLIENTS, params)
}

export default function useClientsPaginate(
  config: UseClientsPaginateConfig = {}
): UseClientsPaginate {
  const [filters, setFilters] = useState({
    page: config.page || 1,
    query: config.query || ''
  })

  const params: UseClientsParams = {
    per_page: config.per_page || 10,
    status: config.status,
    ...filters
  }

  const { data, error } = useSWR(() => getKey(params), getClientsPaginate)

  const onSearch = debounce((e) => {
    setFilters((filters) => ({
      ...filters,
      query: e,
      page: 1
    }))
  }, 400)

  const onPage = (page: number) => {
    setFilters((filters) => ({
      ...filters,
      page
    }))
  }

  const isLoading = !data && !error
  const clients = data?.data || []
  const meta = data?.meta || {}
  return {
    isLoading,
    clients: formatClients(clients),
    onSearch,
    onPage,
    meta
  }
}
