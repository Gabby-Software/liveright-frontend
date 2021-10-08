import { Popconfirm, Skeleton } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import Button from '../../../components/buttons/button/button.component'
import DataTable from '../../../components/data-table/data-table.component'
import { useMobileBack } from '../../../components/mobile-back/mobile-back.component'
import StatusBadge from '../../../components/status-badge/status-badge.component'
import { invoiceStatuses } from '../../../enums/invoice-statuses'
import { paymentMethods } from '../../../enums/payment-method.enum'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import useInvoice from '../../../hooks/api/invoices/useInvoice'
import { useAuth } from '../../../hooks/auth.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { usePusher } from '../../../modules/notifications/hooks/pusher.hook'
import { addressLine } from '../../../pipes/address-line.pipe'
import { asMoney } from '../../../pipes/as-money.pipe'
import { date } from '../../../pipes/date.pipe'
import { payments } from '../../../pipes/payments.pipe'
import IconActions from '../components/icon-actions/icon-actions.component'
import Styles from './invoice-desktop.styles'

const labels = [
  'invoices:item',
  'invoices:quantity',
  'invoices:price',
  'invoices:discount',
  'invoices:vat',
  'invoices:item-total'
]
const keys = ['item', 'qty', 'price', 'discount', 'vat', 'subtotal']

export default function InvoiceDesktop() {
  const params = useParams<any>()
  const { t } = useTranslation()
  const { type } = useAuth()
  const history = useHistory()

  const {
    onSend,
    onCancel,
    onMarkPaid,
    onRemind,
    isSendLoading,
    invoice,
    isInvoiceLoading
  } = useInvoice({
    id: params.id
  })

  useMobileBack(
    type === userTypes.CLIENT ? Routes.INVOICES : Routes.FINANCIALS_RECEIVABLES,
    'invoices'
  )

  usePusher(`invoice.${params.id}.pdf-generated`, `event.invoice`, () => {}, [
    params.id
  ])

  if (isInvoiceLoading) {
    return <Skeleton />
  }

  return (
    <Styles>
      <div className="invoice__header-container">
        <div className="invoice__header-info">
          <h2 className="invoice__title">Invoice #{invoice.invoice_number}</h2>

          <div className="invoice__row">
            <div className="invoice__row-item">
              <div className="invoice-text-item">
                <p className="invoice-text-item__name">
                  {t('invoices:issued-by')}
                </p>
                <p className="invoice-text-item__value">
                  {invoice.invoice_from.user.first_name}{' '}
                  {invoice.invoice_from.user.last_name}
                </p>
                <p className="invoice-text-item__sub">
                  {addressLine(invoice.invoice_from.address)}
                </p>
              </div>
            </div>
            <div className="invoice__row-item">
              <div className="invoice-text-item">
                <p className="invoice-text-item__name">
                  {t('invoices:issued-to')}
                </p>
                <p className="invoice-text-item__value">
                  {invoice.invoice_to.user.first_name}{' '}
                  {invoice.invoice_to.user.last_name}
                </p>
                <p className="invoice-text-item__sub">
                  {addressLine(invoice.invoice_to.address)}
                </p>
              </div>
            </div>
            <div className="invoice__row-item" />
          </div>
        </div>

        <div className="invoice__header-actions">
          <StatusBadge
            status={invoice.status.toLowerCase()}
            className="invoice__header-badge"
          >
            {t(`invoices:statuses.${invoice.status}`)}
          </StatusBadge>

          {invoice.status === invoiceStatuses.PAID ? null : type ===
            userTypes.CLIENT ? (
            invoice.payment_method === paymentMethods.CREDIT_CARD && (
              <a href={payments(`${Routes.INVOICES}/${invoice.id}/pay`)}>
                <Button className="invoice__send-btn">
                  {t('invoices:pay')}
                </Button>
              </a>
            )
          ) : invoice.status === invoiceStatuses.DRAFT ? (
            <Button
              className="invoice__send-btn"
              onClick={() => onSend(invoice.id)}
              disabled={isSendLoading}
            >
              {t('invoices:send-invoice')}
            </Button>
          ) : (
            <Popconfirm
              title="Invoice will be marked as paid"
              onConfirm={() => onMarkPaid(invoice.id)}
            >
              <Button className="invoice__send-btn">
                {t('invoices:mark-paid')}
              </Button>
            </Popconfirm>
          )}

          <IconActions
            {...invoice}
            onRemind={() => onRemind(invoice.invoice_to.uuid, invoice)}
            onRemove={() =>
              onCancel(invoice.id, () =>
                history.push(Routes.FINANCIALS_RECEIVABLES)
              )
            }
          />
        </div>
      </div>

      <div className="invoice-divider" />

      <div className="invoice__row invoice__row_col-4">
        <div className="invoice__row-item">
          <p className="invoice-text-item__name">{t('invoices:issued-on')}</p>
          <p className="invoice-text-item__value">{date(invoice.created_at)}</p>
        </div>
        <div className="invoice__row-item">
          <p className="invoice-text-item__name">{t('invoices:invoice-due')}</p>
          <p className="invoice-text-item__value">{date(invoice.due_on)}</p>
        </div>
        <div className="invoice__row-item">
          <p className="invoice-text-item__name">{t('invoices:currency')}</p>
          <p className="invoice-text-item__value">{invoice.currency.name}</p>
        </div>
      </div>

      <div className="invoice__table-container">
        <DataTable
          labels={labels}
          data={invoice.items}
          keys={keys}
          className="invoice__table"
          render={{
            item: ({ type, name }) => (
              <div className={'invoice-info__item'}>
                <div className={'invoice-info__type'}>{type}</div>
                <div className={'invoice-info__desc'}>{name}</div>
              </div>
            ),
            qty: ({ quantity }) => `${quantity}x`,
            price: ({ unit_price }) => `${unit_price} ${invoice.currency.code}`,
            discount: ({ discount_amount }) =>
              `${discount_amount} ${invoice.currency.code}`,
            vat: ({ tax_value }) => `${tax_value} ${invoice.currency.code}`,
            subtotal: ({ total }) =>
              `${asMoney(total)} ${invoice.currency.code}`
          }}
        />
      </div>

      <div className="invoice__header-container">
        <div className="invoice__header-info">
          <div className="invoice__row">
            <div className="invoice__row-item">
              <p className="invoice-text-item__name">
                {t('invoices:default-payment-method')}
              </p>
              <p className="invoice-text-item__value">
                {t(`invoices:${invoice.payment_method}`)}
              </p>
            </div>
            <div className="invoice__row-item" />
          </div>
        </div>

        <div className="invoice__header-actions">
          <div className="invoice-info-row">
            <p className="invoice-text-item__name">{t('invoices:subtotal')}:</p>
            <p className="invoice-text-item__value">
              {asMoney(invoice.subtotal)} {invoice.currency.code}
            </p>
          </div>
          <div className="invoice-info-row">
            <p className="invoice-text-item__name">
              {t('invoices:vat')} ({invoice.tax_rate}%):
            </p>
            <p className="invoice-text-item__value">
              {invoice.tax_value} {invoice.currency.code}
            </p>
          </div>
          <div className="invoice-info-row">
            <p className="invoice-text-item__name">
              {t('invoices:discounts')}:
            </p>
            <p className="invoice-text-item__value">
              {invoice.discount_amount} {invoice.currency.code}
            </p>
          </div>

          <div className="invoice-divider" />

          <div className="invoice-info-row">
            <p className="invoice-text-item__name invoice-text-item__name_dark">
              {t('invoices:total')}:
            </p>
            <p className="invoice-text-item__value invoice-text-item__value_red">
              {asMoney(invoice.total)} {invoice.currency.code}
            </p>
          </div>
        </div>
      </div>

      <div className="invoice__footer">
        <p className="invoice__footer-text">
          <span>{t('invoices:footer-note')}: </span>
          {invoice.description}
        </p>
      </div>
    </Styles>
  )
}
