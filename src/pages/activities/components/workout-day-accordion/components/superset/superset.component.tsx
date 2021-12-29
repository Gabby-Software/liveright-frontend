import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Exercise from '../exercise/exercise.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './superset.styles'

interface SupersetProps {
  name: string
  onRemove: any
  dragHandleProps: any
  draggableProps: any
  isDragging: boolean
  innerRef?: any
}

function createExercise(nameValue = '') {
  return {
    name: nameValue,
    info: {
      sets: '',
      reps: '',
      tempo: '',
      rest_interval: ''
    }
  }
}

export default function Superset({
  name,
  onRemove,
  innerRef,
  dragHandleProps,
  draggableProps
}: SupersetProps) {
  const [dropId] = useState(`superset-drop-${Date.now()}`)
  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.data`
  })

  const handleAddExercise = () => {
    exercisesArray.append(
      createExercise(
        `1${String.fromCharCode(65 + exercisesArray.fields.length)}--`
      )
    )
  }

  const handleRemoveExercise = (index: number) => {
    if (exercisesArray.fields.length === 1) {
      onRemove()
    } else {
      exercisesArray.remove(index)
      // wait for removal to finish
      setTimeout(resetPrefixValues, 10)
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    exercisesArray.move(result.source.index, (result.destination as any).index)
  }

  const resetPrefixValues = () => {
    const values: any[] = methods.getValues(name).data
    // get values and re-order the prefix values i.e 1A, 1B etc.
    values.forEach((v, i) => {
      const suf = String(v.name).split('--')[1]
      methods.setValue(
        `${name}.data.${i}.name`,
        `1${String.fromCharCode(65 + i)}--${suf}`
      )
    })
  }

  return (
    <Styles ref={innerRef} {...draggableProps} {...dragHandleProps}>
      <WorkoutSubtitle>Superset</WorkoutSubtitle>

      <DragDropContext onDragEnd={onDragEnd}>
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
                      fromSuperset
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
