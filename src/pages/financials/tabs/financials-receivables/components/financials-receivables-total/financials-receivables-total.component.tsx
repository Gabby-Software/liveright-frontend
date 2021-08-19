import React from 'react'

import { TotalsType } from '../../financials-receivables.data'
import Styles from './financials-receivables-total.styles'

const FinancialsReceivablesTotal = ({ label, note, value }: TotalsType) => {
  return (
    <Styles>
      <div className={'total__label'}>{label}</div>
      <div className={'total__value'}>{value}</div>
      <div className={'total__note'}>{note}</div>
    </Styles>
  )
}

export default FinancialsReceivablesTotal
