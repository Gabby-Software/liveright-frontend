import { get } from 'lodash'
import { useState } from 'react'
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

import { AddIcon, DeleteOutlinedIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Error from '../../../../../components/form/error/error.component'
import TimePicker from '../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../components/placeholders'
import Exercise from '../../components/workout-day-accordion/exercise/exercise.component'
import Superset from '../../components/workout-day-accordion/superset/superset.component'
import { Styles } from './workout.styles'

interface WorkoutProps {
  name: string
  index: number
  data?: any
  onRemove: any
}

function createExercise(
  exerciseNo: number,
  isSuperset: boolean | number,
  cardio: boolean
) {
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
        name: `${exerciseNo}${isSuperset ? 'A' : ''}--`,
        link: '',
        info: {
          sets: '',
          reps: '',
          tempo: '',
          rest_interval: ''
        },
        sort_order: isSuperset && 1
      }
  return {
    is_superset: isSuperset && true,
    save_as_template: false,
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

  const workoutName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const { errors } = methods.formState

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    exercisesArray.move(result.source.index, (result.destination as any).index)
  }

  const handleExerciseAdd = (
    exerciseNo: number,
    isSuperset: boolean | number,
    cardio = false
  ) => {
    exercisesArray.append(createExercise(exerciseNo, isSuperset, cardio))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
  }

  const exerciseIndexes = exercisesArray.fields
    .map((row: any, index) => (!row.is_superset ? index : null))
    .filter((row) => row !== null)

  const supersetIndexes = exercisesArray.fields
    .map((row: any, index) => (row.is_superset ? index : null))
    .filter((row) => row !== null)

  return (
    <Styles>
      <div className="Workout__header">
        <div className="subtitle">{workoutName || `Workout ${index + 1}`}</div>

        <div className="Workout__header-checkbox-cell">
          <IconButton
            size="sm"
            className="Workout__header-checkbox-btn"
            onClick={onRemove}
          >
            <DeleteOutlinedIcon />
          </IconButton>
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
              // onSelect={onWorkoutNameSelected}
              options={[]}
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

        {/* <Select
          disabled
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        /> */}
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
      </div>

      <div className="Workout__actions">
        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() => handleExerciseAdd(exerciseIndexes.length + 1, false)}
        >
          <AddIcon />
          Add Exercise
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() => handleExerciseAdd(supersetIndexes.length + 1, true)}
        >
          <AddIcon />
          Add Superset
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() =>
            handleExerciseAdd(exerciseIndexes.length + 1, false, true)
          }
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
