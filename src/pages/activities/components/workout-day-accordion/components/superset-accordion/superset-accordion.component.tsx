import { useRef } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon, LockIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import ExerciseAccordion from '../exercise-accordion/exercise-accordion.component'
import { WorkoutSubtitle } from '../workout/workout.styles'
import { Styles } from './superset-accordion.styles'

interface SupersetAccordionProps {
  name: string
  locked?: boolean
  onRemove: any
  dragHandleProps: any
  draggableProps: any
  isDragging: boolean
  innerRef?: any
  labelIndex: number
}

function createExercise(nameValue = '') {
  return {
    name: nameValue,
    link: '',
    info: {
      sets: '',
      reps: '',
      tempo: '',
      rest_interval: ''
    }
  }
}

export default function SupersetAccordion({
  name,
  locked,
  onRemove,
  innerRef,
  dragHandleProps,
  draggableProps,
  labelIndex
}: SupersetAccordionProps) {
  const dropId = useRef(Date.now())
  const methods = useFormContext()

  const exercisesArray = useFieldArray({
    control: methods.control,
    name: `${name}.data`
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    exercisesArray.move(result.source.index, (result.destination as any).index)
  }

  const handleAddExercise = () => {
    exercisesArray.append(
      createExercise(
        `${labelIndex}${String.fromCharCode(
          65 + exercisesArray.fields.length
        )}--`
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
      <div>
        <div className="SupersetAccordion__bar">
          <WorkoutSubtitle>Superset</WorkoutSubtitle>
          {locked && <LockIcon />}
        </div>
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`droppable-${dropId}`}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {exercisesArray.fields.map((row: any, index: number) => (
                    <Draggable
                      key={row.id}
                      draggableId={`${row.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ExerciseAccordion
                          key={row.id}
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          innerRef={provided.innerRef}
                          isDragging={snapshot.isDragging}
                          name={`${name}.data.${index}`}
                          onRemove={() => handleRemoveExercise(index)}
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
        </div>

        {locked || (
          <div className="SupersetAccordion__actions">
            <Button
              variant="text"
              size="sm"
              className="SupersetAccordion__action-btn"
              onClick={handleAddExercise}
            >
              <AddIcon />
              Add Exercise
            </Button>
          </div>
        )}
      </div>
    </Styles>
  )
}
