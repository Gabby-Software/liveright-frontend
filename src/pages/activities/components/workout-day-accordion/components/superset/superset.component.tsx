import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Exercise from '../exercise/exercise.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './superset.styles'

interface SupersetProps {
  exercises: any[]
  dragHandleProps: any
  isDragging: boolean
  innerRef: any
  draggableProps: any
}

export default function Superset({
  dragHandleProps,
  exercises,
  isDragging,
  innerRef,
  draggableProps
}: SupersetProps) {
  const [dropId] = useState(`superset-drop-${Date.now()}`)
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

      <WorkoutSubtitle>End superset</WorkoutSubtitle>
    </Styles>
  )
}
