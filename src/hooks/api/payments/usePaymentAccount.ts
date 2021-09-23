import useSWR from 'swr'

import { EP_PAYMENT_ACCOUNT } from '../../../enums/api.enum'
import {
  createAccount,
  getPaymentAccount
} from '../../../services/api/payments'

interface UsePaymentAccount {
  account: any
  isLoading: boolean
  onCreateAccount: () => void
}

export default function usePaymentAccount(): UsePaymentAccount {
  const { data, error } = useSWR(EP_PAYMENT_ACCOUNT, getPaymentAccount, {
    shouldRetryOnError: false
  })

  const onCreateAccount = async () => {
    try {
      const response = await createAccount()
      console.log('onCreateAccount', response)
    } catch (e) {
      console.error(e)
    }
  }

  const account = data || {}
  const isLoading = !data && !error
  return {
    account,
    isLoading,
    onCreateAccount
  }
}
