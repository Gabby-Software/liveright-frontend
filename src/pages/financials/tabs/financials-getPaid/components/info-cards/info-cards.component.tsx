import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../../../../../../components/buttons/button/button.component'
import usePayoutBalance from '../../../../../../hooks/api/payments/usePayoutBalance'
import useTotalRecieved from '../../../../../../hooks/api/payments/useTotalRecieved'
import { useAuth } from '../../../../../../hooks/auth.hook'
import TotalInfoCard from '../total-info-card/total-info-card.component'
import UserDetailsCard from '../user-details-card/user-details-card.component'
import Styles from './info-cards.styles'

interface InfoCardsProps {
  stripeAcc: {
    createdAt: string
    visitStripeAcc: () => void
  }
  transactionsMutate: any
}

const InfoCards = ({ stripeAcc, transactionsMutate }: InfoCardsProps) => {
  const { first_name, last_name, avatar } = useAuth()
  const {
    balance,
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
    avatar,
    joinedAt: stripeAcc.createdAt,
    getStripeAccountLink: stripeAcc.visitStripeAcc
  }

  const payoutHandler = () => {
    onCreatePayout()
    totalRecievedMutate()
    transactionsMutate()
  }

  return (
    <Styles className="info_cards">
      <UserDetailsCard {...user} />
      <TotalInfoCard
        label="Total Recieved"
        value={totalRecieved.toString()}
        currency={invoiceCurrency}
        note={`(${invoiceCount} Invoices)`}
      />
      <TotalInfoCard
        label="Available Payout"
        value={balance?.toString() || '0'}
        currency={currency}
        note={'(30 Invoices)'}
      />
      <div className="info_cards__payouts">
        <Button
          disabled={balance === 0 || isBalanceLoading || isPayoutLoading}
          onClick={payoutHandler}
        >
          Payout Now
        </Button>
        <Link
          to="#"
          onClick={() => stripeAcc.visitStripeAcc()}
          className="info_cards__payouts__link"
        >
          View Payouts on Stripe
        </Link>
      </div>
    </Styles>
  )
}

export default InfoCards
