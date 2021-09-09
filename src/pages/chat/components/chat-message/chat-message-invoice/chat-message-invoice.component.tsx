import React, { FC } from 'react'

import { ChatMessageInvoiceMetaType } from '../../../../../modules/chat/types/chat-message-invoice-meta.type'
import { payments } from '../../../../../pipes/payments.pipe'
import Styles from './chat-message-invoice.styles'

type Props = ChatMessageInvoiceMetaType & {
  me: boolean
}
const ChatMessageInvoice: FC<Props> = ({
  total,
  invoice_id,
  currency,
  status,
  me
}) => {
  return (
    <Styles className={'cm-invoice'}>
      <div className={'cm-invoice__left'}>
        <div className={'cm-invoice__id'}>Invoice #{invoice_id || '21'}</div>
        <div className={'cm-invoice__name'}>From Van Diesel</div>
        <div className={'cm-invoice__total'}>
          {/*{total} {currency}*/}
          <span className={'cm-invoice__amount'}>{total || '720'} </span>
          <span className={'cm-invoice__currency'}>{currency || 'AED'}</span>
        </div>
      </div>
      <div className={'cm-invoice__right'}>
        <div className={'cm-invoice__status'}>{status || 'Due Soon'}</div>
        {me ? null : (
          <a href={payments(`/21`)} className={'cm-invoice__cta'}>
            Settle Now
          </a>
        )}
      </div>
    </Styles>
  )
}

export default ChatMessageInvoice
