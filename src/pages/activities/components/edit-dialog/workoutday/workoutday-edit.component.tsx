import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import WorkoutDayForm from '../../workout-day-form/workout-day-form.component'
import { DeletableDay } from '../shared/day-item.component'
import { Styles } from '../shared/planday-edit.styles'

interface WorkoutDayEditProps {
  data: any
  name: string
  onClose?: () => void
}
const WorkoutDayEdit = ({ name, onClose }: WorkoutDayEditProps) => {
  const isMobile = useIsMobile()
  const [useDayData, setUseDayData] = useState<any[]>([])
  // const initValues = useMemo(() => {
  //   if (!data) return {}

  //   const workouts = data.activities.map((workout: any) => {
  //     const items = workout.items
  //     const resultItems: any[] = []
  //     items.forEach((item: any, idx: number) => {
  //       const superset = item.length !== 1
  //       if (superset) {
  //         resultItems.push({
  //           id: idx,
  //           is_superset: superset,
  //           data: item
  //         })
  //       } else {
  //         resultItems.push({
  //           id: idx,
  //           is_superset: superset,
  //           data: item[0]
  //         })
  //       }
  //     })

  //     return {
  //       name: workout.name,
  //       items: resultItems
  //     }
  //   })

  //   return {
  //     name: data.name,
  //     workouts
  //   }
  // }, [data])

  const methods = useFormContext()

  useEffect(() => {
    getDaysOfUse()
  }, [])

  const getDaysOfUse = () => {
    const days: any[] = methods.getValues('days')
    const tpName = methods.getValues(`${name}.name`)

    const dayUsed = days
      .map((d, i) => {
        if (tpName && d?.training_plan_day?.name === tpName) {
          return {
            day: `Day ${i + 1}`,
            onDelete:
              name === `days.${i}.training_plan_day`
                ? null
                : () => {
                    methods.setValue(`days.${i}.training_plan_day`, {
                      name: ''
                    })
                    getDaysOfUse()
                  }
          }
        }
      })
      .filter((d) => !!d)

    setUseDayData(dayUsed || [])
  }

  return (
    <Styles>
      <section className="TSPlanDayEdit__block">
        <Controller
          name={`${name}.name`}
          render={({ field: { value, name } }) => (
            <Input
              id="add-training-plan-name"
              label="Training Plan Day Name"
              placeholder="Name"
              className="EditPlan__input"
              value={value}
              onChange={(e: any) => {
                methods.setValue(name, e.target.value)
              }}
            />
          )}
        />

        <div className="TSPlanDayEdit__days">
          <p className="subtitle">Currently used on</p>
          <div className="TSPlanDayEdit__days-container">
            {useDayData.map((d) => (
              <DeletableDay key={d.day} name={d.day} onDelete={d.onDelete} />
            ))}
          </div>
        </div>
      </section>

      <section className="TSPlanDayEdit__block">
        <p className="subtitle">List workouts of this training plan</p>

        <div className="TSPlanDayEdit__workouts">
          <WorkoutDayForm name={`${name}.activities`} />
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
    </Styles>
  )
}

export default WorkoutDayEdit
