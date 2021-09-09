import { Popconfirm } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  ChatIcon,
  DeleteOutlinedIcon,
  OptionsHorizontalIcon,
  PrinterIcon
} from '../../../../assets/media/icons'
import { ReactComponent as DownloadIcon } from '../../../../assets/media/icons/download.svg'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DataTable from '../../../../components/data-table/data-table.component'
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem
} from '../../../../components/dropdown'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAPIData } from '../../../../hoc/api-get'
import { useRemindInvoice } from '../../../../hooks/api/invoices/remind-invoice.hook'
import useInvoice from '../../../../hooks/api/invoices/useInvoice'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { addressLine } from '../../../../pipes/address-line.pipe'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { date } from '../../../../pipes/date.pipe'
import {
  ACTION_CANCEL_INVOICE_REQUEST,
  ACTION_MARK_INVOICE_AS_PAID
} from '../../../../store/action-types'
import { InvoiceFullType, InvoiceType } from '../../../../types/invoice.type'
import Styles from './invoice-attendees.styles'

const labels = [
  'invoices:item',
  'invoices:quantity',
  'invoices:price',
  'invoices:discount',
  'invoices:vat',
  'invoices:item-total'
]
const keys = ['item', 'qty', 'price', 'discount', 'vat', 'subtotal']

const InvoiceAttendees = () => {
  const { t } = useTranslation()
  const { data, refetch, setData } = useAPIData<InvoiceFullType>()
  const { type } = useAuth()
  const dispatch = useDispatch()
  const history = useHistory()
  const { onSend, isSendLoading } = useInvoice()
  const [remindDisabled, remindClient] = useRemindInvoice()

  const markAsPaid = (id: number) => {
    dispatch({
      type: ACTION_MARK_INVOICE_AS_PAID,
      payload: {
        id,
        page: 1,
        include: 'invoiceTo',
        onSuccess: (invoice: InvoiceType) => setData({ ...data, ...invoice })
      }
    })
  }

  const remove = () => {
    dispatch({
      type: ACTION_CANCEL_INVOICE_REQUEST,
      payload: {
        id: data.id,
        onSuccess: () => {
          history.push(
            type === userTypes.CLIENT
              ? Routes.INVOICES
              : Routes.FINANCIALS_RECEIVABLES
          )
        }
      }
    })
  }

  const handleSend = async () => {
    await onSend(data.id)
    refetch()
  }

  return (
    <Styles>
      <div className="invoice__header-container">
        <div className="invoice__header-info">
          <h2 className="invoice__title">Invoice #{data.invoice_number}</h2>

          <div className="invoice__row">
            <div className="invoice__row-item">
              <div className="invoice-text-item">
                <p className="invoice-text-item__name">
                  {t('invoices:issued-by')}
                </p>
                <p className="invoice-text-item__value">
                  {data.invoice_from.user.first_name}{' '}
                  {data.invoice_from.user.last_name}
                </p>
                <p className="invoice-text-item__sub">
                  {addressLine(data.invoice_from.address)}
                </p>
              </div>
            </div>
            <div className="invoice__row-item">
              <div className="invoice-text-item">
                <p className="invoice-text-item__name">
                  {t('invoices:issued-to')}
                </p>
                <p className="invoice-text-item__value">
                  {data.invoice_to.user.first_name}{' '}
                  {data.invoice_to.user.last_name}
                </p>
                <p className="invoice-text-item__sub">
                  {addressLine(data.invoice_to.address)}
                </p>
              </div>
            </div>
            <div className="invoice__row-item" />
          </div>
        </div>

        <div className="invoice__header-actions">
          <StatusBadge
            status={data.status.toLowerCase()}
            className="invoice__header-badge"
          >
            {t(`invoices:statuses.${data.status}`)}
          </StatusBadge>

          {data.status === invoiceStatuses.PAID ? null : type ===
            userTypes.CLIENT ? (
            <Button className="invoice__send-btn">{t('invoices:pay')}</Button>
          ) : data.status === invoiceStatuses.DRAFT ? (
            <Button
              className="invoice__send-btn"
              onClick={handleSend}
              disabled={isSendLoading}
            >
              {t('invoices:send-invoice')}
            </Button>
          ) : (
            <Popconfirm
              title="Invoice will be marked as paid"
              onConfirm={() => markAsPaid(data.id)}
            >
              <Button className="invoice__send-btn">
                {t('invoices:mark-paid')}
              </Button>
            </Popconfirm>
          )}

          <div className="invoice__header-links">
            <IconButton size="sm" onClick={window.print}>
              <PrinterIcon />
            </IconButton>
            <a
              href={data.pdf?.url}
              target="_blank"
              download={`invoice-${data.invoice_number}.pdf`}
              rel="noreferrer"
            >
              <IconButton size="sm" disabled={!data.pdf}>
                <DownloadIcon />
              </IconButton>
            </a>

            <IconButton
              size="sm"
              disabled={remindDisabled}
              onClick={() => {
                remindClient(data.invoice_to.uuid, {
                  invoice_id: '' + data.id,
                  total: data.total,
                  currency: data.currency.code,
                  status: data.status,
                  name: `${data.invoice_to.user.first_name} ${data.invoice_to.user.last_name}`
                })
              }}
            >
              <ChatIcon />
            </IconButton>

            {data.status !== invoiceStatuses.PAID && (
              <Dropdown
                overlay={
                  <DropdownMenu>
                    <DropdownMenuItem $error onClick={remove}>
                      <DeleteOutlinedIcon />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenu>
                }
                trigger={['click']}
              >
                <IconButton size="sm">
                  <OptionsHorizontalIcon />
                </IconButton>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      <div className="invoice-divider" />

      <div className="invoice__row invoice__row_col-4">
        <div className="invoice__row-item">
          <p className="invoice-text-item__name">{t('invoices:issued-on')}</p>
          <p className="invoice-text-item__value">{date(data.created_at)}</p>
        </div>
        <div className="invoice__row-item">
          <p className="invoice-text-item__name">{t('invoices:invoice-due')}</p>
          <p className="invoice-text-item__value">{date(data.due_on)}</p>
        </div>
        <div className="invoice__row-item">
          <p className="invoice-text-item__name">{t('invoices:currency')}</p>
          <p className="invoice-text-item__value">{data.currency.name}</p>
        </div>
      </div>

      <div className="invoice__table-container">
        <DataTable
          labels={labels}
          data={data.items}
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
            price: ({ unit_price }) => `${unit_price} ${data.currency.code}`,
            discount: ({ discount_amount }) =>
              `${discount_amount} ${data.currency.code}`,
            vat: ({ tax_value }) => `${tax_value} ${data.currency.code}`,
            subtotal: ({ total }) => `${asMoney(total)} ${data.currency.code}`
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
                {t(`invoices:${data.payment_method}`)}
              </p>
            </div>
            <div className="invoice__row-item" />
          </div>
        </div>

        <div className="invoice__header-actions">
          <div className="invoice-info-row">
            <p className="invoice-text-item__name">{t('invoices:subtotal')}:</p>
            <p className="invoice-text-item__value">
              {asMoney(data.subtotal)} {data.currency.code}
            </p>
          </div>
          <div className="invoice-info-row">
            <p className="invoice-text-item__name">
              {t('invoices:vat')} ({data.tax_rate}%):
            </p>
            <p className="invoice-text-item__value">
              {data.tax_value} {data.currency.code}
            </p>
          </div>
          <div className="invoice-info-row">
            <p className="invoice-text-item__name">
              {t('invoices:discounts')}:
            </p>
            <p className="invoice-text-item__value">
              {data.discount_amount} {data.currency.code}
            </p>
          </div>

          <div className="invoice-divider" />

          <div className="invoice-info-row">
            <p className="invoice-text-item__name invoice-text-item__name_dark">
              {t('invoices:total')}:
            </p>
            <p className="invoice-text-item__value invoice-text-item__value_red">
              {asMoney(data.total)} {data.currency.code}
            </p>
          </div>
        </div>
      </div>

      <div className="invoice__footer">
        <p className="invoice__footer-text">
          <span>{t('invoices:footer-note')}: </span>
          {t('invoices:footer-text')}
        </p>
      </div>
    </Styles>
  )
}

export default React.memo(InvoiceAttendees)
