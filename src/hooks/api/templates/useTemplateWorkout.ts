import useSWR from 'swr'

import { EP_TEMPLATES_WORKOUT_BY_ID } from '../../../enums/api.enum'
import { getTemplatesWorkoutById } from '../../../services/api/templates'
import { WorkoutType } from '../../../types/workout.type'

interface useTemplateWorkout {
  isLoading: boolean
  workout: WorkoutType
}

export default function useTemplateWorkout(id: string): useTemplateWorkout {
  const { data, error } = useSWR(
    id ? EP_TEMPLATES_WORKOUT_BY_ID + `/${id}` : null,
    getTemplatesWorkoutById
  )

  const isLoading = id ? !data && !error : false
  const workout = data?.data || {}

  return {
    isLoading,
    workout
  }
}
