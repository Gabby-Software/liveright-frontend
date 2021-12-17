import React from 'react'

import ItemAccordion from '../item-accordion/item-accordion.component'
import Macronutrient from '../macronutrient/macronutrient.component'
import { Styles } from './meal-card.styles'

interface MealCardProps {
  name: string
  nutrients: { name: string; value: string }[]
  meals: { name: string; value: string }[]
}
export const MealCard = (props: MealCardProps) => {
  const { name, nutrients, meals } = props
  const content = (
    <section className="MealCard__nutrients">
      {nutrients.map((item) => (
        <Macronutrient title={item.name} amount={item.value} key={item.name} />
      ))}
    </section>
  )
  return (
    <Styles>
      <ItemAccordion
        title={name}
        content={content}
        iconDesc="Show Macronutrients"
        divider
      />

      <section className="MealCard__meal">
        {meals.map((meal) => (
          <div className="meal-food" key={meal.name}>
            <span>{meal.name}</span>
            &nbsp;-&nbsp;
            <span>{meal.value}</span>
          </div>
        ))}
      </section>
    </Styles>
  )
}
