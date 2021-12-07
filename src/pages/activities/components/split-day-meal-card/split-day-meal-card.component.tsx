import { useState } from 'react'

import { CaretDownIcon, ClockIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import { Styles } from './split-day-meal-card.styles'

export default function SplitDayMealCard() {
  const [show, setShow] = useState(false)
  return (
    <Styles>
      <div className="SplitDayMealCard__card">
        <p className="SplitDayMealCard__title">Meal 1</p>
        <p className="SplitDayMealCard__subtitle">
          <ClockIcon />
          Scheduled for 08.00
        </p>
      </div>
      <div className="SplitDayMealCard__card">
        <div className="SplitDayMealCard__content">
          <div className="SplitDayMealCard__content-head">
            <p className="SplitDayMealCard__content-title">List meals</p>

            <Button
              size="sm"
              variant="text"
              className="SplitDayMealCard__content-toggle"
              onClick={() => setShow(!show)}
            >
              <CaretDownIcon />
              {show ? 'Hide' : 'Show'} macronutrients
            </Button>
          </div>

          {show && (
            <div className="SplitDayMealCard__macronutrients">
              {['Calories', 'Carbs', 'Fat', 'Protein'].map((row) => (
                <div key={row} className="SplitDayMealCard__macronutrient">
                  <p className="SplitDayMealCard__macronutrient-title">{row}</p>
                  <p className="SplitDayMealCard__macronutrient-value">120g</p>
                </div>
              ))}
            </div>
          )}

          {[
            'Chicken Brest Tender  -  100g',
            'Brown Rice  -  50g',
            'Red Apple'
          ].map((row) => (
            <p key={row} className="SplitDayMealCard__content-row">
              {row}
            </p>
          ))}
        </div>
      </div>
    </Styles>
  )
}
