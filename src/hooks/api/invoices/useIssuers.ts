import useSWR from 'swr'

import { EP_GET_INVOICE_ISSUERS } from '../../../enums/api.enum'
import { getIssuers } from '../../../services/api/invoices'
import { InvoiceIssuer } from '../../../services/types/api'

interface UseIssuers {
  isLoading: boolean
  issuers: InvoiceIssuer[]
}

export default function useIssuers(): UseIssuers {
  const { data, error } = useSWR(EP_GET_INVOICE_ISSUERS, getIssuers)

  const isLoading = !data && !error
  const issuers = data || []
  return {
    isLoading,
    issuers
  }
}
