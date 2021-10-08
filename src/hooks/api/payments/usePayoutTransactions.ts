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
  const [filters, setFilters] = useState({})

  const url = stringifyURL(EP_PAYOUT_TRANSACTIONS, omitEmpty(filters))
  console.log(url)
  const { data, error, mutate } = useSWR(url, getPayoutTransactions)

  const onPage = (page: number) => {
    setPage(page)
  }

  const onFilter = (filters: PayoutFilters) => {
    setFilters(filters)
  }

  console.log(data)
  const transactionLoading = !data && !error
  const transactions =
    data?.slice(page - 1, 10).map((d: any) => ({
      amount: d.amount,
      type: d.type,
      date: d.created,
      currency: d.currency
    })) || []

  const meta: PaginationMetaType = {
    current_page: page,
    per_page: 10,
    total: data?.length || 0
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
