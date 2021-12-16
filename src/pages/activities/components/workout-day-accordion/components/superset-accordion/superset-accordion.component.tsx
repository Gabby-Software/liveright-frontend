import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './superset-accordion.styles'

interface SupersetAccordionProps {
  name: string
  onRemove: any
}

function createExercise() {
  return {
    name: '',
    link: '',
    info: {
      steps: '',
      reps: '',
      tempo: '',
      rest_interval: ''
    }
  }
}

export default function SupersetAccordion({
  name,
  onRemove
}: SupersetAccordionProps) {
  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.data`
  })

  const handleAddExercise = () => {
    exercisesArray.append(createExercise())
  }

  const handleRemoveExercise = (index: number) => {
    if (exercisesArray.fields.length === 1) {
      onRemove()
    } else {
      exercisesArray.remove(index)
    }
  }

  return (
    <Styles>
      <div>
        <WorkoutSubtitle>Superset</WorkoutSubtitle>
        <div>
          {exercisesArray.fields.map((r, index) => (
            <ExerciseAccordion
              key={r.id}
              name={`${name}.data.${index}`}
              onRemove={() => handleRemoveExercise(index)}
            />
          ))}
        </div>

        <div className="SupersetAccordion__actions">
          <Button
            variant="text"
            size="sm"
            className="SupersetAccordion__action-btn"
            onClick={handleAddExercise}
          >
            <AddIcon />
            Add Exercise
          </Button>
        </div>
      </div>
    </Styles>
  )
}
