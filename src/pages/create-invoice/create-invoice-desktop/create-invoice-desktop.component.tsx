import {
  ArrayHelpers,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
  FormikProps
} from 'formik'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import { AddIcon } from '../../../assets/media/icons'
import Button from '../../../components/buttons/button/button.component'
import Card from '../../../components/cards/card/card.component'
import ClientSelect from '../../../components/form/client-select/client-select.component'
import DatePicker from '../../../components/form/date-picker/date-picker.component'
import Select from '../../../components/form/select/select.component'
import Textarea from '../../../components/form/textarea/textarea.component'
import { paymentMethodsOptions } from '../../../enums/payment-method.enum'
import { Routes } from '../../../enums/routes.enum'
import useClients from '../../../hooks/api/clients/useClients'
import { handleError } from '../../../managers/api.manager'
import logger from '../../../managers/logger.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { ACTION_CREATE_INVOICE_REQUEST } from '../../../store/action-types'
import { RootState } from '../../../store/reducers'
import { AccountObjType } from '../../../types/account.type'
import CreateInvoiceClientCard from '../components/create-invoice-client-card/create-invoice-client-card.component'
import CreateInvoiceItem from '../components/create-invoice-item/create-invoice-item.component'
import CreateInvoiceSection from '../components/create-invoice-section/create-invoice-section.component'
import CreateInvoiceSummary from '../components/create-invoice-summary/create-invoice-summary.component'
import {
  createInvoiceInitialValues,
  defaultInvoiceItem,
  InvoiceFormType
} from '../create-invoice.data'
import Styles from './create-invoice-desktop.styles'

type Props = {}
const CreateInvoiceDesktop = ({}: Props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { clients } = useClients()
  const [client, setClient] = useState<AccountObjType | null>(null)
  const { meta } = useSelector((state: RootState) => state.invoices)
  const location = useLocation()
  const history = useHistory()

  const initialFormValues = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const cid = params.get('cid')
    createInvoiceInitialValues.invoice.invoice_to = cid || ''
    createInvoiceInitialValues.invoice.type = params.get('type') || 'PT session'
    setClient(clients.find((it) => it.id === +(cid || 0)) || null)
    return createInvoiceInitialValues
  }, [])

  const handleSubmit = (
    values: InvoiceFormType,
    helper: FormikHelpers<InvoiceFormType>
  ) => {
    logger.info('SUBMITTING', values)
    dispatch({
      type: ACTION_CREATE_INVOICE_REQUEST,
      payload: {
        ...values,
        items: values.items.map((item) => ({
          ...item,
          tax_rate: item.tax_rate || 0,
          discount_percent: item.discount_percent || 0
        })),
        params: {
          page: meta?.current_page || 1,
          include: 'invoiceTo'
        },
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
      <div className="add-invoice__title-container">
        <h2 className="add-invoice__title">{t('invoices:create-new')}</h2>
        <h4 className="add-invoice__subtitle">
          {t('invoices:invoice-no', { number: '102' })}
        </h4>
      </div>

      <Formik
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        isInitialValid={false}
        validationSchema={Yup.object({
          invoice: Yup.object({
            due_on: Yup.date().required().future(),
            invoice_to: Yup.string().required()
          }),
          items: Yup.array(
            Yup.object({
              quantity: Yup.number().required().min(1),
              unit_price: Yup.number().required().min(1),
              discount: Yup.number().min(0).max(100),
              tax_rate: Yup.number().min(0).max(100)
            })
          )
        })}
      >
        {(formik: FormikProps<InvoiceFormType>) => {
          const { values, setFieldValue } = formik
          let credits = 0
          return (
            <Form>
              <Card className="add-invoice__card">
                <div className="add-invoice__cont">
                  <CreateInvoiceSection title={t('invoices:select-client')}>
                    <div>
                      <div>
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
                            name="invoice.invoice_to"
                            placeholder={t('invoices:type-client')}
                            includeAll={false}
                            onChange={(e) => {
                              setClient(
                                clients.find((c) => c.id === Number(e)) || null
                              )
                              formik.setFieldValue('invoice.invoice_to', e)
                            }}
                          />
                        )}
                      </div>

                      <Button
                        to={Routes.CLIENTS + '/?add=1'}
                        variant="text"
                        className="add-invoice__add-client"
                      >
                        <AddIcon />
                        {t('invoices:invite-new-client')}
                      </Button>
                    </div>
                  </CreateInvoiceSection>
                  <CreateInvoiceSection title={t('invoices:invoice-details')}>
                    <div className="add-invoice__form-row">
                      <DatePicker
                        id="invoice-date"
                        label={t('invoices:issuance-date')}
                        name={'invoice.issuance_date'}
                        disabledDate={(date) =>
                          date.isBefore(moment().startOf('day'))
                        }
                        onChange={(e, date) =>
                          formik.setFieldValue('invoice.issuance_date', date)
                        }
                        value={formik.values.invoice.issuance_date}
                      />
                      <DatePicker
                        id="invoice-due-date"
                        label={t('invoices:due-date')}
                        name={'invoice.due_on'}
                        onChange={(e, date) =>
                          formik.setFieldValue('invoice.due_on', date)
                        }
                        value={formik.values.invoice.due_on}
                        disabledDate={(date) =>
                          date.isBefore(moment().startOf('day'))
                        }
                      />
                      <Select
                        id="invoice-pm"
                        label={t('invoices:preferred-pm')}
                        name={'invoice.payment_method'}
                        options={paymentMethodsOptions}
                        onChange={(e) =>
                          formik.setFieldValue('invoice.payment_method', e)
                        }
                        value={formik.values.invoice.payment_method}
                      />
                    </div>
                  </CreateInvoiceSection>

                  <CreateInvoiceSection title={t('invoices:add-items')}>
                    <FieldArray name={'items'}>
                      {(helpers: ArrayHelpers) => (
                        <>
                          {values.items.map((item, i) => (
                            <CreateInvoiceItem
                              i={i}
                              form={formik}
                              helper={helpers}
                              item={item}
                              key={i}
                              credits={
                                item.type === 'PT session'
                                  ? (credits += +item.quantity)
                                  : credits
                              }
                            />
                          ))}

                          <Button
                            variant="text"
                            className="add-invoice__add-client"
                            onClick={() =>
                              helpers.push({ ...defaultInvoiceItem })
                            }
                          >
                            <AddIcon />
                            {t('invoices:add-another-item')}
                          </Button>
                        </>
                      )}
                    </FieldArray>

                    <CreateInvoiceSummary items={values.items} />
                  </CreateInvoiceSection>

                  <CreateInvoiceSection title={t('invoices:add-notes')}>
                    <Textarea
                      // name={'invoice.description'}
                      id="invoice-notes"
                      placeholder={t('invoices:notes')}
                      value={formik.values.invoice.description}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'invoice.description',
                          e.target.value
                        )
                      }
                    />
                  </CreateInvoiceSection>
                </div>
              </Card>

              <div className="add-invoice__submit">
                <Button
                  className="add-invoice__submit-btn"
                  variant="secondary"
                  disabled={!formik.isValid || !values.items.length}
                  htmlType={'submit'}
                  onClick={() =>
                    formik.setFieldValue('invoice.send_to_client', false)
                  }
                >
                  {t('invoices:create.generate-and-back')}
                </Button>
                <Button
                  disabled={!formik.isValid || !values.items.length}
                  htmlType="submit"
                  onClick={() =>
                    formik.setFieldValue('invoice.send_to_client', true)
                  }
                >
                  {t('invoices:create.generate-and-send')}
                </Button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Styles>
  )
}

export default CreateInvoiceDesktop
