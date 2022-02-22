import { get } from 'lodash'
import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Error from '../../../../../../components/form/error/error.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
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
    ...(isSuperset ? { sort_order: 1 } : {})
  }
  return {
    is_superset: isSuperset && true,
    save_as_template: false,
    data: isSuperset ? [ex] : ex
  }
}

export default function Workout({ name }: WorkoutProps) {
  const [dropId] = useState(Date.now())

  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}`
  })

  const { errors } = methods.formState

  const onDragEnd = (result: DropResult) => {
    console.log('result', result)
    if (!result.destination) {
      return
    }

    exercisesArray.swap(result.source.index, (result.destination as any).index)
  }

  const handleExerciseAdd = (
    exerciseNo: number,
    isSuperset: boolean | number,
    cardio = false
  ) => {
    exercisesArray.append(createExercise(isSuperset, cardio))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
  }

  // const resetPrefixValues = () => {
  //   const values: any[] = methods.getValues(name)
  //   // get values and re-order the prefix values i.e 1A, 1B etc.
  //   values.forEach((v, i) => {
  //     if (v.is_superset) {
  //       v.data.forEach((v: any, idx: number) => {
  //         // const suf = String(v.name).split('--')[1]
  //         methods.setValue(
  //           `${name}.${i}.data.${idx}.name`,
  //           // `${i + 1}${String.fromCharCode(65 + idx)}--${suf}`
  //           ''
  //         )
  //       })
  //     } else {
  //       // const suf = String(v.data.name).split('--')[1]
  //       methods.setValue(`${name}.${i}.data.name`, '')
  //     }
  //   })
  // }

  return (
    <Styles>
      {/* <div className="Workout__header">
        <div className="subtitle">{workoutName || `Workout ${index + 1}`}</div>

        <div className="Workout__header-checkbox-cell">
          <div className="Workout__header-checkbox-container">
            <Controller
              render={({ field: { value, name } }) => (
                <div className="Workout__checkbox-container">
                  <Checkbox
                    checked={value}
                    onChange={(e) => methods.setValue(name, e.target.checked)}
                  />
                  <Label className="Workout__checkbox">
                    Save Workout as template
                  </Label>
                </div>
              )}
              name={`${name}.save_as_template`}
            />
          </div>
          <IconButton
            size="sm"
            className="Workout__header-checkbox-btn"
            onClick={onRemove}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </div>
      </div> */}

      {/* <div className="Workout__title">
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
      </div> */}

      {/* <div className="Workout__schedule-container">
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
        /> */}

      {/* <Select
          disabled
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        /> */}
      {/* </div> */}

      <div className="Workout__exercises">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable-${dropId}`} type="Exercise">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {!exercisesArray.fields.length ? (
                  <div
                    className="Workout__exercises__addExercise"
                    onClick={() =>
                      handleExerciseAdd(exercisesArray.fields.length + 1, false)
                    }
                  >
                    <EmptyPlaceholder text="Add your exercises" spacing />
                  </div>
                ) : (
                  <>
                    {exercisesArray.fields.map((row: any, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={`${row.id}`}
                        // isDragDisabled={row.is_superset}
                        index={index}
                      >
                        {(provided, snapshot) =>
                          row.is_superset ? (
                            <Superset
                              key={row.id}
                              name={`${name}.${index}`}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              isDragging={snapshot.isDragging}
                              innerRef={provided.innerRef}
                              onRemove={() => handleExerciseRemove(index)}
                              labelIndex={index + 1}
                            />
                          ) : (
                            <Exercise
                              key={row.id}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              innerRef={provided.innerRef}
                              isDragging={snapshot.isDragging}
                              name={`${name}.${index}.data`}
                              onRemove={() => handleExerciseRemove(index)}
                              prefix={
                                index === 0 ||
                                !!(exercisesArray.fields as any)[index - 1]
                                  ?.is_superset
                              }
                              labelIndex={index + 1}
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
          onClick={() =>
            handleExerciseAdd(exercisesArray.fields.length + 1, false)
          }
        >
          <AddIcon />
          Add Exercise
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() =>
            handleExerciseAdd(exercisesArray.fields.length + 1, true)
          }
        >
          <AddIcon />
          Add Superset
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() =>
            handleExerciseAdd(exercisesArray.fields.length + 1, false, true)
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
