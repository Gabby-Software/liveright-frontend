import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { CaretLeftIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import Textarea from '../../../../../components/form/textarea/textarea.component'
import { Routes } from '../../../../../enums/routes.enum'
import { handleError } from '../../../../../managers/api.manager'
import logger from '../../../../../managers/logger.manager'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { ACTION_CREATE_INVOICE_REQUEST } from '../../../../../store/action-types'
import CreateInvoiceSection from '../../../components/create-invoice-section/create-invoice-section.component'
import { useInvoiceForm } from '../../../create-invoice.context'
import {
  createInvoiceSteps,
  InvoiceFormType
} from '../../../create-invoice.data'
import CreateInvoiceMobileClientView from '../create-invoice-mobile-client-view/create-invoice-mobile-client-view.component'
import CreateInvoiceMobileDetailsView from '../create-invoice-mobile-details-view/create-invoice-mobile-details-view.component'
import CreateInvoiceMobileItemsView from '../create-invoice-mobile-items-view/create-invoice-mobile-items-view.component'
import Styles from './create-invoice-mobile-notes.styles'

type Props = {}
const CreateInvoiceMobileNotes = ({}: Props) => {
  const { values, setValues, setStep } = useInvoiceForm()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (
    values: InvoiceFormType,
    helper: FormikHelpers<InvoiceFormType>
  ) => {
    setValues(values)
    dispatch({
      type: ACTION_CREATE_INVOICE_REQUEST,
      payload: {
        ...values,
        items: values.items.map((item) => ({
          ...item,
          tax_rate: item.tax_rate || 0,
          discount_percent: item.discount_percent || 0
        })),
        onSuccess: (id: number) => {
          helper.setSubmitting(false)
          helper.resetForm()
          history.push(Routes.INVOICES + `/${id}`)
        },
        onError: handleError(helper)
      }
    })
  }

  return (
    <Styles>
      <CreateInvoiceMobileClientView />
      <CreateInvoiceMobileDetailsView />
      <CreateInvoiceMobileItemsView />

      <Formik initialValues={values} onSubmit={handleSubmit} enableReinitialize>
        {(formik: FormikProps<InvoiceFormType>) => (
          <Form>
            <Card>
              <CreateInvoiceSection title={'Add Notes'}>
                <Textarea
                  id="add-invoice-description"
                  placeholder={'Notes'}
                  value={formik.values.invoice.description}
                  onChange={(e) =>
                    formik.setFieldValue('invoice.description', e.target.value)
                  }
                />
              </CreateInvoiceSection>
            </Card>

            <Button
              disabled={!formik.isValid || !values.items.length}
              className={'add-invoice__submit'}
              htmlType={'submit'}
              onClick={() => {
                formik.setFieldValue('invoice.send_to_client', true)
                formik.submitForm()
              }}
            >
              {t('invoices:create.generate-and-send')}
            </Button>
            <Button
              variant="secondary"
              disabled={!formik.isValid || !values.items.length}
              className={'add-invoice__submit'}
              htmlType={'submit'}
              onClick={() => {
                formik.setFieldValue('invoice.send_to_client', false)
                formik.submitForm()
              }}
            >
              {t('invoices:create.generate-and-back')}
            </Button>

            <Button
              variant="text"
              onClick={() => setStep(createInvoiceSteps.ITEMS)}
              className="ci-actions__back"
            >
              <CaretLeftIcon />
              Back to Add Items
            </Button>
          </Form>
        )}
      </Formik>
    </Styles>
  )
}

export default CreateInvoiceMobileNotes
