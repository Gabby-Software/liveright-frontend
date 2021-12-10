import ActivitiesDialog, {
  ActivitiesDialogProps
} from '../activities-dialog.component'

export default function MakeChangesDialog(
  props: Pick<ActivitiesDialogProps, 'onClose' | 'open'>
) {
  return (
    <ActivitiesDialog
      {...props}
      name="Make Change Plan"
      description="You’re about to making changes to the following training plan:"
      title="High Intensity Plan"
      alert="Read this before activating plan! A new revision of your training plan will be created and it will become active. All your workout entires on your calender from this day will be updated.
This will also make changes to your current training split to use the changes you just made."
      actions={{
        onYes: () => {},
        onCancel: () => {}
      }}
    />
  )
}
