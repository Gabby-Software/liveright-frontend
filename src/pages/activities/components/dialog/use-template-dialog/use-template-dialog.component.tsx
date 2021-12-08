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

type UseTemplateDialogProps = {
  yes?: string
  onYes: VoidAction
  cancel?: string
  onCancel: VoidAction
  date?: DateProps
  plans?: PlanProps
  name: string
  title: string
  description: string
  alert: string
} & Pick<ActivitiesDialogProps, 'onClose' | 'open'>

export default function UseTemplateDialog(props: UseTemplateDialogProps) {
  const { yes, cancel, onYes, onCancel, ...others } = props
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
        <Checkbox
          onChange={(e) => setActive(e.target.checked)}
          value={active}
        />
        <Label className="checkbox">Make it active</Label>
      </div>
    </>
  )

  return (
    <ActivitiesDialog
      {...others}
      body={body}
      date={
        active
          ? {
              label: 'From when should we apply this change?',
              value: ''
            }
          : undefined
      }
      actions={{ yes, onYes, cancel, onCancel }}
    />
  )
}

UseTemplateDialog.defaultProps = {
  onYes: () => {},
  onCancel: () => {},
  old: false
}
