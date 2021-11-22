import { ReactNode } from 'react'

import { AddIcon } from '../../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import DayCard from '../day-card/day-card.component'
import { ListItemStyles, Styles } from './day-training-split-card.styles'

export default function DayTrainingSplitCard() {
  return (
    <DayCard
      subtitle="Wednesday"
      content={
        <Styles>
          <ListItem
            color={getColorCarry('orange_50')}
            title="Workout Day"
            content={['High Intensity Workout']}
            icon={<WorkoutIcon />}
          />
          <ListItem
            color={getColorCarry('primary_v2')}
            title="Meal Plan Day"
            content={['Low Carbs Day']}
            icon={<FoodIcon />}
          />
          <ListItem
            color={getColorCarry('blue_50')}
            title="Other Exercises"
            content={['Cardio']}
            icon={<ExerciseIcon />}
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
}

function ListItem({ color, title, content, icon }: ListItemProps) {
  return (
    <ListItemStyles className="DayTrainingSplitCard__li" $color={color}>
      <div className="DayTrainingSplitCard__li-icon">{icon}</div>

      <div className="DayTrainingSplitCard__li-content">
        <p className="DayTrainingSplitCard__li-title">{title}</p>

        <div>
          {content.map((text, index) => (
            <p className="DayTrainingSplitCard__li-subtitle" key={index}>
              <span>{text}</span>

              <IconButton size="sm" className="DayTrainingSplitCard__li-btn">
                <AddIcon />
              </IconButton>
            </p>
          ))}
        </div>
      </div>
    </ListItemStyles>
  )
}
