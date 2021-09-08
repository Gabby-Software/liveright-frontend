import React, { useState } from 'react'

import {
  CaretDownIcon,
  ChatIcon,
  DownloadIcon
} from '../../../assets/media/icons'
import IconButton from '../../../components/buttons/icon-button/icon-button.component'
import Card from '../../../components/cards/card/card.component'
import { Routes } from '../../../enums/routes.enum'
import { useAPIData } from '../../../hoc/api-get'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import fileManager from '../../../managers/file.manager'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../pipes/as-money.pipe'
import { InvoiceFullType } from '../../../types/invoice.type'
import InvoiceCard from '../../invoices/components/invoice-card/invoice-card.component'
import {
  Divider,
  HeaderActions,
  Row,
  RowCell,
  RowText,
  RowTextTotal,
  RowTitle,
  Styles,
  TableHeadRow,
  TableRow
} from './invoice-mobile.styles'

const PAYMENT_METHODS: Record<string, any> = {
  credit_card: 'Credit Card'
}

type Props = {}

const InvoiceMobile = ({}: Props) => {
  const { t } = useTranslation()
  const { data } = useAPIData<InvoiceFullType>()
  const [showDetails, setShowDetails] = useState(false)

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
      }
    >
      <Styles>
        <InvoiceCard showDate showPay showDue asLink={false} {...data} />

        <Card>
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
