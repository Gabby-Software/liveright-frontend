import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { FC, useState } from 'react'
import * as Yup from 'yup'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Card from '../../../../../components/cards/card/card.component'
import FormButton from '../../../../../components/forms/form-button/form-button.component'
import Hr from '../../../../../components/hr/hr.styles'
import { toast } from '../../../../../components/toast/toast.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../../pipes/as-money.pipe'
import { asPrice } from '../../../../../pipes/price.pipe'
import { OptionType } from '../../../../../types/option.type'
import CreateInvoiceSection from '../../../components/create-invoice-section/create-invoice-section.component'
import { useInvoiceForm } from '../../../create-invoice.context'
import {
  createInvoiceSteps,
  defaultInvoiceItem,
  InvoiceItemType
} from '../../../create-invoice.data'
import CreateInvoiceMobileActions from '../create-invoice-mobile-actions/create-invoice-mobile-actions.component'
import CreateInvoiceMobileClientView from '../create-invoice-mobile-client-view/create-invoice-mobile-client-view.component'
import CreateInvoiceMobileDetailsView from '../create-invoice-mobile-details-view/create-invoice-mobile-details-view.component'
import CreateInvoiceMobileItem from '../create-invoice-mobile-item/create-invoice-mobile-item.component'
import CreateInvoiceMobileItemForm from '../create-invoice-mobile-item-form/create-invoice-mobile-item-form.component'
import Styles from './create-invoice-mobile-items.styles'

const SummaryItem: FC<OptionType> = ({ label, value }) => (
  <div className={'ci-items__summary__item'}>
    <span className={'ci-items__summary__label'}>{label}</span>
    <span className={'ci-items__summary__value'}>{value}</span>
  </div>
)

const CreateInvoiceMobileItems = () => {
  const { values, setValues, setStep } = useInvoiceForm()
  const { t } = useTranslation()
  const [items, setItems] = useState<InvoiceItemType[]>(values.items || [])
  const [active, setActive] = useState(-1)
  const [open, setOpen] = useState(false)

  const handleFormSubmit = (
    formValues: InvoiceItemType,
    helper: FormikHelpers<InvoiceItemType>
  ) => {
    if (active === -1) {
      setItems([...items, formValues])
    } else {
      items[active] = formValues
      setItems([...items])
    }
    setActive(-1)
    setOpen(false)
    helper.setSubmitting(false)
    helper.resetForm()
  }

  const handleSubmit = (_: {}, helper: FormikHelpers<{}>) => {
    if (!items.length)
      return toast.show({
        type: 'error',
        msg: 'Add at least one item to invoice'
      })
    setValues({ ...values, items })
    setStep(createInvoiceSteps.NOTES)
    helper.setSubmitting(false)
  }

  return (
    <Styles>
      <CreateInvoiceMobileClientView />
      <CreateInvoiceMobileDetailsView />

      <Card>
        <CreateInvoiceSection title="Add Items">
          {items.map((item, idx) => (
            <CreateInvoiceMobileItem
              key={idx}
              item={item}
              active={idx === active}
              onClick={() => {
                setActive(idx)
                setOpen(true)
              }}
            />
          ))}

          {open || !items.length ? (
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={active === -1 ? defaultInvoiceItem : items[active]}
              enableReinitialize
              validationSchema={Yup.object({
                quantity: Yup.number().required().min(1),
                unit_price: Yup.number().required().min(1),
                discount: Yup.number().min(0).max(100),
                tax_rate: Yup.number().min(0).max(100)
              })}
            >
              {({ values, setFieldValue }: FormikProps<InvoiceItemType>) => (
                <Form>
                  <CreateInvoiceMobileItemForm
                    {...values}
                    onChange={setFieldValue}
                  />

                  <Button
                    variant="text"
                    htmlType="submit"
                    className="add-invoice__add-btn"
                  >
                    <AddIcon />
                    {active === -1 ? 'Add to invoice' : 'Update item'}
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <Button
              variant="text"
              htmlType="submit"
              className="add-invoice__add-btn"
              onClick={() => setOpen(true)}
            >
              <AddIcon />
              {'Add Another'}
            </Button>
          )}

          <div className={'ci-items__summary'}>
            <p className="ci-items__summary-title">Cost Detail</p>

            <SummaryItem
              label={t('invoices:subtotal')}
              value={
                asMoney(
                  asPrice(
                    items.reduce((a, b) => a + +b.unit_price * b.quantity, 0)
                  )
                ) + ' AED'
              }
            />
            <SummaryItem
              label={t('invoices:discount')}
              value={
                asMoney(
                  asPrice(
                    items.reduce(
                      (a, b) =>
                        a +
                        (+b.unit_price * b.quantity * b.discount_percent) / 100,
                      0
                    )
                  )
                ) + ' AED'
              }
            />
            <SummaryItem
              label={t('invoices:vat')}
              value={asMoney(
                asPrice(
                  items.reduce(
                    (a, b) =>
                      a +
                      (+b.unit_price *
                        b.quantity *
                        (1 - b.discount_percent / 100) *
                        b.tax_rate) /
                        100,
                    0
                  )
                ) + ' AED'
              )}
            />

            <Hr className="ci-items__divider" />

            <SummaryItem
              label={t('invoices:total')}
              value={asMoney(
                asPrice(
                  items.reduce(
                    (a, b) =>
                      a +
                      +b.unit_price *
                        b.quantity *
                        (1 - b.discount_percent / 100) *
                        (1 + b.tax_rate / 100),
                    0
                  )
                ) + ' AED'
              )}
            />
          </div>
        </CreateInvoiceSection>
      </Card>

      <Formik initialValues={{}} onSubmit={handleSubmit}>
        <Form>
          <CreateInvoiceMobileActions
            back={createInvoiceSteps.DETAILS}
            backText="Back to Detail Invoice"
          />
        </Form>
      </Formik>
    </Styles>
  )
}

export default CreateInvoiceMobileItems
