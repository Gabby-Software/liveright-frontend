import React from 'react'

import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import { Styles } from './mealplan-edit-dialog.styles'

interface MealPlanEditDialogProps {
  data: any
  open: boolean
  onClose?: () => void
}
const MealPlanEditDialog = (props: MealPlanEditDialogProps) => {
  const { data, ...others } = props
  console.log(data)

  return (
    <Dialog title="Edit Meal Plan Day" {...others}>
      <Styles></Styles>
    </Dialog>
  )
}

export default MealPlanEditDialog
