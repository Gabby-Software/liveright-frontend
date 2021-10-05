import { Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import InvitationManager from '../../../../managers/invitation.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { serverError } from '../../../../pipes/server-error.pipe'
import Button from '../../../buttons/button/button.component'
import Input from '../../../form/input/input.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-email.styles'
type AddClientModalEmailContentProps = {
  update: (name: string, value: any) => void
}

const AddClientModalEmailContent = ({
  update
}: AddClientModalEmailContentProps) => {
  const { values, isSubmitting, setFieldValue, submitForm } =
    useFormikContext<ClientFormType>()
  const { t } = useTranslation()
  return (
    <>
      <Input
        id="email"
        value={values.email}
        name={'email'}
        label={t('profile:email')}
        onChange={(e) => {
          update('email', e.target.value)
          setFieldValue('email', e.target.value)
        }}
      />
      <Button
        className={'client-add__submit'}
        disabled={isSubmitting}
        onClick={submitForm}
      >
        {t('next')}
      </Button>
    </>
  )
}

const AddClientModalEmail = () => {
  const { setStep, form, update } = useContext(ClientFormContext)
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
          <AddClientModalEmailContent update={update} />
        </Form>
      </Formik>
    </Styles>
  )
}

export default AddClientModalEmail
