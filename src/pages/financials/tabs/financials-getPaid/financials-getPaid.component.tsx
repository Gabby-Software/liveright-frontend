import React from 'react'
import { Link } from 'react-router-dom'

import GetPaidTable from './components/financial-getPaid-table/financial-getPaid-table.component'
import InfoCards from './components/info-cards/info-cards.component'
import StripeConnect from './components/stripe-connect/stripe-connect.component'
import Styles from './financials-getPaid.styles'

const dummyData = [
  {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: {
        url: 'https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj'
      }
    },
    type: 'Some Event Type',
    amount: 750,
    currency: 'AED',
    dateRecieved: new Date().toISOString(),
    datePayout: new Date().toISOString()
  },
  {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: {
        url: 'https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj'
      }
    },
    type: 'Some Event Type',
    amount: 750,
    currency: 'AED',
    dateRecieved: new Date().toISOString(),
    datePayout: new Date().toISOString()
  }
]

const GetPaid = () => {
  return (
    <Styles>
      <InfoCards />
      <GetPaidTable
        data={dummyData}
        meta={{ current_page: 1, per_page: 10, total: 500 }}
        onPage={() => {}}
        renderOptions={(_) => <Link to="#">View Invoice</Link>}
        withFilter
      />
      <StripeConnect />
    </Styles>
  )
}

export default GetPaid
