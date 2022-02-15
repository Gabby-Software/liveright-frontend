import { get } from 'lodash'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import Select from '../../../../../components/form/select/select.component'
import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import TimeInput from '../../../../../components/form/TimeInput/time-input.component'
import { Styles } from './cardio-edit.styles'

interface CardioEditProps {
  data: any
  name: string
  onClose?: (result?: any) => void
}
const CardioEdit = ({ name, onClose }: CardioEditProps) => {
  const methods = useFormContext()

  const onChange = (name: string, value: string | boolean) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const result = useWatch({ name, control: methods.control })

  const { errors } = methods.formState

  return (
    <Styles>
      <section className="exercise-input">
        <Controller
          name={`${name}.name`}
          render={({ field: { name, value } }) => (
            <Input
              id="cardio-name"
              label="Cardio name"
              placeholder="Exersice"
              value={value}
              onChange={(e) => {
                onChange(name, e.target.value)
              }}
              error={get(errors, name)}
              ErrorProps={{ size: 'sm' }}
            />
          )}
        />

        <Controller
          name={`${name}.info.duration`}
          render={({ field: { name, value } }) => (
            <TimeInput
              id="cardio-duration"
              label="Duration"
              placeholder="hh:mm"
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              error={get(errors, name)}
              ErrorProps={{ size: 'sm' }}
              format="HH:mm"
              tooltip="Cardio duration in hours and minutes"
            />
          )}
        />

        <Controller
          name={`${name}.info.intensity`}
          render={({ field: { value, name } }) => (
            <Select
              label="Intensity"
              id="cardio-intensity"
              value={value}
              onChange={(value) => methods.setValue(name, value)}
              options={[
                { label: 'Relaxed', value: 'Relaxed' },
                { label: 'Moderate', value: 'Moderate' },
                { label: 'Intense', value: 'Intense' }
              ]}
            />
          )}
        />

        <Controller
          name={`${name}.info.avg_heart_rate`}
          render={({ field: { value, name } }) => (
            <Input
              id="Avg-heart-rate"
              type="number"
              label="Average Heart Rate"
              placeholder="Heart Rate"
              value={value}
              onChange={(e) => {
                onChange(name, e.target.value)
              }}
              error={get(errors, name)}
              ErrorProps={{ size: 'sm' }}
            />
          )}
        />

        <Controller
          name={`${name}.schedule`}
          render={({ field: { name, value } }) => (
            <TimePicker
              id="Workout-time"
              label="Schedule"
              placeholder="08:00"
              value={value}
              className="schedule-time-picker"
              minuteStep={15}
              onChange={(e, date) => {
                methods.setValue(name, date)
              }}
            />
          )}
        />
      </section>

      <section className="save-action">
        <Button
          onClick={() => {
            onClose?.(result)
            methods.setValue(name, {})
          }}
          className="action"
        >
          Save
        </Button>
      </section>
    </Styles>
  )
}

export default CardioEdit
