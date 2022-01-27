import React, { useEffect, useState } from 'react'

import { classes } from '../../../pipes/classes.pipe'
import Styles from './form-toggle.styles'

type UIProps = {
  label?: string
  value: boolean
  onUpdate: (val: boolean) => void
  className?: string
  enable?: any
}

type Props = {
  label?: string
  name: string
  onUpdate: (name: string, value: boolean) => void
}

export const FormToggleUI = ({
  label,
  value,
  onUpdate,
  className,
  enable
}: UIProps) => {
  const [innerValue, setInnerValue] = useState(value)

  const handleChange = () => {
    setInnerValue((prevState) => {
      onUpdate(!prevState)
      return !prevState
    })
  }

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  return (
    <Styles
      onClick={!enable ? handleChange : () => {}}
      className={`${className ? className : ''}${enable ? ' not-allowed' : ''}`}
    >
      {label ? <span className={`toggle__label`}>{label}</span> : null}
      <div
        className={classes(
          'toggle__body',
          innerValue ? 'toggle__body__on' : 'toggle__body__off'
        )}
      />
    </Styles>
  )
}

const FormToggle = ({}: Props) => {
  return null
}

export default FormToggle
