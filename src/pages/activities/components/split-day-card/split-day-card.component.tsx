import { ReactNode } from 'react'

import { Subtitle } from '../../../../components/typography'
import { Styles } from './split-day-card.styles'

export interface SplitDayCardProps {
  title: string
  color: string
  icon: ReactNode
  content: ReactNode
  scheduleTime?: string
}

export default function SplitDayCard({
  title,
  color,
  icon,
  content,
  scheduleTime
}: SplitDayCardProps) {
  return (
    <Styles $color={color} $schedule={scheduleTime}>
      {scheduleTime && <p className="SplitDayCard__schedule">{scheduleTime}</p>}

      <div className="SplitDayCard__title">
        <div className="SplitDayCard__icon">{icon}</div>

        <Subtitle>{title}</Subtitle>
      </div>

      <div className="SplitDayCard__content">{content}</div>
    </Styles>
  )
}
