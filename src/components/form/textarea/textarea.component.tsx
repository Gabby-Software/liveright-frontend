import { Input } from 'antd'
import { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react'

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
  shouldScrollTo?: Boolean
}

const Textarea = forwardRef<any, TextareaProps>((props, ref) => {
  const scrollRef = useRef<HTMLLabelElement>(null)
  const {
    id,
    placeholder,
    label,
    rows = 4,
    value,
    defaultValue,
    onChange,
    className,
    shouldScrollTo,
    ...other
  } = props

  const handleScrollTo = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (shouldScrollTo) {
      handleScrollTo()
    }
  }, [shouldScrollTo])

  return (
    <Styles className={className}>
      {label && (
        <Label ref={scrollRef} htmlFor={id}>
          {label}
        </Label>
      )}
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
