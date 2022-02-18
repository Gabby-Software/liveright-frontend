import { get } from 'lodash'
import { useCallback, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import Select from '../../../../../components/form/select/select.component'
// import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import TimeInput from '../../../../../components/form/TimeInput/time-input.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { Styles } from './cardio-edit.styles'

interface CardioEditProps {
  data: any
  name: string
  onClose?: () => void
}
const CardioEdit = ({ name, onClose }: CardioEditProps) => {
  const methods = useFormContext()

  const isMobile = useIsMobile()

  const onChange = (name: string, value: string | boolean) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const { errors } = methods.formState

  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])

  console.log('getValues', methods.getValues())

  return (
    <Styles>
      <section className="exercise-input">
        <Controller
          name={`${name}.name`}
          render={({ field: { name, value } }) => (
            <Input
              id="cardio-name"
              label="Cardio name"
              placeholder="-"
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
              placeholder="--:--"
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
              onChange={(value) => {
                // Workaround to update selected value on mobile
                isMobile && forceUpdate()
                methods.setValue(name, value)
              }}
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
              label="Average heart rate (bpm)"
              placeholder="-"
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
          name={`${name}.info.schedule`}
          render={({ field: { name, value } }) => (
            <TimeInput
              id="Workout-time"
              label="Schedule"
              placeholder="--:--"
              value={value}
              className="schedule-time-picker"
              format="HH:mm"
              onChange={(e) => onChange(name, e.target.value)}
            />
          )}
        />
      </section>

      <section className="save-action">
        <Button onClick={onClose} className="action">
          Save
        </Button>
      </section>
    </Styles>
  )
}

export default CardioEdit
