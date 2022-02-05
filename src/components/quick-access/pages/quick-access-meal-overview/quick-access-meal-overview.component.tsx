import moment from 'moment'
import React, { FC } from 'react'

import { AddIcon } from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import Button from '../../../buttons/button/button.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import Macronutrient from '../../components/quick-access-macronutrient/quick-access-macronutrient.component'
import QuickAccessTopbar from '../../components/quick-access-topbar/quick-access-topbar.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import FoodItem from './quick-access-food-item/quick-access-food-item.component'
import Styles from './quick-access-meal-overview.styles'

const nutrients = {
  Proteins: 'proteins',
  Fat: 'fat',
  'Net Carbs': 'net_carbs',
  Sugar: 'sugar',
  Fiber: 'fiber',
  'Total Carbs': 'total_carbs',
  Calories: 'calories'
}

interface Props {}

const QuickAccessMealOverview: FC<Props> = () => {
  const { t } = useTranslation()
  const { routeParams, setRoute } = useQuickAccess()

  return (
    <Styles>
      <QuickAccessTopbar height={190} />
      <QuickAccessBack
        label="log-meals"
        route={quickAccessRoutes.LOG_MEAL}
        color={getColorCarry('neutral_50')}
      />
      <div className="qa-meal-overview__header">
        <h2>{routeParams?.name}</h2>
        <h3>{moment().format('dddd, D MMMM YYYY').toString()}</h3>

        <div className="qa-meal-overview__header-macronutrients">
          {Object.keys(nutrients).map((k) => (
            <Macronutrient key={k} title={k} amount={'120g'} variant="light" />
          ))}
        </div>
      </div>

      <div className="qa-meal-overview__top-spacing" />

      <div className="qa-meal-overview__body">
        <FoodItem name="Grilled Chicken" macronutrients={nutrients} />
        <FoodItem name="Grilled Chicken" macronutrients={nutrients} />
        <FoodItem name="Grilled Chicken" macronutrients={nutrients} />
      </div>

      <div className="qa-meal-overview__footer">
        <button className="qa-meal-overview__add-food-button">
          <AddIcon />
          <span>{t('quickaccess:meal-overview.add-food-btn')}</span>
        </button>
        <Button onClick={() => setRoute(quickAccessRoutes.LOG_MEAL)}>
          {t('quickaccess:meal-overview.mark-completed-btn')}
        </Button>
      </div>
    </Styles>
  )
}

export default QuickAccessMealOverview
