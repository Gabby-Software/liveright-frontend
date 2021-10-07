import React from 'react'

import Styles from './total-info-card.styles'

interface TotalInfoCardProps {
  label: string
  note: string
  value?: string
}

const TotalInfoCard = ({ label, note, value }: TotalInfoCardProps) => {
  return (
    <Styles className="card">
      <div className="card__title">{label}</div>
      <div className="card__count">
        {value} <span>AED</span>
      </div>
      <div className="card__subtitle">{note}</div>
    </Styles>
  )
}

export default TotalInfoCard
