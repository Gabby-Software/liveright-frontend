import React from 'react'
import { Link } from 'react-router-dom'

import usePaymentAccount from '../../../../hooks/api/payments/usePaymentAccount'
import usePayoutTransactions from '../../../../hooks/api/payments/usePayoutTransactions'
import GetPaidTable from './components/financial-getPaid-table/financial-getPaid-table.component'
import InfoCards from './components/info-cards/info-cards.component'
import StripeConnect from './components/stripe-connect/stripe-connect.component'
import Styles from './financials-getPaid.styles'

const GetPaid = () => {
  const stripeConnectData = usePaymentAccount()
  const {
    transactions,
    transactionLoading,
    meta,
    onPage,
    mutate,
    onFilter,
    filters
  } = usePayoutTransactions()

  const stripeExistsAndComp =
    stripeConnectData.account.id && stripeConnectData.account.details_submitted
  return (
    <Styles>
      {stripeExistsAndComp && (
        <>
          <InfoCards
            stripeAcc={{
              createdAt: stripeConnectData.account.created,
              visitStripeAcc: stripeConnectData.onCreateDashboardLink
            }}
            transactionsMutate={mutate}
          />
          <GetPaidTable
            data={transactions}
            meta={meta}
            onPage={onPage}
            filters={filters}
            onFilter={onFilter}
            loading={transactionLoading}
            renderOptions={(data) => (
              <Link to={`#${data.id}`}>View Invoice</Link>
            )}
            withFilter
          />
        </>
      )}
      <StripeConnect {...stripeConnectData} />
    </Styles>
  )
}

export default GetPaid
