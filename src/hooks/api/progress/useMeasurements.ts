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

type OnFilters = (name: string, value: any) => void

interface MeasurementsFilters {
  range?: 'week' | 'month' | 'quarter' | 'ytd' | 'last_year' | 'specific_dates'
  from_date?: string
  to_date?: string
  account_id?: string
  date?: string
}

interface MeasurementsParams {
  filter?: MeasurementsFilters
  sort?: {
    date?: 'asc' | 'desc'
  }
  page?: number
  per_page?: number
}

interface UseMeasurements {
  onAdd: (values: any) => void
  isLoading: boolean
  filters: MeasurementsFilters
  onFilters: OnFilters
  measurements: any[]
  meta: PaginationMetaType
}

interface UseMeasurementsConfig extends Partial<MeasurementsParams> {
  skip?: boolean
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

  const [filters, setFilters] = useState<MeasurementsFilters>({
    ...config.filter
  })

  const apiParams: MeasurementsParams = {
    filter: filters,
    page: config.page || 1,
    per_page: config.per_page || 10,
    sort: config.sort || {
      date: 'desc'
    }
  }

  const { data, error } = useSWR(
    () => (config.skip ? null : getKey(apiParams)),
    getMeasurements
  )

  const onAdd = async (values: any) => {
    try {
      const formattedValues = await formatMeasurementsValues(values, params.id)
      await addMeasurements(formattedValues)

      toast.show({ type: 'success', msg: 'Measurements saved!' })

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
    setFilters((filters) => ({
      ...filters,
      [name]: value
    }))
  }

  const isLoading = !data && !error
  const measurements = data?.data || []
  const meta = data?.meta || {}
  return {
    onAdd,
    isLoading,
    filters,
    onFilters,
    measurements,
    meta
  }
}
