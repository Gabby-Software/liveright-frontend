import { ReactNode } from 'react'

import { UnionIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-card.styles'

interface DayCardProps {
  content: ReactNode
  subtitle?: string
  title: string
}

export default function DayCard({ title, content, subtitle }: DayCardProps) {
  return (
    <Styles>
      <div className="day-card__header">
        <div className="day-card__header-title-container">
          <p className="day-card__title">{title}</p>

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
