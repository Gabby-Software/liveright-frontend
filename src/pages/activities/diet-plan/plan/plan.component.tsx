import { useState } from 'react'

import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import Alert from '../../components/alert/alert.component'
import DayDietPlanCard from '../../components/day-diet-plan-card/day-diet-plan-card.component'
import MakeActiveDialog from '../../components/dialog/make-active-dialog/make-active-dialog.component'
import EditDietPlan from '../edit-plan/edit-plan.component'
import EmptyPlan from '../empty-plan/empty-plan.component'
import { Styles } from './plan.styles'

const IS_EMPTY = false

export default function DietPlan() {
  const [edit, setEdit] = useState(false)
  const [makeActiveDialog, setMakeActiveDialog] = useState(false)

  if (IS_EMPTY) {
    return <EmptyPlan />
  }

  if (edit) {
    return <EditDietPlan onClose={() => setEdit(false)} />
  }

  return (
    <>
      <Styles>
        <Card>
          <div className="DietPlan__header">
            <Title>Current Diet Plan</Title>

            <div className="DietPlan__header-actions">
              <Button variant="secondary" className="DietPlan__header-btn">
                See Other Plans
              </Button>
              <Button
                className="DietPlan__header-btn"
                onClick={() => setEdit(true)}
              >
                Edit Diet Plan
              </Button>
            </div>
          </div>

          <div className="DietPlan__filters">
            <Subtitle className="DietPlan__filters-title">
              Balance Diet
            </Subtitle>

            <div className="DietPlan__filters-actions">
              <Select
                className="DietPlan__filters-select"
                id="DietPlan-version"
                options={[]}
                value={{
                  value: 'Starting 04/11/2021',
                  label: 'Starting 04/11/2021'
                }}
              />

              <Button
                className="DietPlan__filters-make-active-btn"
                onClick={() => setMakeActiveDialog(true)}
              >
                Make active
              </Button>
            </div>
          </div>

          <Alert
            content={`This is your revision of your training plan set become active on 04/11/2021.`}
          />

          <Card className="DietPlan__info">
            <div>
              <div>
                <p className="DietPlan__info-title">Start and end dates</p>
                <p className="DietPlan__info-text">
                  Tied to the active Training Split
                </p>
              </div>
            </div>

            <StatusBadge status="active">Active</StatusBadge>
          </Card>

          <div className="DietPlan__cards">
            <DayDietPlanCard />
            <DayDietPlanCard />
            <DayDietPlanCard />
          </div>
        </Card>
      </Styles>

      <MakeActiveDialog
        open={makeActiveDialog}
        onClose={() => setMakeActiveDialog(false)}
      />
    </>
  )
}
