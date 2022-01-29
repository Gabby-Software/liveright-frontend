import { get } from 'lodash'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AddIcon } from '../../../../../../assets/media/icons'
import Error from '../../../../../../components/form/error/error.component'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import Meal from '../meal/meal.component'
import MealAccordion from '../meal-accordion/meal-accordion.component'
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
    save_as_template: false,
    items: []
  }
}

export default function MealDayForm({ name }: MealDayFormProps) {
  const isMobile = useIsMobile()

  const methods = useFormContext()

  const data = useFieldArray({
    control: methods.control,
    name
  })

  const handleDayAdd = () => {
    data.append(createMeal())
    methods.clearErrors(name)
  }

  const handleDayRemove = (index: number) => {
    data.remove(index)
  }

  const { errors } = methods.formState

  return (
    <Styles>
      {data.fields.map((row: any, index: number) =>
        isMobile ? (
          <MealAccordion
            key={row.id}
            index={index}
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
