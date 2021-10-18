import moment from 'moment'
import { useState } from 'react'
import useSWR from 'swr'

import { toast } from '../../../components/toast/toast.component'
import { EP_STRIPE_AVAILABLE_BALANCE } from '../../../enums/api.enum'
import {
  createPayout,
  getAvailableBalance
} from '../../../services/api/payments'

interface usePayoutBalance {
  balance: number
  pendingBalance: number
  currency: string
  isBalanceLoading: boolean
  isPayoutLoading: boolean
  onCreatePayout: () => void
}

export default function usePayoutBalance(): usePayoutBalance {
  const [isPayoutLoading, setPayoutLoading] = useState(false)

  const { data, error, mutate } = useSWR(
    EP_STRIPE_AVAILABLE_BALANCE,
    getAvailableBalance
  )

  const onCreatePayout = async () => {
    try {
      setPayoutLoading(true)
      const res = await createPayout(
        data.available[0].amount,
        data.available[0].currency,
        `New Payout made on ${moment(new Date()).format('YYYY-MM-DD HH:MM:SS')}`
      )
      setPayoutLoading(false)
      toast.show({
        type: 'success',
        msg: 'Payout Successfully made'
      })
      console.log(res)
      mutate()
    } catch (err: any) {
      setPayoutLoading(false)
      toast.show({
        type: 'error',
        msg: err.response?.data?.message || 'Payout Failed!'
      })
      console.log(err.response)
    }
  }

  const balance = data?.available[0]?.amount || 0
  const pendingBalance = data?.pending[0]?.amount || 0
  const currency = data?.available[0]?.currency || ''
  const isBalanceLoading = !data && !error

  return {
    balance,
    pendingBalance,
    currency,
    isBalanceLoading,
    onCreatePayout,
    isPayoutLoading
  }
}
