import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../../components/form/label/label.component'
import Exercise from '../exercise/exercise.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './superset.styles'

interface SupersetProps {
  exercises: any[]
  name: string
  dragHandleProps: any
  isDragging: boolean
  innerRef: any
  draggableProps: any
}

export default function Superset({
  dragHandleProps,
  name,
  exercises,
  isDragging,
  innerRef,
  draggableProps
}: SupersetProps) {
  const [dropId] = useState(`superset-drop-${Date.now()}`)
  console.log('superset: ', name)
  return (
    <Styles
      $isDragging={isDragging}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      <WorkoutSubtitle>Superset</WorkoutSubtitle>

      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId={dropId}>
          {(provided) => (
            <div
              className="Superset__exercises"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {exercises.map((r, index) => (
                <Draggable key={r.id} draggableId={`${r.id}`} index={index}>
                  {(provided, snapshot) => (
                    <Exercise
                      name={`${name}.${index}`}
                      onRemove={() => {}}
                      innerRef={provided.innerRef}
                      dragHandleProps={provided.dragHandleProps}
                      draggableProps={provided.draggableProps}
                      isDragging={snapshot.isDragging}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="Superset__template">
        <Checkbox />
        <Label className="checkbox">Save superset as re-usable template</Label>
      </div>
    </Styles>
  )
}
