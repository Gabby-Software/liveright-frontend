import ActivitiesDialog, {
  ActivitiesDialogProps
} from '../activities-dialog.component'

type MakeActiveDialogProps = {
  title: string
  titleNote?: string
  old: boolean
} & Pick<
  ActivitiesDialogProps,
  | 'onClose'
  | 'open'
  | 'actions'
  | 'plans'
  | 'date'
  | 'name'
  | 'alert'
  | 'description'
>

export default function MakeActiveDialog(props: MakeActiveDialogProps) {
  const { title, titleNote, old, ...others } = props

  const titleComponent = (
    <>
      {title}
      {titleNote && (
        <div
          className={
            old
              ? 'ActivitiesDialog__title__note old'
              : 'ActivitiesDialog__title__note'
          }
        >
          {titleNote}
        </div>
      )}
    </>
  )

  return <ActivitiesDialog {...others} title={titleComponent} />
}

MakeActiveDialog.defaultProps = {
  actions: {
    onYes: () => {},
    onCancel: () => {},
    yes: 'Yes',
    cancel: 'Cancel',
    layout: 'left'
  },
  old: false
}
