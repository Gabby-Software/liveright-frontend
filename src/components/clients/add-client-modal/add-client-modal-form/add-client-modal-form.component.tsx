import { Form, Formik, FormikHelpers, useFormikContext } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import { genderTypes } from '../../../../enums/gender-types'
import { handleError } from '../../../../managers/api.manager'
import InvitationManager from '../../../../managers/invitation.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import Button from '../../../buttons/button/button.component'
import DatePicker from '../../../form/date-picker/date-picker.component'
import Input from '../../../form/input/input.component'
import Textarea from '../../../form/textarea/textarea.component'
import FormPhone from '../../../forms/form-phone/form-phone.component'
import FormSwitch from '../../../forms/form-switch/form-switch.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-form.styles'

type Props = { onSubmit?: () => void }
type AddClientModalFormContentProps = {
  t: (key: string, data?: any) => any
  setStep: (step: number) => void
  update: (name: string, value: any) => void
  genderOptions: OptionType[]
}

const AddClientModalFormContent = ({
  update,
  setStep,
  t,
  genderOptions
}: AddClientModalFormContentProps) => {
  const { values, setFieldValue, submitForm } =
    useFormikContext<ClientFormType>()
  return (
    <>
      <Input
        className="client-add__input"
        id={'first_name'}
        name={'first_name'}
        label={t('profile:first-name')}
        onChange={(e) => {
          update('first_name', e.target.value)
          setFieldValue('first_name', e.target.value)
        }}
        value={values.first_name}
      />
      <Input
        className="client-add__input"
        id={'last_name'}
        name={'last_name'}
        label={t('profile:last-name')}
        onChange={(e) => {
          update('last_name', e.target.value)
          setFieldValue('last_name', e.target.value)
        }}
        value={values.last_name}
      />
      <DatePicker
        className="client-add__input"
        id="birthday"
        label={t('profile:birth-date')}
        value={values.birthday}
        onChange={(e, date) => setFieldValue('birthday', date)}
        name="birthday"
      />
      <FormSwitch name={'gender'} options={genderOptions} />
      <FormPhone
        name={'phone_number'}
        label={t('profile:phone')}
        onUpdate={update}
      />
      <Input
        className="client-add__input"
        id={'city'}
        name={'city'}
        label={t('profile:city')}
        onChange={(e) => {
          update('city', e.target.value)
          setFieldValue('city', e.target.value)
        }}
        value={values.city}
      />
      <Input
        className="client-add__input"
        id={'postal_code'}
        name={'postal_code'}
        label={t('profile:postal-code')}
        onChange={(e) => {
          update('postal_code', e.target.value)
          setFieldValue('postal_code', e.target.value)
        }}
        value={values.postal_code}
      />
      <Input
        className="client-add__input"
        id={'country'}
        name={'country'}
        label={t('profile:country')}
        onChange={(e) => {
          update('country', e.target.value)
          setFieldValue('country', e.target.value)
        }}
        value={values.country}
      />
      <Input
        className="client-add__input"
        id={'address'}
        name={'address'}
        label={t('profile:address')}
        onChange={(e) => {
          update('address', e.target.value)
          setFieldValue('address', e.target.value)
        }}
        value={values.address}
      />
      <Textarea
        className="client-add__input"
        id="dietary_restrictions"
        label={t('profile:dietary-restrictions')}
        onChange={(e) => {
          update('dietary_restrictions', e.target.value)
          setFieldValue('dietary_restrictions', e.target.value)
        }}
        value={values.dietary_restrictions}
      />
      <Textarea
        className="client-add__input"
        id="injuries"
        label={t('profile:injuries')}
        onChange={(e) => {
          update('injuries', e.target.value)
          setFieldValue('injuries', e.target.value)
        }}
        value={values.injuries}
      />
      <Textarea
        className="client-add__input"
        id="message"
        label={t('profile:message')}
        onChange={(e) => {
          update('message', e.target.value)
          setFieldValue('message', e.target.value)
        }}
        value={values.message}
      />
      {/* <ButtonSubmit>{t('submit')}</ButtonSubmit> */}
      <Button onClick={submitForm} className={'client-add__submit'}>
        {t('submit')}
      </Button>
      <Button
        variant={'secondary'}
        className={'client-add__submit'}
        type={'default'}
        onClick={() => setStep(clientFormSteps.EMAIL)}
      >
        {t('back')}
      </Button>
    </>
  )
}

const AddClientModalForm = ({ onSubmit }: Props) => {
  const { setStep, form, update, onClose } = useContext(ClientFormContext)
  const { t } = useTranslation()

  const handleSubmit = (
    values: ClientFormType,
    helper: FormikHelpers<ClientFormType>
  ) => {
    InvitationManager.sendInvitationNewUser({
      ...values,
      type: 'training',
      country_code: values.country
    })
      .then(() => {
        helper.setSubmitting(false)
        helper.resetForm()
        toast.show({ type: 'success', msg: t('alerts:client-add-success') })
        onClose()
        onSubmit && onSubmit()
      })
      .catch(handleError(helper))
  }

  const genderOptions = [
    { label: t('profile:male'), value: genderTypes.MALE },
    { label: t('profile:female'), value: genderTypes.FEMALE }
  ]

  return (
    <Styles>
      <Formik
        initialValues={form}
        onSubmit={handleSubmit}
        enableReinitialize
        validationSchema={Yup.object({
          first_name: Yup.string().required().name(),
          last_name: Yup.string().required().name(),
          phone_number: Yup.string().phone(),
          birthday: Yup.date().max(moment().startOf('day').toDate()),
          postal_code: Yup.string().zip().nullable()
        })}
      >
        <Form>
          <AddClientModalFormContent
            update={update}
            genderOptions={genderOptions}
            setStep={setStep}
            t={t}
          />
        </Form>
      </Formik>
    </Styles>
  )
}

export default AddClientModalForm
