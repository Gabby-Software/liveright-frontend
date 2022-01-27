import useSWR from 'swr'

import { EP_TEMPLATES_TP_BY_ID } from '../../../../enums/api.enum'
import { getTemplatesTrainingPlanById } from '../../../../services/api/templates'
import { TrainingTemplateType } from '../../../../types/training-template.type'

interface useTemplateTrainingPlan {
  isLoading: boolean
  trainingTemplate: TrainingTemplateType
}

export default function useTemplateTrainingPlan(
  id: string
): useTemplateTrainingPlan {
  const { data, error } = useSWR(
    id ? EP_TEMPLATES_TP_BY_ID + `/${id}` : null,
    getTemplatesTrainingPlanById
  )

  const isLoading = id ? !data && !error : false
  const trainingTemplate = data?.data || {}

  return {
    isLoading,
    trainingTemplate
  }
}
