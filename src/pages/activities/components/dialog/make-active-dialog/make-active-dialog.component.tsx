import Button from '../../../../../components/buttons/button/button.component'
import ActivitiesDialog, {
  ActivitiesDialogProps
} from '../activities-dialog.component'

export default function MakeActiveDialog(
  props: Pick<ActivitiesDialogProps, 'onClose' | 'open'>
) {
  const alert = `This will make John Travolta’s active training plan this one “Another Training Plan” starting from 22/11/2021. This means the training split will also be changed to reference this training plan. You can revert it at any point by re-activating “High Intensity Plan” as the active training plan.`
  return (
    <ActivitiesDialog
      {...props}
      alert={alert}
      title="Another Training Plan"
      name="Make Active Plan"
      description="You’re about to make the following training plan the active one"
      actions={
        <>
          <Button>Confirm Changes</Button>
          <Button variant="secondary">Nevermind</Button>
        </>
      }
    />
  )
}
