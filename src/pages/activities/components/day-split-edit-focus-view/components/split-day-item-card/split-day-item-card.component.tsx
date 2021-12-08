import { ReactNode } from 'react'

import { Subtitle } from '../../../../../../components/typography'
import { Styles } from './split-day-item-card.styles'

interface SplitDayItemCardProps {
  title: string
  color: string
  icon: ReactNode
  control: ReactNode
  content: ReactNode
}

export default function SplitDayItemCard({
  title,
  color,
  icon,
  control,
  content
}: SplitDayItemCardProps) {
  return (
    <Styles $color={color}>
      <div className="SplitDayItemCard__head">
        <div className="SplitDayItemCard__head-icon">{icon}</div>

        <div className="SplitDayItemCard__head-content">
          <Subtitle className="SplitDayItemCard__head-title">{title}</Subtitle>

          <div className="SplitDayItemCard__head-control">{control}</div>
        </div>
      </div>

      <div>{content}</div>
    </Styles>
  )
}
