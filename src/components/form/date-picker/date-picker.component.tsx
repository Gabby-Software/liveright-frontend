import { DatePicker as AntdDatePicker } from 'antd'
import moment, { Moment } from 'moment'

import { CalendarBoldIcon } from '../../../assets/media/icons'
import FormError from '../../forms/form-error/form-error.component'
import Error from '../error/error.component'
import Label from '../label/label.component'
import Styles from './date-picker.styles'

interface DatePickerProps {
  id: string
  placeholder?: string
  label?: string | JSX.Element
  className?: string
  value?: any
  onChange?: (date: Moment | null, dateStr: string) => void
  disabledDate?: (date: Moment) => boolean
  disabledFuture?: boolean
  disabledPast?: boolean
  error?: string
  format?: string
  name?: string
  disabled?: boolean
  defaultPickerValue?: any
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
}

export default function DatePicker({
  id,
  placeholder,
  label,
  className,
  value,
  onChange,
  disabledDate,
  disabledPast,
  disabledFuture,
  name,
  error,
  disabled,
  defaultPickerValue,
  format,
  picker
}: DatePickerProps) {
  return (
    <Styles className={className} $disabled={disabled}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <AntdDatePicker
        id={id}
        placeholder={placeholder}
        suffixIcon={<CalendarBoldIcon />}
        value={value ? moment(value) : null}
        onChange={onChange}
        disabledDate={
          disabledPast
            ? onDisablePast
            : disabledFuture
            ? onDisableFuture
            : disabledDate
        }
        disabled={disabled}
        defaultPickerValue={defaultPickerValue}
        format={format}
        picker={picker}
      />
      {name && <FormError name={name} className="field-error" />}
      {error && <Error name={error} />}
    </Styles>
  )
}

function onDisablePast(date: Moment): boolean {
  return date.isBefore(moment().startOf('day'))
}

function onDisableFuture(date: Moment): boolean {
  return date.isAfter(moment(), 'day')
}
