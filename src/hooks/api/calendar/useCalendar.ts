import useSWR from 'swr'

import { EP_CALENDAR } from '../../../enums/api.enum'
import { getCalendar } from '../../../services/api/calendar'

interface UseCalendar {
  activities: any[]
  isLoading: boolean
}

export default function useCalendar(): UseCalendar {
  const { data, error } = useSWR(EP_CALENDAR, getCalendar)

  const isLoading = !data && !error
  const activities = data || []

  return {
    activities,
    isLoading
  }
}
