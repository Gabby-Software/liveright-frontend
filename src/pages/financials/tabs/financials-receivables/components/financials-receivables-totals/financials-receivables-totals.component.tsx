import React from 'react'

import { asMoney } from '../../../../../../pipes/as-money.pipe'
import { renderNum } from '../../../../../../utils/numbers'
import FinancialsReceivablesTotal from '../financials-receivables-total/financials-receivables-total.component'
import Styles from './financials-receivables-totals.styles'

type Props = {
  countData: any
  data: any
}

const FinancialsReceivablesTotals = ({ countData, data }: Props) => {
  return (
    <Styles>
      <FinancialsReceivablesTotal
        label="Revenue"
        note={`(${renderNum(countData.total)} Invoices)`}
        value={asMoney(data.total || 0)}
      />
      <FinancialsReceivablesTotal
        label="Settled"
        note={`(${renderNum(countData.paid)} Invoices)`}
        value={asMoney(data.paid || 0)}
      />
      <FinancialsReceivablesTotal
        label="Overdue"
        note={`(${renderNum(countData.overdue)} Invoices)`}
        value={asMoney(data.overdue || 0)}
      />
      <FinancialsReceivablesTotal
        label="Left to Target"
        note="off 0"
        value="0"
      />
    </Styles>
  )
}

export default FinancialsReceivablesTotals
