import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Input from '../../../../../components/form/input/input.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import Macronutrient from '../../macronutrient/macronutrient.component'
import Meal from '../../meal-day-accordion/components/meal/meal.component'
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
  const [dayView, setDayView] = useState(false)
  const methods = useForm({
    defaultValues: {
      name: data?.name
    }
  })

  const onNew = () => {}
  const onClose = () => {}
  const meals = data?.meals

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
            <section className="TSPlanDayEdit__flex">
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
                {meals &&
                  meals.map((meal: any, idx: number) => (
                    <Meal key={idx} data={meal} index={idx} />
                  ))}
              </div>

              <div className="TSPlanDayEdit__add" onClick={onNew}>
                <AddIcon />
                Add Another Meal
              </div>
            </>
          )}

          <div className="TSPlanDayEdit__actions">
            <Button onClick={onClose}>Save and apply to all days</Button>
          </div>
        </section>
      </FormProvider>
    </Styles>
  )
}

export default MealPlanEdit
