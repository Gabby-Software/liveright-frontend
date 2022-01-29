import { FC } from 'react'

import {
  BikeIcon,
  SearchIcon,
  WorkoutIconV1
} from '../../../../assets/media/icons'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import Input from '../../../form/input/input.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import ExerciseItem from '../../components/quick-access-log-item/quick-access-log-item.component'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-log-exercise.styles'

const exercises = [
  {
    Icon: WorkoutIconV1,
    iconColor: '#E49A0A',
    name: 'The Great Workout',
    amount: '3 Exercises',
    completed: true
  },
  {
    Icon: WorkoutIconV1,
    iconColor: '#E49A0A',
    name: 'Second Day Workout',
    amount: '3 Exercises',
    completed: false
  },
  {
    Icon: BikeIcon,
    iconColor: '#EF1733',
    name: 'Cardio Bike',
    amount: '10 min',
    completed: false
  }
]

const QuickAccessLogExercise: FC = () => {
  const { t } = useTranslation()

  return (
    <Styles>
      <QuickAccessBack label={'log'} route={quickAccessRoutes.LOG} />

      <h3>{t('quickaccess:log-exercise.title')}</h3>

      <Input
        id="exercises-search"
        placeholder={t('quickaccess:log-exercise.search-placeholder')}
        prefix={<SearchIcon />}
        onChange={() => null}
        className="qa-log-exercise__search"
      />

      <h4>{t('quickaccess:log-exercise.today-exercises')}</h4>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.name} {...exercise} />
      ))}

      <Button variant="text" className="qa-log-exercise__button" size="sm">
        {t('quickaccess:log-exercise.add-new')}
      </Button>
    </Styles>
  )
}

export default QuickAccessLogExercise
