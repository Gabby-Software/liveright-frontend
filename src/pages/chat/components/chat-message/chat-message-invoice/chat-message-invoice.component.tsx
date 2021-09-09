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
        <div className={'cm-invoice__id'}>Invoice #{invoice_id}</div>
        <div className={'cm-invoice__name'}>From Van Diesel</div>
        <div className={'cm-invoice__total'}>
          {/*{total} {currency}*/}
          <span className={'cm-invoice__amount'}>{total} </span>
          <span className={'cm-invoice__currency'}>{currency}</span>
        </div>
      </div>
      <div className={'cm-invoice__right'}>
        <div className={'cm-invoice__status'}>{status}</div>
        {me ? null : (
          <a href={payments(`/${invoice_id}`)} className={'cm-invoice__cta'}>
            Settle Now
          </a>
        )}
      </div>
    </Styles>
  )
}

export default ChatMessageInvoice
