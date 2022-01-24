import get from 'lodash.get'
import { useMemo, useState } from 'react'
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

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../../components/form/label/label.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { EmptyPlaceholder } from '../../../../../../components/placeholders'
import useTemplateMeals from '../../../../../../hooks/api/templates/meals/useTemplateMeals'
import { getUniqueItemsByProperties } from '../../../../../../utils/arrays'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import { WorkoutSubtitle } from '../../../workout-day-accordion/components/workout/workout.styles'
import FoodAccordion from '../food-accordion/food-accordion.component'
import { Styles } from './meal-accordion.styles'

interface MealAccordionProps {
  name: string
  index: number
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

const MACROS_LABEL_KEY_MAP = {
  Calories: 'calories',
  Carbs: 'net_carbs',
  Fat: 'fat',
  Proteins: 'proteins'
}

export default function MealAccordion({
  name,
  index,
  onRemove
}: MealAccordionProps) {
  const [dropId] = useState(uuid())
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

  const mealName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const days = useWatch({
    name: `days`,
    control: methods.control
  })

  const { meals } = useTemplateMeals()

  const { errors } = methods.formState

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    foodsArray.move(result.source.index, (result.destination as any).index)
  }

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

  const onMealSelected = (value: string) => {
    // find in templates
    let meal = meals.find((m: any) => m.name === value)
    if (!meal) {
      // else not found, check in current DP
      const mealsOfPlan = days?.reduce(
        (acc: any[], d: any) => [
          ...acc,
          ...(d.activities || d.diet_plan_day.activities || [])
        ],
        []
      )
      meal = mealsOfPlan.find((m: any) => m.name === value)
    }

    if (meal) {
      // if you just try to set workout as a whole, exercise fields i.e. exerciseArray would not update.
      methods.setValue(`${name}.name`, meal.name)
      methods.setValue(`${name}.time`, meal.time)
      foodsArray.remove(
        Array(foodsArray.fields.length)
          .fill(0)
          .reduce((acc, v, i) => [...acc, i], [])
      )
      foodsArray.append(meal.items)
    }
  }

  const nameOptions = useMemo(() => {
    const mealsOfPlan = days?.reduce(
      (acc: any[], d: any) => [
        ...acc,
        ...(d.activities || d.diet_plan_day.activities || [])
      ],
      []
    )
    const planOptions = mealsOfPlan
      ?.filter((m: any) => m.name)
      ?.map((m: any) => ({
        label: m.name,
        value: m.name
      }))

    const templateOptions = meals.map((w: any) => ({
      label: w.name,
      value: w.name
    }))

    const options = []

    if (planOptions.length) {
      options.push({
        label: 'From this Diet Plan',
        options: getUniqueItemsByProperties(planOptions, ['label'])
      })
    }

    if (templateOptions.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [days])

  return (
    <ItemAccordion
      title={mealName || `Meal ${index + 1}`}
      onRemove={onRemove}
      content={
        <Styles>
          <div className="MealAccordion__control">
            <Controller
              render={({ field: { name, value } }) => (
                <AutoCompleteInput
                  id="Meal-title"
                  label="Title of workout"
                  placeholder="Title"
                  value={value}
                  onChange={(value) => methods.setValue(name, value)}
                  onSelect={onMealSelected}
                  options={nameOptions}
                  className={get(errors, name) ? 'invalid-field' : ''}
                />
              )}
              name={`${name}.name`}
            />
          </div>

          <Label>Micronutrients</Label>
          <div className="MealAccordion__macronutrients">
            {['Calories', 'Carbs', 'Fat', 'Proteins'].map((row) => (
              <div key={row} className="MealAccordion__macronutrient">
                <p className="MealAccordion__macronutrient-title">{row}</p>
                <p className="MealAccordion__macronutrient-value">
                  {(totalMacros as any)[(MACROS_LABEL_KEY_MAP as any)[row]]}
                  {row === 'Calories' ? 'KCal' : 'g'}
                </p>
              </div>
            ))}
          </div>

          <Controller
            name={`${name}.time`}
            render={({ field: { name, value } }) => (
              <TimePicker
                id="Workout-time"
                label="Schedule"
                placeholder="08:00"
                className="MealAccordion__control"
                value={value}
                onChange={(e, date) => {
                  methods.setValue(name, date)
                }}
              />
            )}
          />

          {/* <Select
            disabled
            id="Workout-days"
            options={[]}
            value={{ label: 'Apply to all days', value: 'Apply to all days' }}
            className="MealAccordion__control"
          /> */}

          <Controller
            render={({ field: { value, name } }) => (
              <div className="Meal__checkbox-container">
                <Checkbox
                  checked={value}
                  onChange={(e) => methods.setValue(name, e.target.checked)}
                />
                <Label className="Meal__checkbox">Save Meal as template</Label>
              </div>
            )}
            name={`${name}.save_as_template`}
          />

          <WorkoutSubtitle>Food</WorkoutSubtitle>

          <div>
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
                            <FoodAccordion
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
              <div
                className="Meal__clickable-container"
                onClick={handleFoodAdd}
              >
                <EmptyPlaceholder spacing text="Add Foods" />
              </div>
            )}
          </div>

          <div className="MealAccordion__actions">
            <Button
              variant="text"
              size="sm"
              className="MealAccordion__action-btn"
              onClick={handleFoodAdd}
            >
              <AddIcon />
              Add Food
            </Button>
          </div>
        </Styles>
      }
    />
  )
}
