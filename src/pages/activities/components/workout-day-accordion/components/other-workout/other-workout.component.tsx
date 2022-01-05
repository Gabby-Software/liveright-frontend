import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import Exercise from '../exercise/exercise.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './other-workout.styles'

function createExercise(isSuperset: boolean | number, cardio: boolean) {
  const ex = cardio
    ? {
        name: '',
        info: {
          cardio: true,
          duration: '00:10',
          intensity: 'Moderate'
        }
      }
    : {
        name: isSuperset ? `${isSuperset}A--` : '',
        link: '',
        info: {
          sets: '',
          reps: '',
          tempo: '',
          rest_interval: ''
        }
      }
  return {
    is_superset: isSuperset && true,
    data: isSuperset ? [ex] : ex
  }
}
interface IProps {
  name: string
}

export default function OtherWorkout({ name }: IProps) {
  const isMobile = useIsMobile()

  const methods = useFormContext()
  const exercises = useFieldArray({
    control: methods.control,
    name
  })

  const handleExerciseAdd = (isSuperset: boolean | number, cardio = false) => {
    exercises.append(createExercise(isSuperset, cardio))
  }

  const handleExerciseRemove = (index: number) => {
    exercises.remove(index)
  }

  return (
    <Styles>
      <WorkoutSubtitle>Exercises</WorkoutSubtitle>

      {exercises.fields.map((row, index) =>
        isMobile ? (
          <ExerciseAccordion
            name={`${name}.${index}.data`}
            onRemove={() => handleExerciseRemove(index)}
            key={row.id}
            dragHandleProps={{}}
            isDragging={false}
            draggableProps={{}}
          />
        ) : (
          <Exercise
            name={`${name}.${index}.data`}
            onRemove={() => handleExerciseRemove(index)}
            key={row.id}
            dragHandleProps={{}}
            isDragging={false}
            draggableProps={{}}
          />
        )
      )}

      <div className="OtherWorkout__actions">
        <Button
          variant="text"
          size="sm"
          className="OtherWorkout__action-btn"
          onClick={handleExerciseAdd}
        >
          <AddIcon />
          Add Exercise
        </Button>
      </div>
    </Styles>
  )
}
