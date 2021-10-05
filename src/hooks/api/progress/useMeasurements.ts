import { useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_MEASUREMENTS } from '../../../enums/api.enum'
import { Routes } from '../../../enums/routes.enum'
import { handleErrorMessage } from '../../../managers/api.manager'
import {
  addMeasurements,
  getMeasurements
} from '../../../services/api/progress'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import { isClient } from '../../../utils/api/auth'
import { formatMeasurementsValues } from '../../../utils/api/progress'
import { stringifyURL } from '../../../utils/query'
import { getRoute } from '../../../utils/routes'
import { useAuth } from '../../auth.hook'

interface MeasurementsFilters {
  range?: 'week' | 'month' | 'quarter' | 'ytd' | 'last_year' | 'specific_dates'
  from_date?: string
  to_date?: string
  account_id?: string
  date?: string
}

type OnFilters = (name: keyof MeasurementsFilters, value: any) => void

interface MeasurementsParams {
  filter?: MeasurementsFilters
  sort?: {
    date?: 'asc' | 'desc'
  }
  page?: number
  per_page?: number
}

type OnAdd = (values: any, id?: string) => void

type OnPage = (page: number) => void

interface UseMeasurements {
  onAdd: OnAdd
  onPage: OnPage
  isLoading: boolean
  filters: MeasurementsFilters
  onFilters: OnFilters
  measurements: any[]
  meta: PaginationMetaType
}

interface UseMeasurementsConfig extends Partial<MeasurementsParams> {
  skip?: boolean
  requireDate?: boolean
}

function getKey(params: any) {
  return stringifyURL(EP_MEASUREMENTS, params)
}

export default function useMeasurements(
  config: UseMeasurementsConfig = {}
): UseMeasurements {
  const history = useHistory()
  const params = useParams<any>()
  const { type } = useAuth()
  const [page, setPage] = useState(1)

  const [filters, setFilters] = useState<MeasurementsFilters>({
    ...config.filter
  })

  const apiParams: MeasurementsParams = {
    filter: filters,
    page,
    per_page: config.per_page || 10,
    sort: config.sort || {
      date: 'desc'
    }
  }

  const skip =
    config.skip ||
    (config.requireDate && !filters.date) ||
    (apiParams.filter?.range === 'specific_dates' &&
      !(apiParams.filter.from_date && apiParams.filter.to_date))

  const { data, error } = useSWR(
    () => (skip ? null : getKey(apiParams)),
    getMeasurements
  )

  const onAdd: OnAdd = async (values, id) => {
    try {
      const formattedValues = await formatMeasurementsValues(values, params.id)
      await addMeasurements(formattedValues, id)

      toast.show({
        type: 'success',
        msg: id ? 'Measurements updated!' : 'Measurements saved!'
      })

      history.push(
        isClient(type)
          ? Routes.PROGRESS_CLIENT_MEASUREMENTS
          : getRoute(Routes.PROGRESS_MEASUREMENTS, { id: params.id })
      )
    } catch (e) {
      handleErrorMessage(e)
      console.error(e)
    }
  }

  const onFilters: OnFilters = (name, value) => {
    setPage(1)
    setFilters((filters) => ({
      ...filters,
      [name]: value
    }))
  }

  const onPage: OnPage = (page) => {
    setPage(page)
  }

  const isLoading = !data && !error
  const measurements = data?.data || []
  const meta = data?.meta || {}
  return {
    onAdd,
    onPage,
    isLoading,
    filters,
    onFilters,
    measurements,
    meta
  }
}
