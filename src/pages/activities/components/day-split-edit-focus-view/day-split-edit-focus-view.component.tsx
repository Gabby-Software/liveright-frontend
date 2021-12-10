import { AddIcon, CaretLeftIcon } from '../../../../assets/media/icons'
import {
  ExerciseIcon,
  FoodIcon,
  WorkoutIcon
} from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Select from '../../../../components/form/select/select.component'
import { Title } from '../../../../components/typography'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import MealDayForm from '../meal-day-form/meal-day-form.component'
import OtherWorkoutDayForm from '../other-workout-day-form/other-workout-day-form.component'
import WorkoutDayForm from '../workout-day-form/workout-day-form.component'
import SplitDayItemCard from './components/split-day-item-card/split-day-item-card.component'
import { Styles } from './day-split-edit-focus-view.styles'

export default function DaySplitEditFocusView() {
  return (
    <Styles>
      <div className="DaySplitEditFocusView__head">
        <div className="DaySplitEditFocusView__title-container">
          <Title className="DaySplitEditFocusView__title">Day 3</Title>

          <div className="DaySplitEditFocusView__title-arrows">
            <IconButton size="sm">
              <CaretLeftIcon />
            </IconButton>
            <IconButton size="sm">
              <CaretLeftIcon />
            </IconButton>
          </div>
        </div>

        <Button variant="secondary">
          <AddIcon />
          Add more days
        </Button>
      </div>

      <div className="DaySplitEditFocusView__content">
        <SplitDayItemCard
          title="Training plan"
          color={getColorCarry('orange_50')}
          icon={<WorkoutIcon />}
          content={<WorkoutDayForm name="" />}
          control={
            <Select
              id="SplitDayItemCard-plan"
              placeholder="Search training plan"
              options={[]}
            />
          }
        />

        <SplitDayItemCard
          title="Meal plan"
          color={getColorCarry('primary_v2')}
          icon={<FoodIcon />}
          content={<MealDayForm />}
          control={
            <Select
              id="SplitDayItemCard-diet-plan"
              placeholder="Search diet plan"
              options={[]}
            />
          }
        />

        <SplitDayItemCard
          title="Other Exercises"
          color={getColorCarry('blue_40')}
          icon={<ExerciseIcon />}
          content={<OtherWorkoutDayForm />}
          control={
            <Select
              id="SplitDayItemCard-other-exercise"
              placeholder="Search other exercise"
              options={[]}
            />
          }
        />
      </div>
    </Styles>
  )
}
