import { AddIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Workout from '../workout-day-accordion/components/workout/workout.component'
import WorkoutAccordion from '../workout-day-accordion/components/workout-accordion/workout-accordion.component'
import { Styles } from './workout-day-form.styles'

export default function WorkoutDayForm() {
  const isMobile = useIsMobile()
  return (
    <Styles>
      {[1].map((row) =>
        isMobile ? <WorkoutAccordion key={row} /> : <Workout key={row} />
      )}

      <div className="WorkoutDayForm__add-workout">
        <AddIcon />
        Add Another Workout
      </div>
    </Styles>
  )
}
