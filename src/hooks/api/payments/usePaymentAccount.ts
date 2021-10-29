import { useState } from 'react'
import useSWR from 'swr'

import { EP_PAYMENT_ACCOUNT } from '../../../enums/api.enum'
import {
  createAccount,
  createAccountLink,
  createDashboardLink,
  getPaymentAccount,
  unlinkStripeAccount
} from '../../../services/api/payments'

interface UsePaymentAccount {
  account: any
  isLoading: boolean
  onCreateAccount: () => void
  onCreateLink: () => void
  onCreateDashboardLink: () => void
  onUnlinkStripeAccount: () => void
  isCreateAccountLoading: boolean
  isCreateLinkLoading: boolean
  isDashboardLinkLoading: boolean
  isUnlinkStripeLoading: boolean
  isAccountCompleted: boolean
}

export default function usePaymentAccount(): UsePaymentAccount {
  const [isCreateAccountLoading, setCreateAccountLoading] = useState(false)
  const [isCreateLinkLoading, setCreateLinkLoading] = useState(false)
  const [isDashboardLinkLoading, setDashboardLinkLoading] = useState(false)
  const [isUnlinkStripeLoading, setUnlinkStripeLoading] = useState(false)

  const { data, error, mutate } = useSWR(
    EP_PAYMENT_ACCOUNT,
    getPaymentAccount,
    {
      shouldRetryOnError: false
    }
  )

  const onCreateAccount = async () => {
    try {
      setCreateAccountLoading(true)
      const response = await createAccount()
      setCreateAccountLoading(false)
      window.open(response.url, '_blank')
    } catch (e) {
      setCreateAccountLoading(false)
      console.error(e)
    }
  }

  const onCreateLink = async () => {
    try {
      setCreateLinkLoading(true)
      const response = await createAccountLink()
      setCreateLinkLoading(false)
      window.open(response.url, '_blank')
    } catch (e) {
      setCreateLinkLoading(false)
      console.error(e)
    }
  }

  const onCreateDashboardLink = async () => {
    try {
      setDashboardLinkLoading(true)
      const response = await createDashboardLink()
      setDashboardLinkLoading(false)
      window.open(response.url, '_blank')
    } catch (e) {
      setDashboardLinkLoading(false)
      console.error(e)
    }
  }

  const onUnlinkStripeAccount = async () => {
    try {
      setUnlinkStripeLoading(true)
      const response = await unlinkStripeAccount()
      setUnlinkStripeLoading(false)
      console.log(response)
      mutate()
    } catch (e) {
      setUnlinkStripeLoading(false)
      console.error(e)
    }
  }

  const account = data || {}
  const isLoading = !data && !error

  const isAccountCompleted = account.id && account.details_submitted

  return {
    account,
    isLoading,
    onCreateAccount,
    onCreateLink,
    onCreateDashboardLink,
    onUnlinkStripeAccount,
    isCreateLinkLoading,
    isCreateAccountLoading,
    isDashboardLinkLoading,
    isUnlinkStripeLoading,
    isAccountCompleted
  }
}
