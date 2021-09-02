import React, { FC } from 'react'

import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { classes } from '../../../../pipes/classes.pipe'
import {
  invoiceDiscount,
  invoiceTax,
  invoiceTotal
} from '../../../../pipes/invoice-total.pipe'
import { asPrice } from '../../../../pipes/price.pipe'
import { OptionType } from '../../../../types/option.type'
import { InvoiceItemType } from '../../create-invoice.data'
import Styles from './create-invoice-summary.styles'

interface SummaryItemProps extends OptionType {
  bold?: boolean
}

const SummaryItem: FC<SummaryItemProps> = ({ label, value, bold }) => (
  <div className={classes('ci-items__item', bold ? 'ci-items__item_bold' : '')}>
    <span className="ci-items__label">{label}</span>
    <span className="ci-items__value">{value} AED</span>
  </div>
)

type Props = {
  items: InvoiceItemType[]
}

const CreateInvoiceSummary: FC<Props> = ({ items }) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <h5 className="ci-items__title">
        {t('invoices:cost-details')}

        <div className="ci-items__title-divider" />
      </h5>

      <div className="ci-items__summary">
        <div>
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

          <div className="ci-items__divider" />

          <SummaryItem
            bold
            label={t('invoices:total')}
            value={asMoney(asPrice(invoiceTotal(items)))}
          />
        </div>
      </div>
    </Styles>
  )
}

export default CreateInvoiceSummary
