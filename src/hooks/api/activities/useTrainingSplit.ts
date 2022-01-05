import { useHistory } from 'react-router-dom'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { Routes } from '../../../enums/routes.enum'
import {
  addTrainingSplit,
  editTrainingSplit,
  getTrainingSplit,
  getTrainingSplitRevision
} from '../../../services/api/activities'
import { formatSplitData } from '../../../utils/api/activities'
import { getRoute } from '../../../utils/routes'

interface UseTrainingSplit {
  onAdd: (data: any, onSuccess: any) => void
  onEdit: (id: string, revisionId: string, data: any, onSuccess: any) => void
  isLoading: boolean
  revision: any
  trainingSplit: any
}

interface UseTrainingSplitConfig {
  clientId?: string
  id?: string
  revisionId?: string
}

export default function useTrainingSplit(
  config: UseTrainingSplitConfig = { clientId: '' }
): UseTrainingSplit {
  const history = useHistory()

  const revisionSwr = useSWR(
    () =>
      config.id && config.revisionId
        ? `/training-splits/${config.id}/revisions/${config.revisionId}`
        : null,
    getTrainingSplitRevision
  )

  const planSwr = useSWR(
    () => (config.id ? `/training-splits/${config.id}` : null),
    getTrainingSplit
  )

  const onAdd = async (data: any, onSuccess: any) => {
    try {
      // return console.log(formatTrainingPlanData(data))
      if (!data.scheduled_start_on) delete data.scheduled_start_on
      if (!data.scheduled_end_on) delete data.scheduled_end_on
      const response = await addTrainingSplit(formatSplitData(data))
      toast.show({
        type: 'success',
        msg: 'Training Split successfully created!'
      })
      history.push(
        getRoute(Routes.ACTIVITIES_TS_ID, {
          clientId: config.clientId,
          id: response?._id,
          revisionId:
            response?.revisions?.[response?.revisions?.length - 1]?._id
        })
      )
      revisionSwr.mutate()
      planSwr.mutate()
      onSuccess?.()
    } catch (e: any) {
      toast.show({
        type: 'error',
        msg: e?.response?.data?.message || 'Oops error!'
      })
      console.error(e)
    }
  }

  const onEdit = async (
    id: string,
    revisionId: string,
    data: any,
    onSuccess: any
  ) => {
    try {
      const response = await editTrainingSplit(
        id,
        revisionId,
        formatSplitData(data)
      )
      history.push(
        getRoute(Routes.ACTIVITIES_TS_ID, {
          clientId: config.clientId,
          id: config.id,
          revisionId: response?._id
        })
      )
      toast.show({
        type: 'success',
        msg: 'Training Split successfully updated!'
      })
      revisionSwr.mutate()
      planSwr.mutate()
      onSuccess?.()
    } catch (e: any) {
      toast.show({ type: 'error', msg: e?.response?.data?.message })
      console.error(e)
    }
  }

  const isLoading = !revisionSwr.data && !revisionSwr.error
  const revision = revisionSwr.data?.data || {}
  const trainingSplit = planSwr.data?.data || {}

  return {
    onAdd,
    onEdit,
    isLoading,
    revision,
    trainingSplit
  }
}
