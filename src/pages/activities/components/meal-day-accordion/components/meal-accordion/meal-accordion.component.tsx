import { useState } from 'react'

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

export default function MealAccordion() {
  const onNew = () => {}
  const [title, setTitle] = useState('Delicious Chicken Breask')
  const [time, setTime] = useState('3:00')
  return (
    <ItemAccordion
      title="Meal 1"
      content={
        <Styles>
          <div className="MealAccordion__control">
            <InputSearch
              id="meal-title"
              label="Name of meal"
              placeholder="Fried Rice"
              value={title}
              onChange={(v) => setTitle(v)}
              onSearch={() => {}}
              forceDesktop
              options={[
                { label: title, value: title },
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
          </div>

          <Label>Micronutrients</Label>
          <div className="MealAccordion__macronutrients">
            {['Calories', 'Carbs', 'Fat', 'Protein'].map((row) => (
              <div key={row} className="MealAccordion__macronutrient">
                <p className="MealAccordion__macronutrient-title">{row}</p>
                <p className="MealAccordion__macronutrient-value">120g</p>
              </div>
            ))}
          </div>

          <TimePicker
            id="Workout-time"
            label="Schedule"
            placeholder="08:00"
            className="MealAccordion__control"
            value={time}
            onChange={(date, dateStr) => setTime(dateStr)}
          />

          <Select
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
            {[
              {
                title: 'Chicken',
                value: {
                  qty: 100,
                  protein: 120,
                  fat: 32,
                  netcarb: 50,
                  sugar: 100,
                  fiber: 34,
                  carb: 10,
                  calories: 45
                }
              },
              {
                title: 'Rice',
                value: {
                  qty: 30,
                  protein: 30,
                  fat: 22,
                  netcarb: 60,
                  sugar: 40,
                  fiber: 64,
                  carb: 20,
                  calories: 25
                }
              }
            ].map((row: any, idx: number) => (
              <FoodAccordion key={idx} title={row.title} value={row.value} />
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
