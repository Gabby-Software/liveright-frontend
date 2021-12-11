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
  DeleteOutlinedIcon,
  LockIcon,
  UnlockIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
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

export default function Workout({ name, onRemove, index }: WorkoutProps) {
  const [dropId] = useState(Date.now())
  const [locked, setLocked] = useState(false)

  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    exercisesArray.swap(result.source.index, (result.destination as any).index)
  }

  const exArray = exercisesArray.fields.filter(
    (item: any) => !Array.isArray(item.data)
  )
  const ssArray = exercisesArray.fields.filter((item: any) =>
    Array.isArray(item.data)
  )

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
          render={({ field: { value, name } }) => {
            return (
              <InputSearch
                id="Workout-title"
                label="Title of workout"
                placeholder="Title"
                value={value}
                onChange={(value) => methods.setValue(name, value)}
                onSearch={() => {}}
                options={[
                  { label: value, value: value },
                  { value: 'existing', label: 'From this training plan', color: '#0052CC', isDisabled: true },
                  { value: 'Full Body Workout', label: 'Full Body Workout', color: '#5243AA' },
                  { value: 'template', label: 'From templates', color: '#0052CC', isDisabled: true },
                  { value: 'Smooth Workout', label: 'Smooth Workout', color: '#FF8B00' },
                  { value: 'Another Workout', label: 'Another Workout', color: '#36B37E' },
                  { value: 'Another Workout', label: (
                    <Button
                      variant='text'
                      style={{ display: 'flex', alignItems: 'center', padding: 0 }}
                      onClick={onNew}
                    >
                      <AddIcon />&nbsp;
                      Create New
                    </Button>
                  ), color: '#36B37E' }
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
                            name={`${name}.items.${index}`}
                            onRemove={() => exercisesArray.remove(index)}
                          />
                        )}
                      </Draggable>
                    ))}

                    <div className="Workout__template">
                      <Checkbox />
                      <Label className="checkbox">
                        Save exercise as re-usable template
                      </Label>
                    </div>

                    {ssArray.map((row: any, index) => (
                      <Draggable
                        key={row.id}
                        draggableId={`${row.id}`}
                        index={index}
                        isDragDisabled
                      >
                        {(provided, snapshot) => (
                          <Superset
                            key={row.id}
                            exercises={row.data}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                            innerRef={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            name={`${name}.items.${index}`}
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
      </div>

      <div className="Workout__actions">
        <Button
          variant="text"
          size="sm"
          className="Workout__action-btn"
          onClick={() => exercisesArray.append(createExercise())}
        >
          <AddIcon />
          Add Exercise
        </Button>

        {ssArray.length === 0 ? (
          <Button variant="text" size="sm" className="Workout__action-btn">
            <AddIcon />
            Add Superset
          </Button>
        ) : (
          <>
            {locked ? (
              <Button
                variant="success"
                size="sm"
                className="Workout__action-btn"
                onClick={() => setLocked(false)}
              >
                <UnlockIcon />
                Open Superset
              </Button>
            ) : (
              <Button
                variant="danger"
                size="sm"
                className="Workout__action-btn"
                onClick={() => setLocked(true)}
              >
                <LockIcon />
                Close Superset
              </Button>
            )}
          </>
        )}
      </div>
    </Styles>
  )
}
