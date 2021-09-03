import React, { FC } from 'react'

import { ChatMessageInvoiceMetaType } from '../../../../../modules/chat/types/chat-message-invoice-meta.type'
import Styles from './chat-message-invoice.styles'

type Props = ChatMessageInvoiceMetaType & {
  me: boolean
}
const ChatMessageInvoice: FC<Props> = ({
  total,
  invoice_id,
  currency,
  status
}) => {
  return (
    <Styles className={'cm-invoice'}>
      <div className={'cm-invoice__left'}>
        <div>Invoice #{invoice_id}</div>
        <div>From van diesel</div>
        <div>
          {total} {currency}
        </div>
      </div>
      <div className={'cm-invoice__right'}>
        <div>{status}</div>
        <div>Settle Now</div>
      </div>
    </Styles>
  )
}

export default ChatMessageInvoice
