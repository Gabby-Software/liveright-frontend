import React, { useMemo } from 'react'

import FormButton from '../../../../../../components/forms/form-button/form-button.component'
import { Routes } from '../../../../../../enums/routes.enum'
import userTypes from '../../../../../../enums/user-types.enum'
import { useAuth } from '../../../../../../hooks/auth.hook'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { capitalize } from '../../../../../../pipes/capitalize.pipe'
import { classes } from '../../../../../../pipes/classes.pipe'
import { InvoiceType } from '../../../../../../types/invoice.type'
import Styles from './receivables-attention-item.styles'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = {}
const ReceivablesAttentionItem = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invoice_number,
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
  }, [])
  return (
    <Styles to={Routes.INVOICES + '/' + id}>
      <div className={'invoice-card__left'}>
        <h3 className={'invoice-card__number'}>
          {t('invoices:number', { number: id })}
        </h3>
        <p className={'invoice-card__issuer'}>
          {type === userTypes.CLIENT
            ? t('invoices:from', { name })
            : t('invoices:to', { name })}
        </p>
        <h2 className={'invoice-card__price desktop'}>
          {total} {currency.code}
        </h2>
      </div>
      <div className={'invoice-card__right'}>
        <FormButton
          type={'primary'}
          className={classes('invoice-card__status', `invoice-card__${status}`)}
        >
          {capitalize(status)}
        </FormButton>
        <h2 className={'invoice-card__price mobile'}>
          {total} {currency.code}
        </h2>
        {
          <FormButton type={'ghost'} className={'invoice-card__action'}>
            {t('invoices:remind-client')}
          </FormButton>
        }
      </div>
    </Styles>
  )
}

export default ReceivablesAttentionItem
