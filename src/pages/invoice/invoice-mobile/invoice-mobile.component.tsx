import { Popconfirm } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  CaretDownIcon,
  ChatIcon,
  DownloadIcon
} from '../../../assets/media/icons'
import Button from '../../../components/buttons/button/button.component'
import IconButton from '../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../components/cards/card/card.component'
import StatusBadge from '../../../components/status-badge/status-badge.component'
import { invoiceStatuses } from '../../../enums/invoice-statuses'
import { Routes } from '../../../enums/routes.enum'
import userTypes from '../../../enums/user-types.enum'
import { useAPIData } from '../../../hoc/api-get'
import { useRemindInvoice } from '../../../hooks/api/invoices/remind-invoice.hook'
import useInvoice from '../../../hooks/api/invoices/useInvoice'
import { useAuth } from '../../../hooks/auth.hook'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import fileManager from '../../../managers/file.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../pipes/as-money.pipe'
import {
  ACTION_CANCEL_INVOICE_REQUEST,
  ACTION_MARK_INVOICE_AS_PAID
} from '../../../store/action-types'
import { InvoiceFullType, InvoiceType } from '../../../types/invoice.type'
import { DATE_RENDER_FORMAT } from '../../../utils/date'
import InvoiceCard from '../../invoices/components/invoice-card/invoice-card.component'
import IconActions from '../components/icon-actions/icon-actions.component'
import {
  Divider,
  HeadActions,
  HeadContent,
  HeaderActions,
  HeadRow,
  Row,
  RowCell,
  RowText,
  RowTextTotal,
  RowTitle,
  Styles,
  TableHeadRow,
  TableRow,
  Title
} from './invoice-mobile.styles'

const PAYMENT_METHODS: Record<string, any> = {
  credit_card: 'Credit Card'
}

type Props = {}

const InvoiceMobile = ({}: Props) => {
  const { t } = useTranslation()
  const { data, refetch, setData } = useAPIData<InvoiceFullType>()
  const { type } = useAuth()
  const dispatch = useDispatch()
  const history = useHistory()
  const [showDetails, setShowDetails] = useState(false)
  const { onSend, isSendLoading } = useInvoice()
  const [, remindClient] = useRemindInvoice()

  const handleSend = async () => {
    await onSend(data.id)
    refetch()
  }

  const remove = () => {
    dispatch({
      type: ACTION_CANCEL_INVOICE_REQUEST,
      payload: {
        id: data.id,
        onSuccess: () => {
          history.push(Routes.FINANCIALS_RECEIVABLES)
        }
      }
    })
  }

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

  const currency = data.currency?.code
  return (
    <MobilePage
      title={t('invoices:invoice-view-title')}
      headerTopComponent={
        <HeaderLink to={Routes.INVOICES}>
          {t('invoices:return-invoices')}
        </HeaderLink>
      }
      actionComponent={
        type === userTypes.CLIENT ? (
          <HeaderActions>
            <IconButton className="invoice__header-btn" to={Routes.CHAT}>
              <ChatIcon />
            </IconButton>
            <IconButton
              className="invoice__header-btn"
              onClick={() => {
                fileManager.downloadUrl(
                  data.pdf?.url || '',
                  `Invoice #${data.invoice_number}.pdf`
                )
              }}
            >
              <DownloadIcon />
            </IconButton>
          </HeaderActions>
        ) : (
          <Button>{t('invoices:mark-paid')}</Button>
        )
      }
    >
      <Styles>
        {type === userTypes.CLIENT && (
          <InvoiceCard showDate showPay showDue asLink={false} {...data} />
        )}

        <Card>
          {type === userTypes.TRAINER && (
            <HeadRow>
              <HeadContent>
                <Title primary className="mb-4">
                  {t('invoices:invoice-number')}
                  {data.invoice_number}
                </Title>

                <Title className="mb-4">
                  {data.total}
                  {data.currency?.code}
                </Title>

                <RowCell className="mb-4">
                  <RowTitle>{t('invoices:issued-on')}</RowTitle>
                  <RowText>
                    {moment(data.created_at).format(DATE_RENDER_FORMAT)}
                  </RowText>
                </RowCell>

                <RowCell className="mb-4">
                  <RowTitle>{t('invoices:due-on')}</RowTitle>
                  <RowText primary>
                    {moment(data.due_on).format(DATE_RENDER_FORMAT)}
                  </RowText>
                </RowCell>
              </HeadContent>

              <HeadActions>
                <StatusBadge status={data.status} className="invoice__btn">
                  {t(`invoices:statuses.${data.status}`)}
                </StatusBadge>

                {data.status === invoiceStatuses.PAID ? null : data.status ===
                  invoiceStatuses.DRAFT ? (
                  <Button
                    className="invoice__send-btn"
                    onClick={handleSend}
                    disabled={isSendLoading}
                    size="sm"
                  >
                    {t('invoices:send-invoice')}
                  </Button>
                ) : (
                  <Popconfirm
                    title="Invoice will be marked as paid"
                    onConfirm={() => markAsPaid(data.id)}
                  >
                    <Button className="invoice__send-btn" size="sm">
                      {t('invoices:mark-paid')}
                    </Button>
                  </Popconfirm>
                )}

                <IconActions
                  {...data}
                  onRemove={remove}
                  onRemind={remindClient}
                />
              </HeadActions>
            </HeadRow>
          )}

          <Row
            className="invoice__toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            <RowText className="invoice__toggle-text">
              {showDetails ? 'Hide' : 'Show'} Invoice Details
            </RowText>
            <CaretDownIcon />
          </Row>

          {showDetails && (
            <div className="mb-6">
              <Row className="mb-6">
                <RowCell>
                  <RowTitle className="invoice__issued-title">
                    Issued By:
                  </RowTitle>
                  <RowText className="invoice__issued-text">
                    {data.invoice_from?.user?.first_name}{' '}
                    {data.invoice_from?.user?.last_name}
                  </RowText>
                  <RowTitle>
                    {data.invoice_from?.address?.address || '-'}
                  </RowTitle>
                  <RowTitle>
                    {data.invoice_from?.address?.country?.name_english || '-'}
                  </RowTitle>
                </RowCell>
              </Row>

              <Row className="mb-6">
                <RowCell>
                  <RowTitle className="invoice__issued-title">
                    Issued To:
                  </RowTitle>
                  <RowText className="invoice__issued-text">
                    {data.invoice_to?.user?.first_name}{' '}
                    {data.invoice_to?.user?.last_name}
                  </RowText>
                  <RowTitle>
                    {data.invoice_to?.address?.address || '-'}
                  </RowTitle>
                  <RowTitle>
                    {data.invoice_to?.address?.country?.name_english || '-'}
                  </RowTitle>
                </RowCell>
              </Row>

              <Divider />
            </div>
          )}

          <Row className="mb-6">
            <RowCell>
              <RowTitle>Default Payment Method</RowTitle>
              <RowText>
                {PAYMENT_METHODS[data.payment_method] ||
                  data.payment_method ||
                  '-'}
              </RowText>
            </RowCell>
          </Row>
          <Row className="mb-6">
            <RowCell>
              <RowTitle>Currency</RowTitle>
              <RowText>{currency || '-'}</RowText>
            </RowCell>

            <RowCell right>
              <RowTitle>Session Expiry</RowTitle>
              <RowText>-</RowText>
            </RowCell>
          </Row>

          <TableHeadRow>
            <RowText white>Item</RowText>
            <RowText white>Cost</RowText>
          </TableHeadRow>

          {data.items.map((item, index) => (
            <TableRow key={index}>
              <Row className="mb-4">
                <RowCell>
                  <RowText>{item.name}</RowText>
                  <RowTitle>{item.type}</RowTitle>
                </RowCell>

                <RowCell right>
                  <RowText>
                    {asMoney(item.total)} {data.currency?.code}
                  </RowText>
                </RowCell>
              </Row>
              <Row className="mb-6">
                <RowCell>
                  <RowTitle>
                    {item.quantity} x {item.unit_price} {currency}
                  </RowTitle>
                </RowCell>
                <RowCell>
                  <RowTitle>
                    ({item.tax_value} {currency} VAT)
                  </RowTitle>
                </RowCell>
              </Row>

              <Divider />
            </TableRow>
          ))}

          <TableRow className="mb-6">
            <Row className="mb-4">
              <RowTitle>Subtotal:</RowTitle>
              <RowText>
                {data.subtotal} {currency}
              </RowText>
            </Row>
            <Row className="mb-4">
              <RowTitle>VAT({data.tax_rate}%)</RowTitle>
              <RowText>
                {data.tax_value} {currency}
              </RowText>
            </Row>
            <Row className="mb-4">
              <RowTitle>Discounts:</RowTitle>
              <RowText>
                {data.discount_amount} {currency}
              </RowText>
            </Row>
            <Divider />
          </TableRow>

          <Row>
            <RowText semibold>Total Payable</RowText>
            <RowTextTotal>
              {data.total} {currency}
            </RowTextTotal>
          </Row>
        </Card>
      </Styles>
    </MobilePage>
  )
}

export default InvoiceMobile
