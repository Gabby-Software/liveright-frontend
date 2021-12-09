import { useState } from 'react'

import { FoodIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import Alert from '../../components/alert/alert.component'
import DayDietPlanCard from '../../components/day-diet-plan-card/day-diet-plan-card.component'
import MakeActiveDialog from '../../components/dialog/make-active-dialog/make-active-dialog.component'
import EmptyPlan from '../../components/empty-plan/empty-plan.component'
import { Styles } from '../../styles/plan.styles'
import EditDietPlan from '../edit-plan/edit-plan.component'

const IS_EMPTY = false

export default function DietPlan() {
  const [edit, setEdit] = useState(false)
  const [makeActiveDialog, setMakeActiveDialog] = useState(false)
  const isMobile = useIsMobile()

  if (edit) {
    return <EditDietPlan onClose={() => setEdit(false)} />
  }

  const content = IS_EMPTY ? (
    <EmptyPlan
      title="Current Diet Plan"
      text="There is no diet plan yet..."
      Icon={FoodIcon}
      action={<Button>Create Edit Plan</Button>}
    />
  ) : (
    <>
      <Styles>
        <Card className="PlanPage__card">
          {!isMobile && (
            <div className="PlanPage__header">
              <Title>Current Diet Plan</Title>

              <div className="PlanPage__header-actions">
                <Button variant="secondary" className="PlanPage__header-btn">
                  See Other Plans
                </Button>
                <Button
                  className="PlanPage__header-btn"
                  onClick={() => setEdit(true)}
                >
                  Edit Diet Plan
                </Button>
              </div>
            </div>
          )}

          <div className="PlanPage__filters">
            <div className="PlanPage__filters-title-container">
              <Subtitle className="PlanPage__filters-title">
                Balance Diet
              </Subtitle>

              {isMobile && (
                <Button
                  variant="text"
                  size="sm"
                  className="PlanPage__filters-archived-btn"
                >
                  Archived Plans
                </Button>
              )}
            </div>

            <div className="PlanPage__filters-actions">
              <Select
                className="PlanPage__filters-select"
                id="DietPlan-version"
                options={[]}
                value={{
                  value: 'Starting 04/11/2021',
                  label: 'Starting 04/11/2021'
                }}
              />

              {!isMobile && (
                <Button
                  className="PlanPage__filters-make-active-btn"
                  onClick={() => setMakeActiveDialog(true)}
                >
                  Make active
                </Button>
              )}
            </div>
          </div>

          <Alert
            content={`This is your revision of your training plan set become active on 04/11/2021.`}
          />

          <Card className="PlanPage__info">
            <div>
              <div>
                <p className="PlanPage__info-title">Start and end dates</p>
                <p className="PlanPage__info-text">
                  Tied to the active Training Split
                </p>
              </div>
            </div>

            <StatusBadge status="active" className="PlanPage__info-badge">
              Active
            </StatusBadge>
          </Card>

          {!isMobile && (
            <div className="PlanPage__cards">
              <DayDietPlanCard />
              <DayDietPlanCard />
              <DayDietPlanCard />
            </div>
          )}
        </Card>

        {isMobile && (
          <>
            <p className="PlanPage__subtitle">List of meal days</p>

            <DayDietPlanCard />
            <DayDietPlanCard />
            <DayDietPlanCard />
          </>
        )}

        <Button onClick={() => setMakeActiveDialog(true)}>Make active</Button>
      </Styles>

      <MakeActiveDialog
        open={makeActiveDialog}
        onClose={() => setMakeActiveDialog(false)}
      />
    </>
  )

  return isMobile ? (
    <MobilePage
      title="Current Diet Plan"
      actionComponent={<Button onClick={() => setEdit(true)}>Edit Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
