import useSWR from 'swr'

import { getTemplatesData } from '../../../../services/api/templates'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/diet-plan-templates', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateDietPlans {
  isLoading: boolean
  dietTemplates: any[]
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateDietPlans({
  clientId,
  name
}: IProps = {}): UseTemplateDietPlans {
  const params = {
    filter: {
      account_id: clientId,
      name
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const dietTemplates = data?.data || []
  return {
    isLoading,
    dietTemplates
  }
}
