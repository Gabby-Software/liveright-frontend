import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch
} from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import { InputSearch } from '../../../input-search/input-search.component'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import { WorkoutSubtitle } from '../../../workout-day-accordion/components/workout/workout.styles'
import FoodAccordion from '../food-accordion/food-accordion.component'
import { Styles } from './meal-accordion.styles'

interface MealAccordionProps {
  name: string
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

export default function MealAccordion({ name, onRemove }: MealAccordionProps) {
  const methods = useFormContext()

  const foodsArray = useFieldArray({
    control: methods.control,
    name: `${name}.items`
  })

  const mealName = useWatch({
    name: `${name}.name`,
    control: methods.control
  })

  const handleFoodAdd = () => {
    foodsArray.append(createFood())
    methods.clearErrors(`${name}.items`)
  }

  const handleFoodRemove = (index: number) => {
    foodsArray.remove(index)
  }

  return (
    <ItemAccordion
      title={mealName}
      onRemove={onRemove}
      content={
        <Styles>
          <div className="MealAccordion__control">
            <Controller
              render={({ field: { name, value } }) => (
                <InputSearch
                  id="meal-title"
                  label="Name of meal"
                  placeholder="Fried Rice"
                  value={value}
                  onChange={(e) => methods.setValue(name, e)}
                  onSearch={() => {}}
                  forceDesktop
                  options={[
                    { label: value, value: value },
                    {
                      value: 'existing',
                      label: 'From this meal plan',
                      color: '#0052CC',
                      isDisabled: true
                    },
                    {
                      value: 'Full Body Workout',
                      label: 'Full Body Workout',
                      color: '#5243AA'
                    },
                    {
                      value: 'template',
                      label: 'From templates',
                      color: '#0052CC',
                      isDisabled: true
                    },
                    {
                      value: 'Smooth Workout',
                      label: 'Smooth Workout',
                      color: '#FF8B00'
                    },
                    {
                      value: 'Another Workout',
                      label: 'Another Workout',
                      color: '#36B37E'
                    },
                    {
                      value: 'Another Workout',
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
