import { DatePicker as AntdDatePicker } from 'antd'
import moment, { Moment } from 'moment'

import { CalendarBoldIcon } from '../../../assets/media/icons'
import Label from '../label/label.component'
import Styles from './date-picker.styles'

interface DatePickerProps {
  id: string
  placeholder?: string
  label?: string
  className?: string
  value?: any
  onChange?: (date: Moment | null, dateStr: string) => void
}

export default function DatePicker({
  id,
  placeholder,
  label,
  className,
  value,
  onChange
}: DatePickerProps) {
  return (
    <Styles className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <AntdDatePicker
        id={id}
        placeholder={placeholder}
        suffixIcon={<CalendarBoldIcon />}
        value={value ? moment(value) : null}
        onChange={onChange}
      />
    </Styles>
  )
}
