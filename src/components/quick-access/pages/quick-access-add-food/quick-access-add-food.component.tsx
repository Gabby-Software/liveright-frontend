import { FormikProvider, useFormik } from 'formik'
import moment from 'moment'
import { FC, useState } from 'react'

import { SearchIcon } from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import DatePicker from '../../../form/date-picker/date-picker.component'
import Input from '../../../form/input/input.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import Macronutrient from '../../components/quick-access-macronutrient/quick-access-macronutrient.component'
import MacronutrientComparison from '../../components/quick-access-macronutrient-comparison/quick-access-macronutrient-comparison.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-add-food.styles'

const nutrients: { [key: string]: string } = {
  Proteins: 'proteins',
  Fat: 'fat',
  'Net Carbs': 'net_carbs',
  Sugar: 'sugar',
  Fiber: 'fiber',
  'Total Carbs': 'total_carbs',
  Calories: 'calories'
}

const nutrientValues: { [key: string]: number } = {
  Proteins: 11,
  Fat: 9,
  'Net Carbs': 12,
  Sugar: 10,
  Fiber: 20,
  'Total Carbs': 5,
  Calories: 10
}

const QuickAccessAddExercise: FC = () => {
  const { t } = useTranslation()
  const { routeParams } = useQuickAccess()

  const formik = useFormik({
    initialValues: {
      date: '',
      food: '',
      quantity: '',
      proteins: '',
      fat: '',
      net_carbs: '',
      sugar: '',
      fiber: '',
      total_carbs: '',
      calories: ''
    } as { [key: string]: string },
    // validationSchema: formValidations,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <Styles>
      <QuickAccessBack
        label={routeParams?.parentRoute === 'meal-overview' ? 'detail' : 'log'}
        route={
          routeParams?.parentRoute === 'meal-overview'
            ? quickAccessRoutes.MEAL_OVERVIEW
            : quickAccessRoutes.LOG_MEAL
        }
      />

      <div className="qa-add-food__body">
        <h2>{t('quickaccess:add-food.title')}</h2>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            {routeParams?.parentRoute === 'meal-overview' && (
              <DatePicker
                className="qa-add-food__date"
                id="qa-add-food-date"
                defaultPickerValue={moment()}
                defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                allowClear={false}
                label={t('quickaccess:add-food.label-date')}
                value={formik.values.date}
                onChange={(value, dateStr) =>
                  formik.setFieldValue('date', dateStr)
                }
              />
            )}

            <div className="qa-add-food__input-group">
              <Input
                className="qa-add-food__input-food"
                id="qa-add-food-food"
                label={t('quickaccess:add-food.label-food')}
                name="food"
                placeholder={t('quickaccess:add-food.placeholder-food')}
                value={formik.values.food}
                suffix={<SearchIcon />}
                onChange={(e) => formik.setFieldValue('food', e.target.value)}
              />

              <Input
                className="qa-add-food__input-quantity"
                id="qa-add-food-quantity"
                label={t('quickaccess:add-food.label-quantity')}
                name="sets"
                value={formik.values.quantity}
                placeholder="-"
                onChange={(e) =>
                  !isNaN(+e.target.value) &&
                  formik.setFieldValue('quantity', e.target.value)
                }
              />
            </div>

            <div className="qa-add-food__input-group-nutrients">
              {Object.keys(nutrients).map((k) => (
                <Input
                  key={k}
                  className="qa-add-food__input-nutrient"
                  id={`qa-add-food-${nutrients[k]}`}
                  label={t(`quickaccess:add-food.label-${nutrients[k]}`)}
                  name={k}
                  value={formik.values[nutrients[k]]}
                  placeholder="-"
                  onChange={(e) =>
                    !isNaN(+e.target.value) &&
                    formik.setFieldValue(nutrients[k], e.target.value)
                  }
                />
              ))}
            </div>

            <h3>{t('quickaccess:add-food.meal-overview')}</h3>
            <div className="qa-add-food__meal-overview">
              {routeParams?.parentRoute === 'meal-overview'
                ? Object.keys(nutrients).map((k) => (
                    <MacronutrientComparison
                      key={k}
                      title={k}
                      amount={nutrientValues[k]}
                      target={10}
                    />
                  ))
                : Object.keys(nutrients).map((k) => (
                    <Macronutrient key={k} title={k} amount={'120g'} />
                  ))}
            </div>

            <div className="qa-add-food__button-group">
              {routeParams?.parentRoute === 'log-meal' && (
                <Button variant="secondary" className="qa-add-food__button">
                  {t('quickaccess:add-food.add-btn')}
                </Button>
              )}

              {routeParams?.parentRoute === 'log-meal' ? (
                <Button className="qa-add-food__button">
                  {t('quickaccess:add-food.add-log-btn')}
                </Button>
              ) : (
                <Button className="qa-add-food__button">
                  {t('quickaccess:add-food.add-food')}
                </Button>
              )}
            </div>
          </form>
        </FormikProvider>
      </div>
    </Styles>
  )
}

export default QuickAccessAddExercise
