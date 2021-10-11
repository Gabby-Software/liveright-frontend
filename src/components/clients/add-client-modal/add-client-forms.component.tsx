import { Form, Formik } from 'formik'
import moment from 'moment'
import { ReactElement, useContext } from 'react'
import * as Yup from 'yup'

// import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { ClientFormContext, clientFormSteps } from './add-client-modal.context'
import AddClientModalEmail from './add-client-modal-email/add-client-modal-email.component'
import AddClientModalForm from './add-client-modal-form/add-client-modal-form.component'
import AddClientModalMessage from './add-client-modal-message/add-client-modal-message.component'

type AddClientFormsProps = {
  step: number
  onSubmit?: () => void
  onClose?: (params: any) => any
}

export default function AddClientForms({
  step,
  onSubmit,
  onClose
}: AddClientFormsProps): ReactElement {
  const { form } = useContext(ClientFormContext)
  return (
    <div className="add-client-drawer__content">
      <div className="add-client-drawer__mask">
        <Formik
          initialValues={form}
          onSubmit={console.log}
          enableReinitialize
          validationSchema={Yup.object({
            first_name: Yup.string().required().name().trim(),
            last_name: Yup.string().required().name().trim(),
            phone_number: Yup.string().phone(),
            birthday: Yup.date().max(moment().startOf('day').toDate()),
            postal_code: Yup.string().zip().nullable(),
            email: Yup.string().required().email().trim(),
            message: Yup.string().required()
          })}
        >
          <Form
            className="add-client-drawer__body"
            style={{ right: `${Math.min(1, step) * 100}%` }}
          >
            <div className="add-client-drawer__content-inner">
              <AddClientModalEmail />
            </div>
            {step === clientFormSteps.MESSAGE ? (
              <div className="add-client-drawer__content-inner">
                <AddClientModalMessage onSubmit={onSubmit} />
              </div>
            ) : null}
            {step === clientFormSteps.FORM ? (
              <div className="add-client-drawer__content-inner">
                <AddClientModalForm onSubmit={onSubmit} onClose={onClose} />
              </div>
            ) : null}
          </Form>
        </Formik>
      </div>
    </div>
  )
}
