import { FoodIcon } from '../../../../assets/media/icons/activities'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import Macronutrient from '../macronutrient/macronutrient.component'
import SplitDayMealCard from '../split-day-meal-card/split-day-meal-card.component'
import SplitDayCard from './split-day-card.component'

interface IProps {
  scheduleTime?: string
  data: any
  actionComponent?: React.ReactNode
  contentClass?: string
  mode?: 'normal' | 'dayTarget'
}

const MACROS_KEY_LABEL: { [key: string]: string } = {
  proteins: 'Proteins',
  fat: 'Fat',
  net_carbs: 'Net Carbs',
  sugar: 'Sugar',
  fiber: 'Fiber',
  total_carbs: 'Total Carbs',
  calories: 'Calories'
}

export default function SplitDayDietCard(props: IProps) {
  const {
    data,
    scheduleTime,
    actionComponent,
    contentClass,
    mode = 'normal'
  } = props

  const targets = mode === 'normal' ? data.total_targets : data.custom_target

  return (
    <SplitDayCard
      scheduleTime={scheduleTime}
      title={data.name}
      color={getColorCarry('primary_v2')}
      icon={<FoodIcon />}
      actionComponent={actionComponent}
      contentClass={contentClass}
      content={
        <div>
          {data.activities?.map((a: any, i: number) => (
            <SplitDayMealCard key={i} data={a} />
          ))}
        </div>
      }
    />
  )
}
