import { Field, FieldProps } from 'formik'
import React from 'react'

import { classes } from '../../../pipes/classes.pipe'
import { OptionType } from '../../../types/option.type'
import FormError from '../form-error/form-error.component'
import Styles from './form-drawer-select.styles'

type Props = {
  name: string
  label: string
  options: OptionType[]
}
const FormDrawerSelect = ({ name, label, options }: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'drawer-select__wrapper'}>
          <div className={'drawer-select__label'}>{label}</div>
          <div className={'drawer-select__cont'}>
            {options.map(({ label }) => (
              // eslint-disable-next-line react/jsx-key
              <div
                className={classes(
                  'drawer-select__option',
                  label === field.value && 'drawer-select__option__active'
                )}
                onClick={() => form.setFieldValue(name, label)}
              >
                {label}
              </div>
            ))}
          </div>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormDrawerSelect
