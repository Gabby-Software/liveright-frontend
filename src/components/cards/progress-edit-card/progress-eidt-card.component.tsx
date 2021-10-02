import { ReactNode } from 'react'

import Input, { InputProps } from '../../form/input/input.component'
import { Styles } from './progress-edit-card.styles'

interface ProgressEditCardProps {
  icon: ReactNode
  title: string
  InputProps?: InputProps
  inputComponent?: ReactNode
  infoVariant?: 'secondary'
}

export default function ProgressEditCard({
  icon,
  title,
  InputProps,
  inputComponent,
  infoVariant
}: ProgressEditCardProps) {
  return (
    <Styles $infoVar={infoVariant}>
      <div className="progress-edit-card__cell">
        <div className="progress-edit-card__icon">{icon}</div>
        <p className="progress-edit-card__title">{title}</p>
      </div>

      <div className="progress-edit-card__cell progress-edit-card__cell_input">
        {inputComponent ? (
          inputComponent
        ) : InputProps ? (
          <Input {...InputProps} className="progress-edit-card__input" />
        ) : null}
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
