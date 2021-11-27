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
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { reorder } from '../../../../../../utils/dnd'
import Food from '../food/food.component'
import { MealSubtitle, Styles } from './meal.styles'

const FOOD = [{ id: 1 }, { id: 2 }, { id: 3 }]

export default function Meal() {
  const [food, setFood] = useState(FOOD)
  const [dropId] = useState(uuid())

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    setFood((food) =>
      reorder(food, result.source.index, (result.destination as any).index)
    )
  }

  return (
    <Styles>
      <div className="Meal__name">
        <Select
          id="Meal-name"
          options={[]}
          label="Name of meal"
          placeholder="Fried Rice"
        />

        <TimePicker id="Workout-time" label="Schedule" placeholder="08:00" />

        <Select
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        />

        <IconButton className="Meal__delete-btn">
          <DeleteOutlinedIcon />
        </IconButton>
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
                {food.map((row, index) => (
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

      <div className="Meal__divider" />

      <p className="Meal__add-btn">
        <AddIcon />
        Add Food
      </p>
    </Styles>
  )
}
