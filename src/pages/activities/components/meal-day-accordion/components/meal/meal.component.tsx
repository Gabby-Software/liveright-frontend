import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
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
import { reorder } from '../../../../../../utils/dnd'
import { InputSearch } from '../../../input-search/input-search.component'
import Food from '../food/food.component'
import { MealSubtitle, Styles } from './meal.styles'

interface MealProps {
  data?: any
  index: number
}
export default function Meal(props: MealProps) {
  const { data, index } = props
  const [name, setName] = useState(data?.name ?? '')
  const [foods, setFoods] = useState(data?.foods ?? [])
  const [dropId] = useState(uuid())

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    setFoods((food: any) =>
      reorder(food, result.source.index, (result.destination as any).index)
    )
  }

  const onNew = () => {}

  const mealOptions = [
    { label: 'Fried Rice', value: 'Fried Rice', color: '#36B37E' },
    { label: 'Brown Rice', value: 'Brown Rice', color: '#36B37E' },
    { label: 'Fried Eggs', value: 'Fried Eggs', color: '#36B37E' }
  ]
  if (data?.name && !mealOptions.find((item) => item.value === data.name)) {
    mealOptions.push({ label: data.name, value: data.name, color: '#36B37E' })
  }

  return (
    <Styles>
      <div className="Meal__header">
        <div className="subtitle">{`Meal ${index + 1}`}</div>

        <IconButton className="Meal__delete-btn">
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
      <div className="Meal__name">
        <InputSearch
          id="Workout-title"
          label="Title of workout"
          placeholder="Title"
          value={name}
          onChange={(value) => setName(value)}
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
                  onClick={onNew}
                >
                  <AddIcon />
                  &nbsp; Create New
                </Button>
              ),
              color: '#36B37E'
            }
          ]}
        />

        <TimePicker id="Workout-time" label="Schedule" placeholder="08:00" />

        <Select
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        />
      </div>

      <div className="Meal__macronutrients">
        {['Calories', 'Carbs', 'Fat', 'Protein'].map((row) => (
          <div key={row} className="Meal__macronutrient">
            <p className="Meal__macronutrient-title">{row}</p>
            <p className="Meal__macronutrient-value">120g</p>
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
                {foods &&
                  foods.map((row: any, index: number) => (
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
                          data={row}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="Meal__checkbox-container">
          <Checkbox />
          <Label className="Meal__checkbox">Save as re-usable template</Label>
        </div>
      </div>

      <div className="Meal__divider" />

      <p className="Meal__add-btn">
        <AddIcon />
        Add Food
      </p>
    </Styles>
  )
}
