import React from 'react'

import InvoiceAttendees from '../../invoice/sections/invoice-attendees/invoice-attendees.component'
import InvoiceDetails from '../../invoice/sections/invoice-details/invoice-details.component'
import InvoiceInfo from '../../invoice/sections/invoice-info/invoice-info.component'
import Styles from './invoice-desktop.styles'

type Props = {}
const InvoiceDesktop = ({}: Props) => {
  return (
    <Styles>
      <InvoiceAttendees />
      <InvoiceDetails />
      <InvoiceInfo />
    </Styles>
  )
}

export default InvoiceDesktop
