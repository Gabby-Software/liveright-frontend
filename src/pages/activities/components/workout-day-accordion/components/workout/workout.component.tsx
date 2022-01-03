import { get } from 'lodash'
import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

import {
  AddIcon,
  DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Error from '../../../../../../components/form/error/error.component'
import Input from '../../../../../../components/form/input/input.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import { InputSearch } from '../../../input-search/input-search.component'
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
  const [addNew, setAddNew] = useState(false)

  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

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

  const supersetIndexes = exercisesArray.fields
    .map((row: any, index) => (row.is_superset ? index : null))
    .filter((row) => row !== null)

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
          render={({ field: { value, name } }) => {
            if (addNew) {
              return (
                <Input
                  id="Workout-title"
                  label="Title of workout"
                  placeholder="Title"
                  value={value}
                  onChange={(e) => methods.setValue(name, e.target.value)}
                />
              )
            }
            return (
              <InputSearch
                id="Workout-title"
                label="Title of workout"
                placeholder="Title"
                value={value === '' ? null : value}
                onChange={(value) => {
                  if (value === 'add_new') {
                    methods.setValue(name, '')
                    setAddNew(true)
                  } else {
                    methods.setValue(name, value)
                  }
                }}
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
                    value: 'add_new',
                    label: (
                      <Button
                        size="sm"
                        variant="text"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 0
                        }}
                      >
                        <AddIcon />
                        &nbsp; Create New
                      </Button>
                    ),
                    color: '#36B37E'
                  }
                ]}
              />
            )
          }}
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
