import React from 'react'

import { TotalsType } from '../../financials-receivables.data'
import FinancialsReceivablesTotal from '../financials-receivables-total/financials-receivables-total.component'
import Styles from './financials-receivables-totals.styles'

type Props = {
  data: TotalsType[]
}

const FinancialsReceivablesTotals = ({ data }: Props) => {
  return (
    <Styles>
      {data.map((total, index) => (
        <FinancialsReceivablesTotal key={index} {...total} />
      ))}
    </Styles>
  )
}

export default FinancialsReceivablesTotals
