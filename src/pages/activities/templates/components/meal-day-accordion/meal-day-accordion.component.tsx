import { get } from 'lodash'
import { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { FoodIcon } from '../../../../../assets/media/icons'
import AutoCompleteInput from '../../../../../components/form/autoCompleteInput/autoCompleteInput.component'
// import Input from '../../../../components/form/input/input.component'
import Macronutrient from '../../../../../components/quick-access/components/quick-access-macronutrient/quick-access-macronutrient.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'
import DayAccordion from '../../../components/day-accordion/day-accordion.component'
import FoodDay from '../../../components/meal-day-accordion/components/food-day/food-day.component'
import MealDayForm from '../meal-day-form/meal-day-form.component'
import { Styles } from './meal-day-accordion.styles'

interface MealDayAccordionProps {
  index: number
  onRemove: any
  editDay?: number
  defaultOpened?: boolean
}

const MACROS_LABEL_KEY_MAP: { [k: string]: string } = {
  proteins: 'Proteins',
  fat: 'Fat',
  net_carbs: 'Net Carbs',
  sugar: 'Sugar',
  fiber: 'Fiber',
  total_carbs: 'Total Carbs',
  calories: 'Calories'
}

export default function MealDayAccordion({
  index,
  onRemove,
  defaultOpened
}: MealDayAccordionProps) {
  const methods = useFormContext()
  // const [dayTarget, setDayTarget] = useState(false)
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

  const [dayName, isDayTarget] = useWatch({
    name: [`days.${index}.name`, `days.${index}.is_day_target`],
    control: methods.control
  })

  const name = `days.${index}.activities`

  const getTwoDecimal = (value: any) => {
    return Math.round((value + Number.EPSILON) * 100) / 100
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
          return ((macros as any)[k] += info[k] || 0)
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
              <AutoCompleteInput
                id="MealDayAccordion-name"
                label="Meal Plan name"
                placeholder="Name"
                value={value}
                onChange={(value) => methods.setValue(name, value)}
                className={get(errors, name) ? 'invalid-field' : ''}
                options={[]}
                shouldScrollTo={get(errors, name)}
              />
            )}
          />
        </div>

        {!isDayTarget ? (
          <>
            <div className="MealDayAccordion__macronutrients">
              {Object.keys(MACROS_LABEL_KEY_MAP).map((k) => (
                <Macronutrient
                  key={k}
                  title={MACROS_LABEL_KEY_MAP[k]}
                  amount={`${getTwoDecimal((totalMacros as any)[k])}
                ${k === 'calories' ? 'KCal' : 'g'}`}
                />
              ))}
            </div>

            <p className="MealDayAccordion__subtitle">
              List meals of this diet plan
            </p>

            <MealDayForm name={name} />
          </>
        ) : (
          <FoodDay name={`days.${index}`} />
        )}
      </Styles>
    </DayAccordion>
  )
}
