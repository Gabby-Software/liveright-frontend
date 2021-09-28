import { useState } from 'react'
import useSWR from 'swr'

import { EP_HEALTH_DATA_LOGS } from '../../../enums/api.enum'
import {
  AverageHealthData,
  HealthData
} from '../../../pages/progress/progress.types'
import { getHealthAverage, getHealthData } from '../../../services/api/progress'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

export type HealthOnlyInclude =
  | 'steps'
  | 'heart_rate'
  | 'blood_glucose'
  | 'sleep'
export type HealthRange =
  | 'week'
  | 'month'
  | 'quarter'
  | 'ytd'
  | 'last_year'
  | 'specific_dates'

export interface HealthFilter {
  date?: string
  account_id?: number
  from_date?: string
  to_date?: string
  range?: HealthRange
}

export interface UseHealth {
  isLoading: boolean
  health: HealthData[]
  meta: PaginationMetaType
  filters: HealthFilter
  onlyInclude: HealthOnlyInclude
  onOnlyInclude: (onlyInclude: HealthOnlyInclude) => void
  onFilters: (key: keyof HealthFilter, value: any) => void
  averages: AverageHealthData
  isAveragesLoading: boolean
}

interface HealthDataParams {
  only_include: HealthOnlyInclude
  sort?: {
    date?: 'asc' | 'desc'
  }
  filter?: HealthFilter
  page: number
  per_page?: number
}

interface UseHealthConfig extends Partial<HealthDataParams> {
  averages?: boolean
  skip?: boolean
}

function getKey(params: HealthDataParams) {
  params.filter = params.filter ? omitEmpty(params.filter) : {}
  return stringifyURL(EP_HEALTH_DATA_LOGS, params)
}

function getAverageKey(params: Partial<HealthDataParams>) {
  const copy = { ...params }
  copy.filter = copy.filter ? omitEmpty(copy.filter) : {}
  delete copy.only_include
  return stringifyURL(EP_HEALTH_DATA_LOGS + '/averages', copy)
}

export default function useHealth(config: UseHealthConfig = {}): UseHealth {
  const [onlyInclude, setOnlyInclude] = useState<HealthOnlyInclude>(
    config.only_include as HealthOnlyInclude
  )

  const [filters, setFilters] = useState<HealthFilter>({
    range: 'month'
  })

  const params: HealthDataParams = {
    page: 1,
    per_page: config.per_page || 10,
    only_include: onlyInclude,
    sort: config.sort || {
      date: 'desc'
    },
    filter: {
      ...config.filter,
      ...filters
    }
  }

  const skip =
    config.skip ||
    (params.filter?.range === 'specific_dates' &&
      !(params.filter.from_date && params.filter.to_date))

  const { data, error } = useSWR(
    () => (skip ? null : getKey(params)),
    getHealthData
  )

  const averagesCache = useSWR(
    () => (config.averages ? getAverageKey(params) : null),
    getHealthAverage
  )

  const onOnlyInclude = (onlyInclude: HealthOnlyInclude) => {
    setOnlyInclude(onlyInclude)
  }

  const onFilters = (key: keyof HealthFilter, value: any) => {
    setFilters((filters) => ({
      ...filters,
      [key]: value
    }))
  }

  const health = data?.data || []
  const meta = data?.meta || {}
  const isLoading = !data && !error && !skip

  const averages = averagesCache.data || {}
  const isAveragesLoading =
    !averagesCache.data && !averagesCache.error && !!config.averages
  return {
    isLoading,
    health,
    meta,
    filters,
    onlyInclude: params.only_include,
    onOnlyInclude,
    onFilters,
    averages,
    isAveragesLoading
  }
}
