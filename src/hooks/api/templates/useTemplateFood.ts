import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import {
  deleteTemplatesFood,
  editTemplatesFood,
  getTemplatesFood
} from '../../../services/api/templates'

interface UseTemplateFood {
  isLoading: boolean
  food: any
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
  onDelete: (id: string, onSuccess?: () => void) => void
}

interface IProps {
  id?: string
}

export default function UseTemplateFood({ id }: IProps = {}): UseTemplateFood {
  const { data, error, mutate } = useSWR(
    () => (id ? `/foods/${id}` : null),
    getTemplatesFood
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesFood(id, data)
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
      await deleteTemplatesFood(id)
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
  const food = data?.data || {}
  return {
    isLoading,
    food,
    onEdit,
    onDelete
  }
}
