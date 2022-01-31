import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_TEMPLATES_EXERCISE_BY_ID } from '../../../enums/api.enum'
import {
  editTemplatesExercise,
  getTemplatesExerciseById
} from '../../../services/api/templates'
import { ExercisesType } from '../../../types/exercises.type'

interface useTemplateExercise {
  isLoading: boolean
  exercise: ExercisesType
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
}

export default function useTemplateExercise(id: string): useTemplateExercise {
  const { data, error, mutate } = useSWR(
    id ? EP_TEMPLATES_EXERCISE_BY_ID + `/${id}` : null,
    getTemplatesExerciseById
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    console.log('data', data)
    try {
      await editTemplatesExercise(id, data)
      toast.show({
        type: 'success',
        msg: 'Exercise Template successfully updated!'
      })
      mutate()
      onSuccess?.()
    } catch (e: any) {
      toast.show({
        type: 'error',
        msg: e?.response?.data?.message || 'Oops! An error occured'
      })
      console.error(e)
    }
  }

  const isLoading = id ? !data && !error : false
  const exercise = data?.data || {}

  return {
    isLoading,
    exercise,
    onEdit
  }
}
