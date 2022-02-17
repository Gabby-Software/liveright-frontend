import { get } from 'lodash'
import { useMemo, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { FoodIcon } from '../../../../assets/media/icons'
import AutoCompleteInput from '../../../../components/form/autoCompleteInput/autoCompleteInput.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
// import Input from '../../../../components/form/input/input.component'
import Label from '../../../../components/form/label/label.component'
import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import useTemplateMealPlans from '../../../../hooks/api/templates/useTemplateMealPlans'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getUniqueItemsByProperties } from '../../../../utils/arrays'
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

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

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

  const { mealPlans } = useTemplateMealPlans()

  const mealPlansInDP = useWatch({
    name: `days`,
    control: methods.control
  })

  const mealPlanName = useWatch({
    control: methods.control,
    name: `days.${index}.name`
  })

  const onMealPlanNameSelect = (value: string) => {
    console.log('onMealPlanNameSelect', value)
  }

  const mealPlanNameOptions = useMemo(() => {
    const planOptions = mealPlansInDP
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(mealPlanName?.toLowerCase()) &&
          w?.name !== mealPlanName
      )
      ?.map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const templateOptions = mealPlans
      ?.filter(
        (w: any) =>
          w?.name?.toLowerCase()?.includes(mealPlanName?.toLowerCase()) &&
          w?.name !== mealPlanName
      )
      .map((w: any) => ({
        label: w.name,
        value: w.name
      }))

    const options = []

    if (planOptions?.length) {
      options.push({
        label: 'From this Diet Plan',
        options: getUniqueItemsByProperties(planOptions, ['label'])
      })
    }

    if (templateOptions.length) {
      options.push({
        label: 'From Templates',
        options: getUniqueItemsByProperties(templateOptions, ['label'])
      })
    }

    return options.length ? options : []
  }, [mealPlansInDP, mealPlans, mealPlanName])

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
              // <Input
              //   id="MealDayAccordion-name"
              //   label="Meal Plan name"
              //   placeholder="Name"
              //   value={value}
              //   onChange={(e) => onChange(name, e.target.value)}
              //   // error={get(errors, name)}
              //   className={get(errors, name) ? 'invalid-field' : ''}
              //   shouldScrollTo={get(errors, name)}
              // />
              <AutoCompleteInput
                id="MealDayAccordion-name"
                label="Meal Plan name"
                placeholder="Name"
                value={value}
                onChange={(value) => methods.setValue(name, value)}
                className={get(errors, name) ? 'invalid-field' : ''}
                options={mealPlanNameOptions}
                onSelect={onMealPlanNameSelect}
                shouldScrollTo={get(errors, name)}
              />
            )}
          />

          <Controller
            render={({ field: { value, name } }) => (
              <div className="MealDayAccordion__day-toggle">
                <FormToggleUI
                  value={value}
                  onUpdate={(val) => onChange(name, val)}
                />
                <p className="MealDayAccordion__day-toggle-label">Day Target</p>
              </div>
            )}
            name={`days.${index}.is_day_target`}
          />
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
