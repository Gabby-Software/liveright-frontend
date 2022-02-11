import { FC, useMemo, useState } from 'react'

import {
  MealIconV1
  // SearchIcon
} from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import AutoCompleteInput from '../../../form/autoCompleteInput/autoCompleteInput.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import MealItem from '../../components/quick-access-log-item/quick-access-log-item.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-log-meal.styles'

const meals = [
  {
    Icon: MealIconV1,
    iconColor: '#90BF45',
    name: 'Lunch',
    amount: '3 Foods',
    completed: true
  },
  {
    Icon: MealIconV1,
    iconColor: '#90BF45',
    name: 'Lunch',
    amount: '3 Foods',
    completed: false
  }
]

const QuickAccessLogMeal: FC = () => {
  const { t } = useTranslation()
  const { setRoute } = useQuickAccess()

  const [search, setSearch] = useState('')

  const options = useMemo(() => {
    return (
      [
        { value: 'Lunch', label: 'Lunch' },
        { value: 'Dinner', label: 'Dinner' }
      ].filter((meal: any) =>
        meal.label.toLowerCase().includes(search.toLowerCase())
      ) || []
    )
  }, [search])

  return (
    <Styles>
      <QuickAccessBack label={'log'} route={quickAccessRoutes.LOG} />

      <h3>{t('quickaccess:log-meal.title')}</h3>

      <AutoCompleteInput
        id="meals-search"
        placeholder={t('quickaccess:log-meal.search-placeholder')}
        // prefix={<SearchIcon />}
        options={options}
        value={search}
        onChange={(value) => setSearch(value)}
        className="qa-log-meal__search"
      />

      <h4>{t('quickaccess:log-meal.today-exercises')}</h4>
      {meals.map((meal, index) => (
        <MealItem
          key={meal.name}
          {...meal}
          onClick={() =>
            setRoute(quickAccessRoutes.MEAL_OVERVIEW, {
              id: (index + 1).toString(),
              name: meal.name
            })
          }
        />
      ))}

      <Button
        variant="text"
        className="qa-log-meal__button"
        size="sm"
        onClick={() =>
          setRoute(quickAccessRoutes.ADD_FOOD, { parentRoute: 'log-meal' })
        }
      >
        {t('quickaccess:log-meal.add-new')}
      </Button>
    </Styles>
  )
}

export default QuickAccessLogMeal
