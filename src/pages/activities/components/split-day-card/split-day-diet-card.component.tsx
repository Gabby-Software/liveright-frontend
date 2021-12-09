import { FoodIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import Macronutrient from '../macronutrient/macronutrient.component'
import SplitDayMealCard from '../split-day-meal-card/split-day-meal-card.component'
import SplitDayCard, { SplitDayCardProps } from './split-day-card.component'

export default function SplitDayDietCard(
  props: Pick<SplitDayCardProps, 'scheduleTime'>
) {
  return (
    <SplitDayCard
      scheduleTime={props.scheduleTime}
      title="Meal Plan Low Carb Day"
      color={getColorCarry('primary_v2')}
      icon={<FoodIcon />}
      content={
        <div>
          <div className="SplitDayCard__macronutrients">
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

          <SplitDayMealCard />
          <SplitDayMealCard />
        </div>
      }
    />
  )
}
