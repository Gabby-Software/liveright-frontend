import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Exercise from '../exercise/exercise.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './superset.styles'

interface SupersetProps {
  name: string
  dragHandleProps: any
  isDragging: boolean
  innerRef: any
  draggableProps: any
  onRemove: any
}

function createExercise() {
  return {
    name: '',
    link: '',
    info: {
      steps: '',
      reps: '',
      tempo: '',
      rest_interval: ''
    }
  }
}

export default function Superset({
  dragHandleProps,
  name,
  isDragging,
  innerRef,
  draggableProps,
  onRemove
}: SupersetProps) {
  const [dropId] = useState(`superset-drop-${Date.now()}`)
  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.data`
  })

  console.log(methods.getValues())
  console.log(name, exercisesArray)

  const handleAddExercise = () => {
    exercisesArray.append(createExercise())
  }

  const handleRemoveExercise = (index: number) => {
    if (exercisesArray.fields.length === 1) {
      onRemove()
    } else {
      exercisesArray.remove(index)
    }
  }

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
              {exercisesArray.fields.map((r, index) => (
                <Draggable key={r.id} draggableId={`${r.id}`} index={index}>
                  {(provided, snapshot) => (
                    <Exercise
                      name={`${name}.data.${index}`}
                      onRemove={() => handleRemoveExercise(index)}
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

      <div className="Superset__actions">
        <Button
          variant="text"
          size="sm"
          className="Superset__action-btn"
          onClick={handleAddExercise}
        >
          <AddIcon />
          Add Exercise
        </Button>
      </div>
    </Styles>
  )
}
