import { TimePicker, TimePickerProps } from 'antd'
import { Field, FieldProps } from 'formik'
import moment from 'moment'
import React from 'react'

import { classes } from '../../../pipes/classes.pipe'
import FormError from '../form-error/form-error.component'
import Styles from './form-timepicker.styles'

type Props = TimePickerProps & {
  name: string
  label: string
  disabled?: boolean
  disabledUntilNow?: boolean
  onUpdate?: (name: string, value: string) => void
}
const FormTimepicker: React.FC<Props> = (props) => {
  const { name, label, onUpdate, disabled, disabledUntilNow, ...rest } = props
  const format = 'H:mm'
  const disabledHours = disabledUntilNow
    ? [...Array(moment().hours())].map((_, index) => index)
    : []

  const getDisabledMinutes = (hour: number) => {
    if (disabledUntilNow && moment().hours() === hour) {
      return [...Array(moment().minutes())].map((_, index) => index)
    }

    return []
  }

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Styles className={'text_input__wrapper'}>
          <label className={'text_input__cont'}>
            <div className={'text_input__label'}>{label}</div>
            <TimePicker
              {...rest}
              disabledHours={() => disabledHours}
              disabledMinutes={getDisabledMinutes}
              disabled={disabled}
              value={field.value ? moment(field.value, format) : null}
              className={classes(
                'text_input__input',
                form.errors[name] && form.touched[name] && 'text_input__error'
              )}
              onChange={(date, dateString: string) => {
                if (!date) return
                console.log('lol')
                form.setFieldValue(name, dateString)
                onUpdate && onUpdate(name, dateString)
              }}
              format={format}
              onBlur={field.onBlur}
            />
          </label>
          <FormError name={name} />
        </Styles>
      )}
    </Field>
  )
}

export default FormTimepicker
