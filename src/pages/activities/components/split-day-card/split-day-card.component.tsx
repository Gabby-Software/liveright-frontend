import { ReactNode } from 'react'

import { Subtitle } from '../../../../components/typography'
import { classes } from '../../../../pipes/classes.pipe'
import { Styles } from './split-day-card.styles'

export interface SplitDayCardProps {
  title: string
  color: string
  icon: ReactNode
  content: ReactNode
  scheduleTime?: string
  actionComponent?: ReactNode
  contentClass?: string
}

export default function SplitDayCard({
  title,
  color,
  icon,
  content,
  scheduleTime,
  actionComponent,
  contentClass
}: SplitDayCardProps) {
  return (
    <Styles $color={color} $schedule={scheduleTime}>
      {scheduleTime && <p className="SplitDayCard__schedule">{scheduleTime}</p>}

      <div className="SplitDayCard__header">
        <div className="SplitDayCard__title">
          <div className="SplitDayCard__icon">{icon}</div>

          <Subtitle>{title}</Subtitle>
        </div>
        {actionComponent}
      </div>

      <div className={classes('SplitDayCard__content', contentClass)}>
        {content}
      </div>
    </Styles>
  )
}
