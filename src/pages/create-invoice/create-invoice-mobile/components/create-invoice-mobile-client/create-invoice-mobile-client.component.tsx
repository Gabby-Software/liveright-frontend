import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import FormClientSelect from '../../../../../components/forms/form-client-select/form-client-select.component'
import FormRow from '../../../../../components/forms/form-row/form-row.component'
import Link from '../../../../../components/link/link.component'
import { Routes } from '../../../../../enums/routes.enum'
import CreateInvoiceClientCard from '../../../components/create-invoice-client-card/create-invoice-client-card.component'
import CreateInvoiceSection from '../../../components/create-invoice-section/create-invoice-section.component'
import { useInvoiceForm } from '../../../create-invoice.context'
import {
  createInvoiceSteps,
  InvoiceFormType
} from '../../../create-invoice.data'
import CreateInvoiceMobileActions from '../create-invoice-mobile-actions/create-invoice-mobile-actions.component'
import Styles from './create-invoice-mobile-client.styles'

const CreateInvoiceMobileClient = () => {
  const { values, setValues, setStep, client, setClient } = useInvoiceForm()
  const handleSubmit = (
    formValues: InvoiceFormType,
    helper: FormikHelpers<InvoiceFormType>
  ) => {
    setValues(formValues)
    setStep(createInvoiceSteps.DETAILS)
    helper.setSubmitting(false)
  }
  return (
    <Styles>
      <Formik
        initialValues={values}
        onSubmit={handleSubmit}
        isInitialValid={false}
        enableReinitialize
        validationSchema={Yup.object({
          invoice: Yup.object({
            invoice_to: Yup.string().required()
          })
        })}
      >
        {({ setFieldValue }: FormikProps<InvoiceFormType>) => (
          <Form>
            <CreateInvoiceSection
              title={'Select who should receive the invoice'}
            >
              <FormRow>
                {client ? (
                  <CreateInvoiceClientCard
                    client={client}
                    onRemove={() => {
                      setClient(null)
                      setFieldValue('invoice.invoice_to', '')
                    }}
                  />
                ) : (
                  <FormClientSelect
                    name={'invoice.invoice_to'}
                    label={'Search Existing Clients'}
                    onUpdate={setClient}
                  />
                )}
                <div className={'add-invoice__add-client'}>
                  {client ? null : (
                    <Link to={Routes.CLIENTS + '/?add=1'}>
                      {'or add new one'}
                    </Link>
                  )}
                </div>
                <div />
                <div />
              </FormRow>
            </CreateInvoiceSection>
            <CreateInvoiceMobileActions />
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default CreateInvoiceMobileClient
