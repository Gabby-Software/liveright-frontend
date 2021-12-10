import moment from 'moment'
import { useState } from 'react'
import { useParams } from 'react-router'

import { WorkoutIcon } from '../../../../assets/media/icons/activities'
import Button from '../../../../components/buttons/button/button.component'
import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { Subtitle, Title } from '../../../../components/typography'
import useTrainingPlan from '../../../../hooks/api/activities/useTrainingPlan'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { capitalize } from '../../../../pipes/capitalize.pipe'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
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
  const params = useParams<any>()

  const { trainingPlan } = useTrainingPlan({
    id: params.id,
    revisionId: params.revisionId
  })

  if (edit) {
    return (
      <AddTrainingPlan
        editId={params.id}
        revisionId={params.revisionId}
        onClose={() => setEdit(false)}
      />
    )
  }

  const startOn = trainingPlan.scheduled_start_on
    ? moment(new Date(trainingPlan.scheduled_start_on)).format(
        DATE_RENDER_FORMAT
      )
    : '-'

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
                {trainingPlan.name}
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
                  value: startOn,
                  label: startOn
                }}
              />

              {!isMobile && trainingPlan.status === 'inactive' && (
                <Button
                  className="PlanPage__filters-make-active-btn"
                  onClick={() => setMakeActiveDialog(true)}
                >
                  Make active
                </Button>
              )}
            </div>
          </div>

          {trainingPlan.status === 'scheduled' && (
            <Alert
              content={`This is your revision of your training plan set become active on ${startOn}.`}
            />
          )}

          {!isMobile && <div className="PlanPage__divider" />}

          <div className="PlanPage__badges">
            <div className="PlanPage__badge">
              <p className="PlanPage__badge-title">Status</p>
              <StatusBadge
                status={trainingPlan.status}
                className="PlanPage__badge-badge"
              >
                {capitalize(trainingPlan.status)}
              </StatusBadge>
            </div>
            {trainingPlan.status === 'active' && (
              <div className="PlanPage__badge">
                <p className="PlanPage__badge-title">Start and end dates</p>
                <p className="PlanPage__badge-text">
                  The start and end dates of this training plan are tied to the
                  active Training Split
                </p>
              </div>
            )}
            {trainingPlan.status === 'scheduled' && (
              <div className="PlanPage__badge">
                <p className="PlanPage__badge-title">Starting on</p>
                <p className="PlanPage__badge-text">
                  {trainingPlan.scheduled_start_on
                    ? moment(new Date(trainingPlan.scheduled_start_on)).format(
                        DATE_RENDER_FORMAT
                      )
                    : '-'}
                </p>
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="PlanPage__cards">
              {trainingPlan.days?.map((row: any) => (
                <DayTrainingPlanCard key={row._id} day={row} />
              ))}
            </div>
          )}
        </Card>

        {isMobile && (
          <>
            <p className="PlanPage__subtitle">List of workout days</p>

            {trainingPlan.days.map((row: any) => (
              <DayTrainingPlanCard day={row} key={row._id} />
            ))}
          </>
        )}

        {isMobile && (
          <Button onClick={() => setMakeActiveDialog(true)}>Make active</Button>
        )}
      </Styles>

      <MakeActiveDialog
        name="Make Active Training Plan"
        description="You're about to make the following training plan the active one"
        title="High Intensity Plan"
        alert={
          <>
            <div className="title">Read this before activating plan!</div>
            <ul>
              <li>
                A new revision of your training plan will be created and it will
                become active. All your workout entires on your calender from
                this day will be updated.
              </li>
              <li>
                This will also make changes to your current training split to
                use the changes you just made.
              </li>
            </ul>
          </>
        }
        date={{ label: 'From when should we apply this change?', value: '' }}
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
