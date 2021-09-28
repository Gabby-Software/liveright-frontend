import { ReactElement } from 'react'

// import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { clientFormSteps } from './add-client-modal.context'
import AddClientModalEmail from './add-client-modal-email/add-client-modal-email.component'
import AddClientModalForm from './add-client-modal-form/add-client-modal-form.component'
import AddClientModalMessage from './add-client-modal-message/add-client-modal-message.component'

type AddClientFormsProps = {
  step: number
  onSubmit?: () => void
}

export default function AddClientForms({
  step,
  onSubmit
}: AddClientFormsProps): ReactElement {
  return (
    <div className="add-client-drawer__content">
      <div className="add-client-drawer__mask">
        <div
          className="add-client-drawer__body"
          style={{ right: `${Math.min(1, step) * 100}%` }}
        >
          <AddClientModalEmail />
          {step === clientFormSteps.MESSAGE ? (
            <AddClientModalMessage onSubmit={onSubmit} />
          ) : null}
          {step === clientFormSteps.FORM ? (
            <AddClientModalForm onSubmit={onSubmit} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
