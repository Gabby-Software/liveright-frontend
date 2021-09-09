import { useState } from 'react'
import useSWR from 'swr'

import { EP_GET_INVOICES } from '../../../enums/api.enum'
import {
  cancelInvoice,
  getInvoice,
  markPainInvoice,
  sendInvoice
} from '../../../services/api/invoices'
import { InvoiceFullType } from '../../../types/invoice.type'

export interface UseInvoice {
  onSend: (id: number) => void
  onMarkPaid: (id: number) => void
  onCancel: (id: number, onSuccess?: any) => void
  isSendLoading: boolean
  isMarkLoading: boolean
  isCancelLoading: boolean
  invoice: InvoiceFullType
  isInvoiceLoading: boolean
}

interface UseInvoiceConfig {
  mutate?: any
  id?: number
}

export default function useInvoice(config: UseInvoiceConfig = {}): UseInvoice {
  const [isSendLoading, setSendLoading] = useState(false)
  const [isMarkLoading, setMarkLoading] = useState(false)
  const [isCancelLoading, setCancelLoading] = useState(false)

  const { data, error, mutate } = useSWR(
    config.id ? EP_GET_INVOICES + `/${config.id}` : null,
    getInvoice
  )

  const onSend = async (id: number) => {
    try {
      setSendLoading(true)
      await sendInvoice(id)
      config.mutate?.()
      mutate()
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
      mutate()
      setMarkLoading(false)
    } catch (e) {
      setMarkLoading(false)
      console.error(e)
    }
  }

  const onCancel = async (id: number, onSuccess?: any) => {
    try {
      setCancelLoading(true)
      await cancelInvoice(id)
      config.mutate?.()
      mutate()
      setCancelLoading(false)
      onSuccess?.()
    } catch (e) {
      setCancelLoading(false)
      console.error(e)
    }
  }

  const isInvoiceLoading = !data && !error
  const invoice = data || {}

  return {
    onSend,
    onCancel,
    onMarkPaid,
    isSendLoading,
    isMarkLoading,
    isCancelLoading,
    isInvoiceLoading,
    invoice
  }
}
