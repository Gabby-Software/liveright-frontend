import React, { FC } from 'react'

import Button from '../../../../../components/buttons/button/button.component'
import StatusBadge from '../../../../../components/status-badge/status-badge.component'
import { Routes } from '../../../../../enums/routes.enum'
import { ChatMessageInvoiceMetaType } from '../../../../../modules/chat/types/chat-message-invoice-meta.type'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { payments } from '../../../../../pipes/payments.pipe'
import Styles from './chat-message-invoice.styles'

type Props = ChatMessageInvoiceMetaType & {
  me: boolean
}
const ChatMessageInvoice: FC<Props> = ({
  total,
  invoice_id,
  invoice_number,
  currency,
  status,
  name,
  me
}) => {
  const { t } = useTranslation()
  return (
    <Styles to={Routes.INVOICES + `/${invoice_id}`} className={'cm-invoice'}>
      <div className={'cm-invoice__left'}>
        <div className={'cm-invoice__id'}>Invoice #{invoice_number || '-'}</div>
        <div className={'cm-invoice__name'}>{name}</div>
        <div className={'cm-invoice__total'}>
          <span className={'cm-invoice__amount'}>{total} </span>
          <span className={'cm-invoice__currency'}>{currency}</span>
        </div>
      </div>
      <div className={'cm-invoice__right'}>
        <StatusBadge status={status} className="cm-invoice__badge">
          {t(`invoices:statuses.${status}`)}
        </StatusBadge>

        {!me ? null : (
          <a href={payments(`/${invoice_id}`)} target="_blank" rel="noreferrer">
            <Button size="sm" className={'cm-invoice__cta'}>
              Settle Now
            </Button>
          </a>
        )}
      </div>
    </Styles>
  )
}

export default ChatMessageInvoice
