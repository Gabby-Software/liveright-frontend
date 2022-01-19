import useSWR from 'swr'

import { getTemplatesTrainingPlans } from '../../../../services/api/templates'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-plan-templates', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface useTemplateTrainingPlans {
  isLoading: boolean
  trainingPlans: any[]
}

interface IProps {
  name?: string
  clientId?: string
}

export default function useTemplateTrainingPlans({
  name,
  clientId
}: IProps = {}): useTemplateTrainingPlans {
  const params = {
    filter: {
      name: name,
      account_id: clientId
    }
  }

  const { data, error } = useSWR(
    () => getKey(params),
    getTemplatesTrainingPlans
  )

  const isLoading = !data && !error
  const trainingPlans = data?.data || []
  return {
    isLoading,
    trainingPlans
  }
}
