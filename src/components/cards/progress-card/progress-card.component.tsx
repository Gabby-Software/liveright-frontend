import { ReactNode } from 'react'

import { Styles } from './progress-card.styles'

interface ProgressCardProps {
  icon: ReactNode
  title: string
  subtitle?: string
  value: string
}

export default function ProgressCard({
  icon,
  title,
  subtitle,
  value
}: ProgressCardProps) {
  return (
    <Styles>
      <div className="progress-card__icon">{icon}</div>

      <div className="progress-card__content">
        <div className="progress-card__title-container">
          <p className="progress-card__title">{title}</p>
          <p className="progress-card__subtitle">{subtitle}</p>
        </div>
        <p className="progress-card__value">{value}</p>
      </div>
    </Styles>
  )
}
