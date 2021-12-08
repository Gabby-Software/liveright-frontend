import { useState } from 'react'
import Checkbox from '../../../../../components/form/checkbox/checkbox.component'
import ClientSelect from '../../../../../components/form/client-select/client-select.component'
import Label from '../../../../../components/form/label/label.component'
import { VoidAction } from '../../../../../types/actions.type'
import ActivitiesDialog, {
  ActivitiesDialogProps,
  DateProps,
  PlanProps
} from '../activities-dialog.component'

type SplitTemplateDialogProps = {
  yes?: string
  onYes: VoidAction
  cancel?: string
  onCancel: VoidAction
  date?: DateProps
  plans?: PlanProps
} & Pick<ActivitiesDialogProps, 'onClose' | 'open'>

export default function SplitTemplateDialog(props: SplitTemplateDialogProps) {
  const { yes, cancel, onYes, onCancel, ...others } = props
  const alert = `This will make John Travolta’s active training split this one (High Pace Training) starting from 22/11/2021. You can make any changes to the training split after you schedule these changes. Additionally you can revert it at any point by re-activating Reduce Bodyweight as the active plan.`
  const name = 'Use split template'
  const title = 'High Pace Training'
  const description =
    'You’re about to use the following training split template'

  const [active, setActive] = useState(false)

  const onClient = (e: any, option: any) => {
    console.log(e, option)
  }

  const body = (
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
      <div className="checkbox-container">
        <Checkbox onChange={(e) => setActive(e.target.checked)} value={active} />
        <Label className="checkbox">
          Make it active
        </Label>
      </div>
    </>
  )

  return (
    <ActivitiesDialog
      {...others}
      alert={alert}
      title={title}
      body={body}
      name={name}
      description={description}
      date={active ? {
        label: 'From when should we apply this change?',
        value: ''
      } : undefined}
      actions={{ yes, onYes, cancel, onCancel }}
    />
  )
}

SplitTemplateDialog.defaultProps = {
  onYes: () => {},
  onCancel: () => {},
  old: false
}
