import React from 'react'

import { renderNum } from '../../../../../../utils/numbers'
import Styles from './financials-receivables-total.styles'

interface FinancialsReceivablesTotalProps {
  label: string
  note: string
  value?: number
}

const FinancialsReceivablesTotal = ({
  label,
  note,
  value
}: FinancialsReceivablesTotalProps) => {
  return (
    <Styles className="card">
      <div className="card__title">{label}</div>
      <div className="card__count">{renderNum(value)}</div>
      <div className="card__subtitle">{note}</div>
    </Styles>
  )
}

export default FinancialsReceivablesTotal
