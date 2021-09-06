import { Input } from 'antd'
import { ChangeEventHandler, forwardRef } from 'react'

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
  defaultValue?: string
}

const Textarea = forwardRef<any, TextareaProps>((props, ref) => {
  const {
    id,
    placeholder,
    label,
    rows = 4,
    value,
    defaultValue,
    onChange,
    className,
    ...other
  } = props
  return (
    <Styles className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <TextArea
        ref={ref}
        id={id}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        {...other}
      />
    </Styles>
  )
})

export default Textarea
