import { useMemo } from 'react'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import AutoCompleteInput from '../../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import useTemplateMeals from '../../../../../../hooks/api/templates/useTemplateMeals'
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

export default function MealAccordion({
  name,
  index,
  onRemove
}: MealAccordionProps) {
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

  const handleFoodAdd = () => {
    foodsArray.append(createFood())
    methods.clearErrors(`${name}.items`)
  }

  const handleFoodRemove = (index: number) => {
    foodsArray.remove(index)
  }

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
                />
              )}
              name={`${name}.name`}
            />
          </div>

          <Label>Micronutrients</Label>
          <div className="MealAccordion__macronutrients">
            {['Calories', 'Carbs', 'Fat', 'Protein'].map((row) => (
              <div key={row} className="MealAccordion__macronutrient">
                <p className="MealAccordion__macronutrient-title">{row}</p>
                <p className="MealAccordion__macronutrient-value">0g</p>
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

          <Select
            disabled
            id="Workout-days"
            options={[]}
            value={{ label: 'Apply to all days', value: 'Apply to all days' }}
            className="MealAccordion__control"
          />

          <div className="MealAccordion__checkbox-container">
            <Checkbox />
            <Label className="MealAccordion__checkbox">
              Save meal as re-usable template
            </Label>
          </div>
          <WorkoutSubtitle>Food</WorkoutSubtitle>

          <div>
            {foodsArray.fields.map((row: any, index: number) => (
              <FoodAccordion
                key={row.id}
                name={`${name}.items.${[index]}.data`}
                onRemove={() => handleFoodRemove(index)}
              />
            ))}
          </div>

          <div className="MealAccordion__checkbox-container">
            <Checkbox />
            <Label className="MealAccordion__checkbox">
              Save as re-usable template
            </Label>
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
