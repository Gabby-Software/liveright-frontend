import { get } from 'lodash'
import { useFieldArray, useFormContext } from 'react-hook-form'

// import { AddIcon } from '../../../../assets/media/icons'
import Error from '../../../../../components/form/error/error.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import Workout from '../workout-day-accordion/workout/workout.component'
import WorkoutAccordion from '../workout-day-accordion/workout-accordion/workout-accordion.component'
import { Styles } from './workout-day-form.styles'

interface WorkoutDayFormProps {
  name: string
}

export default function WorkoutDayForm({ name }: WorkoutDayFormProps) {
  const isMobile = useIsMobile()

  const methods = useFormContext()

  const workoutsArray = useFieldArray({
    control: methods.control,
    name
  })

  const handleDayRemove = (index: number) => {
    workoutsArray.remove(index)
  }

  const { errors } = methods.formState

  return (
    <Styles>
      {isMobile ? (
        <WorkoutAccordion
          index={0}
          name={`${name}`}
          onRemove={() => handleDayRemove(0)}
        />
      ) : (
        <Workout
          index={0}
          name={`${name}`}
          onRemove={() => handleDayRemove(0)}
        />
      )}

      {typeof get(errors, name) === 'object' &&
        !Array.isArray(get(errors, name)) && (
          <Error standalone="Add at least one workout" />
        )}
    </Styles>
  )
}
