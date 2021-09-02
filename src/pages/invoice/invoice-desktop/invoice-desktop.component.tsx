import React from 'react'

import InvoiceAttendees from '../../invoice/sections/invoice-attendees/invoice-attendees.component'
import Styles from './invoice-desktop.styles'

type Props = {}

const InvoiceDesktop = ({}: Props) => {
  return (
    <Styles>
      <InvoiceAttendees />
    </Styles>
  )
}

export default InvoiceDesktop
