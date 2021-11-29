import { AddIcon } from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import DayAccordion from '../day-accordion/day-accordion.component'
import Macronutrient from '../macronutrient/macronutrient.component'
import Meal from './components/meal/meal.component'
import { Styles } from './meal-day-accordion.styles'

export default function MealDayAccordion() {
  return (
    <DayAccordion title="Day 1 - Low Carbs Day">
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

        {[1, 2].map((row) => (
          <Meal key={row} />
        ))}

        <div className="MealDayAccordion__add-meal">
          <AddIcon />
          Add Another Meal
        </div>
      </Styles>
    </DayAccordion>
  )
}
