import { get } from 'lodash'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { FoodIcon } from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
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

export default function MealDayAccordion({
  index,
  onRemove,
  defaultOpened
}: MealDayAccordionProps) {
  const methods = useFormContext()

  const { errors } = methods.formState

  const dayName = useWatch({
    name: `days.${index}.name`,
    control: methods.control
  })

  const name = `days.${index}.activities`

  const onChange = (name: string, value: any) => {
    methods.setValue(name, value, { shouldValidate: true })
  }

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
                error={get(errors, name)}
              />
            )}
          />
        </div>

        <div className="MealDayAccordion__macronutrients">
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
        </div>

        <p className="MealDayAccordion__subtitle">
          List meals of this diet plan
        </p>

        <MealDayForm name={name} />
      </Styles>
    </DayAccordion>
  )
}
