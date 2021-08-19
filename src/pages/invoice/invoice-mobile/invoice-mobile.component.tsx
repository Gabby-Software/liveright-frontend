import React from 'react'

import InvoiceMobileDetails from '../sections/invoice-mobile-details/invoice-mobile-details.component'
import InvoiceMobileHead from '../sections/invoice-mobile-head/invoice-mobile-head.component'
import InvoiceMobileSummary from '../sections/invoice-mobile-summary/invoice-mobile-summary.component'
import Styles from './invoice-mobile.styles'

type Props = {}
const InvoiceMobile = ({}: Props) => {
  return (
    <Styles>
      <InvoiceMobileHead />
      <InvoiceMobileDetails />
      <InvoiceMobileSummary />
    </Styles>
  )
}

export default InvoiceMobile
