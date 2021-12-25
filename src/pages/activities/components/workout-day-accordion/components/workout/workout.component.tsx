import { get } from 'lodash'
import { Fragment, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import {
  AddIcon,
  DeleteOutlinedIcon,
  LockIcon,
  UnlockIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Error from '../../../../../../components/form/error/error.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import { InputSearch } from '../../../input-search/input-search.component'
import Exercise from '../exercise/exercise.component'
import Superset from '../superset/superset.component'
import { Styles, WorkoutSubtitle } from './workout.styles'

interface WorkoutProps {
  name: string
  index: number
  data?: any
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
        name: isSuperset ? '1A--' : '',
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

export default function Workout({ name, onRemove, index }: WorkoutProps) {
  const [dropId] = useState(Date.now())
  const [locked, setLocked] = useState(false)

  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const { errors } = methods.formState

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
  }

  const onNew = () => {}

  return (
    <Styles>
      <div className="Workout__header">
        <div className="subtitle">{`Workout ${index + 1}`}</div>

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
            <InputSearch
              id="Workout-title"
              label="Title of workout"
              placeholder="Title"
              value={value}
              onChange={(value) => methods.setValue(name, value)}
              onSearch={() => {}}
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

      <WorkoutSubtitle>Exercises</WorkoutSubtitle>

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
                    {exArray.map((row: any, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={`${row.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Exercise
                            key={row.id}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                            innerRef={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            name={`${name}.items.${exIndices[index]}.data`}
                            onRemove={() =>
                              handleExerciseRemove(exIndices[index])
                            }
                          />
                        )}
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

        {ssArray.map((row: any, index) => (
          <Superset
            key={row.id}
            onRemove={() => handleExerciseRemove(ssIndices[index])}
            name={`${name}.items.${ssIndices[index]}`}
          />
        ))}
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

        {ssArray.length === 0 ? (
          <Button
            variant="text"
            size="sm"
            className="Workout__action-btn"
            onClick={() => handleExerciseAdd(true)}
          >
            <AddIcon />
            Add Superset
          </Button>
        ) : (
          <Button
            variant={locked ? 'success' : 'danger'}
            size="sm"
            className="Workout__action-btn"
            onClick={() => setLocked(!locked)}
          >
            {locked ? <UnlockIcon /> : <LockIcon />}
            {locked ? 'Open Superset' : 'Close Superset'}
          </Button>
        )}

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
