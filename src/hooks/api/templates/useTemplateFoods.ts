import useSWR from 'swr'

import { getTemplatesFoods } from '../../../services/api/templates'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/foods', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateMeals {
  isLoading: boolean
  foods: any[]
}

interface IProps {
  clientId?: string
}

export default function useTemplateFoods({
  clientId
}: IProps = {}): UseTemplateMeals {
  const params = {
    filter: {
      account_id: clientId
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesFoods)

  const isLoading = !data && !error
  const foods = data?.data || []
  return {
    isLoading,
    foods
  }
}
