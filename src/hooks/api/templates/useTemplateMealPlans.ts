import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/meal-plans', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateMealPlans {
  isLoading: boolean
  mealPlans: any[]
}

interface IProps {
  clientId?: string
}

export default function useTemplateMealPlans({
  clientId
}: IProps = {}): UseTemplateMealPlans {
  const params = {
    filter: {
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const mealPlans = data?.data || []
  return {
    isLoading,
    mealPlans
  }
}
