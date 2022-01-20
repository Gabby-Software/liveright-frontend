import useSWR from 'swr'

import { EP_TEMPLATES_WORKOUT_DAY_BY_ID } from '../../../../enums/api.enum'
import { getTemplatesWorkoutDayById } from '../../../../services/api/templates'
import { WorkoutDayType } from '../../../../types/workout-day.type'

interface useTemplateWorkoutDay {
  isLoading: boolean
  workoutDay: WorkoutDayType
}

export default function useTemplateWorkoutDay(
  id: string
): useTemplateWorkoutDay {
  const { data, error } = useSWR(
    id ? EP_TEMPLATES_WORKOUT_DAY_BY_ID + `/${id}` : null,
    getTemplatesWorkoutDayById
  )

  const isLoading = id ? !data && !error : false
  const workoutDay = data?.data || {}

  return {
    isLoading,
    workoutDay
  }
}
