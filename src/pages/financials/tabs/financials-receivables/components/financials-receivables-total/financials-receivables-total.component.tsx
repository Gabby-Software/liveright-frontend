import React from 'react'

import { TotalsType } from '../../financials-receivables.data'
import Styles from './financials-receivables-total.styles'

const FinancialsReceivablesTotal = ({ label, note, value }: TotalsType) => {
  return (
    <Styles className="card">
      <div className="card__title">{label}</div>
      <div className="card__count">{value}</div>
      <div className="card__subtitle">{note}</div>
    </Styles>
  )
}

export default FinancialsReceivablesTotal
