import useSWR from 'swr'

import { toast } from '../../../../components/toast/toast.component'
import {
  deleteTemplatesMeal,
  editTemplatesMeal,
  getTemplatesMeal
} from '../../../../services/api/templates'

interface UseTemplateMeal {
  isLoading: boolean
  meal: any
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
  onDelete: (id: string, onSuccess?: () => void) => void
}

interface IProps {
  id?: string
}

export default function useTemplateMeal({ id }: IProps = {}): UseTemplateMeal {
  const { data, error, mutate } = useSWR(
    () => (id ? `/meals/${id}` : null),
    getTemplatesMeal
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

  const isLoading = !data && !error
  const meal = data?.data || {}
  return {
    isLoading,
    meal,
    onEdit,
    onDelete
  }
}
