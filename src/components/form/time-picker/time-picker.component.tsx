import { TimePicker as AntdTimePicker } from 'antd'
import moment, { Moment } from 'moment'

import { ClockIcon } from '../../../assets/media/icons'
import Label from '../label/label.component'
import Styles from './time-picker.styles'

interface TimePickerProps {
  id: string
  label?: string
  placeholder?: string
  value?: any
  className?: string
  disabled?: boolean
  disabledUntilNow?: boolean
  onChange?: (date: Moment | null, dateStr: string) => void
}

const format = 'H:mm'

export default function TimePicker({
  id,
  label,
  className,
  value,
  disabled,
  onChange
}: TimePickerProps) {
  return (
    <Styles className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <AntdTimePicker
        suffixIcon={<ClockIcon />}
        disabled={disabled}
        value={value ? moment(value, format) : null}
        onChange={onChange}
        format={format}
      />
    </Styles>
  )
}
