import React, { useMemo } from 'react'

import { InvoiceIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { payments } from '../../../../pipes/payments.pipe'
import { InvoiceType } from '../../../../types/invoice.type'
import { LinkStyles, Styles } from './invoice-card.styles'

interface InvoiceCardProps {
  mobileColumn?: boolean
  showMark?: boolean
  showLink?: boolean
  onMark?: any
}

const InvoiceCard = ({
  invoice_from,
  invoice_to,
  status,
  total,
  currency,
  id,
  showMark,
  showLink,
  mobileColumn,
  onMark
}: InvoiceCardProps & InvoiceType) => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const isMobile = useIsMobile()

  const name = useMemo(() => {
    const user = (type === userTypes.CLIENT ? invoice_from : invoice_to)?.user
    return user ? `${user.first_name} ${user.last_name}` : ''
  }, [type])

  const statusBtn = (
    <StatusBadge status={status} className="invoice-card__btn">
      {t(`invoices:statuses.${status}`)}
    </StatusBadge>
  )

  const actionBtn = (
    <>
      {type === userTypes.CLIENT ? (
        status !== invoiceStatuses.PAID ? (
          <a
            href={payments(Routes.INVOICES + '/' + id)}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="secondary" size="sm" className="invoice-card__btn">
              {t('invoices:settle-now')}
            </Button>
          </a>
        ) : null
      ) : showMark && status !== invoiceStatuses.PAID ? (
        <Button
          variant="secondary"
          size="sm"
          className="invoice-card__btn"
          onClick={() => onMark(id)}
        >
          {t('invoices:mark-paid')}
        </Button>
      ) : showLink && status === invoiceStatuses.PAID ? (
        <Button
          variant="text"
          size="sm"
          className="invoice-card__btn-text"
          to={Routes.INVOICES + '/' + id}
        >
          <InvoiceIcon />
          {t('invoices:open-invoice')}
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="invoice-card__btn"
          onClick={(e: any) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {t('invoices:remind-client')}
        </Button>
      )}
    </>
  )

  const content = (
    <Styles
      $mobCol={mobileColumn}
      className={mobileColumn ? 'invoice-card_mob-col' : ''}
    >
      <div className="invoice-card__row">
        <div>
          <h3 className={'invoice-card__number'}>
            {t('invoices:number', { number: id })}
          </h3>

          <p className={'invoice-card__issuer'}>
            {type === userTypes.CLIENT
              ? t('invoices:from', { name })
              : t('invoices:to', { name })}
          </p>
        </div>

        {mobileColumn ? !isMobile && statusBtn : statusBtn}
      </div>

      <div className="invoice-card__row">
        <h2 className={'invoice-card__price'}>
          {total}
          <span> {currency.code}</span>
        </h2>

        {mobileColumn ? !isMobile && actionBtn : actionBtn}
      </div>

      {isMobile && mobileColumn && (
        <div className="invoice-card__row">
          {statusBtn}
          {actionBtn}
        </div>
      )}
    </Styles>
  )

  if (showLink) {
    return content
  }

  return (
    <LinkStyles $mobCol={mobileColumn} to={Routes.INVOICES + '/' + id}>
      {content}
    </LinkStyles>
  )
}

export default InvoiceCard
