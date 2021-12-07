import { ReactNode } from 'react'

import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import Select from '../../../../components/form/select/select.component'
import DayCard from '../day-card/day-card.component'
import { Styles } from './day-split-edit-card.styles'

export default function DaySplitEditCard() {
  return (
    <DayCard
      title="Day 1"
      content={
        <Styles>
          <Control
            type="training"
            icon={<WorkoutIcon />}
            title="Training plan"
            control={
              <Select
                id="DaySplitEditCard-training-plan"
                placeholder="Search training plan"
                options={[]}
              />
            }
          />

          <Control
            type="diet"
            icon={<FoodIcon />}
            title="Meal plan"
            control={
              <Select
                id="DaySplitEditCard-diet-plan"
                placeholder="Search diet plan"
                options={[]}
              />
            }
          />

          <Control
            type="other"
            icon={<ExerciseIcon />}
            title="Other Exercises"
            control={
              <Select
                id="DaySplitEditCard-other-plan"
                placeholder="Search other exercises"
                options={[]}
              />
            }
          />
        </Styles>
      }
    />
  )
}

interface ControlProps {
  type: string
  title: string
  icon: ReactNode
  control: ReactNode
}

function Control({ type, title, icon, control }: ControlProps) {
  return (
    <div className="DaySplitEditCard__control">
      <div className="DaySplitEditCard__control-head">
        <div className="DaySplitEditCard__control-icon" data-type={type}>
          {icon}
        </div>
        <p className="DaySplitEditCard__control-title">{title}</p>
      </div>
      {control}
    </div>
  )
}
