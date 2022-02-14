import { get } from 'lodash'
import { useMemo, useRef } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Error from '../../../../../../components/form/error/error.component'
import Label from '../../../../../../components/form/label/label.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import useTemplateWorkouts from '../../../../../../hooks/api/templates/workouts/useTemplateWorkouts'
import { getUniqueItemsByProperties } from '../../../../../../utils/arrays'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import SupersetAccordion from '../superset-accordion/superset-accordion.component'
import { Styles } from './workout-accordion.styles'

interface WorkoutAccordionProps {
  name: string
  index: number
  onRemove: any
}

function createExercise(isSuperset: boolean | number, cardio: boolean) {
  const ex = {
    name: '',
    link: '',
    info: {
      type: cardio ? 'cardio' : 'strength',
      sets: '',
      reps: '',
      tempo: '',
      rest_interval: '',
      duration: '',
      intensity: ''
    },
    sort_order: isSuperset && 1
  }
  return {
    is_superset: isSuperset && true,
    save_as_template: false,
    data: isSuperset ? [ex] : ex
  }
}

export default function WorkoutAccordion({
  name,
  index,
  onRemove
}: WorkoutAccordionProps) {
  const dropId = useRef(Date.now())
  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const workoutName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const days = useWatch({
    name: `days`,
    control: methods.control
  })

  const { workouts } = useTemplateWorkouts()

  const { errors } = methods.formState

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const ssIndices = exercisesArray.fields
    .map((row: any, index) => (row.is_superset ? index : null))
    .filter((row) => row !== null)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    exercisesArray.move(result.source.index, (result.destination as any).index)
  }

  const handleExerciseAdd = (isSuperset: boolean | number, cardio = false) => {
    exercisesArray.append(createExercise(isSuperset, cardio))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
  }

  const onWorkoutNameSelected = (value: string) => {
    // find in templates
    let workout = workouts.find((w: any) => w.name === value)
    if (!workout) {
      // else not found, check in current TP
      const workoutsOfPlan = days?.reduce(
        (acc: any[], d: any) => [
          ...acc,
          ...(d.activities || d.training_plan_day.activities || [])
        ],
        []
      )
      workout = workoutsOfPlan.find((w: any) => w.name === value)
    }

    if (workout) {
      // if you just try to set workout as a whole, exercise fields i.e. exerciseArray would not update.
      methods.setValue(`${name}.name`, workout.name)
      methods.setValue(`${name}.time`, workout.time)
      exercisesArray.remove(
        Array(exercisesArray.fields.length)
          .fill(0)
          .reduce((acc, v, i) => [...acc, i], [])
      )
      exercisesArray.append(workout.items)
    }
  }

  const nameOptions = useMemo(() => {
    const workoutsOfPlan = days?.reduce(
      (acc: any[], d: any) => [
        ...acc,
        ...(d.activities || d.training_plan_day.activities || [])
      ],
      []
    )
    const planOptions = workoutsOfPlan
      ?.filter((w: any) => w.name)
      ?.map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const templateOptions = workouts.map((w: any) => ({
      label: w.name,
      value: w.name
    }))

    const options = []

    if (planOptions.length) {
      options.push({
        label: 'From this Training Plan',
        options: getUniqueItemsByProperties(planOptions, ['label'])
      })
    }

    if (templateOptions.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [days])

  return (
    <ItemAccordion
      title={workoutName || `Workout ${index + 1}`}
      onRemove={onRemove}
      content={
        <Styles>
          <div className="WorkoutAccordion__controls">
            <Controller
              name={`${name}.name`}
              render={({ field: { value, name } }) => (
                <AutoCompleteInput
                  id="Workout-title"
                  label="Title of workout"
                  placeholder="Title"
                  value={value === '' ? null : value}
                  onChange={(value) => methods.setValue(name, value)}
                  onSelect={onWorkoutNameSelected}
                  options={nameOptions}
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

            <Controller
              render={({ field: { value, name } }) => (
                <div className="WorkoutAccordion__checkbox-container">
                  <Checkbox
                    checked={value}
                    onChange={(e) => methods.setValue(name, e.target.checked)}
                  />
                  <Label className="WorkoutAccordion__checkbox">
                    Save Workout as template
                  </Label>
                </div>
              )}
              name={`${name}.save_as_template`}
            />

            {/* <Select
              disabled
              id="WorkoutAccordion__days"
              options={[]}
              value={{
                label: 'Apply to all days',
                value: 'Apply to all days'
              }}
            /> */}
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`droppable-${dropId}`}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {!exercisesArray.fields.length ? (
                    <div onClick={() => handleExerciseAdd(false)}>
                      <EmptyPlaceholder text="Add your exercises" spacing />
                    </div>
                  ) : (
                    <>
                      {exercisesArray.fields.map((row: any, index) => (
                        <Draggable
                          key={row.id}
                          draggableId={`${row.id}`}
                          isDragDisabled={row.is_superset}
                          index={index}
                        >
                          {(provided, snapshot) =>
                            row.is_superset ? (
                              <SupersetAccordion
                                key={row.id}
                                name={`${name}.items.${index}`}
                                dragHandleProps={provided.dragHandleProps}
                                draggableProps={provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                innerRef={provided.innerRef}
                                onRemove={() => handleExerciseRemove(index)}
                                labelIndex={ssIndices.indexOf(index) + 1}
                              />
                            ) : (
                              <ExerciseAccordion
                                key={row.id}
                                dragHandleProps={provided.dragHandleProps}
                                draggableProps={provided.draggableProps}
                                innerRef={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                name={`${name}.items.${index}.data`}
                                onRemove={() => handleExerciseRemove(index)}
                                prefix={
                                  index === 0 ||
                                  !!(exercisesArray.fields as any)[index - 1]
                                    ?.is_superset
                                }
                              />
                            )
                          }
                        </Draggable>
                      ))}
                    </>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="WorkoutAccordion__actions">
            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
              onClick={() => handleExerciseAdd(false)}
            >
              <AddIcon />
              Add Exercise
            </Button>

            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
              onClick={() => handleExerciseAdd(ssIndices.length + 1)}
            >
              <AddIcon />
              Add Superset
            </Button>

            <Button
              variant="text"
              size="sm"
              className="WorkoutAccordion__action-btn"
              onClick={() => handleExerciseAdd(false, true)}
            >
              <AddIcon />
              Add Cardio
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
