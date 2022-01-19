import useSWR from 'swr'

import { toast } from '../../../../components/toast/toast.component'
import { EP_TEMPLATES_WORKOUT_BY_ID } from '../../../../enums/api.enum'
import {
  deleteTemplatesWorkout,
  editTemplatesWorkout,
  getTemplatesWorkoutById
} from '../../../../services/api/templates'
import { WorkoutType } from '../../../../types/workout.type'

interface useTemplateWorkout {
  isLoading: boolean
  workout: WorkoutType
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
  onDelete: (id: string, onSuccess?: () => void) => void
}

export default function useTemplateWorkout(id: string): useTemplateWorkout {
  const { data, error, mutate } = useSWR(
    id ? EP_TEMPLATES_WORKOUT_BY_ID + `/${id}` : null,
    getTemplatesWorkoutById
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesWorkout(id, data)
      toast.show({
        type: 'success',
        msg: 'Workout Template successfully updated!'
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

  const onDelete = async (id: string, onSuccess?: () => void) => {
    try {
      await deleteTemplatesWorkout(id)
      toast.show({
        type: 'success',
        msg: 'Workout Template successfully deleted!'
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
  const workout = data?.data || {}

  return {
    isLoading,
    workout,
    onEdit,
    onDelete
  }
}
