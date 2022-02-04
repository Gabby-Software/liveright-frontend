import React, { ChangeEvent, FC } from 'react'

import { Formatter } from '../../../../managers/formatter.manager'
import Input from '../../../form/input/input.component'
import Styles from './quick-access-exercise-input.styles'

interface Props {
  id: string
  label: string
  value?: string | number
  previousValue?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  wrapperClassName?: string
  format?: Formatter
  fullwidth?: boolean
}

const QuickAccessExerciseInput: FC<Props> = ({
  id,
  label,
  disabled,
  value,
  previousValue,
  onChange,
  wrapperClassName,
  format,
  fullwidth
}) => {
  return (
    <Styles disabled={disabled} fullwidth={fullwidth}>
      <div
        className={`exercise-input__input-wrapper ${wrapperClassName || ''}`}
      >
        <Input
          id={id}
          label={label}
          bordered={false}
          disabled={disabled}
          value={value}
          onChange={onChange}
          format={format}
        />
        <span className="exercise-input__previous-value">
          {previousValue ? `vs ${previousValue}` : ''}
        </span>
      </div>
    </Styles>
  )
}

export default QuickAccessExerciseInput
