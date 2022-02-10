import React, { useState } from 'react'
import ReactInputMask, { Props } from 'react-input-mask'

import { ErrorProps } from '../error/error.component'
import Input from '../input/input.component'

export interface TimeInputProps {
  id: string
  label?: string
  tooltip?: string
  placeholder?: string
  size?: 'sm'
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string | number
  value?: string
  onClick?: any
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  readOnly?: boolean
  className?: string
  disabled?: boolean
  name?: string
  onBlur?: React.FocusEventHandler
  labelComponent?: React.ReactNode
  max?: number
  error?: string
  shouldScrollTo?: Boolean
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  ErrorProps?: Pick<ErrorProps, 'size'>
  bordered?: boolean
  format?: 'HH:mm' | 'mm:ss'
}

const TimeInput = (
  props: TimeInputProps & Pick<Props, 'maskPlaceholder' | 'alwaysShowMask'>
) => {
  const {
    onChange,
    onFocus,
    onBlur,
    value,
    disabled,
    readOnly,
    maskPlaceholder = null,
    alwaysShowMask,
    format = 'HH:mm',
    ...otherProps
  } = props
  const [time, setTime] = useState<string>(value || '')
  const startsWithTwo = time[0] === '2'

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
    onChange?.(e)
  }

  const mask =
    format === 'HH:mm'
      ? [/[0-2]/, startsWithTwo ? /[0-3]/ : /[0-9]/, ':', /[0-5]/, /[0-9]/]
      : [/[0-5]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]

  return (
    <ReactInputMask
      mask={mask}
      onChange={handleInput}
      value={time}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      readOnly={readOnly}
      maskPlaceholder={maskPlaceholder}
      alwaysShowMask={alwaysShowMask}
    >
      <Input {...otherProps} disabled={disabled} readOnly={readOnly} />
    </ReactInputMask>
  )
}

export default TimeInput
