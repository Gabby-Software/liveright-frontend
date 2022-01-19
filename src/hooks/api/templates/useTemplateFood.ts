import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'

interface useTemplateFood {
  isLoading: boolean
  food: any
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
