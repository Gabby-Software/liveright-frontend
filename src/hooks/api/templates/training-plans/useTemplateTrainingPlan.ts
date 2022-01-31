import useSWR from 'swr'

import { toast } from '../../../../components/toast/toast.component'
import { EP_TEMPLATES_TP_BY_ID } from '../../../../enums/api.enum'
import {
  editTemplatesTrainingPlan,
  getTemplatesTrainingPlanById
} from '../../../../services/api/templates'
import { TrainingPlanType } from '../../../../types/training-plan.type'

interface useTemplateTrainingPlan {
  isLoading: boolean
  trainingPlan: TrainingPlanType
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
}

export default function useTemplateTrainingPlan(
  id: string
): useTemplateTrainingPlan {
  const { data, error, mutate } = useSWR(
    id ? EP_TEMPLATES_TP_BY_ID + `/${id}` : null,
    getTemplatesTrainingPlanById
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesTrainingPlan(id, data)
      toast.show({
        type: 'success',
        msg: 'Training Plan Template successfully updated!'
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
  const trainingPlan = data?.data || {}

  return {
    isLoading,
    trainingPlan,
    onEdit
  }
}
