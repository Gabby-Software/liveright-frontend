import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { MealPlanType } from '../../../types/meal-plan.type'

interface useTemplateMealPlan {
  isLoading: boolean
  mealPlan: MealPlanType
}

export default function useTemplateMealPlan(id: string): useTemplateMealPlan {
  const { data, error } = useSWR(
    id ? `meal-plans/${id}` : null,
    getTemplatesData
  )

  const isLoading = id ? !data && !error : false
  const mealPlan = data?.data || {}

  return {
    isLoading,
    mealPlan
  }
}
