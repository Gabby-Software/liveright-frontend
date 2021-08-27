import { Input as AntdInput } from 'antd'
import { ChangeEvent, FocusEventHandler, ReactNode } from 'react'

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
  defaultValue?: string
  value?: string
  onClick?: any
  onFocus?: FocusEventHandler<HTMLInputElement>
  readOnly?: boolean
  className?: string
  disabled?: boolean
  name?: string
  onBlur?: FocusEventHandler
}

export default function Input({
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
  onBlur
}: InputProps) {
  return (
    <Styles
      $size={size}
      onClick={onClick}
      className={className}
      $disabled={disabled}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <AntdInput
        id={id}
        type={type}
        placeholder={placeholder}
        className="input__input"
        suffix={suffix}
        prefix={prefix}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        readOnly={readOnly}
        disabled={disabled}
        onBlur={onBlur}
      />
      {name && <FormError name={name} className="field-error" />}
    </Styles>
  )
}
