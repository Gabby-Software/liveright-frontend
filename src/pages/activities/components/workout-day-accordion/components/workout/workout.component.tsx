import get from 'lodash.get'
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
import Exercise from '../exercise/exercise.component'
import Superset from '../superset/superset.component'
import { Styles, WorkoutSubtitle } from './workout.styles'

interface WorkoutProps {
  name: string
  onRemove: any
}

function createExercise(isSuperset: boolean) {
  return {
    is_superset: isSuperset,
    data: [
      {
        name: '',
        link: '',
        info: {
          steps: '',
          reps: '',
          tempo: '',
          rest_interval: ''
        }
      }
    ]
  }
}

export default function Workout({ name, onRemove }: WorkoutProps) {
  const [dropId] = useState(Date.now())

  const methods = useFormContext()
  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    // console.log(result.source.index, (result.destination as any).index)
    exercisesArray.move(result.source.index, (result.destination as any).index)
  }

  const { errors } = methods.formState

  const handleExerciseAdd = (isSuperset: boolean) => {
    exercisesArray.append(createExercise(isSuperset))
    methods.clearErrors(`${name}.items`)
  }

  const handleExerciseRemove = (index: number) => {
    exercisesArray.remove(index)
  }

  return (
    <Styles>
      <div className="Workout__header">
        <Controller
          name={`${name}.name`}
          render={({ field: { name, value } }) => (
            <Input
              id="Workout-title"
              label="Title of workout"
              placeholder="Title"
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              error={get(errors, name)}
            />
          )}
        />

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

        <div className="Workout__header-schedule-container">
          <Controller
            name={`${name}.time`}
            render={({ field: { name, value } }) => (
              <TimePicker
                id="Workout-time"
                label="Schedule"
                placeholder="08:00"
                value={value}
                onChange={(e, date) => onChange(name, date)}
                error={get(errors, name)}
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
                  exercisesArray.fields.map((row: any, index) => {
                    return (
                      <Fragment key={row.id}>
                        <Draggable
                          draggableId={`${row.id}`}
                          index={index}
                          isDragDisabled={row.is_superset}
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
                              />
                            ) : (
                              <Exercise
                                key={row.id}
                                dragHandleProps={provided.dragHandleProps}
                                draggableProps={provided.draggableProps}
                                innerRef={provided.innerRef}
                                isDragging={snapshot.isDragging}
                                name={`${name}.items.${index}.data.0`}
                                onRemove={() => handleExerciseRemove(index)}
                                prefix={
                                  !!(exercisesArray.fields as any)[index - 1]
                                    ?.is_superset
                                }
                              />
                            )
                          }
                        </Draggable>
                      </Fragment>
                    )
                  })
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
          onClick={() => handleExerciseAdd(false)}
        >
          <AddIcon />
          Add Exercise
        </Button>

        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() => handleExerciseAdd(true)}
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
  )
}
