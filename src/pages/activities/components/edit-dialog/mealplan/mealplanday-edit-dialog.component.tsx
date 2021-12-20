import React from 'react'

import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import MealPlanEdit from './mealplanday-edit.component'

interface MealPlanEditDialogProps {
  data: any
  open: boolean
  onClose?: () => void
}
const MealPlanEditDialog = (props: MealPlanEditDialogProps) => {
  const { data, ...others } = props

  return (
    <Dialog title="Edit Meal Plan Day" extended {...others}>
      <MealPlanEdit data={data} />
    </Dialog>
  )
}

export default MealPlanEditDialog
