import React from 'react'

import usePaymentAccount from '../../../../hooks/api/payments/usePaymentAccount'
import usePayoutTransactions from '../../../../hooks/api/payments/usePayoutTransactions'
import GetPaidTable from './components/financial-getPaid-table/financial-getPaid-table.component'
import InfoCards from './components/info-cards/info-cards.component'
import StripeConnect from './components/stripe-connect/stripe-connect.component'
import Styles from './financials-getPaid.styles'

const GetPaid = () => {
  const { account } = usePaymentAccount()
  const { transactions, transactionLoading, meta, onPage, onFilter, filters } =
    usePayoutTransactions()

  const stripeExistsAndComp = account.id && account.details_submitted
  return (
    <Styles>
      {stripeExistsAndComp && (
        <>
          <InfoCards />
          <GetPaidTable
            data={transactions}
            meta={meta}
            onPage={onPage}
            filters={filters}
            onFilter={onFilter}
            loading={transactionLoading}
            withFilter
          />
        </>
      )}
      <StripeConnect />
    </Styles>
  )
}

export default GetPaid
