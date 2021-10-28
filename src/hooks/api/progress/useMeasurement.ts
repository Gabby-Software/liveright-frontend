import useSWR from 'swr'

import { EP_MEASUREMENTS } from '../../../enums/api.enum'
import { getMeasurements } from '../../../services/api/progress'

interface UseMeasurementConfig {
  id?: string
}

interface UseMeasurement {
  isLoading: boolean
  measurement: any
}

export default function useMeasurement(
  config: UseMeasurementConfig = {}
): UseMeasurement {
  const { data, error } = useSWR(
    config.id ? `${EP_MEASUREMENTS}/${config.id}` : null,
    getMeasurements
  )

  const isLoading = !data && !error
  const measurement = data?.data || {}
  return {
    isLoading,
    measurement
  }
}
