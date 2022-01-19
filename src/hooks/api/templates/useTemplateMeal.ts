import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { MealType } from '../../../types/meal.type'

interface useTemplateMeal {
  isLoading: boolean
  meal: MealType
}

export default function useTemplateMeal(id: string): useTemplateMeal {
  const { data, error } = useSWR(id ? `meals/${id}` : null, getTemplatesData)

  const isLoading = id ? !data && !error : false
  const meal = data?.data || {}

  return {
    isLoading,
    meal
  }
}
