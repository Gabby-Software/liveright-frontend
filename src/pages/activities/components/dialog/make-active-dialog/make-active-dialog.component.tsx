import { VoidAction } from '../../../../../types/actions.type'
import ActivitiesDialog, {
  ActivitiesDialogProps,
  DateProps,
  PlanProps
} from '../activities-dialog.component'

type MakeActiveDialogProps = {
  yes?: string
  onYes: VoidAction
  cancel?: string
  onCancel: VoidAction
  old: boolean
  date?: DateProps
  plans?: PlanProps
} & Pick<ActivitiesDialogProps, 'onClose' | 'open'>

export default function MakeActiveDialog(props: MakeActiveDialogProps) {
  const { yes, cancel, onYes, onCancel, old, ...others } = props
  const alert = `This will make John Travolta’s active training plan this one “Another Training Plan” starting from 22/11/2021. This means the training split will also be changed to reference this training plan. You can revert it at any point by re-activating “High Intensity Plan” as the active training plan.`
  const title = 'Another Training Plan'
  const titleNote =
    'This means whatever was your training split at that date will become the new active training split.'

  const titleComponent = old ? (
    <>
      {title}
      <div className="ActivitiesDialog__title__note">{titleNote}</div>
    </>
  ) : (
    title
  )

  return (
    <ActivitiesDialog
      {...others}
      alert={alert}
      title={titleComponent}
      name="Make Active Plan"
      description="You’re about to make the following training plan the active one"
      actions={{ yes, onYes, cancel, onCancel }}
      // actions={
      //   <>
      //     <Button>Confirm Changes</Button>
      //     <Button variant="secondary">Nevermind</Button>
      //   </>
      // }
    />
  )
}

MakeActiveDialog.defaultProps = {
  onYes: () => {},
  onCancel: () => {},
  old: false
}
