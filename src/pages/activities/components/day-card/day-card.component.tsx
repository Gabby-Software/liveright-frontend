import { ReactNode } from 'react'

import { UnionIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-card.styles'

export interface DayCardProps {
  content: ReactNode
  subtitle?: string
  title: string
  onExpand?: any
  border?: 'both' | 'mobile' | 'desktop'
}

export default function DayCard({
  title,
  content,
  subtitle,
  onExpand,
  border = 'desktop'
}: DayCardProps) {
  return (
    <Styles $border={border}>
      <div className="day-card__header">
        <div className="day-card__header-title-container">
          <p className="day-card__title">{title}</p>

          {onExpand && (
            <IconButton
              size="sm"
              className="day-card__header-icon"
              onClick={onExpand}
            >
              <UnionIcon />
            </IconButton>
          )}
        </div>

        {subtitle && <p className="day-card__subtitle">{subtitle}</p>}
      </div>

      {content}
    </Styles>
  )
}
