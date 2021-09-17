import { Input as AntdInput } from 'antd'
import React, {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  ReactNode
} from 'react'

import { Formatter } from '../../../managers/formatter.manager'
import FormError from '../../forms/form-error/form-error.component'
import Label from '../label/label.component'
import Styles from './input.styles'

interface InputProps {
  id: string
  type?: 'text' | 'password'
  label?: string
  placeholder?: string
  size?: 'sm'
  suffix?: ReactNode
  prefix?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string | number
  value?: string | number
  onClick?: any
  onFocus?: FocusEventHandler<HTMLInputElement>
  readOnly?: boolean
  className?: string
  disabled?: boolean
  name?: string
  onBlur?: FocusEventHandler
  format?: Formatter
  labelComponent?: ReactNode
  max?: number
}

const Input = forwardRef<any, InputProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      size,
      suffix,
      prefix,
      defaultValue,
      value,
      onChange,
      onClick,
      onFocus,
      readOnly,
      className,
      disabled,
      name,
      onBlur,
      format,
      labelComponent,
      max
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (format) {
        onChange?.({
          ...e,
          target: { ...e.target, value: format.format(e.target.value) }
        })
        return
      }
      onChange?.(e)
    }
    return (
      <Styles
        $size={size}
        onClick={onClick}
        className={className}
        $disabled={disabled}
      >
        {label && (
          <Label htmlFor={id}>
            {labelComponent}

            {label}
          </Label>
        )}
        <AntdInput
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className="input__input"
          suffix={suffix}
          prefix={prefix}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          readOnly={readOnly}
          disabled={disabled}
          onBlur={onBlur}
          maxLength={max}
        />
        {name && <FormError name={name} className="field-error" />}
      </Styles>
    )
  }
)

export default Input
