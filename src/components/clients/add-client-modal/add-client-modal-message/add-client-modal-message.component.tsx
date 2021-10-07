import { FormikHelpers, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import { useHistory } from 'react-router'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { handleError } from '../../../../managers/api.manager'
import InvitationManager from '../../../../managers/invitation.manager'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import Textarea from '../../../form/textarea/textarea.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-message.styles'

type Props = { onSubmit?: () => void }
type AddClientModalMessageContentProps = {
  // t: (key: string, data?: any) => any
  // setStep: (step: number) => void
  // update: (name: string, value: any) => void
  onSubmit?: (params?: any) => any
}

const AddClientModalMessageContent = ({
  onSubmit
}: AddClientModalMessageContentProps) => {
  const { values, isSubmitting, setFieldValue, setSubmitting, resetForm } =
    useFormikContext<ClientFormType>()

  const { form, onClose, setStep } = useContext(ClientFormContext)
  const history = useHistory()
  const isMobile = useIsMobile()
  const { t } = useTranslation()

  const handleSubmit = (values: ClientFormType) => {
    logger.info('FORM VALUE', form, values)
    InvitationManager.sendInvitationExistingUser(
      values.email,
      values.message,
      'training'
    )
      .then(() => {
        setSubmitting(false)
        setStep(clientFormSteps.EMAIL)
        resetForm()
        toast.show({ type: 'success', msg: t('alerts:client-add-success') })
        onClose()
        isMobile && history.push('/clients')
        onSubmit && onSubmit()
      })
      .catch(handleError({ setSubmitting } as FormikHelpers<ClientFormType>))
  }
  return (
    <>
      <Textarea
        value={values.message}
        id={'message'}
        label={'Message'}
        onChange={(e) => {
          // update('message', e.target.value)
          setFieldValue('message', e.target.value)
        }}
      />
      {/* <ButtonSubmit>{t('submit')}</ButtonSubmit> */}
      <Button
        disabled={isSubmitting}
        className={'client-add__submit'}
        onClick={() => handleSubmit(values)}
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
  const { step, form } = useContext(ClientFormContext)
  const { t } = useTranslation()

  return (
    <Styles style={{ maxWidth: step === clientFormSteps.MESSAGE ? '100%' : 0 }}>
      <div className={'client-add__message__wrap'}>
        <p className={'client-add__message__desc'}>
          <span>{form.email}</span> {t('clients:client-exist')}
        </p>
        {/* <Formik
          onSubmit={handleSubmit}
          initialValues={form}
          enableReinitialize
          validationSchema={Yup.object({
            message: Yup.string().required()
          })}
        >
          <Form> */}
        <AddClientModalMessageContent onSubmit={onSubmit} />
        {/* </Form>
        </Formik> */}
      </div>
    </Styles>
  )
}

export default AddClientModalMessage
