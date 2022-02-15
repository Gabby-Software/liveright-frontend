import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import { DialogStyles } from './confirmation-model.styles'

interface ConfirmModalProps {
  onSave: any
  onExitWithoutSave: any
  onRedirectTo: any
  onUnlock: any
  open: boolean
  setOpen: (open: boolean) => void
}

export function ConfirmModal({
  onSave,
  onExitWithoutSave,
  onUnlock,
  open,
  setOpen,
  onRedirectTo
}: ConfirmModalProps) {
  return (
    <DialogStyles
      title="Confirmation"
      open={open}
      onClose={() => {
        setOpen(false)
        onRedirectTo('')
      }}
    >
      <Card className="confirmation-dialog__container">
        <p className="confirmation-dialog__title">
          {`You have unsaved changes, if you don't save it now, your data will be lost.`}
        </p>

        <div className="confirmation-dialog__btn-container">
          <Button
            className="confirmation-dialog__btn"
            variant="secondary"
            onClick={() => {
              onUnlock()
              setOpen(false)
              onExitWithoutSave()
            }}
          >
            Continue without saving
          </Button>
          <Button
            className="confirmation-dialog__btn"
            onClick={() => {
              onUnlock()
              setOpen(false)
              onSave()
            }}
          >
            Save and continue
          </Button>
        </div>
      </Card>
    </DialogStyles>
  )
}
