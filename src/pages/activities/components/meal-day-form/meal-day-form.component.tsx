import { AddIcon } from '../../../../assets/media/icons'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Meal from '../meal-day-accordion/components/meal/meal.component'
import MealAccordion from '../meal-day-accordion/components/meal-accordion/meal-accordion.component'
import { Styles } from './meal-day-form.styles'

export default function MealDayForm() {
  const isMobile = useIsMobile()
  return (
    <Styles>
      {[1].map((row, indexedDB) =>
        isMobile ? (
          <MealAccordion key={row} />
        ) : (
          <Meal key={row} index={indexedDB} />
        )
      )}

      <div className="MealDayForm__add-meal">
        <AddIcon />
        Add Another Meal
      </div>
    </Styles>
  )
}
