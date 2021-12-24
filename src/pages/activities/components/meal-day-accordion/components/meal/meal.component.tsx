import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import {
  AddIcon,
  DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import { InputSearch } from '../../../input-search/input-search.component'
import Food from '../food/food.component'
import { MealSubtitle, Styles } from './meal.styles'

interface MealProps {
  name: string
  index: number
  data?: any
  onRemove: any
}

function createFood() {
  return {
    data: {
      name: '',
      info: {
        grams: '',
        proteins: '',
        fat: '',
        net_carbs: '',
        sugar: '',
        fiber: '',
        total_carbs: '',
        calories: ''
      }
    }
  }
}

export default function Meal({ name, onRemove, index }: MealProps) {
  const [dropId] = useState(uuid())

  const methods = useFormContext()

  const foodsArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    foodsArray.move(result.source.index, (result.destination as any).index)
  }

  const mealOptions = [
    { label: 'Fried Rice', value: 'Fried Rice', color: '#36B37E' },
    { label: 'Brown Rice', value: 'Brown Rice', color: '#36B37E' },
    { label: 'Fried Eggs', value: 'Fried Eggs', color: '#36B37E' }
  ]
  // if (data?.name && !mealOptions.find((item) => item.value === data.name)) {
  //   mealOptions.push({ label: data.name, value: data.name, color: '#36B37E' })
  // }

  const handleFoodAdd = () => {
    foodsArray.append(createFood())
    methods.clearErrors(`${name}.items`)
  }

  const handleFoodRemove = (index: number) => {
    foodsArray.remove(index)
  }

  return (
    <Styles>
      <div className="Meal__header">
        <div className="subtitle">{`Meal ${index + 1}`}</div>

        <IconButton className="Meal__delete-btn" onClick={onRemove}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
      <div className="Meal__name">
        <Controller
          name={`${name}.name`}
          render={({ field: { value, name } }) => (
            <InputSearch
              id="Workout-title"
              label="Title of workout"
              placeholder="Title"
              value={value}
              onChange={(value) => methods.setValue(name, value)}
              onSearch={() => {}}
              options={[
                ...mealOptions,
                {
                  value: 'Another Meal',
                  label: (
                    <Button
                      variant="text"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      <AddIcon />
                      &nbsp; Create New
                    </Button>
                  ),
                  color: '#36B37E'
                }
              ]}
            />
          )}
        />

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

      <div className="Meal__macronutrients">
        {['Calories', 'Carbs', 'Fat', 'Protein'].map((row) => (
          <div key={row} className="Meal__macronutrient">
            <p className="Meal__macronutrient-title">{row}</p>
            <p className="Meal__macronutrient-value">0g</p>
          </div>
        ))}
      </div>

      <div className="Meal__checkbox-container">
        <Checkbox />
        <Label className="Meal__checkbox">
          Save meal as re-usable template
        </Label>
      </div>

      <MealSubtitle>Food</MealSubtitle>

      <div className="Meal__food-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={dropId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {foodsArray.fields &&
                  foodsArray.fields.map((row: any, index: number) => (
                    <Draggable
                      key={row.id}
                      draggableId={`${row.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Food
                          innerRef={provided.innerRef}
                          dragHandleProps={provided.dragHandleProps}
                          draggableProps={provided.draggableProps}
                          isDragging={snapshot.isDragging}
                          name={`${name}.items.${[index]}.data`}
                          onRemove={() => handleFoodRemove(index)}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {!foodsArray.fields.length && (
          <EmptyPlaceholder spacing text="Add Foods" />
        )}

        {!!foodsArray.fields.length && (
          <div className="Meal__checkbox-container">
            <Checkbox />
            <Label className="Meal__checkbox">Save as re-usable template</Label>
          </div>
        )}
      </div>

      <div className="Meal__divider" />

      <p className="Meal__add-btn" onClick={handleFoodAdd}>
        <AddIcon />
        Add Food
      </p>
    </Styles>
  )
}
