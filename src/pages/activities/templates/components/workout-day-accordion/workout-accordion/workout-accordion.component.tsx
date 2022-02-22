import { get } from 'lodash'
import { useRef } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Error from '../../../../../../components/form/error/error.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import ItemAccordion from '../../../../components/item-accordion/item-accordion.component'
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
    ...(isSuperset ? { sort_order: 1 } : {})
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
    exercisesArray.append(createExercise(isSuperset, cardio))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
  }

  return (
    <ItemAccordion
      title={workoutName || `Workout ${index + 1}`}
      onRemove={onRemove}
      content={
        <Styles>
          {/* <div className="WorkoutAccordion__controls"> */}
          {/* <Controller
              name={`${name}.name`}
              render={({ field: { value, name } }) => (
                <AutoCompleteInput
                  id="Workout-title"
                  label="Title of workout"
                  placeholder="Title"
                  value={value === '' ? null : value}
                  onChange={(value) => methods.setValue(name, value)}
                  options={[]}
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
            /> */}

          {/* <Select
              disabled
              id="WorkoutAccordion__days"
              options={[]}
              value={{
                label: 'Apply to all days',
                value: 'Apply to all days'
              }}
            /> */}
          {/* </div> */}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`droppable-${dropId}`}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {!exercisesArray.fields.length ? (
                    <div
                      onClick={() =>
                        handleExerciseAdd(
                          exercisesArray.fields.length + 1,
                          false
                        )
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
                                labelIndex={index + 1}
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

          <div className="WorkoutAccordion__actions">
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
      }
    />
  )
}
