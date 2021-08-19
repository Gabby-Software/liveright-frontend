import { Field, FieldProps } from 'formik'
import React from 'react'

import { classes } from '../../../pipes/classes.pipe'
import FormButton from '../form-button/form-button.component'

export type SubmitProps = {
  children: React.ReactNode
  className?: string
  id?: string
  disabled?: boolean
}
const ButtonSubmit = ({ children, className, id, disabled }: SubmitProps) => {
  return (
    <Field name={''}>
      {({ form }: FieldProps) => (
        <FormButton
          className={classes('button-submit', className)}
          id={id}
          type={'primary'}
          loading={form.isSubmitting}
          htmlType={'submit'}
          disabled={
            // !form.isValid
            // || !dirty
            // ||
            disabled || form.isSubmitting
          }
        >
          {children}
        </FormButton>
      )}
    </Field>
  )
}

export default ButtonSubmit
