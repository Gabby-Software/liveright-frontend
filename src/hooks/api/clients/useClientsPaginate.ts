import debounce from 'lodash.debounce'
import { useState } from 'react'
import useSWR from 'swr'

import { EP_GET_CLIENTS } from '../../../enums/api.enum'
import { getClientsPaginate } from '../../../services/api/clients'
import { AccountObjType } from '../../../types/account.type'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { formatClients } from '../../../utils/api/clients'
import { stringifyURL } from '../../../utils/query'

function getKey(params: Record<string, any>) {
  return stringifyURL(EP_GET_CLIENTS, params)
}

interface UseClientsPaginate {
  isLoading: boolean
  clients: AccountObjType[]
  meta: PaginationMetaType
  onPage: (page: number) => void
  onSearch: (e: any) => void
}

export default function useClientsPaginate(): UseClientsPaginate {
  const [filters, setFilters] = useState({
    page: 1,
    query: ''
  })

  const params = {
    per_page: 10,
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
