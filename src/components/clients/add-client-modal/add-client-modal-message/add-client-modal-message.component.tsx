import { Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import { handleError } from '../../../../managers/api.manager'
import InvitationManager from '../../../../managers/invitation.manager'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import Textarea from '../../../form/textarea/textarea.component'
// import ButtonSubmit from '../../../forms/button-submit/button-submit.component'
// import FormTextarea from '../../../forms/form-textarea/form-textarea.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-message.styles'

type Props = { onSubmit?: () => void }
type AddClientModalMessageContentProps = {
  t: (key: string, data?: any) => any
  setStep: (step: number) => void
  update: (name: string, value: any) => void
}

const AddClientModalMessageContent = ({
  t,
  setStep,
  update
}: AddClientModalMessageContentProps) => {
  const { values, isSubmitting, setFieldValue, submitForm } =
    useFormikContext<ClientFormType>()
  return (
    <>
      <Textarea
        value={values.message}
        id={'message'}
        label={'Message'}
        onChange={(e) => {
          update('message', e.target.value)
          setFieldValue('message', e.target.value)
        }}
      />
      {/* <ButtonSubmit>{t('submit')}</ButtonSubmit> */}
      <Button
        disabled={isSubmitting}
        className={'client-add__submit'}
        onClick={submitForm}
      >
        {t('submit')}
      </Button>
      <Button
        variant={'secondary'}
        className={'client-add__btn client-add__submit'}
        onClick={() => setStep(clientFormSteps.EMAIL)}
      >
        {t('back')}
      </Button>
      {/* <FormButton
        className={'client-add__submit'}
        type={'default'}
        onClick={() => setStep(clientFormSteps.EMAIL)}
      >
        {t('back')}
      </FormButton> */}
    </>
  )
}

const AddClientModalMessage = ({ onSubmit }: Props) => {
  const { step, setStep, form, update, onClose } = useContext(ClientFormContext)
  const { t } = useTranslation()
  const handleSubmit = (
    values: ClientFormType,
    helper: FormikHelpers<ClientFormType>
  ) => {
    logger.info('FORM VALUE', form, values)
    InvitationManager.sendInvitationExistingUser(
      values.email,
      values.message,
      'training'
    )
      .then(() => {
        helper.setSubmitting(false)
        helper.resetForm()
        toast.show({ type: 'success', msg: t('alerts:client-add-success') })
        onClose()
        onSubmit && onSubmit()
      })
      .catch(handleError(helper))
  }
  return (
    <Styles style={{ maxWidth: step === clientFormSteps.MESSAGE ? '100%' : 0 }}>
      <div className={'client-add__message__wrap'}>
        <p className={'client-add__message__desc'}>
          <span>{form.email}</span> {t('clients:client-exist')}
        </p>
        <Formik
          onSubmit={handleSubmit}
          initialValues={form}
          enableReinitialize
          validationSchema={Yup.object({
            message: Yup.string().required()
          })}
        >
          <Form>
            <AddClientModalMessageContent
              update={update}
              t={t}
              setStep={setStep}
            />
          </Form>
        </Formik>
      </div>
    </Styles>
  )
}

export default AddClientModalMessage
