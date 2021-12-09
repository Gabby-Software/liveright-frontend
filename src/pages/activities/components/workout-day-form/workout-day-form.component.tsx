import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Workout from '../workout-day-accordion/components/workout/workout.component'
import WorkoutAccordion from '../workout-day-accordion/components/workout-accordion/workout-accordion.component'
import { Styles } from './workout-day-form.styles'

interface WorkoutDayFormProps {
  name: string
}

function createWorkout() {
  return {
    id: Date.now(),
    name: '',
    time: '',
    sort_order: '',
    items: []
  }
}

export default function WorkoutDayForm({ name }: WorkoutDayFormProps) {
  const isMobile = useIsMobile()

  const methods = useFormContext()

  const workoutsArray = useFieldArray({
    control: methods.control,
    name
  })

  return (
    <Styles>
      {workoutsArray.fields.map((row, index) =>
        isMobile ? (
          <WorkoutAccordion key={row.id} />
        ) : (
          <Workout
            key={row.id}
            name={`${name}.${index}`}
            onRemove={() => workoutsArray.remove(index)}
          />
        )
      )}

      <div
        className="WorkoutDayForm__add-workout"
        onClick={() => workoutsArray.append(createWorkout())}
      >
        <AddIcon />
        Add Another Workout
      </div>
    </Styles>
  )
}
