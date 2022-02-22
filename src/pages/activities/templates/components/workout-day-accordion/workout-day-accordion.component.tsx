import { get } from 'lodash'
import {
  Controller,
  // useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

import { WorkoutIcon } from '../../../../../assets/media/icons/activities'
import AutoCompleteInput from '../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'
import DayAccordion from '../../../components/day-accordion/day-accordion.component'
import WorkoutDayForm from '../workout-day-form/workout-day-form.component'
import { Styles } from './workout-day-accordion.styles'

interface WorkoutDayAccordionProps {
  index: number
  onRemove: any
  editDay?: number
  defaultOpened?: boolean
}

export default function WorkoutDayAccordion({
  index,
  onRemove,
  defaultOpened
}: WorkoutDayAccordionProps) {
  const methods = useFormContext()

  const { errors } = methods.formState

  const workoutName = useWatch({
    name: `activities.${index}.name`,
    control: methods.control
  })

  const name = `activities.${index}.items`

  return (
    <DayAccordion
      title={workoutName}
      icon={<WorkoutIcon />}
      iconColor={getColorCarry('orange_60')}
      onRemove={onRemove}
      error={get(errors, `activities.${index}`) ? 'Enter all fields' : ''}
      defaultOpen={defaultOpened}
    >
      <Styles>
        <div className="WorkoutDayAccordion__header">
          <Controller
            name={`activities.${index}.name`}
            render={({ field: { name, value } }) => (
              <AutoCompleteInput
                id="WorkoutDayAccordion-name"
                label="Workout Name"
                placeholder="Name"
                value={value === '' ? null : value}
                onChange={(value) => methods.setValue(name, value)}
                options={[]}
                error={get(errors, name)}
              />
            )}
          />

          <Controller
            name={`activities.${index}.time`}
            render={({ field: { name, value } }) => (
              <TimePicker
                id="Workout-time"
                label="Schedule"
                placeholder="08:00"
                value={value}
                error={get(errors, name)}
                onChange={(e, date) => {
                  methods.setValue(name, date)
                }}
              />
            )}
          />
        </div>

        <WorkoutDayForm name={name} />
      </Styles>
    </DayAccordion>
  )
}
