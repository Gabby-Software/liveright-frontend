import React from 'react'

import Styles from './financials-receivables-total.styles'

interface FinancialsReceivablesTotalProps {
  label: string
  note: string
  value?: string
}

const FinancialsReceivablesTotal = ({
  label,
  note,
  value
}: FinancialsReceivablesTotalProps) => {
  return (
    <Styles className="card">
      <div className="card__title">{label}</div>
      <div className="card__count">{value}</div>
      <div className="card__subtitle">{note}</div>
    </Styles>
  )
}

export default FinancialsReceivablesTotal
