import React from 'react'
import { useSWRConfig } from 'swr'

import Button from '../../../../../../components/buttons/button/button.component'
import { EP_PAYOUT_TRANSACTIONS } from '../../../../../../enums/api.enum'
import usePayoutBalance from '../../../../../../hooks/api/payments/usePayoutBalance'
import useTotalRecieved from '../../../../../../hooks/api/payments/useTotalRecieved'
import { useAuth } from '../../../../../../hooks/auth.hook'
import TotalInfoCard from '../total-info-card/total-info-card.component'
import UserDetailsCard from '../user-details-card/user-details-card.component'
import Styles from './info-cards.styles'

const InfoCards = () => {
  const { first_name, last_name, avatar } = useAuth()
  const { mutate } = useSWRConfig()
  const {
    balance,
    pendingBalance,
    currency,
    isBalanceLoading,
    onCreatePayout,
    isPayoutLoading
  } = usePayoutBalance()
  const {
    totalRecieved,
    currency: invoiceCurrency,
    invoiceCount,
    mutate: totalRecievedMutate
  } = useTotalRecieved()

  const user = {
    firstName: first_name,
    lastName: last_name,
    avatar
  }

  const payoutHandler = () => {
    onCreatePayout()
    totalRecievedMutate()
    // transactionsMutate()
    mutate(EP_PAYOUT_TRANSACTIONS)
  }

  return (
    <Styles className="info_cards">
      <UserDetailsCard {...user} />
      <TotalInfoCard
        label="Total Recieved"
        value={Math.floor(totalRecieved).toString()}
        currency={invoiceCurrency}
        note={`(${invoiceCount} Invoices)`}
      />
      <TotalInfoCard
        label="Available Payout"
        value={Math.floor(balance).toString()}
        currency={currency}
        noteStyle="white"
        note={
          <div>
            <p>{`${Math.floor(pendingBalance)} ${currency.toUpperCase()}`}</p>{' '}
            <p>(Pending Clearence)</p>
          </div>
        }
      />
      <div className="info_cards__payouts">
        <Button
          disabled={balance === 0 || isBalanceLoading || isPayoutLoading}
          onClick={payoutHandler}
        >
          Payout Now
        </Button>
      </div>
    </Styles>
  )
}

export default InfoCards
