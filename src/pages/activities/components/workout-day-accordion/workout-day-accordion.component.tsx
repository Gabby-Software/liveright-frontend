import { get } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Input from '../../../../components/form/input/input.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayAccordion from '../day-accordion/day-accordion.component'
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

  const dayName = useWatch({
    name: `days.${index}.name`,
    control: methods.control
  })

  const name = `days.${index}.activities`
  const days = useWatch({
    name,
    control: methods.control
  })

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  return (
    <DayAccordion
      title={dayName}
      icon={<WorkoutIcon />}
      iconColor={getColorCarry('orange_60')}
      onRemove={onRemove}
      error={get(errors, `days.${index}`) ? 'Enter all fields' : ''}
      defaultOpen={defaultOpened}
    >
      <Styles>
        {!!days.length && (
          <>
            <Controller
              name={`days.${index}.name`}
              render={({ field: { name, value } }) => (
                <Input
                  id="WorkoutDayAccordion-name"
                  label="Workout Day Name"
                  placeholder="Name"
                  className="WorkoutDayAccordion__name-input"
                  value={value}
                  onChange={(e) => onChange(name, e.target.value)}
                  error={get(errors, name)}
                />
              )}
            />

            <p className="WorkoutDayAccordion__subtitle">
              List workouts of this training plan
            </p>
          </>
        )}

        <WorkoutDayForm name={name} />
      </Styles>
    </DayAccordion>
  )
}
