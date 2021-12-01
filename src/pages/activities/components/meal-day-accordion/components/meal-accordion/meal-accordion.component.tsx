import { AddIcon } from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import Label from '../../../../../../components/form/label/label.component'
import Select from '../../../../../../components/form/select/select.component'
import TimePicker from '../../../../../../components/form/time-picker/time-picker.component'
import ItemAccordion from '../../../item-accordion/item-accordion.component'
import { WorkoutSubtitle } from '../../../workout-day-accordion/components/workout/workout.styles'
import FoodAccordion from '../food-accordion/food-accordion.component'
import { Styles } from './meal-accordion.styles'

export default function MealAccordion() {
  return (
    <ItemAccordion
      title="Meal 1"
      content={
        <Styles>
          <Select
            id="Meal-name"
            options={[]}
            label="Name of meal"
            placeholder="Fried Rice"
            className="MealAccordion__control"
          />

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
          />

          <Select
            id="Workout-days"
            options={[]}
            value={{ label: 'Apply to all days', value: 'Apply to all days' }}
            className="MealAccordion__control"
          />

          <WorkoutSubtitle>Food</WorkoutSubtitle>

          <div>
            {[1, 2].map((row) => (
              <FoodAccordion key={row} />
            ))}
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
