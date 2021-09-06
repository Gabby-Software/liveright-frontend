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
  label?: string
  className?: string
  value?: any
  onChange?: (date: Moment | null, dateStr: string) => void
  disabledDate?: (date: Moment) => boolean
  disabledPast?: boolean
  error?: string
  name?: string
  disabled?: boolean
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
  name,
  error,
  disabled
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
        disabledDate={disabledPast ? onDisablePast : disabledDate}
        disabled={disabled}
      />
      {name && <FormError name={name} className="field-error" />}
      {error && <Error name={error} />}
    </Styles>
  )
}

function onDisablePast(date: Moment): boolean {
  return date.isBefore(moment().startOf('day'))
}
