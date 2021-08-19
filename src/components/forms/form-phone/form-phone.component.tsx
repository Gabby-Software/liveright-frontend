/* eslint-disable no-useless-escape */
import { Field, FieldProps } from 'formik'
import React from 'react'

import { ReactComponent as WarningIcon } from '../../../assets/media/icons/warning.svg'
import logger from '../../../managers/logger.manager'
import { classes } from '../../../pipes/classes.pipe'
import FormError from '../form-error/form-error.component'
import Styles, { PhoneInputStyles } from './form-phone.styles'

type Props = {
  name: string
  label: string
  type?: string
  icon?: React.ReactNode
  onUpdate?: (name: string, value: string) => void
}
const FormPhone = ({ name, label, onUpdate, type, icon }: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles
          className={classes(
            'text_input__wrapper',
            form.errors[name] && form.touched[name] && 'text_input__error',
            icon && 'text_input__icon'
          )}
        >
          <div className={'text_input__cont'}>
            <div className={'text_input__label'}>{label}</div>
            <div className={'text_input__content'}>
              <PhoneInputStyles
                defaultCountry={
                  form.values.addresses &&
                  form.values.addresses[0]?.country?.code
                }
                className={'text_input__input'}
                type={type || 'text'}
                name={name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(value: string) => {
                  form.setFieldValue(name, value)
                  onUpdate && onUpdate(name, value)
                }}
              />
              {icon || null}
              {form.errors[name] && form.touched[name] ? (
                <WarningIcon className={'text_input__error'} />
              ) : null}
            </div>
          </div>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles
          className={classes(
            'text_input__wrapper',
            form.errors[name] && form.touched[name] && 'text_input__error',
            icon && 'text_input__icon'
          )}
        >
          {logger.info('FORM DATA + ERRORS', field, form.values, form.errors)}
          <label className={'text_input__cont'}>
            <div className={'text_input__label'}>{label}</div>
            <div className={'text_input__content'}>
              <input
                className={'text_input__input'}
                type={type || 'text'}
                name={name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^\d\+]/g, '')
                    .replace(/(.)(\+)/g, '$1')
                    .trim()
                  form.setFieldValue(name, value)
                  onUpdate && onUpdate(name, value)
                }}
              />
              {icon || null}
              {form.errors[name] && form.touched[name] ? (
                <WarningIcon className={'text_input__error'} />
              ) : null}
            </div>
          </label>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormPhone
