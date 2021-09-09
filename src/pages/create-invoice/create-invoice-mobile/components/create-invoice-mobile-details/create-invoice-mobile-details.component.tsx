import { Form, Formik, FormikHelpers } from 'formik'
import moment from 'moment'
import React, { FC } from 'react'
import * as Yup from 'yup'

import Card from '../../../../../components/cards/card/card.component'
import DatePicker from '../../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../../components/form/select/select.component'
import FormRow from '../../../../../components/forms/form-row/form-row.component'
import { paymentMethodsOptions } from '../../../../../enums/payment-method.enum'
import CreateInvoiceSection from '../../../components/create-invoice-section/create-invoice-section.component'
import { useInvoiceForm } from '../../../create-invoice.context'
import {
  createInvoiceSteps,
  InvoiceFormType
} from '../../../create-invoice.data'
import CreateInvoiceMobileActions from '../create-invoice-mobile-actions/create-invoice-mobile-actions.component'
import CreateInvoiceMobileClientView from '../create-invoice-mobile-client-view/create-invoice-mobile-client-view.component'
import Styles from './create-invoice-mobile-details.styles'

type Props = {}

const CreateInvoiceMobileDetails: FC<Props> = ({}) => {
  const { values, setValues, setStep } = useInvoiceForm()

  const handleSubmit = (
    formValues: InvoiceFormType,
    helper: FormikHelpers<InvoiceFormType>
  ) => {
    setValues(formValues)
    setStep(createInvoiceSteps.ITEMS)
    helper.setSubmitting(false)
  }

  return (
    <Styles>
      <CreateInvoiceMobileClientView />
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        isInitialValid={false}
        enableReinitialize
        validationSchema={Yup.object({
          invoice: Yup.object({
            due_on: Yup.string().required()
          })
        })}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Card>
              <CreateInvoiceSection title={'Set the Invoice Details'}>
                <FormRow>
                  <DatePicker
                    id="create-invoice-date"
                    label={'Issuance Date'}
                    name={'invoice.issuance_date'}
                    className="add-invoice__form-item"
                    disabledDate={(date) =>
                      date.isBefore(moment().startOf('day'))
                    }
                    value={values.invoice.issuance_date}
                    onChange={(e, date) =>
                      setFieldValue('invoice.issuance_date', date)
                    }
                  />
                  <DatePicker
                    id="create-invoice-due-on"
                    label={'Due Date'}
                    name={'invoice.due_on'}
                    className="add-invoice__form-item"
                    value={values.invoice.due_on}
                    onChange={(e, date) =>
                      setFieldValue('invoice.due_on', date)
                    }
                  />
                  <Select
                    id="create-invoice-pm"
                    className="add-invoice__form-item"
                    label={'Payment Method'}
                    name={'invoice.payment_method'}
                    options={paymentMethodsOptions}
                    value={values.invoice.payment_method}
                    onChange={(e) => setFieldValue('invoice.payment_method', e)}
                  />
                </FormRow>
              </CreateInvoiceSection>
            </Card>

            <CreateInvoiceMobileActions
              back={createInvoiceSteps.CLIENT}
              backText="Back to select existing Client"
            />
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default CreateInvoiceMobileDetails
