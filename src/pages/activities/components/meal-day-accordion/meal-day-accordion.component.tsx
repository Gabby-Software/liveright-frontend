import { FoodIcon } from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayAccordion from '../day-accordion/day-accordion.component'
import Macronutrient from '../macronutrient/macronutrient.component'
import MealDayForm from '../meal-day-form/meal-day-form.component'
import { Styles } from './meal-day-accordion.styles'

export default function MealDayAccordion() {
  return (
    <DayAccordion
      title="Day 1 - Low Carbs Day"
      icon={<FoodIcon />}
      iconColor={getColorCarry('primary_v2')}
      onRemove={() => {}}
    >
      <Styles>
        <div className="MealDayAccordion__name-container">
          <Input
            id="MealDayAccordion-name"
            label="Diet plan day name"
            placeholder="Meal plan"
          />
        </div>

        <div className="MealDayAccordion__macronutrients">
          {[
            'Protein',
            'Fat',
            'Net Carbs',
            'Sugar',
            'Fiber',
            'Total Carbs',
            'Calories'
          ].map((row) => (
            <Macronutrient key={row} title={row} />
          ))}
        </div>

        <p className="MealDayAccordion__subtitle">
          List meals of this diet plan
        </p>

        <MealDayForm />
      </Styles>
    </DayAccordion>
  )
}
