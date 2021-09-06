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

export interface SessionsFilter {
  client_id?: number
  type?: Session
  status?: SessionStatus
}

export interface SessionsRequestParams {
  filter: SessionsFilter
}

export interface UseSessionsConfig {
  filter?: SessionsFilter
}

export interface UseSessions {
  sessions: SessionType[]
  meta: PaginationMetaType
  isLoading: boolean
}

function getKey(params: SessionsRequestParams) {
  params.filter = omitEmpty(params.filter)
  return stringifyURL(EP_GET_SESSIONS, params)
}

export default function useSessions(
  config: UseSessionsConfig = {}
): UseSessions {
  const params = {
    filter: {
      ...config.filter
    }
  }

  const { data, error } = useSWR(() => getKey(params), getSessions)
  const isLoading = !data && !error

  const sessions = data?.data || []
  const meta = data?.meta || {}
  return {
    isLoading,
    meta,
    sessions
  }
}
