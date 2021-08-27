import { Field, FieldProps } from 'formik'
import React from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { byString } from '../../../pipes/by-string.pipe'
import { classes } from '../../../pipes/classes.pipe'
import Styles from './form-error.styles'
export type FormErrorProps = { name: string; className?: string }
export type FormErrorType = string | { key: string; values: any }

const FormError = ({ name, className }: FormErrorProps) => {
  const { t } = useTranslation()
  return (
    <Field name={name}>
      {({ form }: FieldProps) => {
        const msg = byString(form.errors, name)
        const touched = byString(form.touched, name)
        return (
          <Styles className={classes('form__error', className)}>
            {!msg
              ? null
              : !touched
              ? null
              : typeof msg === 'string'
              ? t(`errors:${msg}`)
              : t(`errors:${msg.key}`, msg.values)}
          </Styles>
        )
      }}
    </Field>
  )
}

export default FormError
