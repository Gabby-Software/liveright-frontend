import useSWR from 'swr'

import { getTemplatesData } from '../../../../services/api/templates'
import { DietTemplateType } from '../../../../types/diet-template'

interface useTemplateDietPlan {
  isLoading: boolean
  dietTemplate: DietTemplateType
}

export default function useTemplateDietPlan(id: string): useTemplateDietPlan {
  const { data, error } = useSWR(
    id ? `diet-plan-templates/${id}` : null,
    getTemplatesData
  )

  const isLoading = id ? !data && !error : false
  const dietTemplate = data?.data || {}

  return {
    isLoading,
    dietTemplate
  }
}
