import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_MEASUREMENTS } from '../../../enums/api.enum'
import { handleErrorMessage } from '../../../managers/api.manager'
import {
  addGoals,
  addMeasurements,
  getMeasurements
} from '../../../services/api/progress'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import {
  formatGoalsValues,
  formatMeasurementsValues
} from '../../../utils/api/progress'
import { stringifyURL } from '../../../utils/query'

interface MeasurementsFilters {
  range?: 'week' | 'month' | 'quarter' | 'ytd' | 'last_year' | 'specific_dates'
  from_date?: string
  to_date?: string
  account_id?: string
  date?: string
  has_photos?: boolean
}

type OnFilters = (name: keyof MeasurementsFilters, value: any) => void

interface MeasurementsParams {
  filter?: MeasurementsFilters
  sort?: {
    date?: 'asc' | 'desc'
  }
  page?: number
  per_page?: number
  columns?: string
}

type OnAdd = (values: any, id?: string, onSuccess?: any) => void

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
  const params = useParams<any>()
  const [page, setPage] = useState(1)

  const [filters, setFilters] = useState<MeasurementsFilters>({
    ...config.filter
  })

  useEffect(() => {
    if (config.filter?.date) {
      setFilters((filters) => ({ ...filters, date: config.filter?.date }))
    }
  }, [config.filter?.date])

  const apiParams: MeasurementsParams = {
    filter: filters,
    page,
    sort: config.sort || {
      date: 'desc'
    },
    columns: config.columns,
    ...(config.per_page !== 0 && {
      per_page: config.per_page || 10
    })
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

  const onAdd: OnAdd = async (values, id, onSuccess) => {
    try {
      const formattedValues = await formatMeasurementsValues(
        values,
        params.clientId
      )
      await addMeasurements(formattedValues, id)

      const goals = values.goals
      if (
        goals &&
        goals.from &&
        goals.to &&
        goals.body_weight &&
        goals.body_fat &&
        goals.lean_mass
      ) {
        const formattedValues = formatGoalsValues(goals, params.clientId)
        await addGoals(formattedValues)
      }

      toast.show({
        type: 'success',
        msg: id ? 'Measurements updated!' : 'Measurements saved!'
      })

      onSuccess?.()
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
