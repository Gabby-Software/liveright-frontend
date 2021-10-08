import React from 'react'

import Styles from './total-info-card.styles'

interface TotalInfoCardProps {
  label: string
  note: string
  value?: string
  currency?: string
}

const TotalInfoCard = ({
  label,
  note,
  value,
  currency
}: TotalInfoCardProps) => {
  return (
    <Styles className="card">
      <div className="card__title">{label}</div>
      <div className="card__count">
        {value} <span>{currency?.toUpperCase()}</span>
      </div>
      <div className="card__subtitle">{note}</div>
    </Styles>
  )
}

export default TotalInfoCard
