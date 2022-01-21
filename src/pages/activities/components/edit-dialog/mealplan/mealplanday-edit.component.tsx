import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useFormContext } from 'react-hook-form'

import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import Macronutrient from '../../macronutrient/macronutrient.component'
import MealDayForm from '../../meal-day-form/meal-day-form.component'
import { DeletableDay } from '../shared/day-item.component'
import { Styles } from '../shared/planday-edit.styles'

const nutrients = {
  Proteins: 'proteins',
  Fat: 'fat',
  'Net Carbs': 'net_carbs',
  Sugar: 'sugar',
  Fiber: 'fiber',
  'Total Carbs': 'total_carbs',
  Calories: 'calories'
}
interface MealPlanEditProps {
  data: any
  name: string
  onClose?: () => void
}
const MealPlanEdit = ({ name, onClose }: MealPlanEditProps) => {
  const isMobile = useIsMobile()
  const [dayView, setDayView] = useState(false)
  const [useDayData, setUseDayData] = useState<any[]>([])

  const methods = useFormContext()

  useEffect(() => {
    getDaysOfUse()
  }, [])

  const getDaysOfUse = () => {
    const days: any[] = methods.getValues('days')
    const dpName = methods.getValues(`${name}.name`)

    const dayUsed = days
      .map((d, i) => {
        if (dpName && d?.diet_plan_day?.name === dpName) {
          return {
            day: `Day ${i + 1}`,
            onDelete:
              name === `days.${i}.diet_plan_day`
                ? null
                : () => {
                    methods.setValue(`days.${i}.diet_plan_day`, {
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
      <FormProvider {...methods}>
        <section className="TSPlanDayEdit__block">
          <Controller
            name={`${name}.name`}
            render={({ field: { value, name } }) => (
              <Input
                id="add-meal-plan-name"
                label="Meal Plan Day Name"
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
              {useDayData.map((d) => (
                <DeletableDay key={d.day} name={d.day} onDelete={d.onDelete} />
              ))}
            </div>
          </div>
        </section>

        <section className="TSPlanDayEdit__block">
          <section className="TSPlanDayEdit__flex">
            <FormToggleUI
              value={dayView}
              onUpdate={() => setDayView(!dayView)}
              className="toggle"
            />
            <p>Day Target</p>
          </section>

          {dayView ? (
            <section className="TSPlanDayEdit__flex-wrap">
              {Object.entries(nutrients).map(([label, key], i) => (
                <Controller
                  key={i}
                  name={`${name}.total_target.${key}`}
                  render={({ field: { name, value } }) => (
                    <Input
                      id="add-meal-plan-name"
                      label={`${label} (g)`}
                      placeholder="0"
                      className="EditPlan__input"
                      value={value}
                      onChange={(e: any) =>
                        methods.setValue(name, e.target.value)
                      }
                    />
                  )}
                />
              ))}
            </section>
          ) : (
            <>
              <section className="TSPlanDayEdit__flex">
                {Object.keys(nutrients).map((k) => (
                  <Macronutrient
                    key={k}
                    title={k}
                    amount={methods.getValues(
                      `${name}.total_target.${(nutrients as any)[k]}`
                    )}
                  />
                ))}
              </section>

              <p className="subtitle">List meals of this diet plan</p>

              <div className="TSPlanDayEdit__meals">
                <MealDayForm name={`${name}.activities`} />
              </div>
            </>
          )}

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

export default MealPlanEdit
