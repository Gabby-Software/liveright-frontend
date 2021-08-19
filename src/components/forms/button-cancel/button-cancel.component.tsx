import { Field, FieldProps } from 'formik'
import React from 'react'

import { classes } from '../../../pipes/classes.pipe'
import FormButton from '../form-button/form-button.component'

export type CancelProps = {
  children: React.ReactNode
  className?: string
  onCancel?: () => void
}
const ButtonCancel = ({ children, className, onCancel }: CancelProps) => {
  return (
    <Field name={''}>
      {({ form }: FieldProps) => (
        <FormButton
          className={classes('button-submit', className)}
          type={'default'}
          disabled={form.isSubmitting}
          onClick={() => {
            form.resetForm()
            onCancel && onCancel()
          }}
        >
          {children}
        </FormButton>
      )}
    </Field>
  )
}

export default ButtonCancel
