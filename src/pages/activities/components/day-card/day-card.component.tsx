import { ReactNode } from 'react'

import { UnionIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-card.styles'

interface DayCardProps {
  content: ReactNode
  subtitle?: string
}

export default function DayCard({ content, subtitle }: DayCardProps) {
  return (
    <Styles>
      <div className="day-card__header">
        <div className="day-card__header-title-container">
          <p className="day-card__title">Day 1</p>

          <IconButton size="sm" className="day-card__header-icon">
            <UnionIcon />
          </IconButton>
        </div>

        {subtitle && <p className="day-card__subtitle">{subtitle}</p>}
      </div>

      {content}
    </Styles>
  )
}
