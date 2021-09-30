import { ReactNode } from 'react'

import Input, { InputProps } from '../../form/input/input.component'
import { Styles } from './progress-edit-card.styles'

interface ProgressEditCardProps {
  icon: ReactNode
  title: string
  InputProps: InputProps
}

export default function ProgressEditCard({
  icon,
  title,
  InputProps
}: ProgressEditCardProps) {
  return (
    <Styles>
      <div className="progress-edit-card__cell">
        <div className="progress-edit-card__icon">{icon}</div>
        <p className="progress-edit-card__title">{title}</p>
      </div>

      <div className="progress-edit-card__cell progress-edit-card__cell_input">
        <Input {...InputProps} className="progress-edit-card__input" />
      </div>

      <div className="progress-edit-card__cell">
        <div className="progress-edit-card__info">
          <div>
            <p className="progress-edit-card__info-label">Previously</p>
            <p className="progress-edit-card__info-value">10 kg</p>
          </div>

          <div>
            <p className="progress-edit-card__info-label">Average</p>
            <p className="progress-edit-card__info-value">10 kg</p>
          </div>
        </div>
      </div>
    </Styles>
  )
}
