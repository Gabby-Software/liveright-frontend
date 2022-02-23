import Button from '../../../../components/buttons/button/button.component'
import Input from '../../../../components/form/input/input.component'
import { DialogStyles } from './day-training-split-edit-card-add-dialog.styles'

interface DayTrainingSplitEditCardAddDialogProps {
  newName: string
  setNewName: any
  onSave: any
  open: boolean
  setOpen: (open: boolean) => void
}

export function DayTrainingSplitEditCardAddDialog({
  newName,
  setNewName,
  onSave,
  open,
  setOpen
}: DayTrainingSplitEditCardAddDialogProps) {
  return (
    <DialogStyles
      title="Create New"
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <div className="DaySplitEditCard__control-newField">
        <Input
          className="DaySplitEditCard__control-input"
          id="new-input"
          value={newName}
          placeholder="Enter name"
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button
          className="DaySplitEditCard__control-checkBtn"
          onClick={() => {
            setOpen(false)
            onSave()
          }}
        >
          Create New
        </Button>
      </div>
    </DialogStyles>
  )
}
