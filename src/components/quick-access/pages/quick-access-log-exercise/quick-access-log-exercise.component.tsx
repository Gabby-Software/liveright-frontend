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
import WorkoutItem from '../../components/quick-access-log-item/quick-access-log-item.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-log-exercise.styles'

const QuickAccessLogExercise: FC = () => {
  const { t } = useTranslation()
  const { setRoute, workoutsData } = useQuickAccess()

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
      {workoutsData.map((workout) => (
        <WorkoutItem
          key={workout.id}
          name={workout.name}
          completed={workout.completed}
          Icon={workout.type === 'strength' ? WorkoutIconV1 : BikeIcon}
          iconColor={workout.type === 'strength' ? '#E49A0A' : '#EF1733'}
          amount={
            workout.type === 'cardio'
              ? workout.time
              : `${workout.exercises.length} exercises`
          }
          onClick={() =>
            setRoute(quickAccessRoutes.WORKOUT_OVERVIEW, {
              id: workout.id,
              name: workout.name
            })
          }
        />
      ))}

      <Button variant="text" className="qa-log-exercise__button" size="sm">
        {t('quickaccess:log-exercise.add-new')}
      </Button>
    </Styles>
  )
}

export default QuickAccessLogExercise
