import { FC, useMemo, useState } from 'react'

import {
  // BikeIcon,
  // SearchIcon,
  WorkoutIconV1
} from '../../../../assets/media/icons'
import useTrainingPlan from '../../../../hooks/api/quick-access/useTrainingPlan'
import useTrainingPlans from '../../../../hooks/api/quick-access/useTrainingPlans'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Button from '../../../buttons/button/button.component'
import AutoCompleteInput from '../../../form/autoCompleteInput/autoCompleteInput.component'
// import Input from '../../../form/input/input.component'
import QuickAccessBack from '../../components/quick-access-back/quick-access-back.component'
import WorkoutItem from '../../components/quick-access-log-item/quick-access-log-item.component'
import { useQuickAccess } from '../../quick-access.context'
import { quickAccessRoutes } from '../../quick-access.routes'
import Styles from './quick-access-log-exercise.styles'

const QuickAccessLogExercise: FC = () => {
  const { t } = useTranslation()
  const { setRoute, clientId } = useQuickAccess()

  const [search, setSearch] = useState('')

  const { trainingPlans } = useTrainingPlans({
    clientId,
    status: 'active'
  })
  const activeTrainingPlanId = trainingPlans?.length ? trainingPlans[0]._id : ''
  const activeRevisionId = trainingPlans?.length
    ? trainingPlans[0].revisions.find(
        (revision: any) => revision.status === 'active'
      )?._id || ''
    : ''
  const { isLoading, revision } = useTrainingPlan({
    id: activeTrainingPlanId,
    revisionId: activeRevisionId
  })
  const workouts = revision?.activities || []
  const options = useMemo(() => {
    return (
      workouts
        ?.filter((workout: any) =>
          workout.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((workout: any) => ({
          value: workout.name,
          label: workout.name
        })) || []
    )
  }, [search])

  // const filterWorkouts = (items: any[], searchField: string, text: string) => {
  //   const _text = text.split(' ')
  //   return items.filter(function (item) {
  //     return _text.every(function (el) {
  //       return item[searchField].toLowerCase().indexOf(el) > -1
  //     })
  //   })
  // }

  const filteredworkouts = search
    ? workouts?.filter((workout: any) =>
        workout.name.toLowerCase().includes(search.toLowerCase())
      )
    : workouts

  return (
    <Styles>
      <QuickAccessBack label={'log'} route={quickAccessRoutes.LOG} />

      <h3>{t('quickaccess:log-exercise.title')}</h3>

      <AutoCompleteInput
        id="exercises-search"
        placeholder={t('quickaccess:log-exercise.search-placeholder')}
        className="qa-log-exercise__search"
        options={options}
        value={search}
        onChange={(value) => setSearch(value)}
        onSelect={() => console.log('onSelect')}
      />

      <h4>{t('quickaccess:log-exercise.today-exercises')}</h4>
      {isLoading ? (
        <div className="qa-log-exercise__loading">
          <h4>Loading...</h4>
        </div>
      ) : (
        filteredworkouts.map((workout: any) => (
          <WorkoutItem
            key={workout._id}
            name={workout.name}
            completed={false}
            Icon={WorkoutIconV1}
            iconColor={'#E49A0A'}
            amount={`${workout.items.length} exercise${
              workout.items.length > 1 ? 's' : ''
            }`}
            onClick={() =>
              setRoute(quickAccessRoutes.WORKOUT_OVERVIEW, {
                id: '1',
                name: workout.name
              })
            }
          />
        ))
      )}

      <Button
        variant="text"
        className="qa-log-exercise__button"
        size="sm"
        onClick={() => setRoute(quickAccessRoutes.ADD_WORKOUT)}
      >
        {t('quickaccess:log-exercise.add-new')}
      </Button>
    </Styles>
  )
}

export default QuickAccessLogExercise
