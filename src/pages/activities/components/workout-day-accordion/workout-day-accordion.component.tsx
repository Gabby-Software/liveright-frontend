import { AddIcon } from '../../../../assets/media/icons'
import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Input from '../../../../components/form/input/input.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayAccordion from '../day-accordion/day-accordion.component'
import Workout from './components/workout/workout.component'
import WorkoutAccordion from './components/workout-accordion/workout-accordion.component'
import { Styles } from './workout-day-accordion.styles'

const WORKOUTS = [{ id: 1 }, { id: 2 }]

export default function WorkoutDayAccordion() {
  const isMobile = useIsMobile()
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

        <div className="">
          <p className="WorkoutDayAccordion__subtitle">
            List workouts of this training plan
          </p>

          {WORKOUTS.map((row) =>
            isMobile ? (
              <WorkoutAccordion key={row.id} />
            ) : (
              <Workout key={row.id} />
            )
          )}

          <div className="WorkoutDayAccordion__add-workout">
            <AddIcon />
            Add Another Workout
          </div>
        </div>
      </Styles>
    </DayAccordion>
  )
}
