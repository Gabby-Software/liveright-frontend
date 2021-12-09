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
}

export default function WorkoutDayAccordion({
  index,
  onRemove
}: WorkoutDayAccordionProps) {
  const methods = useFormContext()

  const dayName = useWatch({
    name: `days.${index}.name`,
    control: methods.control
  })

  return (
    <DayAccordion
      title={dayName}
      icon={<WorkoutIcon />}
      iconColor={getColorCarry('orange_60')}
      onRemove={onRemove}
    >
      <Styles>
        <Controller
          name={`days.${index}.name`}
          render={({ field: { name, value } }) => (
            <Input
              id="WorkoutDayAccordion-name"
              label="Workout Day Name"
              placeholder="Name"
              className="WorkoutDayAccordion__name-input"
              value={value}
              onChange={(e) => methods.setValue(name, e.target.value)}
            />
          )}
        />

        <p className="WorkoutDayAccordion__subtitle">
          List workouts of this training plan
        </p>

        <WorkoutDayForm name={`days.${index}.activities`} />
      </Styles>
    </DayAccordion>
  )
}
