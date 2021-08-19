import { Form, Formik, FormikHelpers } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import InvitationManager from '../../../../managers/invitation.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { serverError } from '../../../../pipes/server-error.pipe'
import ButtonSubmit from '../../../forms/button-submit/button-submit.component'
import FormInputLabeled from '../../../forms/form-input-labeled/form-input-labeled.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-email.styles'

const AddClientModalEmail = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { step, setStep, form, update } = useContext(ClientFormContext)
  const { t } = useTranslation()
  const handleSubmit = (
    values: ClientFormType,
    helper: FormikHelpers<ClientFormType>
  ) => {
    helper.setSubmitting(false)
    InvitationManager.checkEmailExist(values.email)
      .then((res) => {
        setStep(res ? clientFormSteps.MESSAGE : clientFormSteps.FORM)
      })
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
    // setStep(Math.random() > .5 ? clientFormSteps.MESSAGE : clientFormSteps.FORM);
  }
  return (
    <Styles>
      <Formik
        initialValues={form}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().required().email()
        })}
      >
        <Form>
          <FormInputLabeled
            name={'email'}
            label={t('profile:email')}
            onUpdate={update}
          />
          <ButtonSubmit>{t('next')}</ButtonSubmit>
        </Form>
      </Formik>
    </Styles>
  )
}

export default AddClientModalEmail
