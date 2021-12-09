import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Exercise from '../exercise/exercise.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './other-workout.styles'

export default function OtherWorkout() {
  return (
    <Styles>
      <WorkoutSubtitle>Exercises</WorkoutSubtitle>

      {[1, 2].map((row) => (
        <Exercise
          name=""
          onRemove={() => {}}
          key={row}
          dragHandleProps={{}}
          isDragging={false}
          draggableProps={{}}
        />
      ))}

      <div className="OtherWorkout__actions">
        <Button variant="text" size="sm" className="OtherWorkout__action-btn">
          <AddIcon />
          Add Exercise
        </Button>
      </div>
    </Styles>
  )
}
