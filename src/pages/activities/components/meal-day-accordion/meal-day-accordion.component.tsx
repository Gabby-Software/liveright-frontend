import { get } from 'lodash'
import { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { FoodIcon } from '../../../../assets/media/icons'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import FoodDay from '../../components/meal-day-accordion/components/food-day/food-day.component'
import DayAccordion from '../day-accordion/day-accordion.component'
import Macronutrient from '../macronutrient/macronutrient.component'
import MealDayForm from '../meal-day-form/meal-day-form.component'
import { Styles } from './meal-day-accordion.styles'

interface MealDayAccordionProps {
  index: number
  onRemove: any
  editDay?: number
  defaultOpened?: boolean
}

const MACROS_LABEL_KEY_MAP = {
  Proteins: 'proteins',
  Fat: 'fat',
  'Net Carbs': 'net_carbs',
  Sugar: 'sugar',
  Fiber: 'fiber',
  'Total Carbs': 'total_carbs',
  Calories: 'calories'
}

export default function MealDayAccordion({
  index,
  onRemove,
  defaultOpened
}: MealDayAccordionProps) {
  const methods = useFormContext()
  const [dayTarget, setDayTarget] = useState(false)
  const [totalMacros, setTotalMacros] = useState({
    grams: 0,
    proteins: 0,
    fat: 0,
    net_carbs: 0,
    sugar: 0,
    fiber: 0,
    total_carbs: 0,
    calories: 0
  })
  const { errors } = methods.formState

  const dayName = useWatch({
    name: `days.${index}.name`,
    control: methods.control
  })

  const name = `days.${index}.activities`

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

  const calculateTotalMacros = () => {
    const activities: any[] = methods.getValues(name)

    const macros = {
      grams: 0,
      proteins: 0,
      fat: 0,
      net_carbs: 0,
      sugar: 0,
      fiber: 0,
      total_carbs: 0,
      calories: 0
    }

    activities?.forEach((a) => {
      const items = a.items
      items?.forEach((i: any) => {
        const info = i.data.info
        Object.keys(macros).map((k: string) => {
          return ((macros as any)[k] += parseInt(info[k] || 0))
        })
      })
    })

    setTotalMacros(macros)
  }

  methods.watch(() => {
    calculateTotalMacros()
  })

  return (
    <DayAccordion
      title={dayName}
      icon={<FoodIcon />}
      iconColor={getColorCarry('primary_v2')}
      onRemove={onRemove}
      error={get(errors, `days.${index}`) ? 'Enter all fields' : ''}
      defaultOpen={defaultOpened}
    >
      <Styles>
        <div className="MealDayAccordion__name-container">
          <Controller
            name={`days.${index}.name`}
            render={({ field: { name, value } }) => (
              <Input
                id="MealDayAccordion-name"
                label="Meal plan day name"
                placeholder="Name"
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                // error={get(errors, name)}
                className={get(errors, name) ? 'invalid-field' : ''}
                shouldScrollTo={get(errors, name)}
              />
            )}
          />

          <div className="MealDayAccordion__day-toggle">
            <FormToggleUI
              value={dayTarget}
              onUpdate={() => setDayTarget(!dayTarget)}
            />
            <p className="MealDayAccordion__day-toggle-label">Day Target</p>
          </div>
        </div>

        <Controller
          render={({ field: { value, name } }) => (
            <div className="MealDayAccordion__checkbox-container">
              <Checkbox
                checked={value}
                onChange={(e) => methods.setValue(name, e.target.checked)}
              />
              <Label className="MealDayAccordion__checkbox">
                Save Meal Plan as template
              </Label>
            </div>
          )}
          name={`days.${index}.save_as_template`}
        />

        {!dayTarget ? (
          <>
            <div className="MealDayAccordion__macronutrients">
              {[
                'Proteins',
                'Fat',
                'Net Carbs',
                'Sugar',
                'Fiber',
                'Total Carbs',
                'Calories'
              ].map((row) => (
                <Macronutrient
                  key={row}
                  title={row}
                  amount={`${
                    (totalMacros as any)[(MACROS_LABEL_KEY_MAP as any)[row]]
                  }
                ${row === 'Calories' ? 'KCal' : 'g'}`}
                />
              ))}
            </div>

            <p className="MealDayAccordion__subtitle">
              List meals of this diet plan
            </p>

            <MealDayForm name={name} />

            <Controller
              render={({ field: { value, name } }) => (
                <div className="MealDayAccordion__checkbox-container">
                  <Checkbox
                    checked={value}
                    onChange={(e) => methods.setValue(name, e.target.checked)}
                  />
                  <Label className="MealDayAccordion__checkbox">
                    Save as re-usable template
                  </Label>
                </div>
              )}
              name={`days.${index}.save_as_template`}
            />
          </>
        ) : (
          <FoodDay name={`days.${index}.food-day`} />
        )}
      </Styles>
    </DayAccordion>
  )
}
