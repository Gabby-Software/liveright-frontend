import { useState } from 'react'

import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import Alert from '../../components/alert/alert.component'
import DayTrainingPlanCard from '../../components/day-training-plan-card/day-training-plan-card.component'
import MakeActiveDialog from '../../components/dialog/make-active-dialog/make-active-dialog.component'
import EmptyPlan from '../../components/empty-plan/empty-plan.component'
import { Styles } from '../../styles/plan.styles'
import AddTrainingPlan from '../add-plan/add-plan.component'

const IS_EMPTY = false

export default function TrainingPlan() {
  const [edit, setEdit] = useState(false)
  const [makeActiveDialog, setMakeActiveDialog] = useState(false)
  const isMobile = useIsMobile()

  if (edit) {
    return <AddTrainingPlan onClose={() => setEdit(false)} />
  }

  const content = IS_EMPTY ? (
    <EmptyPlan
      title="Current Training Plan"
      text="There is no training plan yet..."
      Icon={WorkoutIcon}
      action={<Button>Create Training Plan</Button>}
    />
  ) : (
    <>
      <Styles>
        <Card className="PlanPage__card">
          {!isMobile && (
            <div className="PlanPage__header">
              <Title>Current Training Plan</Title>

              <div className="PlanPage__header-actions">
                <Button variant="secondary" className="PlanPage__header-btn">
                  See Other Plans
                </Button>
                <Button
                  className="PlanPage__header-btn"
                  onClick={() => setEdit(true)}
                >
                  Edit Training Plan
                </Button>
              </div>
            </div>
          )}

          <div className="PlanPage__filters">
            <div className="PlanPage__filters-title-container">
              <Subtitle className="PlanPage__filters-title">
                High Intensity Plan
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
                id="training-plan-version"
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

          {!isMobile && <div className="PlanPage__divider" />}

          <div className="PlanPage__badges">
            <div className="PlanPage__badge">
              <p className="PlanPage__badge-title">Status</p>
              <StatusBadge status="active" className="PlanPage__badge-badge">
                Active
              </StatusBadge>
            </div>
            <div className="PlanPage__badge">
              <p className="PlanPage__badge-title">Start and end dates</p>
              <p className="PlanPage__badge-text">
                The start and end dates of this training plan are tied to the
                active Training Split
              </p>
            </div>
          </div>

          {!isMobile && (
            <div className="PlanPage__cards">
              <DayTrainingPlanCard />
              <DayTrainingPlanCard />
              <DayTrainingPlanCard />
            </div>
          )}
        </Card>

        {isMobile && (
          <>
            <p className="PlanPage__subtitle">List of workout days</p>

            <DayTrainingPlanCard />
            <DayTrainingPlanCard />
            <DayTrainingPlanCard />
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
      title="Current Training Plan"
      actionComponent={<Button onClick={() => setEdit(true)}>Edit Plan</Button>}
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}
