import { /* Form, Formik, FormikHelpers, */ useFormikContext } from 'formik'
import React, { useContext } from 'react'

// import * as Yup from 'yup'
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
// type AddClientModalEmailContentProps = {
//   update: (name: string, value: any) => void
// }

const AddClientModalEmailContent = () => {
  const {
    values,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    setFieldTouched
  } = useFormikContext<ClientFormType>()
  const { update, step, setStep } = useContext(ClientFormContext)
  const handleSubmit = (values: ClientFormType) => {
    setSubmitting(false)
    InvitationManager.checkEmailExist(values.email)
      .then((res) => {
        update('email', values.email)
        setStep(res ? clientFormSteps.MESSAGE : clientFormSteps.FORM)
        console.log({ res, next: step })
      })
      .catch((e) => toast.show({ type: 'error', msg: serverError(e) }))
    // setStep(Math.random() > .5 ? clientFormSteps.MESSAGE : clientFormSteps.FORM);
  }
  const { t } = useTranslation()
  return (
    <>
      <Input
        id="email"
        value={values.email}
        name={'email'}
        label={t('profile:email')}
        onChange={(e) => {
          setFieldValue('email', e.target.value)
        }}
        onFocus={() => setFieldTouched('email', true)}
      />
      <Button
        className={'client-add__submit'}
        disabled={isSubmitting}
        onClick={() => handleSubmit(values)}
      >
        {t('next')}
      </Button>
    </>
  )
}

const AddClientModalEmail = () => {
  return (
    <Styles>
      {/* <Formik
        initialValues={form}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().required().email()
        })}
      >
        <Form> */}
      <AddClientModalEmailContent />
      {/* </Form>
      </Formik> */}
    </Styles>
  )
}

export default AddClientModalEmail
