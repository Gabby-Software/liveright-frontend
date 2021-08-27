import { TimePicker as AntdTimePicker } from 'antd'
import moment, { Moment } from 'moment'

import { ClockIcon } from '../../../assets/media/icons'
import { getDisabledHours, getDisabledMinutes } from '../../../utils/date'
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
  onChange,
  disabledUntilNow
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
        disabledHours={() => getDisabledHours(disabledUntilNow || false)}
        disabledMinutes={(hour) =>
          getDisabledMinutes(disabledUntilNow || false, hour)
        }
      />
    </Styles>
  )
}
