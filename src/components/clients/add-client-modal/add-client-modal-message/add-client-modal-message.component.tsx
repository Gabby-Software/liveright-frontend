import { Form, Formik, FormikHelpers } from 'formik'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import { handleError } from '../../../../managers/api.manager'
import InvitationManager from '../../../../managers/invitation.manager'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ButtonSubmit from '../../../forms/button-submit/button-submit.component'
import FormButton from '../../../forms/form-button/form-button.component'
import FormTextarea from '../../../forms/form-textarea/form-textarea.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-message.styles'

type Props = { onSubmit?: () => void }
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
            <FormTextarea
              name={'message'}
              label={'Message'}
              onUpdate={update}
            />
            <ButtonSubmit>{t('submit')}</ButtonSubmit>
            <FormButton
              type={'default'}
              onClick={() => setStep(clientFormSteps.EMAIL)}
            >
              {t('back')}
            </FormButton>
          </Form>
        </Formik>
      </div>
    </Styles>
  )
}

export default AddClientModalMessage
