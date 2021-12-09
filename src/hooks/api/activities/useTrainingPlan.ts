import { useHistory } from 'react-router-dom'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { Routes } from '../../../enums/routes.enum'
import {
  addTrainingPlan,
  editTrainingPlan,
  getTrainingPlan
} from '../../../services/api/activities'
import { formatTrainingPlanData } from '../../../utils/api/activities'
import { getRoute } from '../../../utils/routes'

interface UseTrainingPlan {
  onAdd: (data: any, onSuccess: any) => void
  onEdit: (id: string, revisionId: string, data: any, onSuccess: any) => void
  isLoading: boolean
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

  const { data, error } = useSWR(
    () =>
      config.id && config.revisionId
        ? `/training-plans/${config.id}/revisions/${config.revisionId}`
        : null,
    getTrainingPlan
  )

  const onAdd = async (data: any, onSuccess: any) => {
    try {
      const response = await addTrainingPlan(formatTrainingPlanData(data))
      toast.show({ type: 'success', msg: 'Training plan successfully created' })
      history.push(
        getRoute(Routes.ACTIVITIES_TP_ID, {
          id: response?._id,
          revisionId:
            response?.revisions?.[response?.revisions?.length - 1]?._id
        })
      )
      onSuccess?.()
    } catch (e) {
      toast.show({ type: 'error', msg: e?.response?.data?.message })
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
          id: response?._id,
          revisionId:
            response?.revisions?.[response?.revisions?.length - 1]?._id
        })
      )
      toast.show({ type: 'success', msg: 'Training plan successfully updated' })
      onSuccess?.()
    } catch (e) {
      toast.show({ type: 'error', msg: e?.response?.data?.message })
      console.error(e)
    }
  }

  const isLoading = !data && !error
  const trainingPlan = data?.data || {}

  return {
    onAdd,
    onEdit,
    isLoading,
    trainingPlan
  }
}
