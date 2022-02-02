import { get } from 'lodash'
import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { AddIcon } from '../../../../assets/media/icons'
import Error from '../../../../components/form/error/error.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Meal from '../meal-day-accordion/components/meal/meal.component'
import MealAccordion from '../meal-day-accordion/components/meal-accordion/meal-accordion.component'
import { Styles } from './meal-day-form.styles'

interface MealDayFormProps {
  name: string
}

function createMeal(name = '') {
  return {
    id: Date.now().toString(),
    name,
    time: '',
    sort_order: '',
    save_as_template: false,
    items: []
  }
}

export default function MealDayForm({ name }: MealDayFormProps) {
  const [dropId] = useState(uuid())
  const isMobile = useIsMobile()

  const methods = useFormContext()

  const mealArray = useFieldArray({
    control: methods.control,
    name
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    if (result.type === 'Meal') {
      mealArray.move(result.source.index, (result.destination as any).index)
    } else {
      // finding the index of meal on basis of ids
      const sourceMealIndex = mealArray.fields.findIndex(
        (m) => String(m.id) === result.source.droppableId
      )
      const desMealIndex = mealArray.fields.findIndex(
        (m) => String(m.id) === result.destination?.droppableId
      )

      // getting meal items
      const sourceMealItems: any[] =
        methods.getValues(`${name}.${sourceMealIndex}.items`) || []
      const desMealItems: any[] =
        methods.getValues(`${name}.${desMealIndex}.items`) || []

      // making the swap
      const [removedItem] = sourceMealItems.splice(result.source.index, 1)
      desMealItems.splice(result.destination?.index, 0, removedItem)

      // setting the resulted items.
      methods.setValue(`${name}.${sourceMealIndex}.items`, [...sourceMealItems])
      methods.setValue(`${name}.${desMealIndex}.items`, [...desMealItems])
    }
  }

  const handleDayAdd = () => {
    mealArray.append(createMeal(`Meal ${mealArray.fields.length + 1}`))
    methods.clearErrors(name)
  }

  const handleDayRemove = (index: number) => {
    mealArray.remove(index)
  }

  const { errors } = methods.formState

  return (
    <Styles>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={dropId} type="Meal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {mealArray.fields &&
                mealArray.fields.map((row: any, index: number) => (
                  <Draggable
                    key={row.id}
                    draggableId={`${row.id}`}
                    index={index}
                  >
                    {(provided) =>
                      isMobile ? (
                        <MealAccordion
                          key={row.id}
                          innerRef={provided.innerRef}
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          dropId={row.id}
                          index={index}
                          name={`${name}.${index}`}
                          onRemove={() => handleDayRemove(index)}
                        />
                      ) : (
                        <Meal
                          key={row.id}
                          innerRef={provided.innerRef}
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          dropId={row.id}
                          index={index}
                          name={`${name}.${index}`}
                          onRemove={() => handleDayRemove(index)}
                        />
                      )
                    }
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="MealDayForm__add-meal" onClick={() => handleDayAdd()}>
        <AddIcon />
        Add Another Meal
      </div>

      {typeof get(errors, name) === 'object' &&
        !Array.isArray(get(errors, name)) && (
          <Error standalone="Add at least one meal" />
        )}
    </Styles>
  )
}
