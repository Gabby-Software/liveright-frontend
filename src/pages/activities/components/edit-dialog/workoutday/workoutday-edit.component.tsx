import React, { useMemo } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import WorkoutDayForm from '../../workout-day-form/workout-day-form.component'
import { DeletableDay } from '../shared/day-item.component'
import { Styles } from '../shared/planday-edit.styles'

interface WorkoutDayEditProps {
  data: any
}
const WorkoutDayEdit = ({ data }: WorkoutDayEditProps) => {
  const isMobile = useIsMobile()
  const initValues = useMemo(() => {
    if (!data) return {}

    const workouts = data.activities.map((workout: any) => {
      const items = workout.items
      const resultItems: any[] = []
      items.forEach((item: any, idx: number) => {
        const superset = item.length !== 1
        if (superset) {
          resultItems.push({
            id: idx,
            is_superset: superset,
            data: item
          })
        } else {
          resultItems.push({
            id: idx,
            is_superset: superset,
            data: item[0]
          })
        }
      })

      return {
        name: workout.name,
        items: resultItems
      }
    })

    return {
      name: data.name,
      workouts
    }
  }, [data])

  const methods = useForm({
    defaultValues: initValues
  })

  const onClose = () => {}

  return (
    <Styles>
      <FormProvider {...methods}>
        <section className="TSPlanDayEdit__block">
          <Controller
            name="name"
            render={({ field: { value, name } }) => (
              <Input
                id="add-training-plan-name"
                label="Training Plan Day Name"
                placeholder="Name"
                className="EditPlan__input"
                value={value}
                onChange={(e: any) => methods.setValue(name, e.target.value)}
              />
            )}
          />

          <div className="TSPlanDayEdit__days">
            <p className="subtitle">Currently used on</p>
            <div className="TSPlanDayEdit__days-container">
              <DeletableDay name="Day 1" />
              <DeletableDay name="Day 3" />
            </div>
          </div>
        </section>

        <section className="TSPlanDayEdit__block">
          <p className="subtitle">List workouts of this training plan</p>

          <div className="TSPlanDayEdit__workouts">
            <WorkoutDayForm name="workouts" />
          </div>

          {isMobile || (
            <div className="TSPlanDayEdit__actions">
              <Button onClick={onClose}>Save and apply to all days</Button>
            </div>
          )}
        </section>

        {isMobile && (
          <section className="TSPlanDayEdit__block">
            <Button onClick={onClose} className="action">
              Save and apply to all days
            </Button>
          </section>
        )}
      </FormProvider>
    </Styles>
  )
}

export default WorkoutDayEdit
