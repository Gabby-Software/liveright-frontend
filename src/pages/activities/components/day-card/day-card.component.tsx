import { ReactNode } from 'react'

import { UnionIcon } from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { Styles } from './day-card.styles'

interface DayCardProps {
  content: ReactNode
}

export default function DayCard({ content }: DayCardProps) {
  return (
    <Styles>
      <div className="day-card__header">
        <p className="day-card__title">Day 1</p>

        <div className="">
          <IconButton size="sm" className="day-card__header-icon">
            <UnionIcon />
          </IconButton>
        </div>
      </div>

      {content}
    </Styles>
  )
}
