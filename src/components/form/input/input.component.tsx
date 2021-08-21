import { Input as AntdInput } from 'antd'
import { ReactNode } from 'react'

import Styles from './input.styles'

interface InputProps {
  id: string
  type?: 'text' | 'password'
  label?: string
  placeholder?: string
  size?: 'sm'
  suffix?: ReactNode
  prefix?: ReactNode
}

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  size,
  suffix,
  prefix
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
      />
    </Styles>
  )
}
