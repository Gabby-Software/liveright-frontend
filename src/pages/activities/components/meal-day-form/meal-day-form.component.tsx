import { get } from 'lodash'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../assets/media/icons'
import Error from '../../../../components/form/error/error.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Meal from '../meal-day-accordion/components/meal/meal.component'
import MealAccordion from '../meal-day-accordion/components/meal-accordion/meal-accordion.component'
import { Styles } from './meal-day-form.styles'

interface MealDayFormProps {
  name: string
}

function createMeal() {
  return {
    id: Date.now(),
    name: '',
    time: '',
    sort_order: '',
    items: []
  }
}

export default function MealDayForm({ name }: MealDayFormProps) {
  const isMobile = useIsMobile()

  const methods = useFormContext()

  const mealArray = useFieldArray({
    control: methods.control,
    name
  })

  const handleDayAdd = () => {
    mealArray.append(createMeal())
    methods.clearErrors(name)
  }

  const handleDayRemove = (index: number) => {
    mealArray.remove(index)
  }

  const { errors } = methods.formState

  return (
    <Styles>
      {mealArray.fields.map((row, index) =>
        isMobile ? (
          <MealAccordion
            key={row.id}
            name={`${name}.${index}`}
            onRemove={() => handleDayRemove(index)}
          />
        ) : (
          <Meal
            key={row.id}
            index={index}
            name={`${name}.${index}`}
            onRemove={() => handleDayRemove(index)}
          />
        )
      )}

      <div className="MealDayForm__add-meal" onClick={() => handleDayAdd()}>
        <AddIcon />
        Add Another Meal
      </div>

      {typeof get(errors, name) === 'object' &&
        !Array.isArray(get(errors, name)) && (
          <Error standalone="Add at least one meal" />
        )}
    </Styles>
  )
}
