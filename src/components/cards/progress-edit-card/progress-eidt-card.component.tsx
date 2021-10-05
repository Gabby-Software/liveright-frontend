import { ReactNode } from 'react'

import { InputProps } from '../../form/input/input.component'
import { InputStyles, Styles } from './progress-edit-card.styles'

export interface ProgressEditCardProps {
  icon: ReactNode
  title: string
  InputProps?: InputProps
  inputComponent?: ReactNode
  infoVariant?: 'secondary'
  className?: string
  prev?: string
  average?: string
  init?: string
}

export default function ProgressEditCard({
  icon,
  title,
  InputProps,
  inputComponent,
  infoVariant,
  className,
  prev,
  average,
  init
}: ProgressEditCardProps) {
  return (
    <Styles $infoVar={infoVariant} className={className}>
      <div className="progress-edit-card__cell">
        <div className="progress-edit-card__icon">{icon}</div>
        <p className="progress-edit-card__title">{title}</p>
      </div>

      <div className="progress-edit-card__cell progress-edit-card__cell_input">
        {inputComponent ? (
          inputComponent
        ) : InputProps ? (
          <InputStyles {...InputProps} className="progress-edit-card__input" />
        ) : null}
      </div>

      <div className="progress-edit-card__cell">
        <div className="progress-edit-card__info">
          {prev && (
            <div className="progress-edit-card__info-row">
              <p className="progress-edit-card__info-label">Previously</p>
              <p className="progress-edit-card__info-value">{prev}</p>
            </div>
          )}

          {average && (
            <div className="progress-edit-card__info-row">
              <p className="progress-edit-card__info-label">Average</p>
              <p className="progress-edit-card__info-value">{average}</p>
            </div>
          )}

          {init && (
            <div className="progress-edit-card__info-row">
              <p className="progress-edit-card__info-label">Initial</p>
              <p className="progress-edit-card__info-value">{init}</p>
            </div>
          )}
        </div>
      </div>
    </Styles>
  )
}
