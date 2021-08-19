import React from 'react'

import { classes } from '../../../pipes/classes.pipe'
import Styles from './form-toggle.styles'

type UIProps = {
  label: string
  value: boolean
  onUpdate: (val: boolean) => void
}
type Props = {
  label: string
  name: string
  onUpdate: (name: string, value: boolean) => void
}

export const FormToggleUI = ({ label, value, onUpdate }: UIProps) => {
  return (
    <Styles onClick={() => onUpdate(!value)}>
      {label ? <span className={'toggle__label'}>{label}</span> : null}
      <div
        className={classes(
          'toggle__body',
          value ? 'toggle__body__on' : 'toggle__body__off'
        )}
      />
    </Styles>
  )
}
const FormToggle = ({}: Props) => {
  return null
}

export default FormToggle
