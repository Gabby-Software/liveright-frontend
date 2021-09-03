import { useState } from 'react'

import { useChats } from '../../../modules/chat/contexts/chats.context'
import { ChatMessageInvoiceMetaType } from '../../../modules/chat/types/chat-message-invoice-meta.type'
type RemindType = () => [
  boolean,
  (uuid: string, meta: ChatMessageInvoiceMetaType) => void
]
export const useRemindInvoice: RemindType = () => {
  const [loading, setLoading] = useState(false)
  const { sendInvoice } = useChats()
  const remind = (clientUuid: string, meta: ChatMessageInvoiceMetaType) => {
    setLoading(true)
    sendInvoice(clientUuid, meta)
    setTimeout(() => setLoading(false), 2000)
  }
  return [loading, remind]
}
