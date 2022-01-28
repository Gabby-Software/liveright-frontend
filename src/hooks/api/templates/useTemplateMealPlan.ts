import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import {
  deleteTemplatesMeal,
  editTemplatesMeal,
  getTemplatesData
} from '../../../services/api/templates'
// import { MealPlanType } from '../../../types/meal-plan.type'

interface useTemplateMealPlan {
  isLoading: boolean
  mealPlan: any
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
  onDelete: (id: string, onSuccess?: () => void) => void
}

interface IProps {
  id?: string
}

export default function useTemplateMealPlan({
  id
}: IProps = {}): useTemplateMealPlan {
  const { data, error, mutate } = useSWR(
    id ? `meal-plans/${id}` : null,
    getTemplatesData
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesMeal(id, data)
      toast.show({ type: 'success', msg: 'Meal Template successfully updated' })
      mutate()
      onSuccess?.()
    } catch (e: any) {
      toast.show({
        type: 'error',
        msg: e?.response?.data?.message || 'Oops! An error occured'
      })
      console.error(e)
    }
  }

  const onDelete = async (id: string, onSuccess?: () => void) => {
    try {
      await deleteTemplatesMeal(id)
      toast.show({
        type: 'success',
        msg: 'Meal Template successfully deleted!'
      })
      mutate()
      onSuccess?.()
    } catch (e: any) {
      toast.show({
        type: 'error',
        msg: e?.response?.data?.message || 'Oops! An error occured'
      })
      console.error(e)
    }
  }

  const isLoading = id ? !data && !error : false
  console.log(data)
  const mealPlan = data?.data || {}

  return {
    isLoading,
    mealPlan,
    onEdit,
    onDelete
  }
}
