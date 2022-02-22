import { get } from 'lodash'
import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

import {
  AddIcon,
  DeleteOutlinedIcon
} from '../../../../../../assets/media/icons'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import Macronutrient from '../../../../../../components/quick-access/components/quick-access-macronutrient/quick-access-macronutrient.component'
import Food from '../food/food.component'
import { MealSubtitle, Styles } from './meal.styles'

interface MealProps {
  dragHandleProps: any
  innerRef?: any
  draggableProps: any
  dropId: string
  name: string
  index: number
  data?: any
  onRemove: any
}

function createFood() {
  return {
    data: {
      name: '',
      save_as_template: false,
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

const MACROS_LABEL_KEY_MAP: { [k: string]: string } = {
  proteins: 'Proteins',
  fat: 'Fat',
  net_carbs: 'Net Carbs',
  sugar: 'Sugar',
  fiber: 'Fiber',
  total_carbs: 'Total Carbs',
  calories: 'Calories'
}

export default function Meal({
  innerRef,
  dragHandleProps,
  draggableProps,
  dropId,
  name,
  onRemove
}: MealProps) {
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

  const [mealName] = useWatch({
    control: methods.control,
    name: [`${name}.name`]
  })

  const { errors } = methods.formState

  const handleFoodAdd = () => {
    foodsArray.append(createFood())
    methods.clearErrors(`${name}.items`)
  }

  const handleFoodRemove = (index: number) => {
    foodsArray.remove(index)
  }

  const getTwoDecimal = (value: any) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
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
        return ((macros as any)[k] += getTwoDecimal(info[k] || 0))
      })
    })

    setTotalMacros(macros)
  }

  methods.watch(() => {
    calculateTotalMacros()
  })

  return (
    <Styles ref={innerRef} {...draggableProps} {...dragHandleProps}>
      <div className="Meal__header">
        <div className="subtitle">{mealName}</div>

        <IconButton className="Meal__delete-btn" onClick={onRemove}>
          <DeleteOutlinedIcon />
        </IconButton>
      </div>
      <div className="Meal__name">
        <Controller
          name={`${name}.name`}
          render={({ field: { value, name } }) => (
            <AutoCompleteInput
              id="Meal-title"
              label="Meal Name"
              placeholder="Name of Meal"
              value={value}
              onChange={(value) => methods.setValue(name, value)}
              options={[]}
              className={get(errors, name) ? 'invalid-field' : ''}
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
              // error={get(errors, name)}
              onChange={(e, date) => {
                methods.setValue(name, date)
              }}
              className={get(errors, name) ? 'invalid-field' : ''}
            />
          )}
        />

        {/* <Select
          disabled
          id="Workout-days"
          options={[]}
          value={{ label: 'Apply to all days', value: 'Apply to all days' }}
        /> */}
      </div>

      <div className="Meal__macronutrients">
        {Object.keys(MACROS_LABEL_KEY_MAP).map((k) => (
          <Macronutrient
            key={k}
            title={MACROS_LABEL_KEY_MAP[k]}
            amount={`${getTwoDecimal((totalMacros as any)[k])}
                ${k === 'calories' ? 'KCal' : 'g'}`}
          />
        ))}
      </div>

      <MealSubtitle>Food</MealSubtitle>

      <div className="Meal__food-container">
        <Droppable droppableId={dropId} type="Food">
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

        {!foodsArray.fields.length && (
          <div className="Meal__clickable-container" onClick={handleFoodAdd}>
            <EmptyPlaceholder spacing text="Add Foods" />
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
