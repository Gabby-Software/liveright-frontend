import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { AddIcon } from '../../../../../assets/media/icons'
import Button from '../../../../../components/buttons/button/button.component'
import Dialog from '../../../../../components/dialogs/dialog/dialog.component'
import Input from '../../../../../components/form/input/input.component'
import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import Macronutrient from '../../macronutrient/macronutrient.component'
import Meal from '../../meal-day-accordion/components/meal/meal.component'
import { DeletableDay } from '../shared/day-item.component'
import { Styles } from '../shared/edit-dialog.styles'

interface MealPlanEditDialogProps {
  data: any
  open: boolean
  onClose?: () => void
}
const MealPlanEditDialog = (props: MealPlanEditDialogProps) => {
  const { data, ...others } = props

  const [dayView, setDayView] = useState(false)
  const methods = useForm({
    defaultValues: {
      name: data?.name
    }
  })

  const onNew = () => {}
  const meals = data?.meals

  return (
    <Dialog title="Edit Meal Plan Day" extended {...others}>
      <Styles>
        <FormProvider {...methods}>
          <section className="EditDialog__block">
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

            <div className="EditDialog__days">
              <p className="subtitle">Currently used on</p>
              <div className="EditDialog__days-container">
                <DeletableDay name="Day 2" />
              </div>
            </div>
          </section>

          <section className="EditDialog__block">
            <section className="EditDialog__flex">
              <FormToggleUI
                value={dayView}
                onUpdate={() => setDayView(!dayView)}
                className="toggle"
              />
              <p>Day Target</p>
            </section>

            {dayView ? (
              <section className="EditDialog__flex">
                {[
                  'Protein',
                  'Fat',
                  'Net Carbs',
                  'Sugar',
                  'Fiber',
                  'Total Carbs',
                  'Calories'
                ].map((row) => (
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
                <section className="EditDialog__flex">
                  {[
                    'Protein',
                    'Fat',
                    'Net Carbs',
                    'Sugar',
                    'Fiber',
                    'Total Carbs',
                    'Calories'
                  ].map((row) => (
                    <Macronutrient key={row} title={row} />
                  ))}
                </section>

                <p className="subtitle">List meals of this diet plan</p>

                <div className="EditDialog__meals">
                  {meals &&
                    meals.map((meal: any, idx: number) => (
                      <Meal key={idx} data={meal} />
                    ))}
                </div>

                <div className="EditDialog__add" onClick={onNew}>
                  <AddIcon />
                  Add Another Meal
                </div>
              </>
            )}

            <div className="EditDialog__actions">
              <Button onClick={props.onClose}>
                Save and apply to all days
              </Button>
            </div>
          </section>
        </FormProvider>
      </Styles>
    </Dialog>
  )
}

export default MealPlanEditDialog
