import get from 'lodash.get'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

import { AddIcon, SearchIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Error from '../../../../../../components/form/error/error.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './workout-accordion.styles'

interface WorkoutAccordionProps {
  name: string
  onRemove: any
}

function createExercise() {
  return {
    id: Date.now(),
    name: '',
    link: '',
    sort_order: '',
    // super_set: '',
    info: {
      steps: '',
      reps: '',
      tempo: '',
      rest_interval: ''
    }
  }
}

export default function WorkoutAccordion({
  name,
  onRemove
}: WorkoutAccordionProps) {
  const methods = useFormContext()
  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })
  const workoutName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const { errors } = methods.formState

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const handleExerciseAdd = () => {
    exercisesArray.append(createExercise())
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
    // methods.trigger(`${name}.items`)
  }

  return (
    <ItemAccordion
      title={workoutName}
      onRemove={onRemove}
      content={
        <Styles>
          <div className="WorkoutAccordion__controls">
            <Controller
              name={`${name}.name`}
              render={({ field: { name, value } }) => (
                <Input
                  id="WorkoutAccordion__name-workout"
                  label="Title of workout"
                  placeholder="Workout one"
                  suffix={<SearchIcon />}
                  className="WorkoutAccordion__control"
                  value={value}
                  onChange={(e) => onChange(name, e.target.value)}
                  error={get(errors, name)}
                />
              )}
            />

            <Controller
              name={`${name}.time`}
              render={({ field: { name, value } }) => (
                <TimePicker
                  id="WorkoutAccordion__time"
                  label="Schedule"
                  placeholder="08:00"
                  className="WorkoutAccordion__control"
                  value={value}
                  onChange={(e, date) => onChange(name, date)}
                  error={get(errors, name)}
                />
              )}
            />

            <Select
              disabled
              id="WorkoutAccordion__days"
              options={[]}
              value={{ label: 'Apply to all days', value: 'Apply to all days' }}
            />
          </div>

          <WorkoutSubtitle>Exercises</WorkoutSubtitle>

          <div>
            <div>
              {exercisesArray.fields.map((row: any, index) => (
                <ExerciseAccordion
                  key={index}
                  name={`${name}.items.${index}`}
                  onRemove={() => handleExerciseRemove(index)}
                />
              ))}
            </div>

            {/*<div>*/}
            {/*  <WorkoutSubtitle>Superset</WorkoutSubtitle>*/}

            {/*  <div>*/}
            {/*    {[1, 2].map((row) => (*/}
            {/*      <ExerciseAccordion key={row} />*/}
            {/*    ))}*/}
            {/*  </div>*/}

            {/*  <WorkoutSubtitle>End superset</WorkoutSubtitle>*/}
            {/*</div>*/}
          </div>

          <div className="WorkoutAccordion__actions">
            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
              onClick={() => handleExerciseAdd()}
            >
              <AddIcon />
              Add Exercise
            </Button>
            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
            >
              <AddIcon />
              Add Superset
            </Button>
          </div>

          {typeof get(errors, `${name}.items`) === 'object' &&
            !Array.isArray(get(errors, `${name}.items`)) && (
              <Error standalone="Add at least one exercise" />
            )}
        </Styles>
      }
    />
  )
}
