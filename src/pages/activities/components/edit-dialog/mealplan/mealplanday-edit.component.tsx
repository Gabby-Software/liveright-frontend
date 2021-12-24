import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import Macronutrient from '../../macronutrient/macronutrient.component'
import MealDayForm from '../../meal-day-form/meal-day-form.component'
import { DeletableDay } from '../shared/day-item.component'
import { Styles } from '../shared/planday-edit.styles'

const nutrients = [
  'Protein',
  'Fat',
  'Net Carbs',
  'Sugar',
  'Fiber',
  'Total Carbs',
  'Calories'
]
interface MealPlanEditProps {
  data: any
}
const MealPlanEdit = ({ data }: MealPlanEditProps) => {
  const isMobile = useIsMobile()
  const [dayView, setDayView] = useState(false)
  const methods = useForm({
    defaultValues: {
      name: data?.name
    }
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
              <DeletableDay name="Day 2" />
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
              {nutrients.map((row) => (
                <Controller
                  key={row}
                  name="name"
                  render={({ field: { name } }) => (
                    <Input
                      id="add-meal-plan-name"
                      label={`${row} (g)`}
                      placeholder="0"
                      className="EditPlan__input"
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
                {nutrients.map((row) => (
                  <Macronutrient key={row} title={row} />
                ))}
              </section>

              <p className="subtitle">List meals of this diet plan</p>

              <div className="TSPlanDayEdit__meals">
                <MealDayForm name="" />
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
