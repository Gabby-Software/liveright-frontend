import { get } from 'lodash'
import { useRef, useState } from 'react'
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
  LockIcon,
  UnlockIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Error from '../../../../../../components/form/error/error.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { InputSearch } from '../../../input-search/input-search.component'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import SupersetAccordion from '../superset-accordion/superset-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './workout-accordion.styles'

interface WorkoutAccordionProps {
  name: string
  onRemove: any
}

function createExercise(isSuperset: boolean, cardio: boolean) {
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
        name: '',
        link: '',
        info: {
          sets: '',
          reps: '',
          tempo: '',
          rest_interval: ''
        }
      }
  return {
    is_superset: isSuperset,
    data: isSuperset ? [ex] : ex
  }
}

export default function WorkoutAccordion({
  name,
  onRemove
}: WorkoutAccordionProps) {
  const dropId = useRef(Date.now())
  const [ssLocked, setSsLocked] = useState(true)
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

  const exArray = exercisesArray.fields.filter((item: any) => !item.is_superset)
  const ssArray = exercisesArray.fields.filter((item: any) => item.is_superset)
  const exIndices: number[] = []
  const ssIndices: number[] = []
  exercisesArray.fields.forEach((item: any, idx: number) => {
    if (item.is_superset) {
      ssIndices.push(idx)
    } else {
      exIndices.push(idx)
    }
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    exercisesArray.move(
      exIndices[result.source.index],
      exIndices[(result.destination as any).index]
    )
  }

  const handleExerciseAdd = (isSuperset: boolean, cardio = false) => {
    exercisesArray.append(createExercise(isSuperset, cardio))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
    // methods.trigger(`${name}.items`)
  }

  const onNew = () => {}

  return (
    <ItemAccordion
      title={workoutName}
      onRemove={onRemove}
      content={
        <Styles>
          {!!exercisesArray.fields.length && (
            <>
              <div className="WorkoutAccordion__controls">
                <Controller
                  name={`${name}.name`}
                  render={({ field: { value, name } }) => (
                    <InputSearch
                      id="Workout-title"
                      label="Title of workout"
                      placeholder="Workout one"
                      value={value}
                      onChange={(value) => methods.setValue(name, value)}
                      onSearch={() => {}}
                      forceDesktop
                      options={[
                        { label: value, value: value },
                        {
                          value: 'existing',
                          label: 'From this training plan',
                          color: '#0052CC',
                          isDisabled: true
                        },
                        {
                          value: 'Full Body Workout',
                          label: 'Full Body Workout',
                          color: '#5243AA'
                        },
                        {
                          value: 'template',
                          label: 'From templates',
                          color: '#0052CC',
                          isDisabled: true
                        },
                        {
                          value: 'Smooth Workout',
                          label: 'Smooth Workout',
                          color: '#FF8B00'
                        },
                        {
                          value: 'Another Workout',
                          label: 'Another Workout',
                          color: '#36B37E'
                        },
                        {
                          value: 'Another Workout',
                          label: (
                            <Button
                              variant="text"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 0
                              }}
                              onClick={onNew}
                            >
                              <AddIcon />
                              &nbsp; Create New
                            </Button>
                          ),
                          color: '#36B37E'
                        }
                      ]}
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
                  value={{
                    label: 'Apply to all days',
                    value: 'Apply to all days'
                  }}
                />
              </div>
            </>
          )}

          {exArray && !!exArray.length && (
            <WorkoutSubtitle>Exercises</WorkoutSubtitle>
          )}
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={`droppable-${dropId.current}`}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {exArray.map((row: any, index: number) => (
                      <Draggable
                        key={row.id}
                        draggableId={`${row.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <ExerciseAccordion
                            key={row.id}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                            innerRef={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            name={`${name}.items.${exIndices[index]}.data`}
                            onRemove={() =>
                              handleExerciseRemove(exIndices[index])
                            }
                            borderBottom={index === exArray.length - 1}
                          />
                        )}
                      </Draggable>
                    ))}
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
              {!ssArray.length && (
                <Button
                  variant="text"
                  size="sm"
                  className="WorkoutAccordion__action-btn"
                  onClick={() => handleExerciseAdd(true)}
                >
                  <AddIcon />
                  Add Superset
                </Button>
              )}
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

            {ssArray.map((row: any, index: number) => (
              <SupersetAccordion
                key={row.id}
                locked={ssLocked}
                name={`${name}.items.${ssIndices[index]}`}
                onRemove={() => handleExerciseRemove(ssIndices[index])}
              />
            ))}
            {!!ssArray.length && (
              <div className="WorkoutAccordion__actions">
                <Button
                  variant="text"
                  size="sm"
                  className={`WorkoutAccordion__action-btn ${
                    ssLocked ? 'open-superset' : 'close-superset'
                  }`}
                  onClick={() => setSsLocked((locked) => !locked)}
                >
                  {ssLocked ? <UnlockIcon /> : <LockIcon />}
                  {ssLocked ? 'Open Superset' : 'Close Superset'}
                </Button>
              </div>
            )}
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
