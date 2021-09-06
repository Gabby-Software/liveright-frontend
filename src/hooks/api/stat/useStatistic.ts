import { useState } from 'react'
import useSWR from 'swr'

import { getStatistic, getStatisticCount } from '../../../services/api/stat'
import {
  CHART_INITIAL_PARAMS,
  COUNT_INITIAL_PARAMS,
  getDateRanges,
  STATISTIC_INITIAL_PARAMS
} from '../../../utils/api/stat'

function getKey(params: Record<string, any>) {
  return JSON.stringify(params)
}

interface UseStatistic {
  statistic: {
    coaching_sessions: number
    consultations_sessions: number
    other: number
    pt_sessions: number
    total: number
  }
  count: {
    coaching: number
    complimentary: number
    consultation: number
    pt: number
    total: number
  }
  progressCount: {
    total: number
    outstanding: number
    overdue: number
    paid: number
  }
  chart: Record<string, number>
  onRange: (range: string) => void
  range: string
}

export default function useStatistic(): UseStatistic {
  const [range, setRange] = useState('week')
  const rangeObj = getDateRanges(range)

  const params = STATISTIC_INITIAL_PARAMS(rangeObj.from, rangeObj.to)
  const countParams = COUNT_INITIAL_PARAMS(rangeObj.from, rangeObj.to)
  const chartParams = CHART_INITIAL_PARAMS(rangeObj.from, rangeObj.to, range)

  const statisticCache = useSWR(() => getKey(params), getStatistic)
  const chartCache = useSWR(() => getKey(chartParams), getStatistic)
  const countCache = useSWR(() => getKey(countParams), getStatisticCount)

  const statistic = statisticCache.data?.revenue?.invoice || {}
  const chart = chartCache.data?.chart?.revenue?.data || {}
  const count = countCache.data?.count?.session || {}
  const progressCount = statisticCache.data?.count?.invoice || {}

  return {
    statistic,
    chart,
    progressCount,
    onRange: setRange,
    range,
    count
  }
}
