import Input from '../../../../components/form/input/input.component'
import DayAccordion from '../day-accordion/day-accordion.component'
import Workout from './components/workout/workout.component'
import { Styles } from './workout-day-accordion.styles'

const WORKOUTS = [{ id: 1 }, { id: 2 }]

export default function WorkoutDayAccordion() {
  return (
    <DayAccordion title="High Intensity Workouts">
      <Styles>
        <Input
          id="WorkoutDayAccordion-name"
          label="Workout Day Name"
          placeholder="Name"
          className="WorkoutDayAccordion__name-input"
        />

        <div className="">
          <p className="WorkoutDayAccordion__subtitle">
            List workouts of this training plan
          </p>

          {WORKOUTS.map((row) => (
            <Workout key={row.id} />
          ))}
        </div>
      </Styles>
    </DayAccordion>
  )
}
