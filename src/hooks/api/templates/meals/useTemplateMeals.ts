import useSWR from 'swr'

import { getTemplatesData } from '../../../../services/api/templates'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/meals', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateMeals {
  isLoading: boolean
  meals: any[]
}

interface IProps {
  clientId?: string
}

export default function useTemplateMeals({
  clientId
}: IProps = {}): UseTemplateMeals {
  const params = {
    filter: {
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const meals = data?.data || []
  return {
    isLoading,
    meals
  }
}
