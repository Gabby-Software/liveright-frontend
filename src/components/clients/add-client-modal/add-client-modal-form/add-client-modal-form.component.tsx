import { /* Form, Formik, */ FormikHelpers, useFormikContext } from 'formik'
import moment from 'moment'
import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router'

// import * as Yup from 'yup'
import { genderTypes } from '../../../../enums/gender-types'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { handleError } from '../../../../managers/api.manager'
import InvitationManager from '../../../../managers/invitation.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import Button from '../../../buttons/button/button.component'
import DatePicker from '../../../form/date-picker/date-picker.component'
import Input from '../../../form/input/input.component'
import Textarea from '../../../form/textarea/textarea.component'
import FormCountrySelect from '../../../forms/form-country-select/form-country-select.component'
import FormPhone from '../../../forms/form-phone/form-phone.component'
import FormSwitch from '../../../forms/form-switch/form-switch.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-form.styles'

type Props = {
  onClose?: (params?: any) => any
  onSubmit?: () => void
}

type AddClientModalFormContentProps = {
  t: (key: string, data?: any) => any
  setStep: (step: number) => void
  update?: (name: string, value: any) => void
  genderOptions: OptionType[]
  onSubmit?: (params?: any) => any
  onClose?: (params?: any) => any
}

const AddClientModalFormContent = ({
  setStep,
  t,
  genderOptions,
  onSubmit,
  onClose
}: AddClientModalFormContentProps) => {
  const { errors, values, setFieldValue, setSubmitting, resetForm, setFieldTouched } =
    useFormikContext<ClientFormType>()
  const isMobile = useIsMobile()
  const history = useHistory()
  const [firstErrorElement, setFirstErrorElement] = useState("")

  const handleCheckErrorsAndSubmit = () => {
    const errorObjectLength = Object.values(errors).length;
    const firstErrorObjectKey = Object.keys(errors)[0];
    
    if(errorObjectLength === 0){      
      handleSubmit(values)
    }
    else
    {
      setFirstErrorElement(firstErrorObjectKey)
    }

  }

  const handleSubmit = (values: ClientFormType) => {
    InvitationManager.sendInvitationNewUser({
      ...values,
      type: 'training',
      country_code: values.country
    })
      .then(() => {
        onSubmit && onSubmit()
        setSubmitting(false)
        resetForm()
        toast.show({ type: 'success', msg: t('alerts:client-add-success') })
        setStep(clientFormSteps.EMAIL)
        onClose && onClose()
        isMobile && history.push('/clients')
      })
      .catch(handleError({ setSubmitting } as FormikHelpers<ClientFormType>))
  }
  return (
    <>
      <Input
        className="client-add__input"
        id={'first_name'}
        name={'first_name'}
        label={t('profile:first-name')}
        onChange={(e) => {
          setFieldValue('first_name', e.target.value)
        }}
        value={values.first_name}
        onFocus={() => setFieldTouched('first_name', true)}
        shouldScrollTo={firstErrorElement === 'first_name'}
      />
      <Input
        className="client-add__input"
        id={'last_name'}
        name={'last_name'}
        label={t('profile:last-name')}
        onChange={(e) => {
          setFieldValue('last_name', e.target.value)
        }}
        value={values.last_name}
        onFocus={() => setFieldTouched('last_name', true)}
        shouldScrollTo={firstErrorElement === 'last_name'}
      />
      <DatePicker
        className="client-add__input"
        id="birthday"
        label={t('profile:birth-date')}
        value={values.birthday}
        onChange={(e, date) => setFieldValue('birthday', date)}
        name="birthday"
        disabledDate={(date) =>
          moment().add(-16, 'years').isBefore(moment(date))
        }
        defaultPickerValue={moment().add(-16, 'years')}
      />
      <FormSwitch name={'gender'} options={genderOptions} />
      <FormPhone
        name={'phone_number'}
        label={t('profile:phone')}
        onUpdate={(name, value) => {
          // update(name, value)
          setFieldValue(name, value)
        }}
      />
      <Input
        className="client-add__input"
        id={'city'}
        name={'city'}
        label={t('profile:city')}
        onChange={(e) => {
          // update('city', e.target.value)
          setFieldValue('city', e.target.value)
        }}
        value={values.city}
        onFocus={() => setFieldTouched('city', true)}
        shouldScrollTo={firstErrorElement === 'city'}
      />
      <Input
        className="client-add__input"
        id={'postal_code'}
        name={'postal_code'}
        label={t('profile:postal-code')}
        onChange={(e) => {
          // update('postal_code', e.target.value)
          setFieldValue('postal_code', e.target.value)
        }}
        value={values.postal_code}
        onFocus={() => setFieldTouched('postal_code', true)}
        shouldScrollTo={firstErrorElement === 'postal_code'}
      />
      <FormCountrySelect
        name="country"
        label={t('profile:country')}
        onUpdate={(v) => setFieldValue('country', v)}
      />
      <Input
        className="client-add__input"
        id={'address'}
        name={'address'}
        label={t('profile:address')}
        onChange={(e) => {
          // update('address', e.target.value)
          setFieldValue('address', e.target.value)
        }}
        value={values.address}
        onFocus={() => setFieldTouched('address', true)}
        shouldScrollTo={firstErrorElement === 'address'}
      />
      <Textarea
        className="client-add__input"
        id="dietary_restrictions"
        label={t('profile:dietary-restrictions')}
        onChange={(e) => {
          // update('dietary_restrictions', e.target.value)
          setFieldValue('dietary_restrictions', e.target.value)
        }}
        value={values.dietary_restrictions}
      />
      <Textarea
        className="client-add__input"
        id="injuries"
        label={t('profile:injuries')}
        onChange={(e) => {
          // update('injuries', e.target.value)
          setFieldValue('injuries', e.target.value)
        }}
        value={values.injuries}
      />
      <Textarea
        className="client-add__input"
        id="message"
        label={t('profile:message')}
        onChange={(e) => {
          // update('message', e.target.value)
          setFieldValue('message', e.target.value)
        }}
        value={values.message}
        shouldScrollTo={firstErrorElement === 'message'}
      />
      <Button
        onClick={handleCheckErrorsAndSubmit}
        className={'client-add__submit'}
      >
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

const AddClientModalForm = ({ onSubmit, onClose }: Props) => {
  const { setStep, update } = useContext(ClientFormContext)
  const { t } = useTranslation()

  const genderOptions = [
    { label: t('profile:male'), value: genderTypes.MALE },
    { label: t('profile:female'), value: genderTypes.FEMALE }
  ]

  return (
    <Styles>
      <AddClientModalFormContent
        update={update}
        genderOptions={genderOptions}
        setStep={setStep}
        t={t}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </Styles>
  )
}

export default AddClientModalForm
