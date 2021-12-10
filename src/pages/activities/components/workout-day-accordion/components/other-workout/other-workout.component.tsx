import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import Exercise from '../exercise/exercise.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './other-workout.styles'

export default function OtherWorkout() {
  const isMobile = useIsMobile()
  return (
    <Styles>
      <WorkoutSubtitle>Exercises</WorkoutSubtitle>

      {[1, 2].map((row) =>
        isMobile ? (
          <ExerciseAccordion />
        ) : (
          <Exercise
            name=""
            onRemove={() => {}}
            key={row}
            dragHandleProps={{}}
            isDragging={false}
            draggableProps={{}}
          />
        )
      )}

      <div className="OtherWorkout__actions">
        <Button variant="text" size="sm" className="OtherWorkout__action-btn">
          <AddIcon />
          Add Exercise
        </Button>
      </div>
    </Styles>
  )
}
