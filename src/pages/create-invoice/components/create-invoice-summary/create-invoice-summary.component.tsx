import React, { FC } from 'react'

import Hr from '../../../../components/hr/hr.styles'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import {
  invoiceDiscount,
  invoiceTax,
  invoiceTotal
} from '../../../../pipes/invoice-total.pipe'
import { asPrice } from '../../../../pipes/price.pipe'
import { OptionType } from '../../../../types/option.type'
import { InvoiceItemType } from '../../create-invoice.data'
import Styles from './create-invoice-summary.styles'

const SummaryItem: FC<OptionType> = ({ label, value }) => (
  <div className={'ci-items__summary__item'}>
    <span className={'ci-items__summary__label'}>{label}</span>
    <span className={'ci-items__summary__value'}>{value}</span>
  </div>
)
type Props = {
  items: InvoiceItemType[]
}
const CreateInvoiceSummary: FC<Props> = ({ items }) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <SummaryItem
        label={t('invoices:subtotal')}
        value={asMoney(
          asPrice(items.reduce((a, b) => a + +b.unit_price * b.quantity, 0))
        )}
      />
      <SummaryItem
        label={t('invoices:discount')}
        value={asMoney(asPrice(invoiceDiscount(items)))}
      />
      <SummaryItem
        label={t('invoices:vat')}
        value={asMoney(asPrice(invoiceTax(items)))}
      />
      <Hr />
      <SummaryItem
        label={t('invoices:total')}
        value={asMoney(asPrice(invoiceTotal(items)))}
      />
    </Styles>
  )
}

export default CreateInvoiceSummary
