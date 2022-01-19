import useSWR from 'swr'

import { EP_TEMPLATES_TP_BY_ID } from '../../../../enums/api.enum'
import { getTemplatesTrainingRevisionById } from '../../../../services/api/templates'
import { TrainingPlanRevisionType } from '../../../../types/training-plan-revision.type'

interface useTemplateTrainingPlanRevision {
  isLoading: boolean
  trainingPlanRevision: TrainingPlanRevisionType
}

export default function useTemplateTrainingPlanRevision(
  id: string,
  revisionId: string
): useTemplateTrainingPlanRevision {
  const { data, error } = useSWR(
    id && revisionId
      ? EP_TEMPLATES_TP_BY_ID + `/${id}/revisions/${revisionId}`
      : null,
    getTemplatesTrainingRevisionById
  )

  const isLoading = id ? !data && !error : false
  const trainingPlanRevision = data?.data || {}

  return {
    isLoading,
    trainingPlanRevision
  }
}
