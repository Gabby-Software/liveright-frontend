import cloneDeep from 'lodash.clonedeep'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import WorkoutDayEdit from './workoutday-edit.component'

interface WorkoutDayEditDialogProps {
  data?: any
  name: string
  open: boolean
  onClose?: () => void
}
const WorkoutDayEditDialog = (props: WorkoutDayEditDialogProps) => {
  const { data, name, open, onClose } = props

  const methods = useFormContext()
  const prevData = methods.getValues(name)
  const [tpPrevData] = useState<any>(cloneDeep(prevData))

  const onDropDownClose = () => {
    methods.setValue(name, tpPrevData)
    onClose?.()
  }

  return (
    <Dialog
      title="Edit Training Plan Day"
      extended
      open={open}
      onClose={onDropDownClose}
    >
      <WorkoutDayEdit data={data} name={name} onClose={onClose} />
    </Dialog>
  )
}

export default WorkoutDayEditDialog
