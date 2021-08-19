import React from 'react'

import DataTable from '../../../../components/data-table/data-table.component'
import { useAPIData } from '../../../../hoc/api-get'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { InvoiceFullType } from '../../../../types/invoice.type'
import Styles from './invoice-info.styles'

const InvoiceInfo = () => {
  const { t } = useTranslation()
  const { data } = useAPIData<InvoiceFullType>()
  const labels = [
    'invoices:item',
    'invoices:quantity',
    'invoices:price',
    'invoices:discount',
    'invoices:vat',
    'invoices:item-total'
  ]
  const keys = ['item', 'qty', 'price', 'discount', 'vat', 'subtotal']
  return (
    <Styles>
      <DataTable
        labels={labels}
        data={data.items}
        keys={keys}
        render={{
          item: ({ type, name }) => (
            <div className={'invoice-info__item'}>
              <div className={'invoice-info__type'}>{type}</div>
              <div className={'invoice-info__desc'}>{name}</div>
            </div>
          ),
          qty: ({ quantity }) => `${quantity}X`,
          price: ({ unit_price }) => `${unit_price} ${data.currency.code}`,
          discount: ({ discount_amount }) =>
            `${discount_amount} ${data.currency.code}`,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          vat: ({ tax_value, unit_price, quantity }) =>
            `${tax_value} ${data.currency.code}`,
          subtotal: ({ total }) => `${asMoney(total)} ${data.currency.code}`
        }}
      >
        <tr className={'data-table__tr'}>
          <td className={'data-table__td'} colSpan={4}>
            <div className={'invoice-info__summary__left'}>
              <div className={'invoice-info__s'}>
                <div className={'invoice-info__s-key'}>
                  {t('invoices:default-payment-method')}
                </div>
                <div className={'invoice-info__s-value'}>
                  {t(`invoices:${data.payment_method}`)}
                </div>
              </div>
              <div className={'invoice-info__s'}>
                <div className={'invoice-info__s-key'}>
                  {t('invoices:session-expiry')}
                </div>
                <div className={'invoice-info__s-value'}>
                  {t('invoices:never')}
                </div>
              </div>
            </div>
          </td>
          <td className={'data-table__td'}>
            <div className={'invoice-info__d-key'}>
              {t('invoices:subtotal')}
            </div>
            <div className={'invoice-info__d-key'}>
              {t('invoices:vat')} ({data.tax_rate}%)
            </div>
            <div className={'invoice-info__d-key'}>
              {t('invoices:discounts')}
            </div>
            <div className={'invoice-info__d-key'}>{t('invoices:total')}</div>
          </td>
          <td className={'data-table__td'}>
            <div className={'invoice-info__d-value'}>
              {asMoney(data.subtotal)} {data.currency.code}
            </div>
            <div className={'invoice-info__d-value'}>
              {data.tax_value} {data.currency.code}
            </div>
            <div className={'invoice-info__d-value'}>
              {data.discount_amount} {data.currency.code}
            </div>
            <div className={'invoice-info__d-value'}>
              {asMoney(data.total)} {data.currency.code}
            </div>
          </td>
        </tr>
      </DataTable>
      <p className={'invoice-info__thanks'}>{data.description}</p>
    </Styles>
  )
}

export default InvoiceInfo
