import React from 'react'

import Invoices from '../../../invoices/invoices.component'
import { PayablesProvider } from '../../../invoices/invoices.context'
import Styles from './financials-payables.styles'

type Props = {}
const FinancialsPayables = ({}: Props) => {
  return (
    <Styles>
      <PayablesProvider>
        <Invoices />
      </PayablesProvider>
    </Styles>
  )
}

export default FinancialsPayables
