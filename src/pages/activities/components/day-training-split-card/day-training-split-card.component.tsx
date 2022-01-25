import { ReactNode } from 'react'

import { AddIcon } from '../../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayCard, { DayCardProps } from '../day-card/day-card.component'
import { ListItemStyles, Styles } from './day-training-split-card.styles'

interface DayTrainingSplitCardProps {
  data: any
  onWorkout?: (data: any) => void
  onMealPlan?: (data: any) => void
  onCardio?: (id: string) => void
  edit?: boolean
  subtitle: string
  day?: string
}
export default function DayTrainingSplitCard(
  props: Pick<DayCardProps, 'onExpand'> & DayTrainingSplitCardProps
) {
  const { data, onWorkout, onMealPlan, onCardio, day, subtitle } = props
  return (
    <DayCard
      border="both"
      title={data.day || day}
      subtitle={subtitle === 'Invalid date' ? '' : subtitle}
      onExpand={props.onExpand}
      content={
        <Styles>
          <ListItem
            color={getColorCarry('orange_50')}
            title="Workout Day"
            content={[data.training_plan_day.name]}
            icon={<WorkoutIcon />}
            onClick={
              onWorkout && data.training_plan_day.name
                ? () => onWorkout(data.training_plan_day)
                : undefined
            }
          />
          <ListItem
            color={getColorCarry('primary_v2')}
            title="Meal Plan Day"
            content={[data.diet_plan_day.name]}
            icon={<FoodIcon />}
            onClick={
              onMealPlan && data.diet_plan_day.name
                ? () => onMealPlan(data.diet_plan_day)
                : undefined
            }
          />
          <ListItem
            color={getColorCarry('blue_50')}
            title="Other Exercises"
            content={data.items.map((t: any) => t.data?.name)}
            icon={<ExerciseIcon />}
            onClick={onCardio ? () => onCardio('') : undefined}
          />
        </Styles>
      }
    />
  )
}

interface ListItemProps {
  color: string
  title: string
  icon: ReactNode
  content: string[]
  onClick?: (id: string) => void
}

function ListItem({ color, title, content, icon, onClick }: ListItemProps) {
  return (
    <ListItemStyles className="DayTrainingSplitCard__li" $color={color}>
      <div className="DayTrainingSplitCard__li-icon">{icon}</div>

      <div className="DayTrainingSplitCard__li-content">
        <p className="DayTrainingSplitCard__li-title">{title}</p>

        <div>
          {content.map((text, index) => (
            <p className="DayTrainingSplitCard__li-subtitle" key={index}>
              <span>{text}</span>

              {onClick && (
                <IconButton
                  size="sm"
                  className="DayTrainingSplitCard__li-btn"
                  onClick={onClick}
                >
                  <AddIcon />
                </IconButton>
              )}
            </p>
          ))}
        </div>
      </div>
    </ListItemStyles>
  )
}
