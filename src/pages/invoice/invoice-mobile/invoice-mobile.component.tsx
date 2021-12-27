import { Popconfirm, Skeleton } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useParams } from 'react-router'
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
import useInvoice from '../../../hooks/api/invoices/useInvoice'
import { useAuth } from '../../../hooks/auth.hook'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import fileManager from '../../../managers/file.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { usePusher } from '../../../modules/notifications/hooks/pusher.hook'
import { asMoney } from '../../../pipes/as-money.pipe'
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

export default function InvoiceMobile({}: Props) {
  const params = useParams<any>()
  const { t } = useTranslation()
  const { type } = useAuth()
  const history = useHistory()
  const [showDetails, setShowDetails] = useState(false)

  usePusher(
    `invoice.${params.clientId}.pdf-generated`,
    `event.invoice`,
    () => {},
    [params.clientId]
  )

  const {
    onSend,
    onCancel,
    onMarkPaid,
    onRemind,
    isSendLoading,
    invoice,
    isInvoiceLoading
  } = useInvoice({
    id: params.clientId
  })

  const currency = invoice.currency?.code
  return (
    <MobilePage
      title={t('invoices:invoice-view-title')}
      headerTopComponent={
        <HeaderLink
          to={
            type === userTypes.CLIENT
              ? Routes.INVOICES
              : Routes.FINANCIALS_RECEIVABLES
          }
        >
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
                  invoice.pdf?.url || '',
                  `Invoice #${invoice.invoice_number}.pdf`
                )
              }}
            >
              <DownloadIcon />
            </IconButton>
          </HeaderActions>
        ) : invoice.id ? (
          invoice.status !== invoiceStatuses.PAID ? (
            invoice.status === invoiceStatuses.DRAFT ? (
              <Button onClick={() => onSend(invoice.id)}>
                {t('invoices:send-invoice')}
              </Button>
            ) : (
              <Button onClick={() => onMarkPaid(invoice.id)}>
                {t('invoices:mark-paid')}
              </Button>
            )
          ) : null
        ) : null
      }
    >
      {isInvoiceLoading ? (
        <Skeleton />
      ) : (
        <Styles>
          {type === userTypes.CLIENT && (
            <InvoiceCard showDate showPay showDue asLink={false} {...invoice} />
          )}

          <Card>
            {type === userTypes.TRAINER && (
              <HeadRow>
                <HeadContent>
                  <Title primary className="mb-4">
                    {t('invoices:invoice-number')}
                    {invoice.invoice_number}
                  </Title>

                  <Title className="mb-4">
                    {invoice.total} {invoice.currency?.code}
                  </Title>

                  <RowCell className="mb-4">
                    <RowTitle>{t('invoices:issued-on')}</RowTitle>
                    <RowText>
                      {moment(invoice.created_at).format(DATE_RENDER_FORMAT)}
                    </RowText>
                  </RowCell>

                  <RowCell className="mb-4">
                    <RowTitle>{t('invoices:due-on')}</RowTitle>
                    <RowText primary>
                      {moment(invoice.due_on).format(DATE_RENDER_FORMAT)}
                    </RowText>
                  </RowCell>
                </HeadContent>

                <HeadActions>
                  <StatusBadge status={invoice.status} className="invoice__btn">
                    {t(`invoices:statuses.${invoice.status}`)}
                  </StatusBadge>

                  {invoice.status ===
                  invoiceStatuses.PAID ? null : invoice.status ===
                    invoiceStatuses.DRAFT ? (
                    <Button
                      className="invoice__send-btn"
                      onClick={() => onSend(invoice.id)}
                      disabled={isSendLoading}
                      size="sm"
                    >
                      {t('invoices:send-invoice')}
                    </Button>
                  ) : (
                    <Popconfirm
                      title="Invoice will be marked as paid"
                      onConfirm={() => onMarkPaid(invoice.id)}
                    >
                      <Button className="invoice__send-btn" size="sm">
                        {t('invoices:mark-paid')}
                      </Button>
                    </Popconfirm>
                  )}

                  <IconActions
                    {...invoice}
                    onRemove={() =>
                      onCancel(invoice.id, () =>
                        history.push(Routes.FINANCIALS_RECEIVABLES)
                      )
                    }
                    onRemind={() => onRemind(invoice.invoice_to.uuid, invoice)}
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
                      {invoice.invoice_from?.user?.first_name}{' '}
                      {invoice.invoice_from?.user?.last_name}
                    </RowText>
                    <RowTitle>
                      {invoice.invoice_from?.address?.address || '-'}
                    </RowTitle>
                    <RowTitle>
                      {invoice.invoice_from?.address?.country?.name_english ||
                        '-'}
                    </RowTitle>
                  </RowCell>
                </Row>

                <Row className="mb-6">
                  <RowCell>
                    <RowTitle className="invoice__issued-title">
                      Issued To:
                    </RowTitle>
                    <RowText className="invoice__issued-text">
                      {invoice.invoice_to?.user?.first_name}{' '}
                      {invoice.invoice_to?.user?.last_name}
                    </RowText>
                    <RowTitle>
                      {invoice.invoice_to?.address?.address || '-'}
                    </RowTitle>
                    <RowTitle>
                      {invoice.invoice_to?.address?.country?.name_english ||
                        '-'}
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
                  {PAYMENT_METHODS[invoice.payment_method] ||
                    invoice.payment_method ||
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

            {invoice.items.map((item, index) => (
              <TableRow key={index}>
                <Row className="mb-4">
                  <RowCell>
                    <RowText>{item.type}</RowText>
                    <RowTitle>{item.name}</RowTitle>
                  </RowCell>

                  <RowCell right>
                    <RowText>
                      {asMoney(item.total)} {invoice.currency?.code}
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
                  {invoice.subtotal} {currency}
                </RowText>
              </Row>
              <Row className="mb-4">
                <RowTitle>VAT({invoice.tax_rate}%)</RowTitle>
                <RowText>
                  {invoice.tax_value} {currency}
                </RowText>
              </Row>
              <Row className="mb-4">
                <RowTitle>Discounts:</RowTitle>
                <RowText>
                  {invoice.discount_amount} {currency}
                </RowText>
              </Row>
              <Divider />
            </TableRow>

            <Row>
              <RowText semibold>Total Payable</RowText>
              <RowTextTotal>
                {invoice.total} {currency}
              </RowTextTotal>
            </Row>
          </Card>
        </Styles>
      )}
    </MobilePage>
  )
}
