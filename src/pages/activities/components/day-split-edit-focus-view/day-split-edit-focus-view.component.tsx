import cloneDeep from 'lodash.clonedeep'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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

interface IProp {
  maxDays: number
  tpDays: any[]
  dpDays: any[]
  handleDayAdd: () => void
}

export default function DaySplitEditFocusView({
  maxDays,
  tpDays,
  dpDays,
  handleDayAdd
}: IProp) {
  const [index, setIndex] = useState(0)
  const methods = useFormContext()

  useEffect(() => {
    if (maxDays - 1 > 0) {
      setIndex(maxDays - 1)
    }
  }, [maxDays])

  if (maxDays <= 0) {
    return (
      <Styles>
        <div className="DaySplitEditFocusView__head">
          <Button variant="secondary" onClick={handleDayAdd}>
            <AddIcon />
            Add more days
          </Button>
        </div>
      </Styles>
    )
  }

  return (
    <Styles>
      <div className="DaySplitEditFocusView__head">
        <div className="DaySplitEditFocusView__title-container">
          <Title className="DaySplitEditFocusView__title">
            Day {index + 1}
          </Title>

          <div className="DaySplitEditFocusView__title-arrows">
            <IconButton
              size="sm"
              onClick={() => setIndex((prev) => (prev - 1 + maxDays) % maxDays)}
            >
              <CaretLeftIcon />
            </IconButton>
            <IconButton
              size="sm"
              onClick={() => setIndex((prev) => (prev + 1) % maxDays)}
            >
              <CaretLeftIcon />
            </IconButton>
          </div>
        </div>

        <Button variant="secondary" onClick={handleDayAdd}>
          <AddIcon />
          Add more days
        </Button>
      </div>

      <div className="DaySplitEditFocusView__content">
        <SplitDayItemCard
          key={`training_day_${index}`}
          title="Training plan"
          color={getColorCarry('orange_50')}
          icon={<WorkoutIcon />}
          content={
            <WorkoutDayForm
              key={`days.${index}.training_plan_day.activities`}
              name={`days.${index}.training_plan_day.activities`}
            />
          }
          control={
            <Controller
              name={`days.${index}.training_plan_day`}
              render={({ field: { value, name } }) => (
                <Select
                  id="SplitDayItemCard-training-plan"
                  placeholder="Search training plan"
                  value={value?._id || ''}
                  options={
                    tpDays?.map((d) => ({
                      label: d.name,
                      value: d._id
                    })) || []
                  }
                  onChange={(value) =>
                    methods.setValue(
                      name,
                      cloneDeep(tpDays.find((d) => d._id === value)),
                      { shouldValidate: true }
                    )
                  }
                />
              )}
            />
          }
        />

        <SplitDayItemCard
          key={`diet_day_${index}`}
          title="Meal plan"
          color={getColorCarry('primary_v2')}
          icon={<FoodIcon />}
          content={
            <MealDayForm
              key={`days.${index}.diet_plan_day.activities`}
              name={`days.${index}.diet_plan_day.activities`}
            />
          }
          control={
            <Controller
              name={`days.${index}.diet_plan_day`}
              render={({ field: { value, name } }) => (
                <Select
                  id="SplitDayItemCard-training-plan"
                  placeholder="Search training plan"
                  value={value?._id || ''}
                  options={
                    dpDays?.map((d) => ({
                      label: d.name,
                      value: d._id
                    })) || []
                  }
                  onChange={(value) =>
                    methods.setValue(
                      name,
                      cloneDeep(dpDays.find((d) => d._id === value))
                    )
                  }
                />
              )}
            />
          }
        />

        <SplitDayItemCard
          title="Other Exercises"
          color={getColorCarry('blue_40')}
          icon={<ExerciseIcon />}
          content={<OtherWorkoutDayForm name={`days.${index}.items`} />}
          control={
            <Controller
              name={`days.${index}.items`}
              render={({ field: { value, name } }) => (
                <Select
                  id="SplitDayItemCard-training-plan"
                  placeholder="Search training plan"
                  value={value?.name || ''}
                  options={[]}
                  onChange={(value) => methods.setValue(name, cloneDeep(value))}
                />
              )}
            />
          }
        />
      </div>
    </Styles>
  )
}
