import useSWR from 'swr'

import { toast } from '../../../../components/toast/toast.component'
import {
  deleteTemplatesDietPlan,
  editTemplatesDietPlan,
  getTemplatesData
} from '../../../../services/api/templates'
import { DietTemplateType } from '../../../../types/diet-template'

interface useTemplateDietPlan {
  isLoading: boolean
  dietTemplate: DietTemplateType
  onEdit: (id: string, data: any, onSuccess?: () => void) => void
  onDelete: (id: string, onSuccess?: () => void) => void
}

export default function useTemplateDietPlan({ id }: any): useTemplateDietPlan {
  const { data, error, mutate } = useSWR(
    id ? `diet-plan-templates/${id}` : null,
    getTemplatesData
  )

  const onEdit = async (id: string, data: any, onSuccess?: () => void) => {
    try {
      await editTemplatesDietPlan(id, data)
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
      await deleteTemplatesDietPlan(id)
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
  const dietTemplate = data?.data || {}
  return {
    isLoading,
    dietTemplate,
    onEdit,
    onDelete
  }
}
