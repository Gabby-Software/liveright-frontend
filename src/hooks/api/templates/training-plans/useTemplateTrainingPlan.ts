import useSWR from 'swr'

import { EP_TEMPLATES_TP_BY_ID } from '../../../../enums/api.enum'
import { getTemplatesTrainingPlanById } from '../../../../services/api/templates'
import { TrainingPlanType } from '../../../../types/training-plan.type'

interface useTemplateTrainingPlan {
  isLoading: boolean
  trainingPlan: TrainingPlanType
}

export default function useTemplateTrainingPlan(
  id: string
): useTemplateTrainingPlan {
  const { data, error } = useSWR(
    id ? EP_TEMPLATES_TP_BY_ID + `/${id}` : null,
    getTemplatesTrainingPlanById
  )

  const isLoading = id ? !data && !error : false
  const trainingPlan = data?.data || {}

  return {
    isLoading,
    trainingPlan
  }
}
