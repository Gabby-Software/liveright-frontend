import { useState } from 'react'

import { InfoIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import DayTrainingPlanCard from '../../components/day-training-plan-card/day-training-plan-card.component'
import EditPlan from '../edit-plan/edit-plan.component'
import { Styles } from './plan.styles'

export default function TrainingPlan() {
  const [edit, setEdit] = useState(false)

  if (edit) {
    return <EditPlan onClose={() => setEdit(false)} />
  }

  return (
    <Styles>
      <Card>
        <div className="training-plan__header">
          <Title>Current Training Plan</Title>

          <div className="training-plan__header-actions">
            <Button variant="secondary" className="training-plan__header-btn">
              See Other Plans
            </Button>
            <Button
              className="training-plan__header-btn"
              onClick={() => setEdit(true)}
            >
              Edit Training Plan
            </Button>
          </div>
        </div>

        <div className="training-plan__filters">
          <Subtitle className="training-plan__filters-title">
            High Intensity Plan
          </Subtitle>

          <div>
            <Select
              className="training-plan__filters-select"
              id="training-plan-version"
              options={[]}
              value={{
                value: 'Starting 04/11/2021',
                label: 'Starting 04/11/2021'
              }}
            />
          </div>
        </div>

        <div className="training-plan__alert">
          <div className="training-plan__alert-icon">
            <InfoIcon />
          </div>

          <div className="training-plan__alert-body">
            <p className="training-plan__alert-text">
              This training plan is currently used on a training split. If you
              make changes, these will reflect on your training split.
            </p>
            <button className="training-plan__alert-action">Unlink</button>
          </div>
        </div>

        <div className="training-plan__divider" />

        <div className="training-plan__badges">
          <div className="training-plan__badge">
            <p className="training-plan__badge-title">Status</p>
            <StatusBadge status="active">Active</StatusBadge>
          </div>
          <div className="training-plan__badge">
            <p className="training-plan__badge-title">Start and end dates</p>
            <p className="training-plan__badge-text">
              The start and end dates of this training plan are tied to the
              active Training Split
            </p>
          </div>
        </div>

        <div className="training-plan__cards">
          <DayTrainingPlanCard />
          <DayTrainingPlanCard />
          <DayTrainingPlanCard />
        </div>
      </Card>
    </Styles>
  )
}
