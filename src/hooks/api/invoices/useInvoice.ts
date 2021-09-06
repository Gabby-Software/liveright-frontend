import { useState } from 'react'

import {
  cancelInvoice,
  markPainInvoice,
  sendInvoice
} from '../../../services/api/invoices'

export interface UseInvoice {
  onSend: (id: number) => void
  onMarkPaid: (id: number) => void
  onCancel: (id: number) => void
  isSendLoading: boolean
  isMarkLoading: boolean
  isCancelLoading: boolean
}

interface UseInvoiceConfig {
  mutate?: any
}

export default function useInvoice(config: UseInvoiceConfig = {}): UseInvoice {
  const [isSendLoading, setSendLoading] = useState(false)
  const [isMarkLoading, setMarkLoading] = useState(false)
  const [isCancelLoading, setCancelLoading] = useState(false)

  const onSend = async (id: number) => {
    try {
      setSendLoading(true)
      await sendInvoice(id)
      config.mutate?.()
      setSendLoading(false)
    } catch (e) {
      setSendLoading(false)
      console.error(e)
    }
  }

  const onMarkPaid = async (id: number) => {
    try {
      setMarkLoading(true)
      await markPainInvoice(id)
      config.mutate?.()
      setMarkLoading(false)
    } catch (e) {
      setMarkLoading(false)
      console.error(e)
    }
  }

  const onCancel = async (id: number) => {
    try {
      setCancelLoading(true)
      await cancelInvoice(id)
      config.mutate?.()
      setCancelLoading(false)
    } catch (e) {
      setCancelLoading(false)
      console.error(e)
    }
  }

  return {
    onSend,
    onCancel,
    onMarkPaid,
    isSendLoading,
    isMarkLoading,
    isCancelLoading
  }
}
