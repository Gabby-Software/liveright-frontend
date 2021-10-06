import moment from 'moment'
import { useParams } from 'react-router'

import { WeightIcon } from '../../../../assets/media/icons'
import Alert from '../../../../components/alerts/alert/alert.component'
import Button from '../../../../components/buttons/button/button.component'
import ProgressCard from '../../../../components/cards/progress-card/progress-card.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../components/placeholders'
import { Routes } from '../../../../enums/routes.enum'
import useGoals from '../../../../hooks/api/progress/useGoals'
import { useAuth } from '../../../../hooks/auth.hook'
import { isClient } from '../../../../utils/api/auth'
import { DATE_FORMAT, DATE_PRETTY_FORMAT } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import { Styles } from './goals.styles'

const ALERT =
  'Set goals and see your evolution over time against these. If you need help setting up your own goals. Please reach out to your trainer'

export default function Goals() {
  const params = useParams<any>()
  const auth = useAuth()

  const { isLoading, goals } = useGoals({
    filter: {
      account_id: params.id
    }
  })

  const leanMass = goals.find((goal) => goal.type === 'lean_mass')
  const bodyWeight = goals.find((goal) => goal.type === 'body_weight')
  const bodyFat = goals.find((goal) => goal.type === 'body_fat')

  const editTo = isClient(auth.type)
    ? Routes.PROGRESS_LOG_CLIENT_GOALS
    : getRoute(Routes.PROGRESS_LOG_GOALS, { id: params.id })

  return (
    <Styles $client={isClient(auth.type)}>
      {isClient(auth.type) && (
        <Alert message={ALERT} className="goals__alert" />
      )}

      <div className="goals__title-container">
        <p className="goals__title">Current Goals</p>

        <Button
          variant="secondary"
          className="goals__button"
          linkClassName="goals__button-wrapper"
          to={editTo}
        >
          Edit Current/Future Goals
        </Button>
      </div>

      {isLoading ? (
        <LoadingPlaceholder />
      ) : !goals.length ? (
        <EmptyPlaceholder />
      ) : (
        <div className="goals__cards">
          <ProgressCard
            icon={<WeightIcon />}
            title="Lean Mass(kg)"
            value={leanMass ? `${leanMass.goal} kg` : '-'}
            subtitle={
              leanMass
                ? moment(leanMass.to, DATE_FORMAT).format(DATE_PRETTY_FORMAT)
                : '-'
            }
          />
          <ProgressCard
            icon={<WeightIcon />}
            title="Body Weight(kg)"
            value={bodyWeight ? `${bodyWeight.goal} kg` : '-'}
            subtitle={
              bodyWeight
                ? `${moment(bodyWeight.to, DATE_FORMAT).format(
                    DATE_PRETTY_FORMAT
                  )} kg`
                : '-'
            }
          />
          <ProgressCard
            icon={<WeightIcon />}
            title="Fat %"
            value={bodyFat ? `${bodyFat.goal}%` : '-'}
            subtitle={
              bodyFat
                ? moment(bodyFat.to, DATE_FORMAT).format(DATE_PRETTY_FORMAT)
                : '-'
            }
          />
        </div>
      )}
    </Styles>
  )
}
