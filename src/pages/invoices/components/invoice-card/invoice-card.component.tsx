import React, { useMemo } from 'react'

import Button from '../../../../components/buttons/button/button.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { payments } from '../../../../pipes/payments.pipe'
import { InvoiceType } from '../../../../types/invoice.type'
import { LinkStyles, Styles } from './invoice-card.styles'

const InvoiceCard = ({
  invoice_from,
  invoice_to,
  status,
  total,
  currency,
  id
}: InvoiceType) => {
  const { t } = useTranslation()
  const { type } = useAuth()

  const name = useMemo(() => {
    const user = (type === userTypes.CLIENT ? invoice_from : invoice_to)?.user
    return user ? `${user.first_name} ${user.last_name}` : ''
  }, [type])

  return (
    <LinkStyles to={Routes.INVOICES + '/' + id}>
      <Styles>
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

          <StatusBadge status={status} className="invoice-card__btn">
            {t(`invoices:statuses.${status}`)}
          </StatusBadge>
        </div>

        <div className="invoice-card__row">
          <h2 className={'invoice-card__price'}>
            {total}
            <span> {currency.code}</span>
          </h2>

          {type === userTypes.CLIENT ? (
            <a
              href={payments(Routes.INVOICES + '/' + id)}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="secondary"
                size="sm"
                className="invoice-card__btn"
              >
                {t('invoices:settle-now')}
              </Button>
            </a>
          ) : (
            <Button variant="secondary" size="sm" className="invoice-card__btn">
              {t('invoices:remind-client')}
            </Button>
          )}
        </div>
      </Styles>
    </LinkStyles>
  )
}

export default InvoiceCard
