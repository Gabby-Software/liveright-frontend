import { get } from 'lodash'
import { useEffect } from 'react'
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm
} from 'react-hook-form'
import { useParams } from 'react-router'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import GoBack from '../../../../../components/buttons/go-back/go-back.component'
import AutoCompleteInput from '../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Error from '../../../../../components/form/error/error.component'
import useTemplateWorkoutDay from '../../../../../hooks/api/templates/workout-days/useTemplateWorkoutDay'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import WorkoutAccordion from '../../../components/workout-day-accordion/components/workout-accordion/workout-accordion.component'
import Workout from './workout.component'
import Styles, { WorkoutDayStyles } from './workout-day-template-form.styles'

interface IProps {
  name: string
  onClose: () => void
}

const defaultValues = {
  name: '',
  activities: []
}

function createWorkout() {
  return {
    id: Date.now(),
    name: '',
    time: '',
    sort_order: '',
    save_as_template: false,
    items: []
  }
}

export default function WorkoutDayTemplateForm({ name, onClose }: IProps) {
  const isMobile = useIsMobile()
  const methods = useForm<any>({
    defaultValues
  })

  const workoutsArray = useFieldArray({
    control: methods.control,
    name: `activities`
  })

  const { id } = useParams<any>()
  const { workoutDay, onEdit } = useTemplateWorkoutDay(id)

  useEffect(() => {
    if (workoutDay._id) {
      console.log('workoutDay', workoutDay)
      methods.setValue('name', workoutDay.name)
      workoutsArray.remove(
        Array(workoutsArray.fields.length)
          .fill(1)
          .map((v, i) => i)
      )
      workoutsArray.append(workoutDay.activities)
      console.log('workoutsArray', workoutsArray)
    }
  }, [workoutDay._id])

  const { errors } = methods.formState

  const handleDayAdd = () => {
    workoutsArray.append(createWorkout())
    methods.clearErrors(name)
  }

  const handleDayRemove = (index: number) => {
    workoutsArray.remove(index)
    // methods.trigger(name)
  }

  const handleSave = () => {
    methods.handleSubmit((values) => onEdit(id, values, () => onClose()))()
  }

  return (
    <FormProvider {...methods}>
      <Styles>
        <GoBack onClick={onClose}>{'Go Back to Overview'}</GoBack>
        <h1 className="Title">Editing Workout Day Template</h1>
        <WorkoutDayStyles>
          <div className="WorkoutDay__header">
            <div className="WorkoutDay__header-title">
              <div className="subtitle">{workoutDay?.name}</div>
            </div>

            <div className="WorkoutDay__header-checkbox-cell">
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>

          <div className="WorkoutDay__title">
            <Controller
              name={`name`}
              render={({ field: { value, name } }) => (
                <AutoCompleteInput
                  id="Workout-title"
                  label="Workout Day Name"
                  placeholder="Workout Day Name"
                  value={value === '' ? null : value}
                  onChange={(value) => methods.setValue(name, value)}
                  options={[]}
                />
              )}
            />
          </div>

          {workoutsArray.fields.map((row, index) =>
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
          )}

          <div
            className="WorkoutDayTemplateForm__add-workout"
            onClick={() => handleDayAdd()}
          >
            <AddIcon />
            Add Another Workout
          </div>

          {typeof get(errors, name) === 'object' &&
            !Array.isArray(get(errors, name)) && (
              <Error standalone="Add at least one workout" />
            )}
        </WorkoutDayStyles>
      </Styles>
    </FormProvider>
  )
}
