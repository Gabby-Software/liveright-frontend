import { Field, FieldProps, FormikProps } from 'formik'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import FormError from '../form-error/form-error.component'
import Styles from './form-textarea.styles'

type Props = {
  name: string
  label: string
  onUpdate?: (name: string, value: string) => void
}
const FormTextarea = ({ name, label, onUpdate }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const minHeight = 20
  const maxHeight = 300
  const [height, setHeight] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const handleUpdate = (
    e: ChangeEvent<HTMLTextAreaElement>,
    form: FormikProps<any>
  ) => {
    form.setFieldValue(name, (e?.target).value)
    onUpdate && onUpdate(name, e.target.value)
    e.target.style.height = ''
    const height = e.target.scrollHeight + 2
    e.target.style.height = Math.min(height, maxHeight) + 'px'
    setHeight(Math.min(height, maxHeight))
  }
  useEffect(() => {
    if (inputRef?.current) {
      setHeight(Math.min(inputRef.current.scrollHeight + 2, maxHeight))
    }
  }, [inputRef])
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'textarea__wrapper'}>
          <label className={'text_input__cont'}>
            <div className={'text_input__label'}>{label}</div>
            <textarea
              className={'text_input__input'}
              ref={inputRef}
              name={name}
              style={height ? { height: `${height}px` } : {}}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => handleUpdate(e, form)}
            />
          </label>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormTextarea
