import { useState } from 'react'
import useSWR from 'swr'

import { EP_PAYMENT_ACCOUNT } from '../../../enums/api.enum'
import {
  createAccount,
  createAccountLink,
  createDashboardLink,
  getPaymentAccount
} from '../../../services/api/payments'

interface usePaymentAccount {
  account: any
  isLoading: boolean
  onCreateAccount: () => void
  onCreateLink: () => void
  onCreateDashboardLink: () => void
  isCreateAccountLoading: boolean
  isCreateLinkLoading: boolean
  isDashboardLinkLoading: boolean
}

export default function usePaymentAccount(): usePaymentAccount {
  const [isCreateAccountLoading, setCreateAccountLoading] = useState(false)
  const [isCreateLinkLoading, setCreateLinkLoading] = useState(false)
  const [isDashboardLinkLoading, setDashboardLinkLoading] = useState(false)

  const { data, error } = useSWR(EP_PAYMENT_ACCOUNT, getPaymentAccount, {
    shouldRetryOnError: false
  })

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
      console.log(response)
      setDashboardLinkLoading(false)
      window.open(response.url, '_blank')
    } catch (e) {
      setDashboardLinkLoading(false)
      console.error(e)
    }
  }

  const account = data || {}
  const isLoading = !data && !error

  console.log(account)
  return {
    account,
    isLoading,
    onCreateAccount,
    onCreateLink,
    onCreateDashboardLink,
    isCreateLinkLoading,
    isCreateAccountLoading,
    isDashboardLinkLoading
  }
}
