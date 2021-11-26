import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  OnDragEndResponder
} from 'react-beautiful-dnd'

import { DeleteOutlinedIcon } from '../../../../../../assets/media/icons'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../../../components/form/input/input.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { reorder } from '../../../../../../utils/dnd'
import Exercise from '../exercise/exercise.component'
import Superset from '../superset/superset.component'
import { Styles, WorkoutSubtitle } from './workout.styles'

const EXERCISES = [
  { id: 1 },
  { id: 2 },
  { id: 3, type: 'superset', exercises: [{ id: 1 }, { id: 2 }] },
  { id: 4 },
  { id: 5 }
]

export default function Workout() {
  const [exercises, setExercises] = useState(EXERCISES)
  const [dropId] = useState(Date.now())

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    setExercises((exercises) =>
      reorder(exercises, result.source.index, (result.destination as any).index)
    )
  }

  return (
    <Styles>
      <div className="Workout__header">
        <Input
          id="Workout-title"
          label="Title of workout"
          placeholder="Title"
        />

        <div className="Workout__header-checkbox-cell">
          <div className="Workout__header-checkbox-container">
            <Checkbox />
            <Label className="Workout__header-checkbox-label">
              Save workout as re-usable template
            </Label>
            <IconButton size="sm" className="Workout__header-checkbox-btn">
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
        </div>

        <div className="Workout__header-schedule-container">
          <TimePicker id="Workout-time" label="Schedule" placeholder="08:00" />
          <Select
            id="Workout-days"
            options={[]}
            value={{ label: 'Apply to all days', value: 'Apply to all days' }}
          />
        </div>
      </div>

      <WorkoutSubtitle>Exercises</WorkoutSubtitle>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`droppable-${dropId}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {exercises.map((row, index) => {
                return (
                  <Draggable
                    key={row.id}
                    draggableId={`${row.id}`}
                    index={index}
                    isDragDisabled={row.type === 'superset'}
                  >
                    {(provided, snapshot) =>
                      row.type === 'superset' ? (
                        <Superset
                          key={row.id}
                          exercises={row.exercises}
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          isDragging={snapshot.isDragging}
                          innerRef={provided.innerRef}
                        />
                      ) : (
                        <Exercise
                          key={row.id}
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          innerRef={provided.innerRef}
                          isDragging={snapshot.isDragging}
                        />
                      )
                    }
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Styles>
  )
}
