import useSWR from 'swr'

import { EP_TEMPLATES_EXERCISE_BY_ID } from '../../../enums/api.enum'
import { getTemplatesExerciseById } from '../../../services/api/templates'
import { ExercisesType } from '../../../types/exercises.type'

interface useTemplateExercise {
  isLoading: boolean
  exercise: ExercisesType
}

export default function useTemplateExercise(id: string): useTemplateExercise {
  const { data, error } = useSWR(
    id ? EP_TEMPLATES_EXERCISE_BY_ID + `/${id}` : null,
    getTemplatesExerciseById
  )

  const isLoading = id ? !data && !error : false
  const exercise = data?.data || {}

  return {
    isLoading,
    exercise
  }
}
