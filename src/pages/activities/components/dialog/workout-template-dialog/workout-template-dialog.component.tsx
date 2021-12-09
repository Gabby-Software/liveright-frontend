import ClientSelect from '../../../../../components/form/client-select/client-select.component'
import { VoidAction } from '../../../../../types/actions.type'
import ActivitiesDialog, {
  ActivitiesDialogProps,
  DateProps
} from '../activities-dialog.component'

type WorkoutTemplateDialogProps = {
  yes?: string
  onYes: VoidAction
  cancel?: string
  onCancel: VoidAction
  name: string
  description: string
  title: string
  body?: JSX.Element
  date?: DateProps
  alert: string
} & Pick<ActivitiesDialogProps, 'onClose' | 'open'>

export default function WorkoutTemplateDialog(
  props: WorkoutTemplateDialogProps
) {
  const { yes, cancel, onYes, onCancel, body, ...others } = props

  const onClient = (e: any, option: any) => {
    console.log(e, option)
  }

  const bodyContent = (
    <>
      <p className="client-label">
        Whom should we apply this training split to
      </p>
      <ClientSelect
        id="client-select"
        onChange={onClient}
        placeholder="All Client"
        className="client-select"
      />
      {body}
    </>
  )

  return (
    <ActivitiesDialog
      {...others}
      body={bodyContent}
      date={{
        label: 'From when should we apply this change?',
        value: ''
      }}
      actions={{ yes, onYes, cancel, onCancel }}
    />
  )
}

WorkoutTemplateDialog.defaultProps = {
  onYes: () => {},
  onCancel: () => {},
  old: false
}
