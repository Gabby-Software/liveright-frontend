import moment from 'moment'
import { useState } from 'react'

import { CaretDownIcon, ClockIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import { Styles } from './split-day-meal-card.styles'

interface IProps {
  data: any
  onShow?: (s: any) => void
}

const MACROS_KEY_LABEL: { [key: string]: string } = {
  proteins: 'Proteins',
  fat: 'Fat',
  net_carbs: 'Net Carbs',
  sugar: 'Sugar',
  fiber: 'Fiber',
  total_carbs: 'Total Carbs',
  calories: 'Calories'
}

export default function SplitDayMealCard({ data, onShow }: IProps) {
  const [show, setShow] = useState(false)
  return (
    <Styles>
      <div className="SplitDayMealCard__card">
        <p className="SplitDayMealCard__title">{data.name}</p>
        <p className="SplitDayMealCard__subtitle">
          <ClockIcon />
          {data.time
            ? `Scheduled for ${moment('1970/01/01 ' + data.time).format(
                'HH:mm'
              )}`
            : 'Not Scheduled'}
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
              onClick={() => {
                setShow(!show)
                onShow && onShow(!show)
              }}
            >
              <CaretDownIcon />
              {show ? 'Hide' : 'Show'} macronutrients
            </Button>
          </div>

          {show && (
            <div className="SplitDayMealCard__macronutrients">
              {Object.keys(MACROS_KEY_LABEL).map((k) => (
                <div key={k} className="SplitDayMealCard__macronutrient">
                  <p className="SplitDayMealCard__macronutrient-title">
                    {MACROS_KEY_LABEL[k]}
                  </p>
                  <p className="SplitDayMealCard__macronutrient-value">
                    {data.total_target?.[k]}
                    {k === 'calories' ? 'kcal' : 'g'}
                  </p>
                </div>
              ))}
            </div>
          )}

          {data.items?.map((item: any, i: number) => (
            <p key={i} className="SplitDayMealCard__content-row">
              {item.data?.name} - {item.data?.info?.grams}g
            </p>
          ))}
        </div>
      </div>
    </Styles>
  )
}
