import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
import * as Yup from 'yup'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import ClientSelect from '../../../../../components/form/client-select/client-select.component'
import FormRow from '../../../../../components/forms/form-row/form-row.component'
import { Routes } from '../../../../../enums/routes.enum'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
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
  const { t } = useTranslation()

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
            <Card>
              <CreateInvoiceSection title={t('invoices:select-client')}>
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
                    <ClientSelect
                      name={'invoice.invoice_to'}
                      onChange={(e, option) => {
                        setClient(option.clientObj)
                        setFieldValue('invoice.invoice_to', e)
                      }}
                      placeholder={t('invoices:type-client')}
                    />
                  )}

                  <Button
                    variant="text"
                    to={Routes.CLIENTS + '/?add=1'}
                    className="add-invoice__invite-btn"
                  >
                    <AddIcon />
                    {t('invoices:invite-new-client')}
                  </Button>
                </FormRow>
              </CreateInvoiceSection>
            </Card>

            <CreateInvoiceMobileActions />
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default CreateInvoiceMobileClient
