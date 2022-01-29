import React, { ChangeEvent } from 'react'

import Styles from './radio-input.styles'

export interface Props {
  name: string
  label: string
  value: string
  isChecked: boolean
  className?: string
  handleChange: (id: string) => void
}

const RadioInput: React.FC<Props> = ({
  name,
  label,
  value,
  isChecked,
  className,
  handleChange
}) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.currentTarget
    handleChange(id) // Send back id to radio group for comparison
  }

  return (
    <Styles>
      <label
        className={`wrapper ${className} ${isChecked && 'wrapper--checked'}`}
        htmlFor={value}
      >
        <input
          checked={isChecked}
          className="input"
          id={value}
          name={name}
          type="radio"
          onChange={handleRadioChange}
        />
        <span className={`control ${isChecked && 'control--checked'}`} />
        <span className={`label ${isChecked && 'label--checked'}`}>
          {label}
        </span>
      </label>
    </Styles>
  )
}

export default RadioInput
