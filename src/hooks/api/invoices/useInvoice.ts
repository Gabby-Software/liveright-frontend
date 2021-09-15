import { useState } from 'react'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_GET_INVOICES } from '../../../enums/api.enum'
import { useChats } from '../../../modules/chat/contexts/chats.context'
import {
  cancelInvoice,
  getInvoice,
  markPainInvoice,
  sendInvoice
} from '../../../services/api/invoices'
import { InvoiceFullType, InvoiceType } from '../../../types/invoice.type'

export interface UseInvoice {
  onSend: (id: number) => void
  onMarkPaid: (id: number) => void
  onCancel: (id: number, onSuccess?: any) => void
  isSendLoading: boolean
  isMarkLoading: boolean
  isCancelLoading: boolean
  invoice: InvoiceFullType
  isInvoiceLoading: boolean
  onRemind: (clientId: string, invoice: InvoiceType) => void
}

interface UseInvoiceConfig {
  mutate?: any
  id?: number
}

export default function useInvoice(config: UseInvoiceConfig = {}): UseInvoice {
  const [isSendLoading, setSendLoading] = useState(false)
  const [isMarkLoading, setMarkLoading] = useState(false)
  const [isCancelLoading, setCancelLoading] = useState(false)
  const chats = useChats()

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

      toast.show({
        type: 'success',
        msg: 'Invoice sent to client'
      })

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

      toast.show({
        type: 'success',
        msg: 'Invoice marked as paid'
      })

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

      toast.show({
        type: 'success',
        msg: 'Invoice Cancelled'
      })

      setCancelLoading(false)
      onSuccess?.()
    } catch (e) {
      setCancelLoading(false)
      console.error(e)
    }
  }

  const onRemind = (clientId: string, invoice: InvoiceType) => {
    chats.sendInvoice(clientId, {
      invoice_id: '' + invoice.id,
      total: invoice.total,
      currency: invoice.currency.code,
      status: invoice.status,
      name: `${invoice.invoice_to.user.first_name} ${invoice.invoice_to.user.last_name}`
    })
    toast.show({
      type: 'success',
      msg: 'Reminder message sent to chat'
    })
  }

  const isInvoiceLoading = !data && !error
  const invoice = data || {}

  return {
    onSend,
    onCancel,
    onMarkPaid,
    onRemind,
    isSendLoading,
    isMarkLoading,
    isCancelLoading,
    isInvoiceLoading,
    invoice
  }
}
