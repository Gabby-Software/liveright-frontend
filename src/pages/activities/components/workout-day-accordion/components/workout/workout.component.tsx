import { get } from 'lodash'
import { useMemo, useState } from 'react'
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

import {
  AddIcon,
  DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Error from '../../../../../../components/form/error/error.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import useTemplateWorkouts from '../../../../../../hooks/api/templates/useTemplateWorkouts'
import { getUniqueItemsByProperties } from '../../../../../../utils/arrays'
import Exercise from '../exercise/exercise.component'
import Superset from '../superset/superset.component'
import { Styles } from './workout.styles'

interface WorkoutProps {
  name: string
  index: number
  data?: any
  onRemove: any
}

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

export default function Workout({ name, onRemove, index }: WorkoutProps) {
  const [dropId] = useState(Date.now())

  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const dayName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const days = useWatch({
    name: `days`,
    control: methods.control
  })

  const { workouts } = useTemplateWorkouts()

  const { errors } = methods.formState

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

  const supersetIndexes = exercisesArray.fields
    .map((row: any, index) => (row.is_superset ? index : null))
    .filter((row) => row !== null)

  return (
    <Styles>
      <div className="Workout__header">
        <div className="subtitle">{dayName || `Workout ${index + 1}`}</div>

        <div className="Workout__header-checkbox-cell">
          <div className="Workout__header-checkbox-container">
            <Checkbox />
            <Label className="Workout__header-checkbox-label">
              Save workout as re-usable template
            </Label>
            <IconButton
              size="sm"
              className="Workout__header-checkbox-btn"
              onClick={onRemove}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="Workout__title">
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
      </div>

      <div className="Workout__schedule-container">
        <Controller
          name={`${name}.time`}
          render={({ field: { name, value } }) => (
            <TimePicker
              id="Workout-time"
              label="Schedule"
              placeholder="08:00"
              value={value}
              minuteStep={15}
              onChange={(e, date) => {
                methods.setValue(name, date)
              }}
            />
          )}
        />

        <Select
          disabled
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        />
      </div>

      <div className="Workout__exercises">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable-${dropId}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {!exercisesArray.fields.length ? (
                  <div>
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
                            <Superset
                              key={row.id}
                              name={`${name}.items.${index}`}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              isDragging={snapshot.isDragging}
                              innerRef={provided.innerRef}
                              onRemove={() => handleExerciseRemove(index)}
                              labelIndex={supersetIndexes.indexOf(index) + 1}
                            />
                          ) : (
                            <Exercise
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

        <div className="Workout__template">
          <Checkbox />
          <Label className="checkbox">
            Save exercise as re-usable template
          </Label>
        </div>
      </div>

      <div className="Workout__actions">
        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() => handleExerciseAdd(false)}
        >
          <AddIcon />
          Add Exercise
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() => handleExerciseAdd(supersetIndexes.length + 1)}
        >
          <AddIcon />
          Add Superset
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
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
  )
}
