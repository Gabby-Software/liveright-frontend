import { useState } from 'react'
import useSWR from 'swr'

import { EP_PAYOUT_TRANSACTIONS } from '../../../enums/api.enum'
import { getPayoutTransactions } from '../../../services/api/payments'
import { PaginationMetaType } from '../../../types/pagination-meta.type'
import {
  PayoutFilters,
  PayoutTransaction
} from '../../../types/payoutTransaction'
import { omitEmpty } from '../../../utils/obj'
import { stringifyURL } from '../../../utils/query'

interface usePayoutTransactions {
  transactions: PayoutTransaction[]
  transactionLoading: boolean
  mutate: any
  meta: PaginationMetaType
  filters: PayoutFilters
  onPage: (page: number) => void
  onFilter: (filter: PayoutFilters) => void
}

export default function usePayoutTransactions(): usePayoutTransactions {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ all: 1 })

  const url = stringifyURL(
    EP_PAYOUT_TRANSACTIONS,
    omitEmpty({ ...filters, page })
  )
  const { data, error, mutate } = useSWR(url, getPayoutTransactions)

  const onPage = (page: number) => {
    setPage(page)
  }

  const onFilter = (filters: PayoutFilters) => {
    setFilters({ ...filters, all: 1 })
  }

  const transactionLoading = !data?.data && !error
  const transactions =
    data?.data.map((d: any) => ({
      amount: d.amount,
      type: d.type,
      date: d.ledger_time,
      currency: d.currency_code,
      invoiceId: d.invoice_id,
      user: {
        firstName: d.user.first_name,
        lastName: d.user.last_name
      }
    })) || []

  const meta: PaginationMetaType = {
    current_page: page,
    per_page: data?.meta.per_page || 15,
    total: data?.meta.total || 0
  }

  return {
    transactions,
    transactionLoading,
    meta,
    mutate,
    onPage,
    onFilter,
    filters
  }
}
