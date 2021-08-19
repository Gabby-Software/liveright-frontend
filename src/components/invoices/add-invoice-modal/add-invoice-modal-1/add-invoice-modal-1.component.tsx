import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import moment from 'moment'
import React, { useContext } from 'react'
import * as Yup from 'yup'

import { serviceTypes } from '../../../../enums/service-type.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { clients } from '../../../../pages/invoices/invoices.data'
import { InvoiceFormType } from '../../../../types/invoice-form.type'
import ButtonSubmit from '../../../forms/button-submit/button-submit.component'
import FormDatepicker from '../../../forms/form-datepicker/form-datepicker.component'
import FormInputLabeled from '../../../forms/form-input-labeled/form-input-labeled.component'
import FormRow from '../../../forms/form-row/form-row.component'
import FormSelect from '../../../forms/form-select/form-select.component'
import { invoiceSteps } from '../add-invoice-modal.component'
import { InvoiceContext } from '../add-invoice-modal.context'

const AddInvoiceModal1 = () => {
  const { t } = useTranslation()
  const { form, update, setStep } = useContext(InvoiceContext)
  const handleSubmit = (
    values: InvoiceFormType,
    helper: FormikHelpers<InvoiceFormType>
  ) => {
    // todo: handle submit
    helper.setSubmitting(false)
    helper.resetForm()
    setStep(invoiceSteps.PRICE)
  }
  const serviceTypeOptions = Object.values(serviceTypes).map(
    (type: string) => ({
      label: t(`invoices:service-type.${type}`),
      value: t(`invoices:service-type.${type}`)
    })
  )
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={form}
      validationSchema={Yup.object({
        due_date: Yup.date().required().min(moment().startOf('day').toDate()),
        quantity: Yup.number().min(1),
        client_name: Yup.string().required(),
        service_type: Yup.string(),
        session_expired: Yup.string().when('service_type', {
          is: (field: string) =>
            field === t(`invoices:service-type.${serviceTypes.PT_SESSION}`),
          then: Yup.string()
        }),
        other: Yup.string().when('service_type', {
          is: (field: string) =>
            field === t(`invoices:service-type.${serviceTypes.OTHER}`),
          then: Yup.string().required()
        })
      })}
    >
      {(form: FormikProps<InvoiceFormType>) => (
        <Form>
          <FormDatepicker name={'due_date'} label={t('invoices:invoice-due')} />
          <FormRow>
            <FormSelect
              name={'service_type'}
              label={t('invoices:service-type.title')}
              options={serviceTypeOptions}
              onUpdate={(val) => update('service_type', val)}
            />
            {form.values.service_type ===
            t(`invoices:service-type.${serviceTypes.PT_SESSION}`) ? (
              <FormInputLabeled
                name={'session_expired'}
                onUpdate={update}
                label={t('invoices:session-expired')}
              />
            ) : form.values.service_type ===
              t(`invoices:service-type.${serviceTypes.OTHER}`) ? (
              <FormInputLabeled
                name={'other'}
                label={t('invoices:other')}
                onUpdate={update}
              />
            ) : null}
          </FormRow>
          <FormInputLabeled
            name={'quantity'}
            label={t('invoices:quantity')}
            type={'number'}
            onUpdate={update}
          />
          <FormSelect
            name={'client_name'}
            label={t('invoices:client-name')}
            options={clients.map(({ first_name, last_name }) => ({
              label: `${first_name} ${last_name}`,
              value: `${first_name} ${last_name}`
            }))}
            onUpdate={(val) => update('client_name', val)}
          />
          <ButtonSubmit>{t('next')}</ButtonSubmit>
        </Form>
      )}
    </Formik>
  )
}

export default AddInvoiceModal1
