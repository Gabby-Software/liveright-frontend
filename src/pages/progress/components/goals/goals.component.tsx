import { useParams } from 'react-router'

import { WeightIcon } from '../../../../assets/media/icons'
import Alert from '../../../../components/alerts/alert/alert.component'
import Button from '../../../../components/buttons/button/button.component'
import ProgressCard from '../../../../components/cards/progress-card/progress-card.component'
import { Routes } from '../../../../enums/routes.enum'
import useGoals from '../../../../hooks/api/progress/useGoals'
import { useAuth } from '../../../../hooks/auth.hook'
import { isClient } from '../../../../utils/api/auth'
import { getRoute } from '../../../../utils/routes'
import { Styles } from './goals.styles'

const ALERT =
  'Set goals and see your evolution over time against these. If you need help setting up your own goals. Please reach out to your trainer'

export default function Goals() {
  const params = useParams<any>()
  const auth = useAuth()
  useGoals()

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

      <div className="goals__cards">
        <ProgressCard
          icon={<WeightIcon />}
          title="Lean Mass(kg)"
          value="10 kg"
          subtitle="Nov 10th, 2020"
        />
        <ProgressCard
          icon={<WeightIcon />}
          title="Body Weight(kg)"
          value="80 kg"
          subtitle="Nov 10th, 2020"
        />
        <ProgressCard
          icon={<WeightIcon />}
          title="Fat %"
          value="2 %"
          subtitle="Nov 10th, 2020"
        />
      </div>
    </Styles>
  )
}
