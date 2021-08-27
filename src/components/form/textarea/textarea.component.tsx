import { Input } from 'antd'
import { ChangeEventHandler } from 'react'

import Label from '../label/label.component'
import Styles from './textarea.styles'

const { TextArea } = Input

interface TextareaProps {
  id: string
  label?: string
  placeholder?: string
  rows?: number
  value?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  className?: string
}

export default function Textarea({
  id,
  placeholder,
  label,
  rows = 4,
  value,
  onChange,
  className
}: TextareaProps) {
  return (
    <Styles className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextArea
        id={id}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        value={value}
      />
    </Styles>
  )
}
