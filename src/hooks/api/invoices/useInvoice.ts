import { useState } from 'react'

import { sendInvoice } from '../../../services/api/invoices'

interface UseInvoice {
  onSend: (id: number) => void
  isSendLoading: boolean
}

export default function useInvoice(): UseInvoice {
  const [isSendLoading, setSendLoading] = useState(false)

  const onSend = async (id: number) => {
    try {
      setSendLoading(true)
      await sendInvoice(id)
      setSendLoading(false)
    } catch (e) {
      setSendLoading(false)
      console.error(e)
    }
  }

  return {
    onSend,
    isSendLoading
  }
}
