import useSWR from 'swr'

import { getTemplatesData } from '../../../services/api/templates'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/foods', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateFoods {
  isLoading: boolean
  foods: any[]
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateFoods({
  name,
  clientId
}: IProps = {}): UseTemplateFoods {
  const params = {
    filter: {
      name: name || '',
      account_id: clientId || ''
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const foods = data?.data || []
  return {
    isLoading,
    foods
  }
}
