import { useHistory } from 'react-router-dom'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { Routes } from '../../../enums/routes.enum'
import {
  addDietPlan,
  editDietPlan,
  getTrainingPlan,
  getTrainingPlanRevision
} from '../../../services/api/activities'
import { formatPlanData } from '../../../utils/api/activities'
import { getRoute } from '../../../utils/routes'

interface UseDietPlan {
  onAdd: (data: any, clientId: string, onSuccess: any) => void
  onEdit: (id: string, revisionId: string, data: any, onSuccess: any) => void
  isLoading: boolean
  revision: any
  dietPlan: any
}

interface UseDietPlanConfig {
  id?: string
  revisionId?: string
}

export default function useDietPlan(
  config: UseDietPlanConfig = {}
): UseDietPlan {
  const history = useHistory()

  const revisionSwr = useSWR(
    () =>
      config.id && config.revisionId
        ? `/diet-plans/${config.id}/revisions/${config.revisionId}`
        : null,
    getTrainingPlanRevision
  )

  const planSwr = useSWR(
    () => (config.id ? `/diet-plans/${config.id}` : null),
    getTrainingPlan
  )

  const onAdd = async (data: any, clientId: string, onSuccess: any) => {
    try {
      if (!data.scheduled_start_on) delete data.scheduled_start_on
      if (!data.scheduled_end_on) delete data.scheduled_end_on

      const payload = formatPlanData(data)
      !!clientId && (payload.account_id = clientId)
      const response = await addDietPlan(payload)

      toast.show({ type: 'success', msg: 'Diet plan successfully created' })

      history.push(
        getRoute(Routes.ACTIVITIES_DP_ID, {
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
      delete data.name

      if (!data.scheduled_start_on) delete data.scheduled_start_on
      if (!data.scheduled_end_on) delete data.scheduled_end_on

      const response = await editDietPlan(id, revisionId, formatPlanData(data))
      history.push(
        getRoute(Routes.ACTIVITIES_DP_ID, {
          id: config.id,
          revisionId: response?._id
        })
      )

      toast.show({ type: 'success', msg: 'Diet plan successfully updated' })

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
  const dietPlan = planSwr.data?.data || {}

  return {
    onAdd,
    onEdit,
    isLoading,
    revision,
    dietPlan
  }
}
