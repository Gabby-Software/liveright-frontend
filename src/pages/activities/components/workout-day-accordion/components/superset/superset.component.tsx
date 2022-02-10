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
  labelIndex: number
}

function createExercise(nameValue = '', sort_order = 1) {
  return {
    name: nameValue,
    link: '',
    info: {
      sets: '',
      reps: '',
      tempo: '',
      rest_interval: ''
    },
    sort_order: sort_order + 1
  }
}

export default function Superset({
  name,
  onRemove,
  innerRef,
  dragHandleProps,
  draggableProps,
  labelIndex
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
        // `${labelIndex}${String.fromCharCode(
        //   65 + exercisesArray.fields.length
        // )}--`,
        '',
        exercisesArray.fields.length
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

    console.log(result)

    exercisesArray.swap(result.source.index, (result.destination as any).index)
    setTimeout(resetPrefixValues, 10)
  }

  const resetPrefixValues = () => {
    const values: any[] = methods.getValues(name).data
    // get values and re-order the prefix values i.e 1A, 1B etc.
    values.forEach((v, i) => {
      const suf = String(v.name).split('--')[1]
      methods.setValue(
        `${name}.data.${i}.name`,
        `${labelIndex}${String.fromCharCode(65 + i)}--${suf}`
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
                      labelIndex={labelIndex}
                      supersetPrefix={String.fromCharCode(65 + index)}
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
