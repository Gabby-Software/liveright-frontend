import { useLocation, useParams } from 'react-router'

import useHealth from './useHealth'
import useMeasurements from './useMeasurements'

interface UseLastActivity {
  activityLabel: string
  activityValue: string
}

export default function useLastActivity(): UseLastActivity {
  const location = useLocation()
  const params = useParams<any>()

  const isHealth = location.pathname.includes('health')
  const isMeasurements = location.pathname.includes('measurements')

  const { health } = useHealth({
    skip: !isHealth,
    filter: {
      account_id: params.id
    },
    per_page: 1
  })

  const { measurements } = useMeasurements({
    skip: !isMeasurements,
    filter: {
      account_id: params.id
    },
    per_page: 1
  })

  const data = health[0] || {}
  const measurementsData = measurements[0] || {}

  const activityLabel = `Last Activity on ${
    isHealth ? 'Health Data' : 'Measurements'
  }:`
  const activityValue = `${
    isHealth ? data.date || '-' : measurementsData.date || '-'
  }`

  return {
    activityLabel,
    activityValue
  }
}
