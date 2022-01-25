import useSWR from 'swr'

import { toast } from '../../../../components/toast/toast.component'
import { EP_TEMPLATES_WORKOUT_DAY_BY_ID } from '../../../../enums/api.enum'
import {
  editTemplatesWorkoutDay,
  getTemplatesWorkoutDayById
} from '../../../../services/api/templates'
import { WorkoutDayType } from '../../../../types/workout-day.type'

interface useTemplateWorkoutDay {
  isLoading: boolean
  workoutDay: WorkoutDayType
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
}

export default function useTemplateWorkoutDay(
  id: string
): useTemplateWorkoutDay {
  const { data, error, mutate } = useSWR(
    id ? EP_TEMPLATES_WORKOUT_DAY_BY_ID + `/${id}` : null,
    getTemplatesWorkoutDayById
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesWorkoutDay(id, data)
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

  const isLoading = id ? !data && !error : false
  const workoutDay = data?.data || {}

  return {
    isLoading,
    workoutDay,
    onEdit
  }
}
