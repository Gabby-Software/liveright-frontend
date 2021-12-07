import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Input from '../../../../components/form/input/input.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayAccordion from '../day-accordion/day-accordion.component'
import WorkoutDayForm from '../workout-day-form/workout-day-form.component'
import { Styles } from './workout-day-accordion.styles'

export default function WorkoutDayAccordion() {
  return (
    <DayAccordion
      title="High Intensity Workouts"
      icon={<WorkoutIcon />}
      iconColor={getColorCarry('orange_60')}
    >
      <Styles>
        <Input
          id="WorkoutDayAccordion-name"
          label="Workout Day Name"
          placeholder="Name"
          className="WorkoutDayAccordion__name-input"
        />

        <p className="WorkoutDayAccordion__subtitle">
          List workouts of this training plan
        </p>

        <WorkoutDayForm />
      </Styles>
    </DayAccordion>
  )
}
