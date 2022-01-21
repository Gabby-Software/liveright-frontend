import cloneDeep from 'lodash.clonedeep'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { CaretLeftIcon } from '../../../../../assets/media/icons'
import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import MobileFullScreenDialog from '../../../../../components/dialogs/mobile-fullscreen-dialog/mobile-fullscreen-dialog.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import MealPlanEdit from './mealplanday-edit.component'

interface MealPlanEditDialogProps {
  data?: any
  name: string
  open: boolean
  onClose?: () => void
}
const MealPlanEditDialog = (props: MealPlanEditDialogProps) => {
  const { data, name, open, onClose } = props
  const isMobile = useIsMobile()

  const methods = useFormContext()
  const prevData = methods.getValues(name)
  const [tpPrevData] = useState<any>(cloneDeep(prevData))

  const onDropDownClose = () => {
    methods.setValue(name, tpPrevData)
    onClose?.()
  }

  if (isMobile) {
    return (
      <MobileFullScreenDialog
        title="Edit Meal Plan Day"
        headerTopComponent={
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={(e) => {
              e.stopPropagation()
              onDropDownClose()
            }}
          >
            <CaretLeftIcon />
            <span>Go Back</span>
          </div>
        }
      >
        <MealPlanEdit data={data} name={name} onClose={onClose} />
      </MobileFullScreenDialog>
    )
  }

  return (
    <Dialog
      title="Edit Meal Plan Day"
      extended
      open={open}
      onClose={onDropDownClose}
    >
      <MealPlanEdit data={data} name={name} onClose={onClose} />
    </Dialog>
  )
}

export default MealPlanEditDialog
