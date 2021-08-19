import { Field, FieldProps } from 'formik'
import React from 'react'

import { classes } from '../../../pipes/classes.pipe'
import FormError from '../form-error/form-error.component'
import Styles from './form-radio-button.styles'

type Props = {
  name: string
  label: string
  options: { value: string; label: string }[]
}
const FormRadio = ({ name, label, options }: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'radio__wrapper'}>
          <div className={'radio__label'}>{label}</div>
          <div className={'radio__cont'}>
            <div className={'radio'}>
              {options.map(({ value, label }) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  tabIndex={1}
                  className={classes(
                    'radio__button',
                    value === field.value && 'radio__button__active'
                  )}
                  onClick={() => form.setFieldValue(name, value)}
                  onBlur={form.handleBlur}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormRadio
