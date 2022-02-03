import { get } from 'lodash'
import { useFieldArray, useFormContext } from 'react-hook-form'

// import { AddIcon } from '../../../../assets/media/icons'
import Error from '../../../../components/form/error/error.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Workout from '../workout-day-accordion/components/workout/workout.component'
import WorkoutAccordion from '../workout-day-accordion/components/workout-accordion/workout-accordion.component'
import { Styles } from './workout-day-form.styles'

interface WorkoutDayFormProps {
  name: string
}

// function createWorkout() {
//   return {
//     id: Date.now(),
//     name: '',
//     time: '',
//     sort_order: '',
//     save_as_template: false,
//     items: []
//   }
// }

export default function WorkoutDayForm({ name }: WorkoutDayFormProps) {
  const isMobile = useIsMobile()

  const methods = useFormContext()

  const workoutsArray = useFieldArray({
    control: methods.control,
    name
  })

  // const handleDayAdd = () => {
  //   workoutsArray.append(createWorkout())
  //   methods.clearErrors(name)
  // }

  const handleDayRemove = (index: number) => {
    workoutsArray.remove(index)
    // methods.trigger(name)
  }

  const { errors } = methods.formState

  return (
    <Styles>
      {/* {workoutsArray.fields.map((row, index) =>
        isMobile ? (
          <WorkoutAccordion
            key={row.id}
            index={index}
            name={`${name}.${index}`}
            onRemove={() => handleDayRemove(index)}
          />
        ) : (
          <Workout
            key={row.id}
            index={index}
            name={`${name}.${index}`}
            onRemove={() => handleDayRemove(index)}
          />
        )
      )} */}

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

      {/* <div
        className="WorkoutDayForm__add-workout"
        onClick={() => handleDayAdd()}
      >
        <AddIcon />
        Add Another Workout
      </div> */}

      {typeof get(errors, name) === 'object' &&
        !Array.isArray(get(errors, name)) && (
          <Error standalone="Add at least one workout" />
        )}
    </Styles>
  )
}
