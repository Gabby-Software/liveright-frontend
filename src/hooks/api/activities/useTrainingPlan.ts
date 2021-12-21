import { useHistory } from 'react-router-dom'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { Routes } from '../../../enums/routes.enum'
import {
  addTrainingPlan,
  editTrainingPlan,
  getTrainingPlan,
  getTrainingPlanRevision
} from '../../../services/api/activities'
import { formatTrainingPlanData } from '../../../utils/api/activities'
import { getRoute } from '../../../utils/routes'

interface UseTrainingPlan {
  onAdd: (data: any, onSuccess: any) => void
  onEdit: (id: string, revisionId: string, data: any, onSuccess: any) => void
  isLoading: boolean
  revision: any
  trainingPlan: any
}

interface UseTrainingPlanConfig {
  id?: string
  revisionId?: string
}

export default function useTrainingPlan(
  config: UseTrainingPlanConfig = {}
): UseTrainingPlan {
  const history = useHistory()

  const revisionSwr = useSWR(
    () =>
      config.id && config.revisionId
        ? `/training-plans/${config.id}/revisions/${config.revisionId}`
        : null,
    getTrainingPlanRevision
  )

  const planSwr = useSWR(
    () => (config.id ? `/training-plans/${config.id}` : null),
    getTrainingPlan
  )

  const onAdd = async (data: any, onSuccess: any) => {
    try {
      // return console.log(formatTrainingPlanData(data))
      const response = await addTrainingPlan(formatTrainingPlanData(data))
      toast.show({ type: 'success', msg: 'Training plan successfully created' })
      history.push(
        getRoute(Routes.ACTIVITIES_TP_ID, {
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
      const response = await editTrainingPlan(
        id,
        revisionId,
        formatTrainingPlanData(data)
      )
      history.push(
        getRoute(Routes.ACTIVITIES_TP_ID, {
          id: config.id,
          revisionId: response?._id
        })
      )
      toast.show({ type: 'success', msg: 'Training plan successfully updated' })
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
  const trainingPlan = planSwr.data?.data || {}

  return {
    onAdd,
    onEdit,
    isLoading,
    revision,
    trainingPlan
  }
}
