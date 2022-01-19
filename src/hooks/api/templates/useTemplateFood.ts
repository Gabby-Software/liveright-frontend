import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { FoodType } from '../../../types/food.type'

interface useTemplateFood {
  isLoading: boolean
  food: FoodType
}

export default function useTemplateFood(id: string): useTemplateFood {
  const { data, error } = useSWR(id ? `foods/${id}` : null, getTemplatesData)

  const isLoading = id ? !data && !error : false
  const food = data?.data || {}

  return {
    isLoading,
    food
  }
}
