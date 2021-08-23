import { Input as AntdInput } from 'antd'
import { ChangeEvent, ReactNode } from 'react'

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
  onChange
}: InputProps) {
  return (
    <Styles $size={size}>
      {label && <label htmlFor={id}>{label}</label>}
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
      />
    </Styles>
  )
}
