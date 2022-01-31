import useSWR from 'swr'

import { getTemplatesData } from '../../../../services/api/templates'
import { omitEmpty } from '../../../../utils/obj'
import { stringifyURL } from '../../../../utils/query'

function getKey(params: any) {
  return stringifyURL('/training-split-templates', {
    ...params,
    filter: omitEmpty(params.filter)
  })
}

interface UseTemplateTrainingSplits {
  isLoading: boolean
  trainingSplits: any[]
}

interface IProps {
  clientId?: string
  name?: string
}

export default function useTemplateTrainingSplits({
  clientId,
  name
}: IProps = {}): UseTemplateTrainingSplits {
  const params = {
    filter: {
      account_id: clientId,
      name
    }
  }

  const { data, error } = useSWR(() => getKey(params), getTemplatesData)

  const isLoading = !data && !error
  const trainingSplits = data?.data || []
  return {
    isLoading,
    trainingSplits
  }
}
