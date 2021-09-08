import React from 'react'

import Invoices from '../../../invoices/invoices.component'
import { PayablesProvider } from '../../../invoices/invoices.context'

type Props = {}
const FinancialsPayables = ({}: Props) => {
  return (
    <PayablesProvider>
      <Invoices asPage={false} trainerFinancials />
    </PayablesProvider>
  )
}

export default FinancialsPayables
