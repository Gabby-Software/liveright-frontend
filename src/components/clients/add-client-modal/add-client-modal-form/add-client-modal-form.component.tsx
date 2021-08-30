import { Form, Formik, FormikHelpers } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import { genderTypes } from '../../../../enums/gender-types'
import { handleError } from '../../../../managers/api.manager'
import InvitationManager from '../../../../managers/invitation.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import ButtonSubmit from '../../../forms/button-submit/button-submit.component'
import FormButton from '../../../forms/form-button/form-button.component'
import FormCountrySelect from '../../../forms/form-country-select/form-country-select.component'
import FormDatepicker from '../../../forms/form-datepicker/form-datepicker.component'
import FormInputLabeled from '../../../forms/form-input-labeled/form-input-labeled.component'
import FormPhone from '../../../forms/form-phone/form-phone.component'
import FormSwitch from '../../../forms/form-switch/form-switch.component'
import FormTextarea from '../../../forms/form-textarea/form-textarea.component'
import { toast } from '../../../toast/toast.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType
} from '../add-client-modal.context'
import Styles from './add-client-modal-form.styles'

type Props = { onSubmit?: () => void }

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
          <FormInputLabeled
            name={'first_name'}
            label={t('profile:first-name')}
            onUpdate={update}
          />
          <FormInputLabeled
            name={'last_name'}
            label={t('profile:last-name')}
            onUpdate={update}
          />
          <FormDatepicker
            name={'birthday'}
            label={t('profile:birth-date')}
            onUpdate={update}
            disabledDate={(date) =>
              moment().add(-16, 'years').isBefore(moment(date))
            }
            defaultPickerValue={moment().add(-16, 'years')}
          />
          <FormSwitch name={'gender'} options={genderOptions} />
          <FormPhone
            name={'phone_number'}
            label={t('profile:phone')}
            onUpdate={update}
          />
          <FormInputLabeled
            name={'city'}
            label={t('profile:city')}
            onUpdate={update}
          />
          <FormInputLabeled
            name={'postal_code'}
            label={t('profile:postal-code')}
            onUpdate={update}
          />
          <FormCountrySelect
            name={'country.code'}
            onUpdate={(code) => {
              update('country', { code })
            }}
          />
          <FormInputLabeled
            name={'address'}
            label={t('profile:address')}
            onUpdate={update}
          />
          <FormTextarea
            name={'dietary_restrictions'}
            label={t('profile:dietary-restrictions')}
            onUpdate={update}
          />
          <FormTextarea
            name={'injuries'}
            label={t('profile:injuries')}
            onUpdate={update}
          />
          <FormTextarea
            name={'message'}
            label={t('Message')}
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
    </Styles>
  )
}

export default AddClientModalForm
