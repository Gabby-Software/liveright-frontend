import useSWR from 'swr'

import { toast } from '../../../../components/toast/toast.component'
import {
  deleteTemplatesTrainingSplit,
  editTemplatesTrainingSplit,
  getTemplatesData
} from '../../../../services/api/templates'
import { formatSplitData } from '../../../../utils/api/activities'

interface UseTemplateTrainingSplit {
  isLoading: boolean
  trainingSplit: any
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
  onDelete: (id: string, onSuccess?: () => void) => void
}

interface IProps {
  id?: string
}

export default function useTemplateTrainingSplit({
  id
}: IProps = {}): UseTemplateTrainingSplit {
  const { data, error, mutate } = useSWR(
    () => (id ? `/training-split-templates/${id}` : null),
    getTemplatesData
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesTrainingSplit(id, formatSplitData(data))
      toast.show({
        type: 'success',
        msg: 'Training Split Template successfully updated'
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

  const onDelete = async (id: string, onSuccess?: () => void) => {
    try {
      await deleteTemplatesTrainingSplit(id)
      toast.show({
        type: 'success',
        msg: 'Training Split Template successfully deleted!'
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
  const trainingSplit = data?.data || {}
  return {
    isLoading,
    trainingSplit,
    onEdit,
    onDelete
  }
}
