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
import EditPlan from '../edit-plan/edit-plan.component'
import { Styles } from './plan.styles'

const IS_EMPTY = false

export default function TrainingPlan() {
  const [edit, setEdit] = useState(false)
  const [makeActiveDialog, setMakeActiveDialog] = useState(false)
  const isMobile = useIsMobile()

  const content = IS_EMPTY ? (
    <EmptyPlan
      title="Current Training Plan"
      text="There is no training plan yet..."
      Icon={WorkoutIcon}
      action={<Button>Create Training Plan</Button>}
    />
  ) : edit ? (
    <EditPlan onClose={() => setEdit(false)} />
  ) : (
    <>
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

            <div className="training-plan__filters-actions">
              <Select
                className="training-plan__filters-select"
                id="training-plan-version"
                options={[]}
                value={{
                  value: 'Starting 04/11/2021',
                  label: 'Starting 04/11/2021'
                }}
              />

              <Button
                className="training-plan__make-active-btn"
                onClick={() => setMakeActiveDialog(true)}
              >
                Make active
              </Button>
            </div>
          </div>

          <Alert
            content={`This is your revision of your training plan set become active on 04/11/2021.`}
          />

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

      <MakeActiveDialog
        open={makeActiveDialog}
        onClose={() => setMakeActiveDialog(false)}
      />
    </>
  )

  return isMobile ? (
    <MobilePage title="Current Training Plan">{content}</MobilePage>
  ) : (
    content
  )
}
