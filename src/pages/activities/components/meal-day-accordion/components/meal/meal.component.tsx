import { get } from 'lodash'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import {
  AddIcon,
  DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../../../components/form/input/input.component'
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

const MACROS_LABEL_KEY_MAP = {
  Calories: 'calories',
  Carbs: 'net_carbs',
  Fat: 'fat',
  Proteins: 'proteins'
}

export default function Meal({ name, onRemove, index }: MealProps) {
  const [dropId] = useState(uuid())
  const [newMeal, setNewMeal] = useState(false)
  const [totalMacros, setTotalMacros] = useState({
    grams: 0,
    proteins: 0,
    fat: 0,
    net_carbs: 0,
    sugar: 0,
    fiber: 0,
    total_carbs: 0,
    calories: 0
  })

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

  const [nameVal] = useWatch({
    control: methods.control,
    name: [`${name}.name`]
  })

  useEffect(() => {}, [])

  const mealOptions = [
    { label: 'Fried Rice', value: 'Fried Rice', color: '#36B37E' },
    { label: 'Brown Rice', value: 'Brown Rice', color: '#36B37E' },
    { label: 'Fried Eggs', value: 'Fried Eggs', color: '#36B37E' }
  ]
  if (nameVal && !mealOptions.find((item) => item.value === nameVal)) {
    mealOptions.push({ label: nameVal, value: nameVal, color: '#36B37E' })
  }

  const { errors } = methods.formState

  const handleFoodAdd = () => {
    foodsArray.append(createFood())
    methods.clearErrors(`${name}.items`)
  }

  const handleFoodRemove = (index: number) => {
    foodsArray.remove(index)
  }

  const calculateTotalMacros = () => {
    const items: any[] = methods.getValues(`${name}.items`)

    const macros = {
      grams: 0,
      proteins: 0,
      fat: 0,
      net_carbs: 0,
      sugar: 0,
      fiber: 0,
      total_carbs: 0,
      calories: 0
    }

    items?.forEach((i) => {
      const info = i.data.info
      Object.keys(macros).map((k: string) => {
        return ((macros as any)[k] += parseInt(info[k] || 0))
      })
    })

    setTotalMacros(macros)
  }

  methods.watch(() => {
    calculateTotalMacros()
  })

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
          render={({ field: { value, name } }) => {
            return newMeal ? (
              <Input
                id="Meal-title"
                label="Title of Meal"
                placeholder="Title"
                value={value}
                onChange={(e) => methods.setValue(name, e.target.value)}
              />
            ) : (
              <InputSearch
                id="Meal-title"
                label="Title of Meal"
                placeholder="Title"
                value={value}
                onChange={(value) => {
                  if (value === 'new_meal') {
                    setNewMeal(true)
                  } else {
                    methods.setValue(name, value)
                  }
                }}
                onSearch={() => {}}
                error={get(errors, name)}
                options={[
                  {
                    value: 'new_meal',
                    label: (
                      <Button
                        size="sm"
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
            )
          }}
        />

        <Controller
          name={`${name}.time`}
          render={({ field: { name, value } }) => (
            <TimePicker
              id="Workout-time"
              label="Schedule"
              placeholder="08:00"
              value={value}
              error={get(errors, name)}
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
        {['Calories', 'Carbs', 'Fat', 'Proteins'].map((row) => (
          <div key={row} className="Meal__macronutrient">
            <p className="Meal__macronutrient-title">{row}</p>
            <p className="Meal__macronutrient-value">
              {(totalMacros as any)[(MACROS_LABEL_KEY_MAP as any)[row]]}
              {row === 'Calories' ? 'KCal' : 'g'}
            </p>
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
          <div className="Meal__clickable-container" onClick={handleFoodAdd}>
            <EmptyPlaceholder spacing text="Add Foods" />
          </div>
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
