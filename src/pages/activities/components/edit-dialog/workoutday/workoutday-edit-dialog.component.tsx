import React from 'react'

import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import WorkoutDayEdit from './workoutday-edit.component'

interface WorkoutDayEditDialogProps {
  data: any
  open: boolean
  onClose?: () => void
}
const WorkoutDayEditDialog = (props: WorkoutDayEditDialogProps) => {
  const { data, ...others } = props

  return (
    <Dialog title="Edit Training Plan Day" extended {...others}>
      <WorkoutDayEdit data={data} />
    </Dialog>
  )
}

export default WorkoutDayEditDialog
