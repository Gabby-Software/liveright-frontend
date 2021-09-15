import debounce from 'lodash.debounce'
import { useState } from 'react'
import useSWR from 'swr'

import { EP_GET_SESSIONS } from '../../../enums/api.enum'
import { getSessions } from '../../../services/api/sessions'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import {
  Session,
  SessionStatus,
  SessionType
} from '../../../types/session.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'
import useSession, { UseSession } from './useSession'

export interface SessionsFilter {
  client_id?: number
  type?: Session
  status?: SessionStatus
  search?: string
}

export interface SessionsRequestParams {
  filter?: SessionsFilter
  include?: 'client.user' | 'trainer.user'
  page?: number
}

export type UseSessionsConfig = Partial<SessionsRequestParams>

export interface UseSessions {
  sessions: SessionType[]
  meta: PaginationMetaType
  isLoading: boolean
  onPage: (page: number) => void
  mutate: any
  filters: SessionsFilter
  onFilters: (name: keyof SessionsFilter, value: any) => void
  changeStatus: (status: SessionStatus) => void
  onSearch: (e: string) => void
}

function getKey(params: SessionsRequestParams) {
  params.filter = params.filter ? omitEmpty(params.filter) : {}
  return stringifyURL(EP_GET_SESSIONS, params)
}

export default function useSessions(
  config: UseSessionsConfig = {}
): UseSessions & UseSession {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<SessionsFilter>(config.filter || {})

  const params = {
    page,
    filter: {
      ...config.filter,
      ...filters
    },
    ...(config.include && { include: config.include })
  }

  const { data, error, mutate } = useSWR(() => getKey(params), getSessions)
  const isLoading = !data && !error

  const session = useSession({ mutate })

  const onPage = (page: number) => {
    setPage(page)
  }

  const sessions = data?.data || []
  const meta = data?.meta || {}

  const onFilters = (name: keyof SessionsFilter, value: any) => {
    setPage(1)
    setFilters((filters) => ({
      ...filters,
      [name]: value
    }))
  }

  const changeStatus = (status: SessionStatus) => {
    setPage(1)
    setFilters({
      status
    })
  }

  const onSearch = debounce((e) => {
    onFilters('search', e)
  }, 400)

  return {
    isLoading,
    meta,
    sessions,
    onPage,
    mutate,
    filters,
    onFilters,
    changeStatus,
    onSearch,
    ...session
  }
}
